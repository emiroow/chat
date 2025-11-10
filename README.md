npm install
npm run dev

# Chat Monorepo

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-black?logo=socket.io)](https://socket.io/)
[![SignalR](https://img.shields.io/badge/SignalR-9.x-blue?logo=microsoft)](https://learn.microsoft.com/aspnet/core/signalr/introduction)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](./server-socket/package.json)

---

> **English · [فارسی](./README.fa.md)**

---

## Overview

A modern, real-time chat application in a monorepo structure with:

- **client-socket**: React + TypeScript + Vite + Socket.IO client
- **client-signalR**: React + TypeScript + Vite + Microsoft SignalR client
- **server-socket**: Node.js + Express + Socket.IO backend

Perfect for learning, rapid prototyping, or deploying a chat app with two different client technologies.

---

## Features

- Real-time messaging (Socket.IO or SignalR)
- Modern UI with React 19, Tailwind CSS, and TanStack Query
- Responsive layout (sidebar, profile, message list)
- In-memory demo storage on the server
- Easy local development and configuration

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Zustand, TanStack Query, React Router
- **Backend:** Node.js 18+, Express, Socket.IO
- **Other:** ESLint, Prettier, .env configuration

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm (or pnpm/yarn)

### 1. Start the server

```bash
cd server-socket
npm install
npm run dev
```

Default: http://localhost:3000

### 2. Start the Socket.IO client

```bash
cd client-socket
cp .env.example .env
# Set VITE_SERVER_URL to http://localhost:3000
npm install
npm run dev
```

### 3. Start the SignalR client

```bash
cd client-signalR
cp .env.example .env
# Set VITE_SIGNALR_URL in .env
npm install
npm run dev
```

---

## Environment Variables

- **client-socket**: `VITE_SERVER_URL` (default: http://localhost:3000)
- **client-signalR**: `VITE_SIGNALR_URL` (required)
- **server-socket**: `PORT` (default: 3000)

---

## Project Structure

```
client-socket/      # React + Socket.IO client
client-signalR/     # React + SignalR client
server-socket/      # Node.js + Socket.IO backend
```

---

- client-socket:

  - `VITE_SERVER_URL` (default: http://localhost:3000)

- client-signalR:

  - `VITE_SIGNALR_URL` (required)

- server-socket:
  - `PORT` (default: 3000)

## Tech stack / تکنولوژی‌ها

- React 19, TypeScript, Vite, Tailwind CSS
- TanStack Query, Zustand, React Router
- Socket.IO (server + client) / Microsoft SignalR (client)
- Node.js, Express

## SEO keywords / کلمات کلیدی برای جستجو

chat app, real-time chat, React chat, Socket.IO chat, SignalR chat, Node.js chat server, TypeScript, Vite, Persian, Farsi, چت آنلاین، برنامه چت، سوکت آی او، سیگنال آر، ری‌اکت، نود جی‌اس

## License / مجوز

This repository uses the ISC license (see `server-socket/package.json`).

این مخزن تحت مجوز ISC منتشر شده است.
