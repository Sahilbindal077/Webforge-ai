# WebForge AI Backend

The backend service for WebForge AI, providing APIs to generate and manage web projects using Generative AI. 

## Technologies Used

- **Node.js**: Server environment
- **Express**: Web framework for building the REST API
- **TypeScript**: Static typing for Node.js
- **Prisma**: Next-generation Node.js and TypeScript ORM for database access
- **AI Integration**:
  - `@google/generative-ai` (Gemini)
  - `openai`
- **Archiver**: For packaging and serving generated projects

## Prerequisites

- Node.js (v18 or higher recommended)
- An active relation database supported by Prisma (PostgreSQL, MySQL, SQLite, etc.)
- API Keys for Google Gemini and/or OpenAI

## Getting Started

### 1. Installation

Install the necessary dependencies:

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory. You can use the following structure:

```env
# Database configuration
DATABASE_URL="your-database-connection-string"

# AI Provider API Keys
GEMINI_API_KEY="your-google-gemini-api-key"
# OPENAI_API_KEY="your-openai-api-key"

# Server configuration
PORT=3000
```

### 3. Database Setup

Initialize your database schema using Prisma:

```bash
npx prisma generate
npx prisma db push
```

### 4. Running the Server

**Development Mode (with auto-reload):**

```bash
npm run dev
```

**Production Mode:**

```bash
npm start
```

## Available Endpoints

- `GET /health` - Returns the server health status (`{ status: 'ok', message: 'WebForge AI Backend running' }`).
- `/api/projects` - Core routing endpoints for project generation and management.
