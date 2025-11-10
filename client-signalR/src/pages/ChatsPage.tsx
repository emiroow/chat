import React from "react";
import { Sidebar } from "../components/chat/Sidebar";

export const ChatsPage: React.FC = () => {
  return (
    <div className="flex h-dvh w-full bg-(--bg) text-(--text)">
      <Sidebar />
    </div>
  );
};

export default ChatsPage;
