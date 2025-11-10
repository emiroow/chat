# چت مونو‌ریپو

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-black?logo=socket.io)](https://socket.io/)
[![SignalR](https://img.shields.io/badge/SignalR-9.x-blue?logo=microsoft)](https://learn.microsoft.com/aspnet/core/signalr/introduction)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](./server-socket/package.json)

---

> **فارسی · [English](./README.md)**

---

## معرفی

یک اپلیکیشن چت مدرن و لحظه‌ای در قالب مونو‌ریپو با:

- **client-socket**: کلاینت React + TypeScript + Vite + Socket.IO
- **client-signalR**: کلاینت React + TypeScript + Vite + Microsoft SignalR
- **server-socket**: بک‌اند Node.js + Express + Socket.IO

مناسب برای یادگیری، نمونه‌سازی سریع یا استقرار چت با دو تکنولوژی مختلف کلاینت.

---

## قابلیت‌ها

- پیام‌رسانی لحظه‌ای (Socket.IO یا SignalR)
- رابط کاربری مدرن با React 19، Tailwind CSS و TanStack Query
- چینش واکنش‌گرا (سایدبار، پروفایل، لیست پیام‌ها)
- ذخیره‌سازی آزمایشی در حافظه سرور
- راه‌اندازی و پیکربندی آسان محیط توسعه

---

## تکنولوژی‌ها

- **فرانت‌اند**: React 19، TypeScript، Vite، Tailwind CSS، Zustand، TanStack Query، React Router
- **بک‌اند**: Node.js 18+، Express، Socket.IO
- **سایر**: ESLint، Prettier، پیکربندی .env

---

## شروع سریع

### پیش‌نیازها

- Node.js 18+
- npm (یا pnpm/yarn)

### ۱. اجرای سرور

```bash
cd server-socket
npm install
npm run dev
```

پیش‌فرض: http://localhost:3000

### ۲. اجرای کلاینت Socket.IO

```bash
cd client-socket
cp .env.example .env
# مقدار VITE_SERVER_URL را برابر http://localhost:3000 قرار دهید
npm install
npm run dev
```

### ۳. اجرای کلاینت SignalR

```bash
cd client-signalR
cp .env.example .env
# مقدار VITE_SIGNALR_URL را تنظیم کنید
npm install
npm run dev
```

---

## متغیرهای محیطی

- **client-socket**: متغیر `VITE_SERVER_URL` (پیش‌فرض: http://localhost:3000)
- **client-signalR**: متغیر `VITE_SIGNALR_URL` (اجباری)
- **server-socket**: متغیر `PORT` (پیش‌فرض: 3000)

---

## ساختار پروژه

```
client-socket/      # کلاینت React + Socket.IO
client-signalR/     # کلاینت React + SignalR
server-socket/      # بک‌اند Node.js + Socket.IO
```

---

## کلمات کلیدی سئو

چت آنلاین، برنامه چت، سوکت آی او، سیگنال آر، ری‌اکت، نود جی‌اس, chat app, real-time chat, React chat, Socket.IO chat, SignalR chat, Node.js chat server, TypeScript, Vite, Persian, Farsi

---

## مشارکت

مشارکت شما خوش‌آمد است! لطفاً issue یا pull request ثبت کنید.

---

## مجوز

ISC © 2025 — توضیحات در [`server-socket/package.json`](./server-socket/package.json)
