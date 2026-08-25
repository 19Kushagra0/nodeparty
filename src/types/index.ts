export type Role = "host" | "moderator" | "participant";

export type PrivacyMode = "public" | "friends" | "private";

export type LayoutMode = "cinema" | "grid";

export interface Participant {
  id: string;
  name: string;
  role: Role;
  isMe: boolean;
  avatarBg: string;
  isSpeaking?: boolean;
  isMuted?: boolean;
  isCameraOn?: boolean;
  isTyping?: boolean;
  statusText?: string;
  cursorColor?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: Role;
  avatarBg: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
  reactions?: Record<string, number>;
}

export interface ReactionBurst {
  id: string;
  emoji: string;
  senderName: string;
  senderAvatar: string;
  xOffset: number;
}

export interface QueueItem {
  id: string;
  title: string;
  channel: string;
  duration: string;
  thumbnail: string;
  url: string;
  addedBy: string;
  votes: number;
  hasVoted?: boolean;
  isPlaying?: boolean;
}

export interface VideoPreset {
  id: string;
  title: string;
  category: string;
  duration: string;
  channel: string;
  thumbnail: string;
  youtubeId: string;
  url: string;
  description: string;
  ambientColor: string;
}

export interface FeaturedLounge {
  id: string;
  title: string;
  category: string;
  viewersCount: number;
  hostName: string;
  hostAvatarBg: string;
  currentVideo: string;
  videoThumbnail: string;
  youtubeId: string;
  tags: string[];
  isLive: boolean;
}

export interface MultiplayerCursor {
  id: string;
  name: string;
  color: string;
  avatarBg: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  isClicking?: boolean;
  targetElement?: string;
}

export interface SharedTab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  type: "video" | "browser" | "screen";
  thumbnail?: string;
}

export interface CapturedMoment {
  id: string;
  title: string;
  timestamp: string;
  imageUrl: string;
  capturedBy: string;
  userAvatarBg: string;
  likes: number;
  hasLiked?: boolean;
}
