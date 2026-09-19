import { create } from "zustand";
import PartySocket from "partysocket";
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
  YoutubeVideoMetadataInfo,
  YoutubeSearchResult,
} from "@/types";
import { initialParticipants, initialMessages, initialQueue } from "@/data/mockParticipants";
import { curatedVideoPresets } from "@/data/mockPresets";

export function parseYoutubeId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // Raw 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Matches watch?v=, youtu.be/, shorts/, embed/, live/
  const regExp = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|v\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = trimmed.match(regExp);
  if (match && match[1]) {
    return match[1];
  }

  try {
    const parsed = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    if (parsed.hostname.includes("youtube.com")) {
      const v = parsed.searchParams.get("v");
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (["shorts", "embed", "v", "live"].includes(parts[0]) && parts[1]) {
        const id = parts[1].substring(0, 11);
        if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
      }
    } else if (parsed.hostname.includes("youtu.be")) {
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (parts[0]) {
        const id = parts[0].substring(0, 11);
        if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
      }
    }
  } catch {
    // Ignore invalid URL
  }

  return null;
}

interface RoomState {
  // Identity & Room Meta
  roomId: string;
  roomName: string;
  roomPasscode: string;
  privacyMode: PrivacyMode;
  userRole: Role;
  participants: Participant[];

  // Socket
  socket: PartySocket | null;

  // Call & Audio/Video Controls
  isMicOn: boolean;
  isVideoOn: boolean;
  layoutMode: LayoutMode;

  // Video & Playback
  videoUrl: string;
  currentPreset: VideoPreset | null;
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
  lastSyncTimestamp: number;
  hostSyncTime: number;

  // Real-Time YouTube Metadata
  activeVideoMetadata: YoutubeVideoMetadataInfo | null;
  isLoadingMetadata: boolean;
  fetchVideoMetadata: (videoId: string) => Promise<void>;

  // YouTube Discovery & Concurrent Browsing
  searchQuery: string;
  searchResults: YoutubeSearchResult[];
  isSearching: boolean;
  searchError: string | null;
  setSearchQuery: (query: string) => void;
  searchYoutube: (query: string) => Promise<void>;
  clearSearch: () => void;
  relatedVideos: YoutubeSearchResult[];
  isFetchingRelated: boolean;
  fetchRelatedVideos: (title: string) => Promise<void>;
  recommendedVideos: YoutubeSearchResult[];
  isFetchingRecommended: boolean;
  fetchRecommendedVideos: () => Promise<void>;
  isFetchingMore: boolean;
  loadMoreVideos: () => Promise<void>;
  resetToRecommendations: () => void;

  // Co-Browsing & Virtual Tabs
  openTabs: SharedTab[];
  activeTabId: string;
  hasSharedControl: boolean;
  globalInteractionEnabled: boolean;
  multiplayerCursors: MultiplayerCursor[];

  // Captured Moments Album
  capturedMoments: CapturedMoment[];
  isShutterFlashing: boolean;

  // Social & Interactivity
  messages: ChatMessage[];
  reactions: ReactionBurst[];
  queue: QueueItem[];

  isInviteModalOpen: boolean;
  isCreateModalOpen: boolean;
  isScreenShareModalOpen: boolean;
  isMomentsGalleryOpen: boolean;
  isSettingsModalOpen: boolean;
  isRightSidebarOpen: boolean;
  activeSidebarTab: "chat" | "reactions" | "users" | "crew" | "queue" | "settings";
  isUrlBarOpen: boolean;
  setIsUrlBarOpen: (open: boolean) => void;
  toggleUrlBar: () => void;

  // Active Workspace Mode ("general" | "youtube")
  activeWorkspace: "general" | "youtube";
  setActiveWorkspace: (workspace: "general" | "youtube") => void;

  // Theme
  themeMode: "light" | "dark";
  accentColor: string;

  // Actions
  connectToRoom: () => void;
  disconnectFromRoom: () => void;
  toggleRightSidebar: () => void;
  setRightSidebarOpen: (open: boolean) => void;
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
  broadcastPlaybackSync: () => void;

  // Co-Browsing Actions
  openNewTab: (tab: Omit<SharedTab, "id">) => void;
  closeTab: (tabId: string) => void;
  setActiveTabId: (tabId: string) => void;
  updateTabUrl: (tabId: string, url: string, title?: string) => void;
  toggleSharedControl: () => void;
  toggleGlobalInteraction: () => void;
  toggleUserInteraction: (userId: string) => void;
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
  setSettingsModalOpen: (open: boolean) => void;
  setActiveSidebarTab: (tab: "chat" | "reactions" | "users" | "crew" | "queue" | "settings") => void;
  setThemeMode: (mode: "light" | "dark") => void;
}

const initialTabs: SharedTab[] = [
  {
    id: "tab-yt",
    title: "YouTube 4K Cinema",
    url: "",
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

// ------------------------------------------------------------------
// Real-Time Socket Connection (Managed strictly inside the store)
// ------------------------------------------------------------------

export const useRoomStore = create<RoomState>((set, get) => ({
  socket: null,
  roomId: "lounge-cinema-88",
  roomName: "Watch Party Stream",
  roomPasscode: "CYBER-4096",
  privacyMode: "public",
  userRole: (typeof window !== "undefined" && window.location.search.includes("guest")) ? "participant" : "host",
  participants: initialParticipants,

  // Call & Audio/Video
  isMicOn: true,
  isVideoOn: false,
  layoutMode: "cinema",

  // Video initial state
  videoUrl: "",
  currentPreset: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 85,
  isMuted: false,
  playbackRate: 1,
  isTheaterMode: false,
  ambientGlow: true,
  syncDriftMs: 14,
  isResyncing: false,
  lastSyncTimestamp: 0,
  hostSyncTime: 0,

  // Real-Time YouTube Metadata
  activeVideoMetadata: null,
  isLoadingMetadata: false,

  // YouTube Discovery & Concurrent Browsing
  searchQuery: "",
  searchResults: [],
  isSearching: false,
  searchError: null,
  relatedVideos: [],
  isFetchingRelated: false,
  recommendedVideos: [],
  isFetchingRecommended: false,
  isFetchingMore: false,

  // Co-Browsing
  openTabs: initialTabs,
  activeTabId: "tab-yt",
  hasSharedControl: true,
  globalInteractionEnabled: true,
  multiplayerCursors: initialMultiplayerCursors,

  // Moments
  capturedMoments: initialMoments,
  isShutterFlashing: false,

  // Chat & Social
  messages: initialMessages,
  reactions: [],
  queue: initialQueue,

  // Modals & UI Controls
  isInviteModalOpen: false,
  isCreateModalOpen: false,
  isScreenShareModalOpen: false,
  isMomentsGalleryOpen: false,
  isSettingsModalOpen: false,
  isRightSidebarOpen: false,
  activeSidebarTab: "users",
  isUrlBarOpen: false,

  // Workspace
  activeWorkspace: "general",

  // Theme — white / light by default in room
  themeMode: "light",
  accentColor: "#F43F5E",

  connectToRoom: () => {
    const { socket, roomId } = get();
    // Don't connect if we already have an active socket
    if (socket) return;

    const newSocket = new PartySocket({
      host: "localhost:1999",
      room: roomId,
    });

    newSocket.addEventListener("open", () => {
      console.log("🟢 [Frontend] Connected to PartyKit server successfully!");
      newSocket.send(JSON.stringify({
        type: "identify",
        role: get().userRole,
        userId: get().participants.find(p => p.isMe)?.id
      }));
    });

    newSocket.addEventListener("message", (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === "sync_presence") {
          console.log(`👥 [Frontend] Presence Update! There are now ${data.count} users connected to the room.`, data.participants);
          // If host, proactively broadcast current queue to ensure newcomers have latest queue
          if (get().userRole === "host" && get().socket && data.count > 1) {
            get().socket?.send(JSON.stringify({
              type: "sync_queue",
              queue: get().queue,
            }));
          }
        } else if (data.type === "sync_playback" && get().userRole !== "host") {
          console.log("⏱️ [Frontend] Received authoritative playback sync:", data);
          set({
            isPlaying: data.isPlaying,
            currentTime: data.currentTime,
            hostSyncTime: data.currentTime,
            playbackRate: data.playbackRate,
            lastSyncTimestamp: Date.now(),
          });
        } else if (data.type === "sync_queue") {
          console.log("📑 [Frontend] Received queue sync from peer:", data.queue);
          if (Array.isArray(data.queue)) {
            set({ queue: data.queue });
          }
        } else if (data.type === "chat_message") {
          console.log("💬 [Frontend] Received chat message:", data.message);
          set((state) => ({ messages: [...state.messages, data.message] }));
        } else if (data.type === "reaction_burst") {
          console.log("🎆 [Frontend] Received reaction burst:", data.burst);
          set((state) => ({ reactions: [...state.reactions, data.burst] }));
          setTimeout(() => {
            set((state) => ({ reactions: state.reactions.filter(r => r.id !== data.burst.id) }));
          }, 3000);
        } else if (data.type === "change_video") {
          console.log("🎬 [Frontend] Received video change from peer:", data);
          const ytId = parseYoutubeId(data.url);
          const incomingPreset: VideoPreset = data.preset || {
            id: "custom-" + (ytId || Date.now()),
            title: ytId ? "YouTube Video" : (data.url.replace(/^https?:\/\//i, "").split("/")[0] || "Web Browser"),
            category: ytId ? "YouTube" : "Web",
            duration: "00:00",
            channel: ytId ? "YouTube" : "Web Browser",
            thumbnail: ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
            youtubeId: ytId || "dQw4w9WgXcQ",
            url: data.url,
            description: "Direct stream source synchronized across all party viewers.",
            ambientColor: ytId ? "rgba(244, 63, 94, 0.35)" : "rgba(59, 130, 246, 0.35)",
          };

          set((state) => {
            const updatedTabs = state.openTabs.map((tab) =>
              tab.id === state.activeTabId
                ? {
                    ...tab,
                    url: data.url,
                    title: incomingPreset.title,
                    thumbnail: incomingPreset.thumbnail,
                    type: (ytId ? "video" : "browser") as "video" | "browser",
                  }
                : tab
            );
            return {
              videoUrl: data.url,
              currentPreset: incomingPreset,
              currentTime: 0,
              isPlaying: true,
              openTabs: updatedTabs,
            };
          });

          if (ytId) {
            get().fetchVideoMetadata(ytId);
          }
        } else {
          console.log("📩 [Frontend] Message received from server:", data);
        }
      } catch (err) {
        console.log("📩 [Frontend] Raw message received from server:", e.data);
      }
    });

    set({ socket: newSocket });
  },

  disconnectFromRoom: () => {
    const { socket } = get();
    if (socket) {
      socket.close();
      set({ socket: null });
    }
  },

  toggleRightSidebar: () => set((state) => ({ isRightSidebarOpen: !state.isRightSidebarOpen })),
  setRightSidebarOpen: (open) => set({ isRightSidebarOpen: open }),

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
    const trimmed = url.trim();
    const youtubeId = parseYoutubeId(trimmed);

    let selectedPreset: VideoPreset;
    let isBrowser = false;

    if (youtubeId) {
      selectedPreset = preset || curatedVideoPresets.find((p) => p.youtubeId === youtubeId || p.url === trimmed) || {
        id: "custom-" + youtubeId,
        title: "YouTube Video",
        category: "YouTube Live",
        duration: "04:30",
        channel: "External Feed",
        thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
        youtubeId: youtubeId,
        url: trimmed.startsWith("http") ? trimmed : `https://www.youtube.com/watch?v=${youtubeId}`,
        description: "Direct stream source synchronized across all party viewers.",
        ambientColor: "rgba(244, 63, 94, 0.35)",
      };
    } else {
      isBrowser = true;
      const cleanUrl = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
      const domain = cleanUrl.replace(/^https?:\/\//i, "").split("/")[0] || "Browser";
      selectedPreset = preset || {
        id: "browser-" + Date.now(),
        title: domain,
        category: "Web Browser",
        duration: "Live",
        channel: domain,
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
        youtubeId: "dQw4w9WgXcQ",
        url: cleanUrl,
        description: `Shared virtual browser session at ${cleanUrl}`,
        ambientColor: "rgba(59, 130, 246, 0.35)",
      };
    }

    set((state) => {
      const updatedTabs = state.openTabs.map((tab) =>
        tab.id === state.activeTabId
          ? {
              ...tab,
              url: selectedPreset.url,
              title: selectedPreset.title,
              thumbnail: selectedPreset.thumbnail,
              type: (isBrowser ? "browser" : "video") as "browser" | "video",
            }
          : tab
      );
      return {
        videoUrl: selectedPreset.url,
        currentPreset: selectedPreset,
        currentTime: 0,
        isPlaying: true,
        openTabs: updatedTabs,
        searchQuery: "",
        searchResults: [],
        searchError: null,
      };
    });

    const socket = get().socket;
    if (socket) {
      socket.send(JSON.stringify({
        type: "change_video",
        url: selectedPreset.url,
        preset: selectedPreset,
        isBrowser,
      }));
    }

    get().sendMessage(isBrowser ? `🌐 Navigated to: ${selectedPreset.url}` : `🎬 Now watching: ${selectedPreset.title}`);

    if (youtubeId) {
      get().fetchVideoMetadata(youtubeId);
    }
  },

  fetchVideoMetadata: async (videoId: string) => {
    if (!videoId) return;
    set({ isLoadingMetadata: true });
    try {
      const res = await fetch(`/api/youtube/video?videoId=${encodeURIComponent(videoId)}`);
      if (res.ok) {
        const data: YoutubeVideoMetadataInfo = await res.json();
        set((state) => ({
          activeVideoMetadata: data,
          isLoadingMetadata: false,
          currentPreset: state.currentPreset
            ? {
                ...state.currentPreset,
                title: data.title || state.currentPreset.title,
                channel: data.channel?.name || state.currentPreset.channel,
                thumbnail: data.thumbnail || state.currentPreset.thumbnail,
                duration: data.durationFormatted || state.currentPreset.duration,
                description: data.description || state.currentPreset.description,
              }
            : {
                id: "custom-" + videoId,
                title: data.title || "YouTube Video",
                category: "YouTube",
                duration: data.durationFormatted || "00:00",
                channel: data.channel?.name || "YouTube",
                thumbnail: data.thumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                youtubeId: videoId,
                url: `https://www.youtube.com/watch?v=${videoId}`,
                description: data.description || "",
                ambientColor: "rgba(244, 63, 94, 0.35)",
              },
        }));
      } else {
        set({ isLoadingMetadata: false });
      }
    } catch (err) {
      console.error("Error fetching video metadata:", err);
      set({ isLoadingMetadata: false });
    }
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  clearSearch: () => set({ searchQuery: "", searchResults: [], searchError: null }),

  resetToRecommendations: () => {
    set((state) => {
      const updatedTabs = state.openTabs.map((tab) =>
        tab.id === state.activeTabId
          ? {
              ...tab,
              url: "",
              title: "YouTube Discovery",
              thumbnail: "",
            }
          : tab
      );
      return {
        videoUrl: "",
        currentPreset: null,
        activeVideoMetadata: null,
        isPlaying: false,
        searchQuery: "",
        searchResults: [],
        searchError: null,
        openTabs: updatedTabs,
      };
    });
  },

  searchYoutube: async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      set({ searchResults: [], isSearching: false, searchError: null });
      return;
    }
    set({ isSearching: true, searchQuery: trimmed, searchError: null });
    try {
      const res = await fetch(`/api/youtube/search?q=${encodeURIComponent(trimmed)}`);
      if (res.ok) {
        const data = await res.json();
        set({
          searchResults: data.results || [],
          isSearching: false,
          searchError: null,
        });
      } else {
        const err = await res.json().catch(() => ({}));
        set({
          isSearching: false,
          searchError: err.error || "Failed to find videos",
        });
      }
    } catch (err: any) {
      console.error("Error searching YouTube:", err);
      set({
        isSearching: false,
        searchError: "Network error while searching",
      });
    }
  },

  fetchRelatedVideos: async (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) {
      set({ relatedVideos: [], isFetchingRelated: false });
      return;
    }
    set({ isFetchingRelated: true });
    try {
      const res = await fetch(`/api/youtube/search?q=${encodeURIComponent(trimmed)}`);
      if (res.ok) {
        const data = await res.json();
        set({
          relatedVideos: data.results || [],
          isFetchingRelated: false,
        });
      } else {
        set({ isFetchingRelated: false });
      }
    } catch (err) {
      console.error("Error fetching related videos:", err);
      set({ isFetchingRelated: false });
    }
  },

  fetchRecommendedVideos: async () => {
    if (get().recommendedVideos.length > 0 || get().isFetchingRecommended) return;
    set({ isFetchingRecommended: true });
    try {
      const res = await fetch(`/api/youtube/search?q=trending%20videos`);
      if (res.ok) {
        const data = await res.json();
        set({
          recommendedVideos: data.results || [],
          isFetchingRecommended: false,
        });
      } else {
        set({ isFetchingRecommended: false });
      }
    } catch (err) {
      console.error("Error fetching recommended videos:", err);
      set({ isFetchingRecommended: false });
    }
  },

  loadMoreVideos: async () => {
    const state = get();
    if (state.isFetchingMore) return;
    set({ isFetchingMore: true });

    try {
      if (state.searchQuery.trim() !== "") {
        const page = Math.floor(state.searchResults.length / 20) + 1;
        const res = await fetch(`/api/youtube/search?q=${encodeURIComponent(state.searchQuery + " part " + page)}`);
        if (res.ok) {
          const data = await res.json();
          const existingIds = new Set(state.searchResults.map((v) => v.id));
          const newVideos = (data.results || []).filter((v: any) => !existingIds.has(v.id));
          set({ searchResults: [...state.searchResults, ...newVideos] });
        }
      } else if (state.relatedVideos.length > 0) {
        const lastTitle = state.relatedVideos[state.relatedVideos.length - 1]?.title || "music";
        const res = await fetch(`/api/youtube/search?q=${encodeURIComponent(lastTitle + " similar")}`);
        if (res.ok) {
          const data = await res.json();
          const existingIds = new Set(state.relatedVideos.map((v) => v.id));
          const newVideos = (data.results || []).filter((v: any) => !existingIds.has(v.id));
          set({ relatedVideos: [...state.relatedVideos, ...newVideos] });
        }
      } else {
        const page = Math.floor(state.recommendedVideos.length / 20) + 1;
        const res = await fetch(`/api/youtube/search?q=${encodeURIComponent("trending videos mix " + page)}`);
        if (res.ok) {
          const data = await res.json();
          const existingIds = new Set(state.recommendedVideos.map((v) => v.id));
          const newVideos = (data.results || []).filter((v: any) => !existingIds.has(v.id));
          set({ recommendedVideos: [...state.recommendedVideos, ...newVideos] });
        }
      }
    } catch (err) {
      console.error("Error loading more videos:", err);
    } finally {
      set({ isFetchingMore: false });
    }
  },

  togglePlay: () => {
    if (get().userRole !== "host") return;
    set((state) => ({ isPlaying: !state.isPlaying }));
    get().broadcastPlaybackSync();
  },

  setIsPlaying: (playing) => {
    if (get().userRole !== "host") return;
    set({ isPlaying: playing });
    get().broadcastPlaybackSync();
  },
  seekTo: (time) => {
    if (get().userRole !== "host") return;
    set({ currentTime: Math.max(0, Math.min(time, get().duration)) });
    get().broadcastPlaybackSync();
  },
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setPlaybackRate: (rate) => {
    if (get().userRole !== "host") return;
    set({ playbackRate: rate });
    get().broadcastPlaybackSync();
  },
  toggleTheaterMode: () => set((state) => ({ isTheaterMode: !state.isTheaterMode })),
  toggleAmbientGlow: () => set((state) => ({ ambientGlow: !state.ambientGlow })),

  resyncWithHost: () => {
    set({ isResyncing: true });
    setTimeout(() => {
      set({ isResyncing: false, syncDriftMs: Math.floor(Math.random() * 8) + 4 });
    }, 800);
  },

  broadcastPlaybackSync: () => {
    const { socket, userRole, isPlaying, currentTime, playbackRate } = get();
    if (socket && userRole === "host") {
      socket.send(JSON.stringify({
        type: "sync_playback",
        isPlaying,
        currentTime,
        playbackRate
      }));
    }
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

  toggleGlobalInteraction: () => {
    const nextState = !get().globalInteractionEnabled;
    set({ globalInteractionEnabled: nextState });
    get().sendMessage(
      nextState
        ? "👁️ Global interactions (Cursors & Keys) enabled."
        : "🙈 Global interactions hidden."
    );
  },

  toggleUserInteraction: (userId) => {
    set((state) => ({
      participants: state.participants.map((p) =>
        p.id === userId ? { ...p, canInteract: !p.canInteract } : p
      ),
    }));
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
      title: title || (current?.title ? `${current.title.split("—")[0].trim()} Live Snapshot` : "Live Party Snapshot"),
      timestamp: timeStr,
      imageUrl: current?.thumbnail || "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
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

    const socket = get().socket;
    if (socket) {
      socket.send(JSON.stringify({
        type: "chat_message",
        message: newMsg
      }));
    }
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

    const socket = get().socket;
    if (socket) {
      socket.send(JSON.stringify({
        type: "reaction_burst",
        burst: newBurst
      }));
    }

    setTimeout(() => {
      set((state) => ({
        reactions: state.reactions.filter((r) => r.id !== newBurst.id),
      }));
    }, 3000);
  },

  addToQueue: (item) => {
    const currentUser = get().participants.find((p) => p.isMe);
    const addedByName = currentUser ? `${currentUser.name} (You)` : "Alex (You)";
    const newQueueItem: QueueItem = {
      id: "queue-" + Date.now(),
      ...item,
      addedBy: addedByName,
      votes: 1,
      hasVoted: true,
      isPlaying: false,
    };
    let updatedQueue: QueueItem[] = [];
    set((state) => {
      const playing = state.queue.filter((q) => q.isPlaying);
      const unplayed = [...state.queue.filter((q) => !q.isPlaying), newQueueItem].sort(
        (a, b) => b.votes - a.votes
      );
      updatedQueue = [...playing, ...unplayed];
      return { queue: updatedQueue };
    });
    get().sendMessage(`➕ Added to Up-Next queue: ${item.title}`);

    const socket = get().socket;
    if (socket) {
      socket.send(JSON.stringify({
        type: "sync_queue",
        queue: updatedQueue,
      }));
    }
  },

  voteQueueItem: (queueId) => {
    let updatedQueue: QueueItem[] = [];
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
      updatedQueue = [...playing, ...unplayed];

      return { queue: updatedQueue };
    });

    const socket = get().socket;
    if (socket) {
      socket.send(JSON.stringify({
        type: "sync_queue",
        queue: updatedQueue,
      }));
    }
  },

  playQueueItem: (queueId) => {
    const item = get().queue.find((q) => q.id === queueId);
    if (!item) return;

    let updatedQueue: QueueItem[] = [];
    const ytId = parseYoutubeId(item.url) || "dQw4w9WgXcQ";
    const preset: VideoPreset = {
      id: item.id,
      title: item.title,
      description: "Now playing from communal lounge queue.",
      category: "Queue Selection",
      duration: item.duration,
      channel: item.channel,
      thumbnail: item.thumbnail,
      youtubeId: ytId,
      ambientColor: "rgba(244, 63, 94, 0.35)",
      url: item.url,
    };

    set((state) => {
      const updated = state.queue.map((q) => ({
        ...q,
        isPlaying: q.id === queueId,
      }));
      const playing = updated.filter((q) => q.isPlaying);
      const unplayed = updated.filter((q) => !q.isPlaying).sort((a, b) => b.votes - a.votes);
      updatedQueue = [...playing, ...unplayed];

      const updatedTabs = state.openTabs.map((tab) =>
        tab.id === state.activeTabId
          ? {
              ...tab,
              url: item.url,
              title: item.title,
              thumbnail: item.thumbnail,
              type: "video" as "video" | "browser",
            }
          : tab
      );

      return {
        queue: updatedQueue,
        videoUrl: item.url,
        currentPreset: preset,
        isPlaying: true,
        currentTime: 0,
        openTabs: updatedTabs,
      };
    });

    get().sendMessage(`▶️ Now playing from queue: ${item.title}`);

    const socket = get().socket;
    if (socket) {
      socket.send(JSON.stringify({
        type: "change_video",
        url: item.url,
        preset,
        isBrowser: false,
      }));
      socket.send(JSON.stringify({
        type: "sync_queue",
        queue: updatedQueue,
      }));
    }

    if (ytId) {
      get().fetchVideoMetadata(ytId);
    }
  },

  removeFromQueue: (queueId) => {
    let updatedQueue: QueueItem[] = [];
    set((state) => {
      updatedQueue = state.queue.filter((q) => q.id !== queueId);
      return { queue: updatedQueue };
    });

    const socket = get().socket;
    if (socket) {
      socket.send(JSON.stringify({
        type: "sync_queue",
        queue: updatedQueue,
      }));
    }
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
  setSettingsModalOpen: (open) => set({ isSettingsModalOpen: open }),
  setActiveSidebarTab: (tab) => set({ activeSidebarTab: tab }),
  setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
  setIsUrlBarOpen: (open) => set({ isUrlBarOpen: open }),
  toggleUrlBar: () => set((state) => ({ isUrlBarOpen: !state.isUrlBarOpen })),
  setThemeMode: (mode) => set({
    themeMode: mode,
    accentColor: mode === "dark" ? "#c8962e" : "#F43F5E",
  }),
}));
