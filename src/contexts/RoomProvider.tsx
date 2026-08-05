"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Role = "host" | "moderator" | "participant";

export interface Participant {
  id: string;
  name: string;
  role: Role;
  isMe: boolean;
}

interface RoomContextType {
  roomId: string;
  participants: Participant[];
  userRole: Role;
  changeParticipantRole: (targetId: string, newRole: Role) => void;
  videoUrl: string;
  setVideoUrl: (url: string) => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export function RoomProvider({
  roomId,
  children,
}: {
  roomId: string;
  children: ReactNode;
}) {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "u1", name: "Alex (You)", role: "host", isMe: true },
    { id: "u2", name: "Sarah", role: "moderator", isMe: false },
    { id: "u3", name: "John", role: "participant", isMe: false },
  ]);

  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  );

  const userRole = participants.find((p) => p.isMe)?.role || "participant";

  const changeParticipantRole = (targetId: string, newRole: Role) => {
    setParticipants((prev) => {
      let nextParticipants = [...prev];

      // If making someone else the host, current host becomes moderator
      if (newRole === "host") {
        nextParticipants = nextParticipants.map((p) => {
          if (p.role === "host") {
            return { ...p, role: "moderator" };
          }
          return p;
        });
      }

      // Apply the new role to the target
      return nextParticipants.map((p) =>
        p.id === targetId ? { ...p, role: newRole } : p
      );
    });
  };

  return (
    <RoomContext.Provider
      value={{
        roomId,
        participants,
        userRole,
        changeParticipantRole,
        videoUrl,
        setVideoUrl,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export function useRoom() {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
}
