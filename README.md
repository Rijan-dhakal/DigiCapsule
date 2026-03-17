# DigiCapsule

Live link: [https://digicapsule.rijandhakal.com.np/](https://digicapsule.rijandhakal.com.np/)

> This project is currently under development.

DigiCapsule is a personal project the idea is simple: what if you could write a message, attach some photos or files, lock it away, and have it open only on a date you choose in the future? Like a time capsule, but digital.

You create a capsule, write whatever you want (markdown supported), upload any files, pick an unlock date, and send it to someone's email. They won't be able to open it until the time comes. You can also add a hint — something vague to build a bit of anticipation and optionally lock it with a password on top of the date.

It is the kind of thing you would use to write a letter to your future self, send a birthday surprise a year ahead of time, or just preserve a memory the way it felt right now.

## Features

- Write capsule content in markdown
- Attach files (images, videos, etc.) — stored on Cloudinary
- Set a future unlock date, the capsule is locked until then
- Locked capsule cannot be viewed by the creator also.
- Send the capsule to a recipient by email
- Add a hint so the recipient has a small clue but no spoilers
- Optional password on the capsule
- Sign in with Google
- Admin role for managing users

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Database**: PostgreSQL via Neon (serverless), managed with Drizzle ORM
- **Auth**: Better Auth (Google OAuth, admin plugin)
- **File Storage**: Cloudinary
- **UI**: Tailwind CSS, Radix UI, Lucide React, shadcn/ui components
- **Forms**: React Hook Form + Zod
- **Markdown**: @uiw/react-md-editor

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database on Neon
- A Cloudinary account
- A Google OAuth app

### Environment Variables

Rename `.env.sample` to `.env` in the project root with the following:

```env
DATABASE_URL=
BETTER_AUTH_URL=
BETTER_AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Installation

```bash
npm install
```

### Database Migration

```bash
npx drizzle-kit push
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in browser.

## Project Structure

```
app/            # Next.js App Router pages and API routes
actions/        # Server actions
components/     # Shared and page-specific UI components
lib/            # Auth, database schema, validators, helpers
drizzle/        # Migration SQL files and Drizzle meta
public/         # Static assets
```

## Status

Still being built. The capsule creation flow works perfectly. The dashboard, profile, and settings pages are still being worked on.
