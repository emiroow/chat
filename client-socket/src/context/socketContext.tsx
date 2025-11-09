import React, { createContext, useContext, useEffect, useState } from "react";
import { socket, socketApi } from "../lib/socket";

type SocketContextType = {
  socket: typeof socket;
  api: typeof socketApi;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect the socket when provider mounts
    socket.connect();

    // Proactively (re)register on mount; socket.io will buffer emits until connected
    (async () => {
      const storedId = localStorage.getItem("userId");
      const storedName = localStorage.getItem("userName") || storedId || "";
      if (storedId) {
        try {
          await socketApi.register(storedId, storedName);
        } catch (e) {
          console.warn("Initial auto-register queued/failed:", e);
        }
      }
    })();

    socket.on("connect", async () => {
      console.log("connected !");
      setIsConnected(true);

      // Auto re-register user on each (re)connect so the server joins us to our room
      // This ensures we receive realtime events like `message` and `conversations`.
      const storedId = localStorage.getItem("userId");
      const storedName = localStorage.getItem("userName") || storedId || "";
      if (storedId) {
        try {
          await socketApi.register(storedId, storedName);
          // Optionally you could refetch initial conversations elsewhere
          // but most views already fetch on mount.
        } catch (e) {
          // Swallow errors silently; UI can still function with manual fetches
          console.error("Auto-register failed:", e);
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("disconnected !");
      setIsConnected(false);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, api: socketApi, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("useSocket must be used inside SocketProvider");
  return ctx;
};
