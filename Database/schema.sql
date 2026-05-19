-- AI Chat App - MySQL database schema
-- Run this once to create the database and its tables.
-- The backend (SQLAlchemy) also calls create_all on startup, so running
-- this file is only required to create the database itself.

CREATE DATABASE IF NOT EXISTS ai_chat
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE ai_chat;

-- One row per chat. Each conversation has its own unique id, which is how
-- one chat is told apart from another.
CREATE TABLE IF NOT EXISTS conversations (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    title      VARCHAR(255) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- One row per message. The role column records who said the message:
-- 'user' for the person, 'assistant' for the AI chat.
CREATE TABLE IF NOT EXISTS messages (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    conversation_id INT NOT NULL,
    role            VARCHAR(20) NOT NULL,
    content         TEXT NOT NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_messages_conversation
        FOREIGN KEY (conversation_id) REFERENCES conversations(id)
        ON DELETE CASCADE
);

-- Speeds up loading every message that belongs to a conversation.
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
