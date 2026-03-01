# Auth & Subscription Setup

This project uses passwordless authentication (email verification for signup, OTP for login) and Razorpay for subscriptions.

## 1. Run Database Migrations

```bash
psql $DATABASE_URL -f migrations/001_init.sql
```

Or run the SQL in `migrations/001_init.sql` manually against your PostgreSQL database.

## 2. Environment Variables

Copy `.env.example` to `.env` and set:

- `DATABASE_URL` – PostgreSQL connection string
- `JWT_SECRET` – At least 32 characters
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` – From Razorpay Dashboard
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` – For sending emails

Optional:

- `RAZORPAY_PLAN_MONTHLY_ID`, `RAZORPAY_PLAN_YEARLY_ID` – Pre-created plan IDs (otherwise plans are created on first use)
- `RAZORPAY_WEBHOOK_SECRET` – For webhook signature verification
- `NEXT_PUBLIC_SITE_URL` – Your site URL (e.g. https://dockera.in)

## 3. Create Razorpay Plans (Optional)

Create plans in the Razorpay Dashboard:

- Monthly: ₹200/month
- Yearly: ₹2,400/year (₹200/month)

Set `RAZORPAY_PLAN_MONTHLY_ID` and `RAZORPAY_PLAN_YEARLY_ID` in `.env`. If not set, plans are created automatically on first subscription.

## 4. Auth Flow

**Signup**: User enters first name, last name, email → verification link sent → user clicks link → account verified, session created.

**Login**: User enters email → OTP sent → user enters OTP → session created.

**Logout**: POST `/api/auth/logout` clears the session cookie.

## 5. Subscription Flow

1. User must be logged in.
2. User goes to `/pricing` and clicks "Go Premium".
3. API creates Razorpay subscription with `notes.user_id`.
4. User completes payment in Razorpay popup.
5. API verifies signature, fetches subscription from Razorpay, gets `notes.user_id`, updates `users.tier` and `subscriptions` in DB.
6. Session and premium cookie are set.

## 6. Security

- httpOnly, secure, SameSite cookies (no tokens in localStorage)
- Rate limiting on signup/OTP (5 per hour per email)
- Razorpay payment signature verification
- OTP hashed with SHA256 before storage
- Prepared SQL queries to prevent injection
