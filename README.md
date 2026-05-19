# Converse — AI Chat App

A fullstack ChatGPT style web app. The user holds a continuous,
conversation with an AI assistant. Every conversation and message is stored in
a MySQL database, and the OpenAI request is made only on the server side.

## Repository

https://github.com/ahmadabdelqadir/converse

## Stack

- **Database:** MySQL 8 (`conversations` and `messages` tables)
- **Backend:** Python, FastAPI
- **Frontend:** React, TypeScript, Vite, Tailwind CSS


## Features

- Continuous chat — the whole conversation is sent to the model each turn, so
  replies keep the full context
- User messages and assistant messages shown on opposite sides of the page
- "New conversation" button to start a fresh chat
- A refresh clears the page and starts a new conversation
- About page with details about the system and the programmer
- Main menu to move between the Chat and About pages


## API

| Method | Route                                       | Purpose                          |
|--------|---------------------------------------------|----------------------------------|
| POST   | `/api/conversations`                        | Start a new conversation         |
| POST   | `/api/conversations/{id}/messages`          | Send a message, get the reply    |
| GET    | `/api/conversations/{id}/messages`          | Get every message of a chat      |

Postman collection included at `Backend/postman/AI Chat API.postman_collection.json`.