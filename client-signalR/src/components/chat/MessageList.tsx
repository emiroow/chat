import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import type { Message } from "../../types";
import { ScrollArea } from "../ui/scroll-area";
import { MessageBubble } from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  peerName?: string;
}

// Helper to format time (e.g., "4:11 PM")
const formatTime = (date: Date): string => {
  const d = new Date(date);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// Helper to format date divider (e.g., "Sun, Nov 1")
const formatDate = (date: Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

// Group messages by date
const groupMessagesByDate = (messages: Message[]): Map<string, Message[]> => {
  const groups = new Map<string, Message[]>();

  messages.forEach((msg) => {
    const dateKey = new Date(msg.sentAt).toDateString();
    if (!groups.has(dateKey)) {
      groups.set(dateKey, []);
    }
    groups.get(dateKey)!.push(msg);
  });

  return groups;
};

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUserId,
  peerName,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const messageGroups = groupMessagesByDate(messages);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="mx-auto max-w-3xl flex h-full items-center justify-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No messages yet. Start the conversation!
          </p>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="flex-1 px-4 py-4">
      <div className="mx-auto max-w-3xl space-y-3">
        {Array.from(messageGroups.entries()).map(([dateKey, msgs]) => (
          <div key={dateKey} className="space-y-3">
            {/* Date divider */}
            <motion.div
              className="py-2 text-center text-xs opacity-70"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {formatDate(new Date(dateKey))}
            </motion.div>

            {/* Messages for this date */}
            {msgs.map((msg, i) => {
              const isMe = msg.from === currentUserId;
              const isFirstFromPeer = i === 0 || msgs[i - 1].from !== msg.from;

              return (
                <motion.div
                  key={msg.id.timestamp}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 32 }}
                >
                  <MessageBubble
                    author={isMe ? "me" : "them"}
                    content={msg.text}
                    time={formatTime(msg.sentAt)}
                    name={!isMe ? peerName : "Me"}
                    showAvatar={!isMe && isFirstFromPeer}
                  />
                </motion.div>
              );
            })}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
};
