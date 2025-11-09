import React from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/chat/Sidebar";
import { useIsDesktop } from "../hooks/useIsDesktop";

export const ChatsPage: React.FC = () => {
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  return (
    <div className="flex h-dvh w-full bg-(--bg) text-(--text)">
      <Sidebar onSelect={(id) => navigate(`/${id}`)} />
      {isDesktop && (
        <div className="flex-1 h-full chat-wallpaper flex justify-center items-center">
          <span className="text-sm opacity-75">Please select message</span>
        </div>
      )}
    </div>
  );
};

export default ChatsPage;
