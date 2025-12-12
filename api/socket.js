import { Server } from "socket.io";

let io;

export default function handler(req, res) {
  if (!io) {
    io = new Server(res.socket.server);
    res.socket.server.io = io;

    let players = {};

    io.on("connection", (socket) => {
      players[socket.id] = { x: 100, y: 100 };
      io.emit("players", players);

      socket.on("move", (pos) => {
        players[socket.id] = pos;
        io.emit("players", players);
      });

      socket.on("disconnect", () => {
        delete players[socket.id];
        io.emit("players", players);
      });
    });
  }

  res.end();
}
