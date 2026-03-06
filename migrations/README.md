# Database migrations

Run migrations in order against your PostgreSQL database (e.g. Neon).

**From the project root:**

```bash
# First time
psql "$DATABASE_URL" -f migrations/001_init.sql

# After adding auth rate limit and one-time verification links
psql "$DATABASE_URL" -f migrations/002_verification_links_and_auth_rate.sql

# After adding subscription renewal reminder tracking
psql "$DATABASE_URL" -f migrations/003_renewal_reminder_sent.sql
```

**Using Neon dashboard:**  
Neon → your project → SQL Editor → paste the contents of each migration file → Run.

**Vercel / production:**  
Run the migration from your machine or CI using the production `DATABASE_URL` (e.g. from Vercel env). Migrations are not run automatically on deploy.
