import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/socketContext";
import { useCanHover } from "../../hooks/useCanHover";
import { cn } from "../../lib/cn";
import type { Conversation } from "../../types";
import { IconPlus, IconSearch, IconX } from "../icons";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { ThemeToggle } from "../ui/theme-toggle";
import { toast } from "../ui/toast";

export const Sidebar: React.FC<{
  onSelect: (userName: string) => void;
}> = ({ onSelect }) => {
  const canHover = useCanHover();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { api, socket } = useSocket();
  // Persisted identifiers: userId is the unique username used by the server; userName is the display name.
  const userId: string = localStorage.getItem("userId") || "";
  const displayName: string = localStorage.getItem("userName") || userId;
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Get conversations on mount
  useEffect(() => {
    if (!userId) return;

    api.getConversations(userId).then((res) => {
      console.log("Initial conversations:", res);
      setConversations(res);
    });
  }, [userId, api]);

  // Listen realtime for conversations update
  useEffect(() => {
    if (!socket) return;

    const handleConversations = (data: Conversation[]) => {
      console.log("Received conversations:", data);
      setConversations(data);
    };

    socket.on("conversations", handleConversations);

    return () => {
      socket.off("conversations", handleConversations);
    };
  }, [socket]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((conv) =>
    conv.userName.toLowerCase().includes(query.toLowerCase())
  );

  // Helper to format timestamp
  const formatTime = (ts: number): string => {
    const date = new Date(ts);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const [openCreate, setOpenCreate] = useState(false);
  const [newId, setNewId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const target = newId.trim();
    if (!target) return;
    api.checkUser(target).then((res) => {
      if (res.exists) {
        setSubmitting(true);
        // Optimistically navigate; server will lazy-create conversation on first message.
        navigate(`/${target}`);
        setSubmitting(false);
        setOpenCreate(false);
        setNewId("");
      } else {
        toast.error("User does not exist.", 1000);
      }
    });
  };

  return (
    <div className="flex h-full w-full md:w-80 flex-col md:border-r border-(--border) bg-(--sidebar)">
      <div className="p-3">
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-2 flex items-center text-neutral-400">
            <IconSearch className="size-4" />
          </span>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="bg-(--panel) border-(--border) text-(--text) placeholder:text-neutral-400 pl-8 pr-8"
          />
          {query ? (
            <button
              aria-label="Clear search"
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-neutral-400",
                canHover && "hover:bg-(--muted)"
              )}
              onClick={() => setQuery("")}
            >
              <IconX className="size-4" />
            </button>
          ) : null}
          {!query && (
            <button
              aria-label="New chat"
              onClick={() => setOpenCreate(true)}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-neutral-400",
                canHover && "hover:bg-(--muted)"
              )}
            >
              <IconPlus className="size-4" />
            </button>
          )}
        </div>
      </div>
      <ScrollArea variant="hidden" className="flex-1">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center opacity-50">
            <p className="text-sm">
              {query ? "No conversations found" : "No conversations yet"}
            </p>
            <p className="text-xs mt-1">
              {!query && "Start chatting with someone!"}
            </p>
          </div>
        ) : (
          <ul className="px-2 flex flex-col gap-1 py-2">
            {filteredConversations.map((conv, idx) => (
              <li key={conv.userName}>
                <motion.button
                  onClick={() => onSelect(conv.userName)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors",
                    canHover && "hover:bg-(--muted)"
                  )}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={canHover ? { scale: 1.01 } : undefined}
                  transition={{
                    delay: Math.min(idx * 0.015, 0.15),
                    duration: 0.2,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Avatar
                    size="sm"
                    src={undefined}
                    fallback={conv.userName[0]?.toUpperCase() || "?"}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-medium">
                        {conv.userName}
                      </span>
                      {conv.lastMessage && (
                        <span className="text-xs opacity-50">
                          {formatTime(conv.lastMessage.ts)}
                        </span>
                      )}
                    </div>
                    <div className="truncate text-xs opacity-70">
                      {conv.lastMessage
                        ? conv.lastMessage.text
                        : "No messages yet"}
                    </div>
                  </div>
                </motion.button>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>

      <div className="border-t border-(--border) p-3">
        <div className="flex items-center gap-3">
          <Avatar size="sm" fallback={displayName[0]?.toUpperCase() || "ME"} />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">
              {displayName || "You"}
            </div>
            <div className="truncate text-xs opacity-70">
              {userId || "Guest"}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Logout"
              className="h-8 w-8 text-red-500 hover:bg-red-500/10"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Create chat modal */}
      <AnimatePresence>
        {openCreate && (
          <motion.div
            key="create-chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setOpenCreate(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 12, opacity: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-xl border border-(--border) bg-(--panel) shadow-xl backdrop-blur-sm"
            >
              <form onSubmit={handleCreate} className="flex flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-base font-semibold">
                      Start a new chat
                    </h2>
                    <p className="mt-1 text-xs opacity-70">
                      Enter the recipient's username.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenCreate(false)}
                    className={cn(
                      "rounded p-1 text-neutral-400",
                      canHover && "hover:bg-(--muted)"
                    )}
                    aria-label="Close"
                  >
                    <IconX className="size-4" />
                  </button>
                </div>
                <Input
                  autoFocus
                  placeholder="e.g. ali_reza"
                  value={newId}
                  onChange={(e) => setNewId(e.target.value)}
                  className="bg-(--panel) border-(--border)"
                  disabled={submitting}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenCreate(false)}
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={!newId.trim() || submitting}>
                    {submitting ? "Redirecting..." : "Start"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
