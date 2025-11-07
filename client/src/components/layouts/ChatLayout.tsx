import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../../context/socketContext";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import type { Message, User } from "../../types";
import { ChatHeader } from "../chat/ChatHeader";
import { MessageInput } from "../chat/MessageInput";
import { MessageList } from "../chat/MessageList";
import { ProfilePanel } from "../chat/ProfilePanel";
import { Sidebar } from "../chat/Sidebar";
import { IconX } from "../icons";
import { Button } from "../ui/button";

export const ChatLayout: React.FC = () => {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const [profileOpen, setProfileOpen] = useState(false);
  const { socket, api } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const { chatId: to } = useParams();
  // Use unified key `userId` (same as server's userName) for consistency.
  // We rely on auto-register in SocketProvider; here we just read it.
  const from = localStorage.getItem("userId") || "";
  const [user, setUser] = useState<User | null>();

  // Fetch messages and user info
  useEffect(() => {
    if (!from || !to || !socket) return;
    api.getMessages(from, to).then((res) => {
      console.log("Initial messages:", res);
      console.log(res);
      setMessages(res.messages);
      setUser(res.user);
    });
  }, [from, to, socket, api]);

  // Listen realtime for new messages
  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = (message: Message) => {
      // Only add messages relevant to this conversation
      if (
        (message.from === from && message.to === to) ||
        (message.from === to && message.to === from)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    };
    socket.on("message", handleNewMessage);
    return () => {
      socket.off("message", handleNewMessage);
    };
  }, [socket, from, to]);

  const sendMessage = (text: string) => {
    if (!from || !to || !socket) return;
    api.sendMessage(from, to, text).then((res) => {
      if (!res?.success) {
        console.warn("Send failed", res);
      }
    });
  };

  // Open profile panel on desktop, close on mobile
  useEffect(() => {
    if (isDesktop) {
      setProfileOpen(true);
    } else {
      setProfileOpen(false);
    }
  }, [isDesktop]);

  return (
    <div className="relative flex h-dvh w-full bg-(--bg) text-(--text)">
      <div className="hidden md:block">
        <Sidebar onSelect={(id) => navigate(`/${id}`)} />
      </div>

      <div className={"chat-wallpaper flex min-w-0 flex-1 flex-col"}>
        <ChatHeader
          name={user?.name || "Loading..."}
          subtitle=""
          onOpenSidebar={() => navigate("/")}
          onOpenProfile={() => setProfileOpen((v) => !v)}
        />
        <MessageList messages={messages} />
        <MessageInput onSend={sendMessage} />
      </div>

      {profileOpen ? (
        <div className="hidden md:block w-80 shrink-0" aria-hidden />
      ) : null}

      <AnimatePresence>
        {profileOpen && (
          <motion.aside
            initial={{ x: 96, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 96, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute right-0 top-0 z-20 hidden h-full w-80 md:block"
          >
            <div className="relative h-full">
              <ProfilePanel
                name={user?.name || "Loading..."}
                handle={user?.userName || "Loading..."}
              />
              <div className="absolute right-2 top-2">
                <Button
                  variant="secondary"
                  size="icon"
                  aria-label="Close profile"
                  onClick={() => setProfileOpen(false)}
                >
                  <IconX className="size-5" />
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {profileOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setProfileOpen(false)}
            />
            <motion.div
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 32, opacity: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
              className="absolute inset-0 bg-(--panel)"
            >
              <div className="absolute right-2 top-2 z-10">
                <Button
                  variant="secondary"
                  size="icon"
                  aria-label="Close profile"
                  onClick={() => setProfileOpen(false)}
                  className="h-10 w-10"
                >
                  <IconX className="size-5" />
                </Button>
              </div>
              <div className="h-full overflow-y-auto">
                <ProfilePanel
                  name={user?.name || "Loading..."}
                  handle={user?.userName || "Loading..."}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
