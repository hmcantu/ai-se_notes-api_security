# Notes API

A simple notes API. Your task is to add authentication.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## What's already here

- A working `Note` model with `title`, `body`, and `createdAt`
- Routes for `GET /notes`, `POST /notes`, and `DELETE /notes/:id`
- Error handling middleware
- Stubs for everything you'll implement


## API

| Method | Path | Auth required | Description |
|--------|------|---------------|-------------|
| `GET` | `/notes` | No | List all notes |
| `POST` | `/notes` | No | Create a note |
| `DELETE` | `/notes/:id` | Yes | Delete a note |
| `POST` | `/auth/register` | No | Register a new user |
| `POST` | `/auth/login` | No | Log in and get a token |
| `GET` | `/auth/me` | Yes | Get current user profile |
