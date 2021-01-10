module.exports = io => {
    io.on('connection', socket => {
    socket.emit('server-hello',`Hello ${socket.request.user.username}`);
    console.log(socket.handshake.headers.referer);
    const room = socket.handshake.headers.referer.split('/')[4];
    console.log(room);
        socket.join(room);
        socket.broadcast.to(room).emit("joined", `${socket.request.user.username} joined the room`);
        //socket.broadcast.emit("joined", `${socket.request.user.username} joined the room`);
  });
}
