const { default: axios } = require("axios");

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
      syncCode(socket);
      runCode(io,socket);
      leaveRoom(socket);
    });
  });
};

function syncCode(socket){
  socket.on('startSyncCode',({roomId})=>{
    console.log("we are here");
    socket.broadcast
      .to(roomId)
      .emit('startSyncCode',"");
  })
  socket.on('endSyncCode',({roomId,code})=>{
    socket.broadcast
      .to(roomId)
      .emit('endSyncCode',{code});
  })
}

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

const compilerArgs = {
  '6': '-o a.out source_file.c',
  '7': '-o a.out source_file.c'
}

function runCode(io,socket){
  socket.on("runCode",({roomId,Program,LanguageChoice,Input})=>{
    data={Program,LanguageChoice,Input,CompilerArgs:compilerArgs[LanguageChoice]}
    axios.post('https://rextester.com/rundotnet/api',data).then(res=>{
      console.log(res.data);
      io.in(roomId).emit("output",res.data);
    })
  })
}

function leaveRoom(socket){
  socket.on('leave-room',(roomId)=>{
    socket.broadcast.to(roomId).emit("leave-room", `${socket.request.user.username} left the room`);
    socket.broadcast.to(roomId).emit("delete-cursor", socket.request.user.username);
    socket.leave(roomId);
  })
}