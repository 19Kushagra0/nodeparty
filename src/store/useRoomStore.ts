import { create } from "zustand";
import type {
  Role,
  Participant,
  ChatMessage,
  ReactionBurst,
  QueueItem,
  VideoPreset,
  PrivacyMode,
  LayoutMode,
  MultiplayerCursor,
  SharedTab,
  CapturedMoment,
} from "@/types";
import { initialParticipants, initialMessages, initialQueue } from "@/data/mockParticipants";
import { curatedVideoPresets } from "@/data/mockPresets";

interface RoomState {
  // Identity & Room Meta
  roomId: string;
  roomName: string;
  roomPasscode: string;
  privacyMode: PrivacyMode;
  userRole: Role;
  participants: Participant[];

  // Call & Audio/Video Controls
  isMicOn: boolean;
  isVideoOn: boolean;
  layoutMode: LayoutMode;

  // Video & Playback
  videoUrl: string;
  currentPreset: VideoPreset;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  isTheaterMode: boolean;
  ambientGlow: boolean;
  syncDriftMs: number;
  isResyncing: boolean;

  // Co-Browsing & Virtual Tabs
  openTabs: SharedTab[];
  activeTabId: string;
  hasSharedControl: boolean;
  showMultiplayerCursors: boolean;
  multiplayerCursors: MultiplayerCursor[];

  // Captured Moments Album
  capturedMoments: CapturedMoment[];
  isShutterFlashing: boolean;

  // Social & Interactivity
  messages: ChatMessage[];
  reactions: ReactionBurst[];
  queue: QueueItem[];

  // Modals & UI Controls
  isInviteModalOpen: boolean;
  isCreateModalOpen: boolean;
  isScreenShareModalOpen: boolean;
  isMomentsGalleryOpen: boolean;
  activeSidebarTab: "chat" | "crew" | "queue" | "settings";

  // Actions
  setRoomId: (id: string) => void;
  setRoomName: (name: string) => void;
  toggleMic: () => void;
  toggleVideo: () => void;
  setLayoutMode: (mode: LayoutMode) => void;

  setVideoUrl: (url: string, preset?: VideoPreset) => void;
  togglePlay: () => void;
  setIsPlaying: (playing: boolean) => void;
  seekTo: (time: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setPlaybackRate: (rate: number) => void;
  toggleTheaterMode: () => void;
  toggleAmbientGlow: () => void;
  resyncWithHost: () => void;

  // Co-Browsing Actions
  openNewTab: (tab: Omit<SharedTab, "id">) => void;
  closeTab: (tabId: string) => void;
  setActiveTabId: (tabId: string) => void;
  updateTabUrl: (tabId: string, url: string, title?: string) => void;
  toggleSharedControl: () => void;
  toggleMultiplayerCursors: () => void;
  updateMyCursor: (x: number, y: number, isClicking?: boolean) => void;

  // Moments Actions
  captureMoment: (title?: string) => void;
  likeMoment: (id: string) => void;
  deleteMoment: (id: string) => void;

  // Social Actions
  sendMessage: (text: string) => void;
  addMessageReaction: (messageId: string, emoji: string) => void;
  triggerReaction: (emoji: string, senderName?: string, senderAvatar?: string) => void;
  addToQueue: (item: { title: string; channel: string; duration: string; thumbnail: string; url: string }) => void;
  voteQueueItem: (queueId: string) => void;
  playQueueItem: (queueId: string) => void;
  removeFromQueue: (queueId: string) => void;

  // Participant Management
  changeParticipantRole: (targetId: string, newRole: Role) => void;
  toggleMuteParticipant: (targetId: string) => void;
  kickParticipant: (targetId: string) => void;

  // UI Modals
  setInviteModalOpen: (open: boolean) => void;
  setCreateModalOpen: (open: boolean) => void;
  setScreenShareModalOpen: (open: boolean) => void;
  setMomentsGalleryOpen: (open: boolean) => void;
  setActiveSidebarTab: (tab: "chat" | "crew" | "queue" | "settings") => void;
}

const initialTabs: SharedTab[] = [
  {
    id: "tab-yt",
    title: "YouTube 4K Cinema",
    url: "https://www.youtube.com/watch?v=qEv7T3M4qrg",
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "tab-twitch",
    title: "Twitch Gaming Live",
    url: "https://www.twitch.tv/directory/game/Cyberpunk%202077",
    type: "browser",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "tab-retro",
    title: "Retro Arcade Lounge",
    url: "https://arcade.nodeparty.app/emulator",
    type: "browser",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
  },
];

const initialMoments: CapturedMoment[] = [
  {
    id: "moment-1",
    title: "Cyberpunk 4K Neon Climax 🍿🔥",
    timestamp: "10:32 PM",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    capturedBy: "Alex (You)",
    userAvatarBg: "from-rose-500 to-pink-600",
    likes: 6,
    hasLiked: true,
  },
  {
    id: "moment-2",
    title: "Interstellar Gargantua Black Hole Scene 🌌",
    timestamp: "10:15 PM",
    imageUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop",
    capturedBy: "Elena Rostova",
    userAvatarBg: "from-amber-500 to-orange-600",
    likes: 9,
    hasLiked: false,
  },
];

const initialMultiplayerCursors: MultiplayerCursor[] = [
  {
    id: "u1",
    name: "Alex (You)",
    color: "#f43f5e", // Rose
    avatarBg: "from-rose-500 to-pink-600",
    x: 48,
    y: 52,
    isClicking: false,
  },
  {
    id: "u2",
    name: "Elena",
    color: "#f59e0b", // Amber
    avatarBg: "from-amber-500 to-orange-600",
    x: 68,
    y: 35,
    isClicking: false,
  },
  {
    id: "u3",
    name: "Marcus",
    color: "#06b6d4", // Phosphor Cyan
    avatarBg: "from-cyan-500 to-teal-600",
    x: 25,
    y: 72,
    isClicking: false,
  },
  {
    id: "u4",
    name: "Chloe",
    color: "#10b981", // Emerald
    avatarBg: "from-emerald-500 to-teal-600",
    x: 82,
    y: 60,
    isClicking: false,
  },
];

export const useRoomStore = create<RoomState>((set, get) => ({
  roomId: "lounge-cinema-88",
  roomName: "4K Sci-Fi & Cyberpunk Premiere",
  roomPasscode: "CYBER-4096",
  privacyMode: "public",
  userRole: "host",
  participants: initialParticipants,

  // Call & Audio/Video
  isMicOn: true,
  isVideoOn: false,
  layoutMode: "cinema",

  // Video initial state
  videoUrl: curatedVideoPresets[0].url,
  currentPreset: curatedVideoPresets[0],
  isPlaying: true,
  currentTime: 42,
  duration: 222, // 3:42
  volume: 85,
  isMuted: false,
  playbackRate: 1,
  isTheaterMode: false,
  ambientGlow: true,
  syncDriftMs: 14,
  isResyncing: false,

  // Co-Browsing
  openTabs: initialTabs,
  activeTabId: "tab-yt",
  hasSharedControl: true,
  showMultiplayerCursors: true,
  multiplayerCursors: initialMultiplayerCursors,

  // Moments
  capturedMoments: initialMoments,
  isShutterFlashing: false,

  // Chat & Social
  messages: initialMessages,
  reactions: [],
  queue: initialQueue,

  // Modals
  isInviteModalOpen: false,
  isCreateModalOpen: false,
  isScreenShareModalOpen: false,
  isMomentsGalleryOpen: false,
  activeSidebarTab: "chat",

  setRoomId: (id) => set({ roomId: id }),
  setRoomName: (name) => set({ roomName: name }),

  toggleMic: () => {
    set((state) => {
      const nextMic = !state.isMicOn;
      const updatedParticipants = state.participants.map((p) =>
        p.isMe ? { ...p, isMuted: !nextMic, isSpeaking: nextMic } : p
      );
      return { isMicOn: nextMic, participants: updatedParticipants };
    });
  },

  toggleVideo: () => {
    set((state) => {
      const nextVideo = !state.isVideoOn;
      const updatedParticipants = state.participants.map((p) =>
        p.isMe ? { ...p, isCameraOn: nextVideo } : p
      );
      return { isVideoOn: nextVideo, participants: updatedParticipants };
    });
  },

  setLayoutMode: (mode) => set({ layoutMode: mode }),

  setVideoUrl: (url, preset) => {
    const selectedPreset = preset || curatedVideoPresets.find((p) => p.url === url) || {
      id: "custom-" + Date.now(),
      title: "Custom Stream Source",
      category: "YouTube Live",
      duration: "04:30",
      channel: "External Feed",
      thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop",
      youtubeId: url.includes("v=") ? url.split("v=")[1].split("&")[0] : "dQw4w9WgXcQ",
      url: url,
      description: "Direct stream source synchronized across all party viewers.",
      ambientColor: "rgba(244, 63, 94, 0.35)",
    };

    set((state) => {
      const updatedTabs = state.openTabs.map((tab) =>
        tab.id === state.activeTabId
          ? { ...tab, url, title: selectedPreset.title, thumbnail: selectedPreset.thumbnail }
          : tab
      );
      return {
        videoUrl: url,
        currentPreset: selectedPreset,
        currentTime: 0,
        isPlaying: true,
        openTabs: updatedTabs,
      };
    });

    get().sendMessage(`🎬 Now watching: ${selectedPreset.title}`);
  },

  togglePlay: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },

  setIsPlaying: (playing) => set({ isPlaying: playing }),
  seekTo: (time) => set({ currentTime: Math.max(0, Math.min(time, get().duration)) }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setPlaybackRate: (rate) => set({ playbackRate: rate }),
  toggleTheaterMode: () => set((state) => ({ isTheaterMode: !state.isTheaterMode })),
  toggleAmbientGlow: () => set((state) => ({ ambientGlow: !state.ambientGlow })),

  resyncWithHost: () => {
    set({ isResyncing: true });
    setTimeout(() => {
      set({ isResyncing: false, syncDriftMs: Math.floor(Math.random() * 8) + 4 });
    }, 800);
  },

  // Co-Browsing
  openNewTab: (newTab) => {
    const tabId = "tab-" + Date.now();
    const tabItem: SharedTab = { ...newTab, id: tabId };
    set((state) => ({
      openTabs: [...state.openTabs, tabItem],
      activeTabId: tabId,
      videoUrl: newTab.url,
    }));
    get().sendMessage(`🌐 Opened shared tab: "${newTab.title}"`);
  },

  closeTab: (tabId) => {
    const tabs = get().openTabs;
    if (tabs.length <= 1) return;
    const remaining = tabs.filter((t) => t.id !== tabId);
    set({
      openTabs: remaining,
      activeTabId: remaining[0].id,
      videoUrl: remaining[0].url,
    });
  },

  setActiveTabId: (tabId) => {
    const tab = get().openTabs.find((t) => t.id === tabId);
    if (tab) {
      set({ activeTabId: tabId, videoUrl: tab.url });
      get().sendMessage(`🔀 Switched to shared tab: "${tab.title}"`);
    }
  },

  updateTabUrl: (tabId, url, title) => {
    set((state) => ({
      openTabs: state.openTabs.map((t) =>
        t.id === tabId ? { ...t, url, title: title || t.title } : t
      ),
      videoUrl: url,
    }));
  },

  toggleSharedControl: () => {
    const nextState = !get().hasSharedControl;
    set({ hasSharedControl: nextState });
    get().sendMessage(
      nextState
        ? "🎮 Interactive Co-Browsing enabled: Everyone can click & control screen."
        : "🔒 Host Control locked: Only Host can control screen."
    );
  },

  toggleMultiplayerCursors: () => {
    const nextState = !get().showMultiplayerCursors;
    set({ showMultiplayerCursors: nextState });
    get().sendMessage(
      nextState
        ? "👁️ Multiplayer live cursors visible on screen."
        : "🙈 Other user cursors hidden from view."
    );
  },

  updateMyCursor: (x, y, isClicking) => {
    set((state) => {
      // Update my cursor position
      const updated = state.multiplayerCursors.map((c) =>
        c.id === "u1" ? { ...c, x, y, isClicking: !!isClicking } : c
      );
      return { multiplayerCursors: updated };
    });
  },

  // Moments Capture
  captureMoment: (title) => {
    set({ isShutterFlashing: true });
    const current = get().currentPreset;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

    const newMoment: CapturedMoment = {
      id: "moment-" + Date.now(),
      title: title || `${current.title.split("—")[0].trim()} Live Snapshot`,
      timestamp: timeStr,
      imageUrl: current.thumbnail,
      capturedBy: "Alex (You)",
      userAvatarBg: "from-rose-500 to-pink-600",
      likes: 1,
      hasLiked: true,
    };

    setTimeout(() => {
      set((state) => ({
        capturedMoments: [newMoment, ...state.capturedMoments],
        isShutterFlashing: false,
      }));
    }, 400);

    get().sendMessage(`📸 Captured a watch party moment: "${newMoment.title}"`);
  },

  likeMoment: (id) => {
    set((state) => ({
      capturedMoments: state.capturedMoments.map((m) =>
        m.id === id
          ? {
              ...m,
              likes: m.hasLiked ? m.likes - 1 : m.likes + 1,
              hasLiked: !m.hasLiked,
            }
          : m
      ),
    }));
  },

  deleteMoment: (id) => {
    set((state) => ({
      capturedMoments: state.capturedMoments.filter((m) => m.id !== id),
    }));
  },

  sendMessage: (text) => {
    if (!text.trim()) return;
    const currentUser = get().participants.find((p) => p.isMe) || {
      id: "u1",
      name: "Alex (You)",
      role: "host" as Role,
      avatarBg: "from-rose-500 to-pink-600",
    };

    const isSys = text.startsWith("🎬") || text.startsWith("✨") || text.startsWith("🌐") || text.startsWith("🔀") || text.startsWith("🎮") || text.startsWith("🔒") || text.startsWith("📸");
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

    const newMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      senderId: isSys ? "system" : currentUser.id,
      senderName: isSys ? "System" : currentUser.name,
      senderRole: isSys ? "moderator" : currentUser.role,
      avatarBg: currentUser.avatarBg,
      text: text.trim(),
      timestamp: timeStr,
      isSystem: isSys,
      reactions: {},
    };

    set((state) => ({
      messages: [...state.messages, newMsg],
    }));
  },

  addMessageReaction: (messageId, emoji) => {
    set((state) => ({
      messages: state.messages.map((m) => {
        if (m.id === messageId) {
          const prevReactions = m.reactions || {};
          const currentCount = prevReactions[emoji] || 0;
          return {
            ...m,
            reactions: {
              ...prevReactions,
              [emoji]: currentCount + 1,
            },
          };
        }
        return m;
      }),
    }));
  },

  triggerReaction: (emoji, senderName, senderAvatar) => {
    const currentUser = get().participants.find((p) => p.isMe);
    const newBurst: ReactionBurst = {
      id: "reaction-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      emoji,
      senderName: senderName || currentUser?.name || "Alex",
      senderAvatar: senderAvatar || currentUser?.avatarBg || "from-rose-500 to-pink-600",
      xOffset: Math.floor(Math.random() * 70) + 15,
    };

    set((state) => ({
      reactions: [...state.reactions.slice(-15), newBurst],
    }));

    setTimeout(() => {
      set((state) => ({
        reactions: state.reactions.filter((r) => r.id !== newBurst.id),
      }));
    }, 3000);
  },

  addToQueue: (item) => {
    const newQueueItem: QueueItem = {
      id: "queue-" + Date.now(),
      ...item,
      addedBy: "Alex (You)",
      votes: 1,
      hasVoted: true,
      isPlaying: false,
    };
    set((state) => {
      const playing = state.queue.filter((q) => q.isPlaying);
      const unplayed = [...state.queue.filter((q) => !q.isPlaying), newQueueItem].sort(
        (a, b) => b.votes - a.votes
      );
      return { queue: [...playing, ...unplayed] };
    });
    get().sendMessage(`➕ Added to Up-Next queue: ${item.title}`);
  },

  voteQueueItem: (queueId) => {
    set((state) => {
      const updated = state.queue.map((q) => {
        if (q.id === queueId) {
          const nextVoted = !q.hasVoted;
          return {
            ...q,
            votes: nextVoted ? q.votes + 1 : q.votes - 1,
            hasVoted: nextVoted,
          };
        }
        return q;
      });

      // The currently playing track stays pinned at top, while other queued tracks auto-sort by highest votes
      const playing = updated.filter((q) => q.isPlaying);
      const unplayed = updated.filter((q) => !q.isPlaying).sort((a, b) => b.votes - a.votes);

      return { queue: [...playing, ...unplayed] };
    });
  },

  playQueueItem: (queueId) => {
    const item = get().queue.find((q) => q.id === queueId);
    if (!item) return;

    set((state) => {
      const updated = state.queue.map((q) => ({
        ...q,
        isPlaying: q.id === queueId,
      }));
      const playing = updated.filter((q) => q.isPlaying);
      const unplayed = updated.filter((q) => !q.isPlaying).sort((a, b) => b.votes - a.votes);

      return {
        queue: [...playing, ...unplayed],
        videoUrl: item.url,
        currentPreset: {
          id: item.id,
          title: item.title,
          description: "Now playing from communal lounge queue.",
          category: "Queue Selection",
          duration: item.duration,
          channel: item.channel,
          thumbnail: item.thumbnail,
          youtubeId: item.url.includes("v=") ? item.url.split("v=")[1].split("&")[0] : "dQw4w9WgXcQ",
          ambientColor: "rgba(244, 63, 94, 0.35)",
          url: item.url,
        },
        isPlaying: true,
        currentTime: 0,
      };
    });
    get().sendMessage(`▶️ Now playing from queue: ${item.title}`);
  },

  removeFromQueue: (queueId) => {
    set((state) => ({
      queue: state.queue.filter((q) => q.id !== queueId),
    }));
  },

  changeParticipantRole: (targetId, newRole) => {
    set((state) => {
      let nextParticipants = [...state.participants];
      if (newRole === "host") {
        nextParticipants = nextParticipants.map((p) =>
          p.role === "host" ? { ...p, role: "moderator" as Role } : p
        );
      }
      nextParticipants = nextParticipants.map((p) =>
        p.id === targetId ? { ...p, role: newRole } : p
      );
      const me = nextParticipants.find((p) => p.isMe);
      return {
        participants: nextParticipants,
        userRole: me?.role || "participant",
      };
    });
  },

  toggleMuteParticipant: (targetId) => {
    set((state) => ({
      participants: state.participants.map((p) =>
        p.id === targetId ? { ...p, isMuted: !p.isMuted } : p
      ),
    }));
  },

  kickParticipant: (targetId) => {
    const target = get().participants.find((p) => p.id === targetId);
    set((state) => ({
      participants: state.participants.filter((p) => p.id !== targetId),
    }));
    if (target) {
      get().sendMessage(`⚠️ ${target.name} left the room.`);
    }
  },

  setInviteModalOpen: (open) => set({ isInviteModalOpen: open }),
  setCreateModalOpen: (open) => set({ isCreateModalOpen: open }),
  setScreenShareModalOpen: (open) => set({ isScreenShareModalOpen: open }),
  setMomentsGalleryOpen: (open) => set({ isMomentsGalleryOpen: open }),
  setActiveSidebarTab: (tab) => set({ activeSidebarTab: tab }),
}));
