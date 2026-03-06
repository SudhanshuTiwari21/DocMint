# Auth system – edge cases audit

## Handled

- **Signup**: Validated names/email, rate limit, verified vs unverified (409 “already signed up” vs allow retry).
- **Verify-email**: Missing/invalid token → redirect with error; user not found → redirect; DB error → redirect.
- **Verify-email**: User already verified → still works (UPDATE no-op, session created, redirect to home).
- **Send OTP**: Invalid/empty body → 400; invalid email → 400; rate limit → 429; no user → 404.
- **Verify OTP**: Invalid/expired OTP → 400; user not in DB → 404; session created and cookie set.
- **Logout**: Idempotent (no error if not logged in).
- **/me**: No session or user deleted → `{ user: null }` (200).
- **Session**: JWT with expiry; `getSecret()` enforces JWT_SECRET length.
- **Email**: Normalized to lowercase in signup, send-otp, verify-otp, OTP storage.
- **SQL**: Parameterized queries everywhere.

---

## Edge cases (addressed or recommended)

### 1. Login allowed for unverified users — **fixed**

- **Issue**: Send-OTP and verify-OTP did not check `email_verified_at`. An unverified user could log in with OTP and never use the verification link.
- **Fix**: Send-OTP and verify-OTP now require the user to be verified. Unverified users get a clear message to verify first (signup flow).

### 2. Multiple valid OTPs for same email — **fixed**

- **Issue**: Each “Send OTP” inserted a new row; old OTPs remained valid until expiry, so several codes could work.
- **Fix**: When sending a new login OTP, previous OTPs for that email/purpose are deleted so only the latest OTP is valid.

### 3. Stale session when user is deleted — **fixed**

- **Issue**: If a user was deleted, `/me` returned `user: null` but the session cookie was left in place, so the client kept sending a useless token.
- **Fix**: When `/me` finds no user for the session, the session cookie is cleared.

### 4. Verification link reusable until token expiry

- **Current**: Verification link is a JWT valid 24 hours. After first use we set `email_verified_at` but do not invalidate the token, so the same link can be used again to create a session until it expires.
- **Impact**: Low (link is in user’s email; re-use just logs them in again).
- **Optional**: Store a “verification completed at” or invalidate token after first use if you want one-time links.

### 5. Email enumeration

- **Current**: Send-OTP returns 404 “No account found with this email” for unknown emails. Signup returns 409 “You have already signed up” for existing verified users.
- **Impact**: An attacker can discover which emails are registered.
- **Optional**: Use a generic message (“If an account exists, we sent an OTP”) and always return 200 for send-OTP; consider similar for signup if you want to hide membership.

### 6. No global/IP rate limit on auth endpoints

- **Current**: Rate limits are per-email (signup, OTP). There is no global or per-IP limit on `/api/auth/*`.
- **Impact**: An attacker could try many different emails (e.g. send-OTP or signup) and cause load or abuse.
- **Optional**: Add a per-IP (or per-fingerprint) rate limit for auth routes (e.g. 50 requests/hour per IP).

### 7. Logout only clears cookie

- **Current**: Logout deletes the session cookie. There is no server-side session store, so the JWT is not revoked.
- **Impact**: If the token is stolen before logout, it remains valid until expiry. This is normal for JWT-only auth.
- **Optional**: Use a short session expiry or a blocklist (e.g. Redis) for revoked tokens if you need instant invalidation.

### 8. Redirect / open redirect — **fixed**

- **Issue**: Login page used `redirect` from query without validation, so `?redirect=https://evil.com` could send the user off-site after login.
- **Fix**: `safeRedirect()` now allows only relative paths (must start with `/`, must not start with `//`). Invalid values fall back to `"/"`.

### 9. Very long request body

- **Current**: No explicit limit on JSON body size for signup/send-otp/verify-otp. Next.js and Node have defaults.
- **Impact**: Very large bodies could cause DoS or high memory use.
- **Optional**: Enforce a small max body size (e.g. 1KB) for auth endpoints.

---

## Summary

- **Fixed in code**: (1) login only for verified users, (2) single valid OTP per email (invalidate old on new send), (3) clear session cookie in `/me` when user is missing.
- **Documented for product/ops**: Verification link reuse, email enumeration, global rate limit, redirect validation, optional body size limit and token revocation.
