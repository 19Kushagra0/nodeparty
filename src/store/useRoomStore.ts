import { create } from 'zustand';
import type { Role, Participant } from '@/types';

interface RoomState {
  participants: Participant[];
  videoUrl: string;
  userRole: Role;
  changeParticipantRole: (targetId: string, newRole: Role) => void;
  setVideoUrl: (url: string) => void;
}

const initialParticipants: Participant[] = [
  { id: "u1", name: "Alex (You)", role: "host", isMe: true },
  { id: "u2", name: "Sarah", role: "moderator", isMe: false },
  { id: "u3", name: "John", role: "participant", isMe: false },
];

export const useRoomStore = create<RoomState>((set) => ({
  participants: initialParticipants,
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  userRole: initialParticipants.find((p) => p.isMe)?.role || "participant",
  
  changeParticipantRole: (targetId, newRole) =>
    set((state) => {
      let nextParticipants = [...state.participants];

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
      nextParticipants = nextParticipants.map((p) =>
        p.id === targetId ? { ...p, role: newRole } : p
      );
      
      return { 
        participants: nextParticipants,
        userRole: nextParticipants.find((p) => p.isMe)?.role || "participant"
      };
    }),
    
  setVideoUrl: (url) => set({ videoUrl: url }),
}));
