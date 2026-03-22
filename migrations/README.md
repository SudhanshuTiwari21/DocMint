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

# User subscription timestamps / plan interval
psql "$DATABASE_URL" -f migrations/004_user_subscription_timestamp.sql

# DocChat (PDF upload + conversations)
psql "$DATABASE_URL" -f migrations/005_docchat.sql

# DocChat: allow conversations without a PDF (general chat) — required or "hi" without upload will error
psql "$DATABASE_URL" -f migrations/006_docchat_general_chat.sql

# DocChat: deleting a document clears it from conversations (ON DELETE SET NULL) instead of deleting the whole chat
psql "$DATABASE_URL" -f migrations/007_docchat_document_fk_set_null.sql

# DocChat: optional attachment filename on user messages (in-thread file chip)
psql "$DATABASE_URL" -f migrations/008_chat_messages_attachment_filename.sql
```

**Using Neon dashboard:**  
Neon → your project → SQL Editor → paste the contents of each migration file → Run.

**Vercel / production:**  
Run the migration from your machine or CI using the production `DATABASE_URL` (e.g. from Vercel env). Migrations are not run automatically on deploy.

**If you see `null value in column "document_id" of relation "chat_conversations"`:** run `006_docchat_general_chat.sql` on that database.
