import * as signalR from "@microsoft/signalr";
import { SIGNALR_CONFIG } from "../config/signalR.config";
import type {
  conversation,
  ICheckUserResponse,
  IMessagesResponse,
  IRegisterResponse,
  ISendMessageResponse,
} from "../types";

let connection: signalR.HubConnection | null = null;

// establish and return SignalR connection
export const connectSignalR = async (): Promise<signalR.HubConnection> => {
  if (connection && connection.state === signalR.HubConnectionState.Connected)
    return connection;

  connection = new signalR.HubConnectionBuilder()
    .withUrl(SIGNALR_CONFIG.url, {
      withCredentials: false,
    })
    // Explicit reconnect intervals: immediate, 2s, 10s, 30s
    .withAutomaticReconnect([0, 2000, 10000, 30000])
    .configureLogging(signalR.LogLevel.Information)
    .build();

  connection.onreconnecting((error) =>
    console.warn("🔁 SignalR reconnecting...", error)
  );

  connection.onreconnected((connectionId) =>
    console.log("✅ SignalR reconnected", connectionId)
  );

  connection.onclose((error) =>
    console.warn("❌ SignalR connection closed", error)
  );

  try {
    await connection.start();
    console.log("✅ SignalR connected");
  } catch (err) {
    console.error("❌ SignalR connection failed:", err);
    // keep connection as null so future calls can retry
    connection = null;
    throw err;
  }

  return connection;
};

// ✅ Helpers
export const invoke = async <T = any>(
  method: string,
  ...args: any[]
): Promise<T> => {
  if (!connection || connection.state !== signalR.HubConnectionState.Connected)
    throw new Error("SignalR not connected");
  return connection.invoke<T>(method, ...args);
};

export const onHubEvent = (
  event: string,
  handler: (...args: any[]) => void
): void => {
  if (!connection) throw new Error("SignalR not connected");
  connection.on(event, handler);
};

export const offHubEvent = (
  event: string,
  handler: (...args: any[]) => void
) => {
  connection?.off(event, handler);
};

// ✅ Optional helper for cleanup or reconnect
export const stopConnection = async () => {
  if (connection) {
    await connection.stop();
    connection = null;
  }
};

// ✅ hub API abstraction for clarity
export const hubApi = {
  Register: (userName: string, name: string) =>
    invoke<IRegisterResponse>("Register", userName, name),
  CheckUser: (userName: string) =>
    invoke<ICheckUserResponse>("CheckUser", userName),
  GetConversations: (userName: string) =>
    invoke<conversation[]>("GetConversations", userName),
  GetMessages: (from: string, to: string) =>
    invoke<IMessagesResponse>("GetMessages", from, to),
  SendMessage: (from: string, to: string, text: string) =>
    invoke<ISendMessageResponse>("SendMessage", from, to, text),
};
