-- Allow DocChat conversations without an uploaded PDF (general chat / exam prep)

ALTER TABLE chat_conversations
  ALTER COLUMN document_id DROP NOT NULL;
