-- User-level subscription validity: one timestamp and plan type for "Pro until when" and monthly vs yearly
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS subscription_ends_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS plan_interval VARCHAR(20);

COMMENT ON COLUMN users.subscription_ends_at IS 'Pro access valid until this time; after this, user must renew. Reset on each payment.';
COMMENT ON COLUMN users.plan_interval IS 'monthly or yearly when user has an active subscription.';
