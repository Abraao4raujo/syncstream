import express from "express";
const app = express();
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://syncstream-three.vercel.app/home",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("usuario conectado: ", socket.id);

  socket.on("disconnect", (reason) => {
    console.log("Usuario desconectado", socket.id);
  });

  socket.on("set_username", (username) => {
    socket.data.username = username;
    console.log((socket.data.username = username));
  });

  socket.on("message", (text) => {
    io.emit("receive_message", {
      text: text,
      authorId: socket.id,
      author: socket.data.username,
    });
  });
});

server.listen(3001, () => {
  console.log("server is running");
});
