module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.emit("server-hello", `Hello ${socket.request.user.username}`);
    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      socket.broadcast
        .to(roomId)
        .emit("joined", `${socket.request.user.username} joined the room`);
      editorListeners(socket);
      sendUsersList(io, socket);
      updateCursor(socket);
    });
  });
};

function sendUsersList(io, socket) {
  socket.on("fetch-users", (roomId) => {
    let users = [];
    console.log("Fetch user request from ->" + roomId);
    io.sockets.adapter.rooms.get(roomId).forEach((socketId) => {
      if (socketId != socket.id)
        users.push(
          io.sockets.adapter.nsp.sockets.get(socketId).request.user.username
        );
    });
    socket.emit("users-list", users);
  });
}

function updateCursor(socket) {
  socket.on("update-cursor", ({ roomId, user, position }) => {
    socket.broadcast.to(roomId).emit("update-cursor", { user, position });
  });
}

function editorListeners(socket) {
  socket.on("editorOnInsert", ({ roomId, index, text }) => {
    socket.broadcast.to(roomId).emit("editorInsert", { index, text });
  });
  socket.on("editorOnReplace", ({ roomId, index, length, text }) => {
    socket.broadcast.to(roomId).emit("editorReplace", { index, length, text });
  });
  socket.on("editorOnDelete", ({ roomId, index, length }) => {
    socket.broadcast.to(roomId).emit("editorDelete", { index, length });
  });
}
