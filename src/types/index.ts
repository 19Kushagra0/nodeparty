export type Role = "host" | "moderator" | "participant";

export interface Participant {
  id: string;
  name: string;
  role: Role;
  isMe: boolean;
}
