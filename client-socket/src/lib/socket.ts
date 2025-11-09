import { io, Socket } from "socket.io-client";
import { SOCKET_CONFIG, SOCKET_EVENTS } from "../config/socket.config";
import type {
  ClientToServerEvents,
  GetConversationsResponse,
  GetMessagesResponse,
  RegisterUserResponse,
  SendMessageResponse,
  ServerToClientEvents,
} from "../types";

// Create typed socket instance
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  SOCKET_CONFIG.url,
  SOCKET_CONFIG.options
);

// Typed API wrapper for socket events
export const socketApi = {
  register: (userName: string, name: string): Promise<RegisterUserResponse> =>
    new Promise((resolve) => {
      socket.emit(SOCKET_EVENTS.register, { userName, name }, resolve);
    }),

  getConversations: (userName: string): Promise<GetConversationsResponse> =>
    new Promise((resolve) => {
      socket.emit(SOCKET_EVENTS.getConversations, { userName }, resolve);
    }),

  getMessages: (from: string, to: string): Promise<GetMessagesResponse> =>
    new Promise((resolve) => {
      socket.emit(SOCKET_EVENTS.getMessages, { from, to }, resolve);
    }),

  checkUser: (userName: string): Promise<any> =>
    new Promise((resolve) => {
      socket.emit(SOCKET_EVENTS.checkUser, { userName }, resolve);
    }),
  sendMessage: (
    from: string,
    to: string,
    text: string
  ): Promise<SendMessageResponse> =>
    new Promise((resolve) => {
      socket.emit(SOCKET_EVENTS.sendMessage, { from, to, text }, resolve);
    }),
};
