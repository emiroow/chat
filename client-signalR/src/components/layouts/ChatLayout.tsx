import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSignalR } from "../../context/signalRContext";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { hubApi } from "../../lib/signalR";
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const { chatId } = useParams<{ chatId: string }>();
  const { connected, onHubEvent, offHubEvent, signalRConnection } =
    useSignalR();
  const userId = localStorage.getItem("userId") || "";

  const getMessages = async (id: string) => {
    if (!userId && !id) return;
    hubApi.GetMessages(userId, id).then((res) => {
      console.log("✅ Fetched messages:", res);
      setMessages(res.messages);
      setUser(res.user);
    });
  };

  useEffect(() => {
    if (connected) getMessages(chatId || "");
  }, [chatId, hubApi, connected]);

  // Listen for real-time messages
  useEffect(() => {
    if (!connected) return;
    const handleNewMessage = (message: Message) => {
      // Only add message if it's for the current chat
      if (
        chatId &&
        ((message.from === chatId && message.to === userId) ||
          (message.from === userId && message.to === chatId))
      ) {
        setMessages((prev) => [...prev, message]);
      }
    };

    onHubEvent("message", handleNewMessage);

    return () => {
      offHubEvent("message", handleNewMessage);
    };
  }, [signalRConnection, connected, chatId, userId, onHubEvent, offHubEvent]);

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
        <Sidebar />
      </div>

      <div className={"chat-wallpaper flex min-w-0 flex-1 flex-col"}>
        <ChatHeader
          name={user?.name || "Loading..."}
          onOpenSidebar={() => navigate("/")}
          onOpenProfile={() => setProfileOpen((v) => !v)}
        />
        <MessageList
          messages={messages}
          currentUserId={userId}
          peerName={user?.name}
        />
        <MessageInput />
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
                handle={user?.userName || "loading"}
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
                  handle={user?.userName || "loading"}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
