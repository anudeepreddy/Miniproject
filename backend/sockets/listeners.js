module.exports = io => {
    io.on('connection', socket => {
      socket.emit('server-hello',`Hello ${socket.request.user.username}`);
      socket.on('join-room',(roomId)=>{
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("joined", `${socket.request.user.username} joined the room`);
      });
  });
}
