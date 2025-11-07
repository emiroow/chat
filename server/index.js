const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const store = require("./store");

const PORT = process.env.PORT || 3000;

// Initialize demo data
// store.initDemoData();

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.get("/", (_req, res) => res.json({ ok: true, service: "chat-server" }));
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🟢 New connection:", socket.id);

  // 🧩 Register/Login
  socket.on("register", ({ userName, name }, cb) => {
    const user = store.addUser(userName, name, socket.id);
    socket.join(userName); // join personal room

    io.emit("users", store.listUsers()); // notify all users
    cb?.({ success: true, user });

    console.log(`✅ Registered: ${userName} (${name})`);
  });

  // 🧩 Check if user exists (Socket)
  socket.on("checkUser", ({ userName }, cb) => {
    if (!userName) return cb?.({ success: false, error: "userName required" });
    const user = store.getUser(userName);
    cb?.({
      success: true,
      exists: !!user,
      user: user
        ? {
            userName: user.userName,
            name: user.name,
            connectedAt: user.connectedAt,
          }
        : null,
    });
  });

  // 🧩 Get Conversations
  socket.on("getConversations", ({ userName }, cb) => {
    const convs = store.listConversations(userName);
    cb?.(convs);
  });

  // 🧩 Get Messages
  socket.on("getMessages", async ({ from, to }, cb) => {
    const conv = store.getConv(from, to);
    const user = await store.getUser(to);
    cb?.({ messages: conv.messages, user });
  });

  // 🧩 Send Message
  socket.on("sendMessage", ({ from, to, text }, cb) => {
    if (!from || !to || !text) return cb?.({ success: false });

    const msg = store.addMessage(from, to, text);

    // ارسال برای هر دو کاربر از طریق روم مخصوص
    io.to(from).emit("message", msg);
    io.to(to).emit("message", msg);

    // بروزرسانی لیست چت‌ها برای هر دو
    io.to(from).emit("conversations", store.listConversations(from));
    io.to(to).emit("conversations", store.listConversations(to));

    cb?.({ success: true, message: msg });
  });

  // 🧩 Disconnect
  socket.on("disconnect", () => {
    store.removeSocket(socket.id);
    io.emit("users", store.listUsers());
    console.log("🔴 Disconnected:", socket.id);
  });
});

server.listen(PORT, () =>
  console.log(`🚀 Chat server running on http://localhost:${PORT}`)
);
