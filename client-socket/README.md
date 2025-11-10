# Chat Client (Socket.IO) — React + TypeScript + Vite

کلاینت چت (Socket.IO) — ریاکت + تایپ‌اسکریپت + وایت

This is the Socket.IO-powered React chat client. It connects to the Socket.IO backend (`server-socket`) and provides a responsive chat experience.

این پروژه نسخه کلاینت چت با Socket.IO است که به سرور `server-socket` متصل می‌شود و تجربه چت واکنش‌گرا ارائه می‌دهد.

## Features / قابلیت‌ها

## Configuration / تنظیمات

Set up env:

```bash
cp .env.example .env
# VITE_SERVER_URL=http://localhost:3000
```

Note: `.env.example` may include other keys from earlier templates. For this client the critical variable is `VITE_SERVER_URL`.

## Run locally / اجرای محلی

```bash
npm install
npm run dev
```

## Scripts / اسکریپت‌ها

## Socket events / رویدادهای سوکت

Client uses these events (see `src/config/socket.config.ts` and server docs):

## Tech / تکنولوژی‌ها

React 19, TypeScript, Vite 7, Tailwind CSS 4, TanStack Query 5, Zustand, socket.io-client 4

## SEO keywords / کلمات کلیدی

socket io chat, react chat, realtime chat, typescript, vite, persian, farsi, سوکت آی او، چت آنلاین، ری‌اکت

# Chat Client (Socket.IO)

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-blue?logo=tailwindcss)](https://tailwindcss.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-black?logo=socket.io)](https://socket.io/)

---

> **English · [فارسی](../README.fa.md)**

---

## Overview

A modern, real-time chat client built with React 19, TypeScript, Vite, and Socket.IO. This project demonstrates a responsive chat UI, real-time messaging, and state management using Zustand and TanStack Query.

---

## Features

- Real-time messaging via Socket.IO
- Responsive chat layout (sidebar, message list, profile panel)
- Modern UI with Tailwind CSS 4
- State management with Zustand and TanStack Query
- Type-safe codebase with TypeScript

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Zustand, TanStack Query, React Router
- **Realtime:** Socket.IO
- **Linting:** ESLint, Prettier

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm (or pnpm/yarn)

### 1. Clone & Install

```bash
cd client-socket
cp .env.example .env
# Set VITE_SERVER_URL in .env
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open the printed URL (e.g., http://localhost:5173).

---

## Configuration

- `VITE_SERVER_URL` — Socket.IO server URL (default: `http://localhost:3000`)
- Edit `src/config/socket.config.ts` for advanced config

---

## Scripts

- `npm run dev` — Start Vite dev server
- `npm run build` — Type-check and build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

---

## Socket Events

Client uses these events (see `src/config/socket.config.ts` and server docs):

- `register` — `{ userName, name }`
- `checkUser` — `{ userName }`
- `getConversations` — `{ userName }`
- `getMessages` — `{ from, to }`
- `sendMessage` — `{ from, to, text }`

---

## Project Structure

- `src/components/` — UI components (chat, layouts, ui)
- `src/config/` — Socket.IO config
- `src/context/` — Socket context provider
- `src/pages/` — Page components
- `src/routes/` — App routes
- `src/types/` — TypeScript types

---

## License

ISC © 2025 — See [../server-socket/package.json](../server-socket/package.json)

---

## Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) for UI primitives
- [Socket.IO](https://socket.io/)

---

## SEO Keywords
