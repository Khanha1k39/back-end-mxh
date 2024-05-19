const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: ["http://localhost:3000"], method: ["GET,POST"] },
});
const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("a user connect ", socket.id);
  const userEmail = socket.handshake.query.userEmail;
  if (userEmail != "undefined") {
    userSocketMap[userEmail] = socket.id;
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  console.log(userSocketMap);
  console.log(userEmail);

  socket.on("disconnect", () => {
    console.log("a user connected ", socket.id);
    delete userSocketMap[userEmail];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
module.exports = { app, io, server };
