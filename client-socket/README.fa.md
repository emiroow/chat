# کلاینت چت (Socket.IO)

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-blue?logo=tailwindcss)](https://tailwindcss.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-black?logo=socket.io)](https://socket.io/)

---

> **فارسی · [English](./README.md)**

---

## معرفی

یک کلاینت چت مدرن و لحظه‌ای با React 19، TypeScript، Vite و Socket.IO. این پروژه یک رابط کاربری واکنش‌گرا، پیام‌رسانی لحظه‌ای و مدیریت وضعیت با Zustand و TanStack Query را نمایش می‌دهد.

---

## قابلیت‌ها

- پیام‌رسانی لحظه‌ای با Socket.IO
- رابط کاربری واکنش‌گرا (سایدبار، لیست پیام‌ها، پنل پروفایل)
- طراحی مدرن با Tailwind CSS 4
- مدیریت وضعیت با Zustand و TanStack Query
- کدنویسی تایپ‌سیف با TypeScript

---

## تکنولوژی‌ها

- **فرانت‌اند:** React 19، TypeScript، Vite، Tailwind CSS، Zustand، TanStack Query، React Router
- **لحظه‌ای:** Socket.IO
- **کد تمیز:** ESLint، Prettier

---

## شروع سریع

### پیش‌نیازها

- Node.js 18+
- npm (یا pnpm/yarn)

### ۱. نصب و راه‌اندازی

```bash
cd client-socket
cp .env.example .env
# مقدار VITE_SERVER_URL را برابر http://localhost:3000 قرار دهید
npm install
```

### ۲. اجرای سرور توسعه

```bash
npm run dev
```

آدرس چاپ‌شده (مثلاً http://localhost:5173) را باز کنید.

---

## تنظیمات

- `VITE_SERVER_URL` — آدرس سرور Socket.IO (پیش‌فرض: `http://localhost:3000`)
- برای تنظیمات پیشرفته، فایل `src/config/socket.config.ts` را ویرایش کنید

---

## اسکریپت‌ها

- `npm run dev` — اجرای سرور توسعه Vite
- `npm run build` — تایپ‌چک و ساخت برای تولید
- `npm run preview` — پیش‌نمایش نسخه تولیدی
- `npm run lint` — اجرای ESLint

---

## رویدادهای سوکت

کلاینت از این رویدادها استفاده می‌کند (در `src/config/socket.config.ts` و مستندات سرور):

- `register` — `{ userName, name }`
- `checkUser` — `{ userName }`
- `getConversations` — `{ userName }`
- `getMessages` — `{ from, to }`
- `sendMessage` — `{ from, to, text }`

---

## ساختار پروژه

- `src/components/` — کامپوننت‌های UI (چت، لایه‌ها، رابط کاربری)
- `src/config/` — تنظیمات Socket.IO
- `src/context/` — کانتکست Socket
- `src/pages/` — صفحات
- `src/routes/` — مسیرها
- `src/types/` — تایپ‌ها

---

## لایسنس

ISC © 2025 — [مشاهده لایسنس](../server-socket/package.json)

---

## تقدیر و تشکر

- [shadcn/ui](https://ui.shadcn.com/) برای اجزای رابط کاربری
- [Socket.IO](https://socket.io/)

---

## کلمات کلیدی سئو

socket io chat, react chat, realtime chat, typescript, vite, persian, farsi, سوکت آی او، چت آنلاین، ری‌اکت
