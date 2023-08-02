const express = require('express');
const http = require('http');
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server , {
    cors : {
        origin : '*'
    }
});

io.on('connection', (socket) => {
    console.log('a user connected'); 
    socket.on("chat"  , (payload)=>{
        console.log("what is pasyload " , payload);
        io.emit("chat" , payload)
    })
  });

  server.listen(5000 , ()=>{console.log("server is runing on the port 5000...")})