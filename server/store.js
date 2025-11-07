// store.js
const store = {
  users: [], // { userName, name, socketIds:[], connectedAt }
  conv: new Map(), // convId -> { id, users:[a,b], messages:[{from,to,text,ts}] }

  convId(a, b) {
    const [x, y] = [String(a), String(b)].sort();
    return `${x}__${y}`;
  },

  getUser(userName) {
    return this.users.find((u) => u.userName === userName);
  },

  addUser(userName, name, socketId) {
    let user = this.getUser(userName);
    if (!user) {
      user = {
        userName,
        name,
        socketIds: [socketId],
        connectedAt: Date.now(),
      };
      this.users.push(user);
    } else {
      if (!user.socketIds.includes(socketId)) {
        user.socketIds.push(socketId);
      }
      user.connectedAt = Date.now();
    }
    return user;
  },

  removeSocket(socketId) {
    for (const user of this.users) {
      user.socketIds = user.socketIds.filter((id) => id !== socketId);
    }
    this.users = this.users.filter((u) => u.socketIds.length > 0);
  },

  listUsers() {
    return this.users.map((u) => ({
      userName: u.userName,
      name: u.name,
      connectedAt: u.connectedAt,
    }));
  },

  getConv(a, b) {
    const id = this.convId(a, b);
    if (!this.conv.has(id))
      this.conv.set(id, { id, users: [a, b], messages: [] });
    return this.conv.get(id);
  },

  addMessage(from, to, text) {
    const conv = this.getConv(from, to);
    const msg = { from, to, text, ts: Date.now() };
    conv.messages.push(msg);
    return msg;
  },

  listConversations(userName) {
    const convs = [];
    for (const conv of this.conv.values()) {
      if (conv.users.includes(userName)) {
        const other = conv.users.find((u) => u !== userName);
        convs.push({
          userName: other,
          lastMessage: conv.messages.at(-1) || null,
        });
      }
    }
    return convs;
  },

  // Initialize demo data
  initDemoData() {
    // Add demo users
    this.addUser("emiroow", "Emiroow", "socket-emiroow-1");
    this.addUser("amir", "Amir", "socket-amir-1");

    // Add demo messages between emiroow and amir
    const messages = [
      {
        from: "emiroow",
        to: "amir",
        text: "Hey Amir! How are you doing?",
        delay: 0,
      },
      {
        from: "amir",
        to: "emiroow",
        text: "Hi Emiroow! I'm doing great, thanks for asking!",
        delay: 1000,
      },
      {
        from: "emiroow",
        to: "amir",
        text: "That's awesome! Did you finish the project we were working on?",
        delay: 2000,
      },
      {
        from: "amir",
        to: "emiroow",
        text: "Yes! I just pushed the final changes to the repository.",
        delay: 3000,
      },
      {
        from: "emiroow",
        to: "amir",
        text: "Perfect! I'll review it this afternoon.",
        delay: 4000,
      },
      {
        from: "amir",
        to: "emiroow",
        text: "Sounds good. Let me know if you need any clarification.",
        delay: 5000,
      },
      {
        from: "emiroow",
        to: "amir",
        text: "Will do! By the way, are you free for a call tomorrow?",
        delay: 6000,
      },
      {
        from: "amir",
        to: "emiroow",
        text: "Sure! What time works for you?",
        delay: 7000,
      },
      { from: "emiroow", to: "amir", text: "How about 2 PM?", delay: 8000 },
      {
        from: "amir",
        to: "emiroow",
        text: "2 PM works perfectly for me. See you then!",
        delay: 9000,
      },
      {
        from: "emiroow",
        to: "amir",
        text: "Great! Talk to you tomorrow 👍",
        delay: 10000,
      },
    ];

    // Add messages with timestamps
    const baseTime = Date.now() - 86400000; // Start from 1 day ago
    messages.forEach(({ from, to, text, delay }) => {
      const conv = this.getConv(from, to);
      const msg = { from, to, text, ts: baseTime + delay };
      conv.messages.push(msg);
    });

    console.log("Demo data initialized successfully!");
    console.log(`Users: ${this.users.length}`);
    console.log(`Conversations: ${this.conv.size}`);
  },
};

module.exports = store;
