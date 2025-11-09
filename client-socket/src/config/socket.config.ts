import type { ManagerOptions, SocketOptions } from "socket.io-client";

export type SocketConfig = {
  url: string;
  options: Partial<ManagerOptions & SocketOptions>;
  ackTimeoutMs?: number; // default timeout for acks
};

// Central socket configuration for the app
export const SOCKET_CONFIG: SocketConfig = {
  url: import.meta.env.VITE_SERVER_URL || "http://localhost:3000",
  options: {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: true,
  },
  ackTimeoutMs: 8000,
};

// Event names used by the client <-> server
export const SOCKET_EVENTS = {
  register: "register",
  getConversations: "getConversations",
  getMessages: "getMessages",
  sendMessage: "sendMessage",
  checkUser: "checkUser",
} as const;

export type SocketEventName = keyof typeof SOCKET_EVENTS;
