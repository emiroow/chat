# Socket.IO Chat Server — Node.js + Express

سرور چت Socket.IO — نود.جی‌اس + اکسپرس

Simple real-time chat backend with in-memory storage. Pairs with `client-socket` (Socket.IO client). Default port is `3000`.

یک بک‌اند ساده برای چت لحظه‌ای با ذخیره‌سازی در حافظه. برای کار با کلاینت `client-socket` طراحی شده است. پورت پیش‌فرض `3000` است.

## Run / اجرا

```bash
npm install
npm run dev
```

Server will listen at `http://localhost:3000` unless `PORT` is set.

## HTTP endpoints / اندپوینت‌های HTTP

- `GET /` → `{ ok: true, service: "chat-server" }`

## Socket events / رویدادهای سوکت

Incoming from client:

- `register` — `{ userName, name }` → joins personal room; ack: `{ success, user }`
- `checkUser` — `{ userName }` → ack: `{ success, exists, user? }`
- `getConversations` — `{ userName }` → ack: `[{ userName, lastMessage? }]`
- `getMessages` — `{ from, to }` → ack: `{ messages: [...], user }`
- `sendMessage` — `{ from, to, text }` → ack: `{ success, message }`

Emitted by server:

- `users` — broadcast updated users list
- `message` — to both participants when a message is sent
- `conversations` — to both participants after new message

نمونه‌ها:

```json
// register
{ "userName": "emiroow", "name": "Emiroow" }

// sendMessage
{ "from": "emiroow", "to": "amir", "text": "Hello" }
```

## Data model / مدل داده

- Users: `{ userName, name, socketIds[], connectedAt }`
- Conversations: `id = sort(a,b).join("__")`, messages: `{ from, to, text, ts }`

Implemented in `store.js`.

## Environment / تنظیمات محیطی

- `PORT` — default `3000`

## SEO keywords / کلمات کلیدی

socket io chat server, nodejs chat backend, express socket.io, realtime messaging, persian, farsi, سرور چت، سوکت آی او، نود جی اس
