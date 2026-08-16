import type { Participant } from '@/types';

export const initialParticipants: Participant[] = [
  { id: "u1", name: "Alex (You)", role: "host", isMe: true },
  { id: "u2", name: "Sarah", role: "moderator", isMe: false },
  { id: "u3", name: "John", role: "participant", isMe: false },
];
 