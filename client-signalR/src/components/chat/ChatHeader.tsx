import { motion } from "framer-motion";
import React from "react";
import { IconMenu, IconMore, IconPhone, IconSearch, IconVideo } from "../icons";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";

export const ChatHeader: React.FC<{
  name: string;
  avatar?: string | null;
  subtitle?: string;
  onOpenSidebar?: () => void;
  onOpenProfile?: () => void;
}> = ({ name, avatar, subtitle, onOpenSidebar, onOpenProfile }) => {
  return (
    <div className="flex items-center justify-between border-b border-(--border) bg-(--panel) px-3 py-3 sm:px-4">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <div className="sm:hidden">
          <motion.div
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          >
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open sidebar"
              onClick={onOpenSidebar}
              className="h-10 w-10"
            >
              <IconMenu className="size-5" />
            </Button>
          </motion.div>
        </div>
        {/* Clickable identity area (opens profile). In mobile it navigates; in desktop it toggles panel */}
        <button
          type="button"
          onClick={onOpenProfile}
          className="group flex min-w-0 items-center gap-2 rounded-md px-1 py-0.5 hover:bg-(--muted)"
        >
          <Avatar src={avatar || undefined} fallback={name[0]} />
          <div className="min-w-0 text-left">
            <div className="truncate font-medium group-hover:opacity-90">
              {name}
            </div>
            {subtitle ? (
              <div className="truncate text-xs opacity-70">{subtitle}</div>
            ) : null}
          </div>
        </button>
      </div>
      <div className="flex items-center gap-1 pl-2">
        <div className="hidden sm:flex items-center gap-1">
          <motion.div
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          >
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search in conversation"
            >
              <IconSearch className="size-5" />
            </Button>
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          >
            <Button variant="ghost" size="icon" aria-label="Voice call">
              <IconPhone className="size-5" />
            </Button>
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          >
            <Button variant="ghost" size="icon" aria-label="Video call">
              <IconVideo className="size-5" />
            </Button>
          </motion.div>
        </div>
        <motion.div
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="More"
            onClick={onOpenProfile}
            className="h-10 w-10"
          >
            <IconMore className="size-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
