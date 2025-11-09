import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import type { Message } from "../../types";
import { ScrollArea } from "../ui/scroll-area";
import { MessageBubble } from "./MessageBubble";

export const MessageList: React.FC<{ messages: Message[] }> = ({
  messages,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  // The sender id is the same value used when registering (userId / userName).
  const from = localStorage.getItem("userId") || "";
  const { chatId: to } = useParams();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Format timestamp to time string
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Override formatDate to use English locale
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
  };

  // Group messages by date
  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { date: string; messages: Message[] }[] = [];
    let currentDate = "";

    messages.forEach((msg) => {
      const msgDate = new Date(msg.ts).toDateString();
      if (msgDate !== currentDate) {
        currentDate = msgDate;
        groups.push({ date: formatDate(msg.ts), messages: [msg] });
      } else {
        groups[groups.length - 1].messages.push(msg);
      }
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  // Check if avatar should be shown (first message from other user in a consecutive group)
  const shouldShowAvatar = (
    index: number,
    currentMsg: Message,
    allMessages: Message[]
  ) => {
    if (currentMsg.from === from) return false; // Don't show avatar for own messages
    if (index === 0) return true; // Show avatar for first message

    const prevMsg = allMessages[index - 1];
    return prevMsg.from !== currentMsg.from; // Show avatar if sender changed
  };

  return (
    <ScrollArea className="flex-1" ref={scrollRef}>
      <div className="flex flex-col px-4 py-4 min-h-full">
        <div className="flex-1" />
        <div className="mx-auto w-full max-w-3xl space-y-4">
          {messageGroups.length === 0 ? (
            <div className="flex items-center justify-center h-full py-20">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Not send message yet
              </p>
            </div>
          ) : (
            messageGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-3">
                {/* Date divider */}
                <motion.div
                  className="sticky top-0 z-10 py-2 text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="inline-block rounded-full bg-neutral-200/80 dark:bg-neutral-800/80 px-3 py-1 text-xs text-neutral-600 dark:text-neutral-400 backdrop-blur-sm">
                    {group.date}
                  </span>
                </motion.div>

                {/* Messages for this date */}
                {group.messages.map((msg, msgIndex) => {
                  const isMe = msg.from === from;
                  const showAvatar = shouldShowAvatar(
                    group.messages.indexOf(msg),
                    msg,
                    group.messages
                  );

                  return (
                    <motion.div
                      key={`${msg.ts}-${msgIndex}`}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        delay: msgIndex * 0.02,
                      }}
                    >
                      <MessageBubble
                        author={isMe ? "me" : "them"}
                        content={msg.text}
                        time={formatTime(msg.ts)}
                        name={to}
                        showAvatar={showAvatar}
                      />
                    </motion.div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </ScrollArea>
  );
};
