-- Optional filename shown on user messages (file attached to that turn, ChatGPT-style)

ALTER TABLE chat_messages
  ADD COLUMN IF NOT EXISTS attachment_filename VARCHAR(512) NULL;
