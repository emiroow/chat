import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProfilePanel } from "../components/chat/ProfilePanel";
import { IconX } from "../components/icons";
import { Button } from "../components/ui/button";
import { conversations } from "../data/mock";

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const conv = conversations.find((c) => c.id === id) || conversations[0];

  return (
    <div className="relative flex h-dvh w-full bg-(--bg) text-(--text)">
      <div className="absolute right-2 top-2 z-10">
        <Button
          variant="secondary"
          size="icon"
          aria-label="Close profile"
          onClick={() => navigate(-1)}
          className="h-10 w-10"
        >
          <IconX className="size-5" />
        </Button>
      </div>
      <ProfilePanel
        name={conv.name}
        avatar={conv.avatar}
        handle={conv.handle}
        userId={conv.userId}
      />
    </div>
  );
};

export default ProfilePage;
