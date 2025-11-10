import React from "react";
import { Sidebar } from "../components/chat/Sidebar";
import { useIsDesktop } from "../hooks/useIsDesktop";

export const ChatsPage: React.FC = () => {
  const isDesktop = useIsDesktop();
  return (
    <div className="flex h-dvh w-full bg-(--bg) text-(--text)">
      <Sidebar />
      {isDesktop && (
        <div className="flex-1 h-full chat-wallpaper flex justify-center items-center">
          <span className="text-sm opacity-75">Please select message</span>
        </div>
      )}
    </div>
  );
};

export default ChatsPage;
