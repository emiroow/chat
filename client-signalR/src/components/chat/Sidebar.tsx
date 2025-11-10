import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useSignalR } from "../../context/signalRContext";
import { useCanHover } from "../../hooks/useCanHover";
import { cn } from "../../lib/cn";
import { hubApi } from "../../lib/signalR";
import type { conversation } from "../../types";
import { IconPlus, IconSearch, IconX } from "../icons";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { ThemeToggle } from "../ui/theme-toggle";
import { toast } from "../ui/toast";

// Sample conversations for UI display only
export const Sidebar: React.FC = () => {
  const canHover = useCanHover();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const userId = localStorage.getItem("userId") || "";
  const userName = localStorage.getItem("userName") || "Me";
  const [conversations, setConversations] = useState<conversation[]>([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [newId, setNewId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { onHubEvent, offHubEvent, connected, signalRConnection } =
    useSignalR();
  const { chatId } = useParams<{ chatId: string }>();

  // get conversations when connected (and when userId available)
  const fetchConversations = async () => {
    if (!connected || !userId) return;
    try {
      const res = await hubApi.GetConversations(userId);
      // ensure dates are parsed if server returns ISO strings
      const parsed: conversation[] = (res || []).map((c: any) => ({
        peer: c.peer ?? c.name ?? c.id ?? "",
        lastFrom: c.lastFrom ?? c.lastFrom ?? "",
        lastText: c.lastText ?? c.lastMessage ?? "",
        lastAt: c.lastAt
          ? new Date(c.lastAt)
          : c.lastAt instanceof Date
          ? c.lastAt
          : new Date(),
        totalMessages:
          typeof c.totalMessages === "number"
            ? c.totalMessages
            : Number(c.totalMessages) || 0,
      }));
      setConversations(parsed);
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  };

  // initial fetch
  useEffect(() => {
    fetchConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, signalRConnection, userId]);

  // subscribe to hub events to refresh conversation list when updates arrive
  useEffect(() => {
    if (!connected) return;

    // re-fetch conversations on relevant events
    const refreshHandler = () => fetchConversations();

    // common event names - server may emit one of these when conversations change
    try {
      onHubEvent("conversations", refreshHandler);
    } catch (err) {
      console.log("Error subscribing to conversations event:", err);
    }
    try {
      onHubEvent("message", refreshHandler);
    } catch (err) {
      console.log("Error subscribing to message event:", err);
    }

    // cleanup subscriptions on unmount
    return () => {
      try {
        offHubEvent("conversations", refreshHandler);
      } catch (err) {
        console.log("Error unsubscribing from conversations event:", err);
      }

      try {
        offHubEvent("message", refreshHandler);
      } catch (err) {
        console.log("Error unsubscribing from message event:", err);
      }
    };
  }, [connected, signalRConnection, userId]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    hubApi
      .CheckUser(newId)
      .then((res) => {
        if (res.exists) {
          setNewId("");
          setOpenCreate(false);
          navigate(`/${newId}`);
        } else {
          toast.error("User not found !");
        }
      })
      .catch((err) => {
        console.error("Error checking user:", err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // compute filtered conversations once so we can show proper "no results" UI
  const filteredConversations = conversations.filter((c: any) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      String(c.peer || "")
        .toLowerCase()
        .includes(q) ||
      String(c.lastText || "")
        .toLowerCase()
        .includes(q)
    );
  });

  return (
    <div className="flex h-full w-full md:w-80 flex-col md:border-r border-(--border) bg-(--sidebar)">
      <div className="w-full p-3 flex justify-between items-center gap-3">
        <span className="text-xl font-bold text-center">
          {connected ? "Messenger" : "Connecting..."}
        </span>
        <div className="flex bg-muted/30 px-2 py-1 rounded-full items-center gap-2 text-sm border border-(--border)">
          <span className="text-xs font-medium">
            {connected ? "Connected" : "Disconnected"}
          </span>
          {connected ? (
            <div className="bg-green-600 w-2 h-2 rounded-full"></div>
          ) : (
            <div className="bg-red-600 w-2 h-2 rounded-full"></div>
          )}
        </div>
      </div>

      <div className="px-3">
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
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center opacity-50">
            <p className="text-sm">No conversations yet</p>
            <p className="text-xs mt-1">Start chatting with someone!</p>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center opacity-50">
            <p className="text-sm">No conversations found</p>
          </div>
        ) : (
          <ul className="px-2 flex flex-col gap-1 py-2">
            {filteredConversations.map((c: any, idx: number) => {
              const id = (c as any).id || c.peer;
              return (
                <NavLink to={`/${id}`} key={id || idx}>
                  <motion.button
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors",
                      canHover && "hover:bg-(--muted)",
                      c.peer === chatId
                        ? "bg-(--muted) font-medium"
                        : "font-normal"
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
                      fallback={String(c.peer || "?")[0] || "?"}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-medium">
                          {c.peer}
                        </span>
                        {typeof c.totalMessages === "number" &&
                        c.totalMessages > 0 ? (
                          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black dark:bg-(--primary) px-1 text-xs font-medium text-white">
                            {c.totalMessages}
                          </span>
                        ) : null}
                      </div>
                      <div className="truncate text-xs opacity-70">
                        {c.lastText}
                      </div>
                    </div>
                  </motion.button>
                </NavLink>
              );
            })}
          </ul>
        )}
      </ScrollArea>

      <div className="border-t border-(--border) p-3">
        <div className="flex items-center gap-3">
          <Avatar size="sm" fallback={userName[0]?.toUpperCase() || "ME"} />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{userName} (You)</div>
            <div className="truncate text-xs opacity-70">
              @{userId || "Guest"}
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
