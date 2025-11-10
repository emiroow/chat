# Chat Client (SignalR)

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-blue?logo=tailwindcss)](https://tailwindcss.com/)
[![SignalR](https://img.shields.io/badge/SignalR-9.x-blue?logo=microsoft)](https://learn.microsoft.com/aspnet/core/signalr/introduction)

---

> **English · [فارسی](../README.fa.md)**

---

## Overview

A modern, real-time chat client built with React 19, TypeScript, Vite, and Microsoft SignalR. This project demonstrates a responsive chat UI, real-time messaging, and state management using Zustand and TanStack Query.

---

## Features

- Real-time messaging via Microsoft SignalR
- Responsive chat layout (sidebar, message list, profile panel)
- Modern UI with Tailwind CSS 4
- State management with Zustand and TanStack Query
- Type-safe codebase with TypeScript

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Zustand, TanStack Query, React Router
- **Realtime:** Microsoft SignalR
- **Linting:** ESLint, Prettier

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm (or pnpm/yarn)

### 1. Clone & Install

```bash
cd client-signalR
cp .env.example .env
# Set VITE_SIGNALR_URL in .env
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open the printed URL (e.g., http://localhost:5173).

---

## Configuration

- `VITE_SIGNALR_URL` — SignalR hub URL (required)
- Edit `src/config/signalR.config.ts` for advanced config

---

## Scripts

- `npm run dev` — Start Vite dev server
- `npm run build` — Type-check and build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

---

## Project Structure

- `src/components/` — UI components (chat, layouts, ui)
- `src/config/` — SignalR config
- `src/context/` — SignalR context provider
- `src/pages/` — Page components
- `src/routes/` — App routes
- `src/types/` — TypeScript types

---

## License

ISC © 2025 — See [../server-socket/package.json](../server-socket/package.json)

---

## Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) for UI primitives
- [Microsoft SignalR](https://learn.microsoft.com/aspnet/core/signalr/introduction)

---

## SEO Keywords

signalr chat, react chat, realtime chat, typescript, vite, persian, farsi, سیگنال آر، چت آنلاین، ری‌اکت

signalr chat, react signalr, realtime chat react, typescript, vite, persian, farsi, سیگنال آر، چت ریل‌تایم، ری‌اکت، تایپ‌اسکریپت
