# Chat Client (Socket.IO) — React + TypeScript + Vite

کلاینت چت (Socket.IO) — ریاکت + تایپ‌اسکریپت + وایت

This is the Socket.IO-powered React chat client. It connects to the Socket.IO backend (`server-socket`) and provides a responsive chat experience.

این پروژه نسخه کلاینت چت با Socket.IO است که به سرور `server-socket` متصل می‌شود و تجربه چت واکنش‌گرا ارائه می‌دهد.

## Features / قابلیت‌ها

- Real-time messaging via Socket.IO client
- Responsive layout with `ChatLayout` at route `/chat/:id`
- React 19 + Vite + Tailwind CSS 4
- State/Data with Zustand + TanStack Query

## Configuration / تنظیمات

- `VITE_SERVER_URL` — Socket.IO server URL (default: `http://localhost:3000`)

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

- `npm run dev` — start Vite dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## Socket events / رویدادهای سوکت

Client uses these events (see `src/config/socket.config.ts` and server docs):

- `register` — body: `{ userName, name }`
- `checkUser` — body: `{ userName }`
- `getConversations` — body: `{ userName }`
- `getMessages` — body: `{ from, to }`
- `sendMessage` — body: `{ from, to, text }`

## Tech / تکنولوژی‌ها

React 19, TypeScript, Vite 7, Tailwind CSS 4, TanStack Query 5, Zustand, socket.io-client 4

## SEO keywords / کلمات کلیدی

socket io chat, react chat, realtime chat, typescript, vite, persian, farsi, سوکت آی او، چت آنلاین، ری‌اکت
