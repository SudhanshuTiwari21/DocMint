# Subscriptions (Razorpay) – Webhook & Renewal Reminders

## Detecting inactive subscriptions

The app syncs subscription status with Razorpay via **webhooks**. When a subscription is cancelled or completed, we set the user back to the free tier.

### 1. Run migration (renewal reminder column)

```bash
psql "$DATABASE_URL" -f migrations/003_renewal_reminder_sent.sql
```

### 2. Configure Razorpay webhook

1. Razorpay Dashboard → **Settings** → **Webhooks** → **+ Add New Webhook**.
2. **Webhook URL**: `https://your-domain.com/api/webhooks/razorpay`
3. **Secret**: Generate and copy. Set as `RAZORPAY_WEBHOOK_SECRET` in your env (Vercel/hosting).
4. **Events**: Enable at least:
   - `subscription.cancelled`
   - `subscription.completed`
   - `subscription.charged` (so we update `current_end` on renewal)

Without the webhook, cancelled or expired subscriptions will not downgrade the user in the app.

## Renewal reminder emails

We send a single “Your subscription is renewing soon” email when `current_end` is within the next 7 days. No duplicate reminders (tracked with `renewal_reminder_sent_at`).

### Cron (daily)

- **Vercel**: `vercel.json` defines a cron that calls `/api/cron/renewal-reminders` daily at 09:00 UTC. Set `CRON_SECRET` in Vercel env; the cron request must include `Authorization: Bearer <CRON_SECRET>` (or `?key=<CRON_SECRET>`).
- **Elsewhere**: Call `GET https://your-domain.com/api/cron/renewal-reminders` with `Authorization: Bearer YOUR_CRON_SECRET` (or `?key=YOUR_CRON_SECRET`) once per day.

## Yearly vs monthly

- **Monthly**: Razorpay charges every month; we get `subscription.charged` and update `current_end`. Renewal reminder runs when that date is within 7 days.
- **Yearly**: Same flow; we store `current_end` from the subscription and send one reminder before the next billing date.

Both plans use the same webhook and cron; no extra configuration per plan.
