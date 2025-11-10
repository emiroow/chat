# Chat Monorepo — React + Socket.IO / SignalR + Node.js

چت مونو‌ریپو — ریاکت + Socket.IO/SignalR + نود.جی‌اس

This repository contains a small, modern chat application implemented in two client variants and one server:

- `client-socket`: React + TypeScript + Vite chat client using Socket.IO
- `client-signalR`: React + TypeScript + Vite chat client using Microsoft SignalR
- `server-socket`: Node.js + Express + Socket.IO chat backend

این مخزن شامل یک اپلیکیشن چت مدرن است که در دو نسخه کلاینت و یک سرور پیاده‌سازی شده است:

- `client-socket`: کلاینت چت با React/TypeScript/Vite و Socket.IO
- `client-signalR`: کلاینت چت با React/TypeScript/Vite و Microsoft SignalR
- `server-socket`: بک‌اند چت با Node.js/Express و Socket.IO

## Features / قابلیت‌ها

- Real‑time messaging with Socket.IO or SignalR
- Modern UI with React 19, Tailwind CSS, and TanStack Query
- Responsive chat layout (sidebar, profile panel, message list)
- In‑memory demo store on server for conversations and messages

- پیام‌رسانی لحظه‌ای با Socket.IO یا SignalR
- رابط کاربری مدرن با React 19، Tailwind CSS و TanStack Query
- چینش منعطف برای موبایل و دسکتاپ
- ذخیره‌سازی آزمایشی در حافظه سرور برای گفتگوها و پیام‌ها

## Repository structure / ساختار مخزن

- `client-socket/` — Socket.IO client
- `client-signalR/` — SignalR client
- `server-socket/` — Socket.IO server (default port: 3000)

## Quick start / شروع سریع

1. Start the server (Socket.IO):

   - Windows Bash

   ```bash
   cd "c:/Development Projects/chat/server-socket"
   npm install
   npm run dev
   ```

   The server listens on http://localhost:3000 by default. Set `PORT` to change it.

2. Start the Socket.IO client:

   ```bash
   cd "c:/Development Projects/chat/client-socket"
   cp .env.example .env
   # set VITE_SERVER_URL=http://localhost:3000
   npm install
   npm run dev
   ```

3. Start the SignalR client:

   ```bash
   cd "c:/Development Projects/chat/client-signalR"
   cp .env.example .env
   # set VITE_SIGNALR_URL (e.g., http://localhost:5000/hubs/chat or your hosted URL)
   npm install
   npm run dev
   ```

۱) سرور Socket.IO را اجرا کنید (پورت پیش‌فرض 3000):

- در ویندوز (Bash):

```bash
cd "c:/Development Projects/chat/server-socket"
npm install
npm run dev
```

۲) کلاینت Socket.IO را اجرا کنید:

```bash
cd "c:/Development Projects/chat/client-socket"
cp .env.example .env
# مقدار VITE_SERVER_URL را برابر http://localhost:3000 قرار دهید
npm install
npm run dev
```

۳) کلاینت SignalR را اجرا کنید:

```bash
cd "c:/Development Projects/chat/client-signalR"
cp .env.example .env
# مقدار VITE_SIGNALR_URL را تنظیم کنید (مثلاً http://localhost:5000/hubs/chat)
npm install
npm run dev
```

## Configuration / تنظیمات محیطی

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
