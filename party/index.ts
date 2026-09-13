import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  // This constructor ties this server instance to a specific "Room"
  constructor(readonly room: Party.Room) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log(`Connection opened: ${conn.id}`);
    this.broadcastPresence();
  }

  onMessage(message: string, sender: Party.Connection) {
    console.log(`Received message from ${sender.id}: ${message}`);
  }

  onClose(conn: Party.Connection) {
    console.log(`Connection closed: ${conn.id}`);
    this.broadcastPresence();
  }

  // Helper to count connections and broadcast to everyone
  broadcastPresence() {
    const connections = Array.from(this.room.getConnections());
    
    this.room.broadcast(JSON.stringify({
      type: "sync_presence",
      count: connections.length
    }));
  }
}
