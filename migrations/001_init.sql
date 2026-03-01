-- Run this SQL against your PostgreSQL database (e.g. psql $DATABASE_URL -f migrations/001_init.sql)

-- users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email_verified_at TIMESTAMPTZ,
  tier VARCHAR(50) NOT NULL DEFAULT 'free',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- subscriptions (Razorpay)
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  razorpay_subscription_id VARCHAR(255) UNIQUE,
  razorpay_plan_id VARCHAR(255),
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  tier VARCHAR(50) NOT NULL DEFAULT 'premium',
  current_start TIMESTAMPTZ,
  current_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_razorpay ON subscriptions(razorpay_subscription_id);

-- otp_attempts for rate limiting
CREATE TABLE IF NOT EXISTS otp_attempts (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  purpose VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_otp_attempts_email_created ON otp_attempts(email, created_at);

-- otp_tokens for login OTP (short-lived, delete after verify)
CREATE TABLE IF NOT EXISTS otp_tokens (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  otp_hash VARCHAR(64) NOT NULL,
  purpose VARCHAR(50) NOT NULL DEFAULT 'login',
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_otp_tokens_email_expires ON otp_tokens(email, expires_at);
