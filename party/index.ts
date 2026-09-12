import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  // This constructor ties this server instance to a specific "Room"
  constructor(readonly room: Party.Room) {}

  // Triggered the exact millisecond a user joins the room
  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log(`Connection opened: ${conn.id}`);
  }

  // Triggered whenever a user sends data to the server
  onMessage(message: string, sender: Party.Connection) {
    // We aren't building the logic yet, just logging that we got a message
    console.log(`Received message from ${sender.id}: ${message}`);
  }

  // Triggered the exact millisecond a user closes their browser or leaves
  onClose(conn: Party.Connection) {
    console.log(`Connection closed: ${conn.id}`);
  }
}
