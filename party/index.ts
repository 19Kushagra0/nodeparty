import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  hostConnectionId: string | null = null;
  
  // Track participants metadata by connection ID
  participantData: Map<string, any> = new Map();

  // This constructor ties this server instance to a specific "Room"
  constructor(readonly room: Party.Room) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log(`Connection opened: ${conn.id}`);
    // Initially mark as connecting guest
    this.participantData.set(conn.id, { id: conn.id, role: "participant", isMe: false });
    this.broadcastPresence();
  }

  onMessage(message: string, sender: Party.Connection) {
    console.log(`Received message from ${sender.id}: ${message}`);
    
    try {
      const data = JSON.parse(message);
      
      if (data.type === "identify") {
        this.participantData.set(sender.id, {
          id: data.userId || sender.id,
          role: data.role,
        });

        if (data.role === "host") {
          console.log(`👑 Host connection registered: ${sender.id}`);
        }
        
        // Broadcast updated presence with the new identity
        this.broadcastPresence();
      }
      
      if (data.type === "sync_playback") {
        // Only broadcast sync packets if they come from an authoritative host
        const senderData = this.participantData.get(sender.id);
        if (senderData && senderData.role === "host") {
          this.room.broadcast(message, [sender.id]); // broadcast to everyone except the sender
        } else {
          console.log(`⚠️ Ignored playback sync from non-host connection: ${sender.id}`);
        }
      }

      if (data.type === "chat_message" || data.type === "reaction_burst") {
        // Anyone can chat and react
        this.room.broadcast(message, [sender.id]);
      }

    } catch (e) {
      // Not a valid JSON message, ignore
    }
  }

  onClose(conn: Party.Connection) {
    console.log(`Connection closed: ${conn.id}`);
    
    const senderData = this.participantData.get(conn.id);
    if (senderData && senderData.role === "host") {
      console.log(`👑 Host connection lost: ${conn.id}`);
    }
    
    this.participantData.delete(conn.id);
    this.broadcastPresence();
  }

  // Helper to count connections and broadcast to everyone
  broadcastPresence() {
    const connections = Array.from(this.room.getConnections());
    const activeParticipants = Array.from(this.participantData.values());
    
    this.room.broadcast(JSON.stringify({
      type: "sync_presence",
      count: connections.length,
      participants: activeParticipants
    }));
  }
}
