import { create } from 'zustand';
import type { Role, Participant } from '@/types';

interface RoomState {
  participants: Participant[];
  videoUrl: string;
  userRole: Role;
  setVideoUrl: (url: string) => void;

  changeParticipantRole: (targetId: string, newRole: Role) => void;
}

import { initialParticipants } from '@/data/mockParticipants';

export const useRoomStore = create<RoomState>((set) => ({
  participants: initialParticipants,
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  userRole: initialParticipants.find((person) => {
    return person.isMe === true;
  })?.role || "participant",
  // Functions

  setVideoUrl: (url) => {
    set(
      { videoUrl: url }
    )
  },
  
  changeParticipantRole: (targetId, newRole) => {
    set(
      (state) => {
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
      nextParticipants = nextParticipants.map((p) => {
        if (p.id === targetId) {
          return { ...p, role: newRole };
        }
        return p;
      });
       
      const currentUser = nextParticipants.find((p) => {
        return p.isMe === true;
      });

      let newUserRole: Role = "participant";
      if (currentUser) {
        newUserRole = currentUser.role;
      }

      return { 
        participants: nextParticipants, 
        userRole: newUserRole
      };
    })
  },
    

}));
