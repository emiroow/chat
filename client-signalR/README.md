# Chat Client (SignalR) — React + TypeScript + Vite

کلاینت چت (SignalR) — ریاکت + تایپ‌اسکریپت + وایت

This is the SignalR-powered React chat client. It connects to a SignalR hub and renders a responsive chat UI built with Tailwind CSS, React Router, TanStack Query, and Zustand.

این پروژه نسخه کلاینت چت با SignalR است. کلاینت به هاب SignalR متصل می‌شود و یک رابط کاربری واکنش‌گرا با Tailwind/React Router/TanStack Query/Zustand ارائه می‌دهد.

## Features / قابلیت‌ها

- Real-time messaging via Microsoft SignalR
- Responsive ChatLayout with sidebar, message list, and profile panel
- React 19 + Vite + Tailwind CSS 4
- State and data: Zustand + TanStack Query

- پیام‌رسانی لحظه‌ای با SignalR
- چینش واکنش‌گرا برای چت (سایدبار، لیست پیام‌ها، پروفایل)
- استفاده از React 19، Vite و Tailwind CSS
- مدیریت State/Data با Zustand و TanStack Query

## Configuration / تنظیمات

- `VITE_SIGNALR_URL` — SignalR hub URL (required)

نمونه فایل `.env.example` را به `.env` کپی کرده و مقدار `VITE_SIGNALR_URL` را تنظیم کنید.

```bash
cp .env.example .env
# VITE_SIGNALR_URL=https://your-host/hubs/realtime
```

Connection config lives in `src/config/signalR.config.ts`.

## Run locally / اجرای محلی

```bash
npm install
npm run dev
```

Then open the printed URL from Vite (e.g., http://localhost:5173).

## Scripts / اسکریپت‌ها

- `npm run dev` — start Vite dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## Routes / مسیرها

- Unified chat route: `/chat/:id`
- تغییر رفتار کلی چت در `src/components/layouts/ChatLayout.tsx` انجام می‌شود.

## Tech / تکنولوژی‌ها

React 19, TypeScript, Vite 7, Tailwind CSS 4, TanStack Query 5, Zustand, @microsoft/signalr

## SEO keywords / کلمات کلیدی

signalr chat, react signalr, realtime chat react, typescript, vite, persian, farsi, سیگنال آر، چت ریل‌تایم، ری‌اکت، تایپ‌اسکریپت
