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


### 1. Database

With MySQL running, import the database exported file included.

### 2. Backend

```bash
cd Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create the environment file: copy `Backend/.env.example` to a new file called
`Backend/.env`, then fill in the values:

```
CONNECTION_STRING = "mysql+mysqlconnector://root:YOUR_MYSQL_PASSWORD@localhost/ai_chat"
OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"
OPENAI_MODEL = "gpt-4o-mini"
```

Run the server:

```bash
cd src
python app.py
```

The backend runs on http://localhost:4000

### 3. Frontend

```bash
cd Frontend
npm install
```

Copy `Frontend/.env.example` to a new file named `Frontend/.env`:

```
VITE_API_BASE_URL=http://localhost:4000
```

then : 

```bash
npm start
```

The app opens on http://localhost:5173
