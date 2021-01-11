module.exports = io => {
    io.on('connection', socket => {
      socket.emit('server-hello',`Hello ${socket.request.user.username}`);
      socket.on('join-room',(roomId)=>{
        socket.join(roomId);
        socket.broadcast.to(roomId).emit("joined", `${socket.request.user.username} joined the room`);
        editorListeners(socket);
      });
  });
}


function editorListeners(socket){
  socket.on('editorOnInsert',({roomId, index, text})=>{
    socket.broadcast.to(roomId).emit("editorInsert",{index, text});
  });
  socket.on('editorOnReplace',({roomId, index, length, text})=>{
    socket.broadcast.to(roomId).emit("editorReplace",{index, length, text});
  });
  socket.on('editorOnDelete',({roomId, index, length})=>{
    socket.broadcast.to(roomId).emit("editorDelete",{index, length});
  });
}
