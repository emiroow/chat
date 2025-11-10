# سرور چت (Socket.IO)

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-black?logo=express)](https://expressjs.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-black?logo=socket.io)](https://socket.io/)

---

> **فارسی · [English](./README.md)**

---

## معرفی

یک بک‌اند ساده و آماده برای چت لحظه‌ای با Node.js، Express و Socket.IO. مناسب برای اتصال با کلاینت [client-socket](../client-socket). داده‌ها فقط در حافظه ذخیره می‌شوند (دمو). پورت پیش‌فرض: `3000`.

---

## قابلیت‌ها

- پیام‌رسانی لحظه‌ای با Socket.IO
- ذخیره‌سازی در حافظه برای کاربران، گفتگوها و پیام‌ها
- اندپوینت ساده REST برای بررسی سلامت سرور
- راه‌اندازی و استقرار آسان

---

## تکنولوژی‌ها

- **بک‌اند:** Node.js 18+، Express 4، Socket.IO 4
- **داده:** اشیای جاوااسکریپت در حافظه (store.js)

---

## شروع سریع

### پیش‌نیازها

- Node.js 18+
- npm (یا pnpm/yarn)

### ۱. نصب و اجرا

```bash
cd server-socket
npm install
npm run dev
```

سرور روی [http://localhost:3000](http://localhost:3000) اجرا می‌شود مگر اینکه PORT را تغییر دهید.

---

## اندپوینت‌های HTTP

- `GET /` → `{ ok: true, service: "chat-server" }`

---

## رویدادهای سوکت

### ورودی از کلاینت

- `register` — `{ userName, name }` → عضویت در روم شخصی؛ ack: `{ success, user }`
- `checkUser` — `{ userName }` → ack: `{ success, exists, user? }`
- `getConversations` — `{ userName }` → ack: `[{ userName, lastMessage? }]`
- `getMessages` — `{ from, to }` → ack: `{ messages: [...], user }`
- `sendMessage` — `{ from, to, text }` → ack: `{ success, message }`

### خروجی از سرور

- `users` — ارسال لیست کاربران به‌روزشده
- `message` — ارسال پیام به هر دو طرف
- `conversations` — ارسال لیست گفتگوها پس از پیام جدید

#### نمونه داده‌ها

```json
// register
{ "userName": "emiroow", "name": "Emiroow" }

// sendMessage
{ "from": "emiroow", "to": "amir", "text": "Hello" }
```

---

## مدل داده

- کاربران: `{ userName, name, socketIds[], connectedAt }`
- گفتگوها: `id = sort(a,b).join("__")`، پیام‌ها: `{ from, to, text, ts }`

در [`store.js`](./store.js) پیاده‌سازی شده است.

---

## متغیرهای محیطی

- `PORT` — پیش‌فرض: `3000`

---

## لایسنس

ISC © 2025 — [مشاهده لایسنس](./package.json)

---

## کلمات کلیدی سئو

socket io chat server, nodejs chat backend, express socket.io, realtime messaging, persian, farsi, سرور چت، سوکت آی او، نود جی اس
