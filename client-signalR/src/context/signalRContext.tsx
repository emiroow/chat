// src/context/SignalRContext.tsx
import * as signalR from "@microsoft/signalr";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  connectSignalR,
  hubApi,
  invoke,
  offHubEvent,
  onHubEvent,
} from "../lib/signalR";

interface SignalRContextValue {
  connected: boolean;
  invoke: <T = any>(method: string, ...args: any[]) => Promise<T>;
  onHubEvent: (eventName: string, handler: (...args: any[]) => void) => void;
  offHubEvent: (eventName: string, handler: (...args: any[]) => void) => void;
  signalRConnection: signalR.HubConnection | null;
}

const SignalRContext = createContext<SignalRContextValue | null>(null);

export const SignalRProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [connected, setConnected] = useState(false);
  const [signalRConnection, setSignalRConnection] =
    useState<signalR.HubConnection | null>(null);

  useEffect(() => {
    let mount = true;

    const init = async () => {
      try {
        const connection = await connectSignalR();
        if (!mount) return;
        setSignalRConnection(connection);
        setConnected(true);

        // Keep `connected` state in sync with connection lifecycle.
        // When the connection reconnects / reconnecting / closes we reflect that
        // in the context so consumers can react (e.g. disabling UI while reconnecting).
        const handleReconnecting = () => {
          if (!mount) return;
          setConnected(false);
        };

        const handleReconnected = () => {
          if (!mount) return;
          setConnected(true);
        };

        const handleClose = () => {
          if (!mount) return;
          setConnected(false);
        };

        try {
          connection.onreconnecting(handleReconnecting);
          connection.onreconnected(handleReconnected);
          connection.onclose(handleClose);
        } catch (e) {
          // Older/alternate SignalR builds won't throw here, but guard anyway.
          console.warn(
            "Could not attach lifecycle handlers to SignalR connection",
            e
          );
        }

        // Auto-register if user info is in localStorage
        const userId = localStorage.getItem("userId");
        const userName = localStorage.getItem("userName");
        if (userId && userName) {
          // Backend expects Register(username, name)
          // We use userId as the stable username and userName as display name
          await hubApi.Register(userId, userName).then((res) => {
            console.log("✅ Auto registered:", res.user.name);
          });
        }
      } catch (err) {
        console.error("Failed to connect to SignalR:", err);
        setConnected(false);
      }
    };

    init();

    return () => {
      mount = false;
    };
  }, []);

  return (
    <SignalRContext.Provider
      value={{
        connected,
        signalRConnection,
        invoke,
        onHubEvent,
        offHubEvent,
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = (): SignalRContextValue => {
  const ctx = useContext(SignalRContext);
  if (!ctx) throw new Error("useSignalR must be used inside SignalRProvider");
  return ctx;
};
