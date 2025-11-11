import * as signalR from "@microsoft/signalr";
import { toast } from "../components/ui/toast";
import { SIGNALR_CONFIG } from "../config/signalR.config";
import type {
  conversation,
  ICheckUserResponse,
  IMessagesResponse,
  IRegisterResponse,
  ISendMessageResponse,
} from "../types";

let connection: signalR.HubConnection | null = null;
let startingPromise: Promise<signalR.HubConnection> | null = null;

// establish and return SignalR connection
export const connectSignalR = async (): Promise<signalR.HubConnection> => {
  // If we're already connected, return the connection
  if (connection && connection.state === signalR.HubConnectionState.Connected) {
    console.debug(
      "connectSignalR: already connected, returning existing connection"
    );
    return connection;
  }

  // If a start is already in progress, reuse that promise to avoid creating
  // multiple concurrent connections (this is the root cause of double connections
  // when React Strict Mode or fast reloads call connect twice).
  if (startingPromise) {
    console.debug(
      "connectSignalR: connection start in progress, awaiting existing promise"
    );
    return startingPromise;
  }

  startingPromise = (async () => {
    // If no connection object exists (or it's explicitly disconnected), build a new one
    if (
      !connection ||
      connection.state === signalR.HubConnectionState.Disconnected
    ) {
      console.debug("connectSignalR: building new HubConnection");
      connection = new signalR.HubConnectionBuilder()
        .withUrl(SIGNALR_CONFIG.url, {
          withCredentials: false,
        })
        // Explicit reconnect intervals: immediate, 2s, 10s, 30s
        .withAutomaticReconnect([0, 2000, 10000, 30000])
        .configureLogging(signalR.LogLevel.Information)
        .build();

      // Register default handlers for common server invocations

      try {
        connection.on("connected", (...args: any[]) => {
          // lightweight log for debugging; don't throw or change app state here
          console.debug("SignalR: server invoked 'connected'", ...args);
        });
      } catch (e) {
        // Silently ignore if `.on` isn't available for some reason
        console.warn("Could not register 'connected' handler:", e);
      }

      try {
        connection.on("message", (...args: any[]) => {
          // lightweight log for debugging; don't throw or change app state here
          console.debug("SignalR: server invoked 'message'", ...args);
        });
      } catch (e) {
        // Silently ignore if `.on` isn't available for some reason
        console.warn("Could not register 'message' handler:", e);
      }

      try {
        connection.on("users", (...args: any[]) => {
          // The server may send an array or object describing users; log for now.
          console.debug("SignalR: server invoked 'users'", ...args);
        });
      } catch (e) {
        console.warn("Could not register 'users' handler:", e);
      }

      // --------------------------------------------------------------------------------------
      // Manage a single persistent reconnect toast so the UI doesn't spam notifications
      let reconnectToastId: number | null = null;
      // Handle reconnecting event
      connection.onreconnecting((error) => {
        console.warn("🔁 SignalR reconnecting...", error);
        try {
          if (reconnectToastId == null) {
            // show a long-lived info toast until reconnect/close
            reconnectToastId = toast.info("Reconnecting to server...", 60000);
          }
        } catch (e) {
          // swallow if toast cannot be shown for any reason
          console.warn("toast unavailable:", e);
        }
      });

      // Handle successful reconnection
      connection.onreconnected((connectionId) => {
        console.log("✅ SignalR reconnected", connectionId);
        try {
          if (reconnectToastId != null) {
            toast.dismiss(reconnectToastId);
            reconnectToastId = null;
          }
          toast.success("Reconnected to server");
        } catch (e) {
          console.warn("toast unavailable:", e);
        }
      });

      // Handle closed connection
      connection.onclose((error) => {
        console.warn("❌ SignalR connection closed", error);
        try {
          if (reconnectToastId != null) {
            toast.dismiss(reconnectToastId);
            reconnectToastId = null;
          }
          const msg = error?.message
            ? `Connection closed: ${error.message}`
            : "Connection to server was closed. Check your network.";
          toast.error(msg, 8000);
        } catch (e) {
          console.warn("toast unavailable:", e);
        }
      });
    } else {
      console.debug(
        "connectSignalR: reusing existing connection object, state=",
        connection.state
      );
    }

    try {
      console.debug("connectSignalR: starting connection...");
      await connection.start();
      console.log("✅ SignalR connected");
      return connection as signalR.HubConnection;
    } catch (err) {
      console.error("❌ SignalR connection failed:", err);
      try {
        // show user-visible error when initial connection fails
        const msg = (err as Error)?.message
          ? `Unable to connect to server: ${(err as Error).message}`
          : "Unable to connect to server. Check your network.";
        toast.error(msg, 8000);
      } catch (e) {
        console.warn("toast unavailable:", e);
      }
      // keep connection as null so future calls can retry
      connection = null;
      throw err;
    } finally {
      // allow subsequent attempts to create a new startingPromise
      startingPromise = null;
    }
  })();

  return startingPromise;
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
