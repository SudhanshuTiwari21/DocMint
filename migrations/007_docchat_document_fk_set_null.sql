-- Detaching a document from chat should not delete the whole conversation.
-- When a chat_document row is deleted, clear the reference on conversations.

ALTER TABLE chat_conversations
  DROP CONSTRAINT IF EXISTS chat_conversations_document_id_fkey;

ALTER TABLE chat_conversations
  ADD CONSTRAINT chat_conversations_document_id_fkey
  FOREIGN KEY (document_id)
  REFERENCES chat_documents(id)
  ON DELETE SET NULL;
