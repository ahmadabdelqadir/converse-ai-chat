# Converse — AI Chat App

A full-stack ChatGPT-style web app. The user holds a continuous, in-context
conversation with an AI assistant. Every conversation and message is stored in
a MySQL database, and the OpenAI request is made only on the server side.

Built as the final project of the John Bryce Full Stack Web Developer course.

## Repository

https://github.com/ahmadabdelqadir/converse

## Stack

- **Database:** MySQL 8 (`conversations` and `messages` tables)
- **Backend:** Python, FastAPI, SQLAlchemy, OpenAI SDK — a layered REST API
- **Frontend:** React, TypeScript, Vite, Tailwind CSS — a single-page app

## Project structure

```
Database/    MySQL schema and the database export
Backend/     FastAPI REST API (the OpenAI key lives here, in .env)
Frontend/    React single-page client
```

## Features

- Continuous chat — the whole conversation is sent to the model each turn, so
  replies keep the full context
- User messages and assistant messages shown on opposite sides of the page
- "New conversation" button to start a fresh chat
- A refresh clears the page and starts a new conversation
- About page with details about the system and the programmer
- Main menu to move between the Chat and About pages

## Setup

### 1. Database

Create the database and tables (MySQL must be running). Either import the
full export, or run the clean schema file:

```bash
mysql -u root -p < Database/ai_chat_export.sql   # full export (structure + sample data)
mysql -u root -p < Database/schema.sql           # or just the empty schema
```

The backend also calls `create_all` on startup, so the tables are created
automatically as long as the `ai_chat` database itself exists.

### 2. Backend

```bash
cd Backend
python -m venv venv
venv\Scripts\activate            # Windows
pip install -r requirements.txt
```

Copy `.env.example` to `.env` and fill in your values:

```
CONNECTION_STRING = "mysql+mysqlconnector://root:your-password@localhost/ai_chat"
OPENAI_API_KEY = "your-openai-api-key"
OPENAI_MODEL = "gpt-4o-mini"
```

Run the API (from the `Backend` folder):

```bash
cd src
python app.py
```

The API runs on `http://localhost:4000`.

### 3. Frontend

```bash
cd Frontend
npm install
npm run dev
```

The app opens on `http://localhost:5173`.

## API

| Method | Route                                       | Purpose                          |
|--------|---------------------------------------------|----------------------------------|
| POST   | `/api/conversations`                        | Start a new conversation         |
| POST   | `/api/conversations/{id}/messages`          | Send a message, get the reply    |
| GET    | `/api/conversations/{id}/messages`          | Get every message of a chat      |

A Postman collection is included at `Backend/postman/AI Chat API.postman_collection.json`.

## Notes

- The `.env` file is never committed to GitHub — it is listed in `.gitignore`.
- The OpenAI API key stays on the server only; the frontend never sees it.
