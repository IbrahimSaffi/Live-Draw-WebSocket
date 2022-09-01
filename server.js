const express = require("express");
var cors = require('cors')
const { Server } = require("socket.io");


const app = express();

app.use(express.static("public"));
app.use(cors())

const httpServer = app.listen(process.env.PORT || 8000);
const io = new Server(httpServer)
let historyArr = []
io.on("connection",(socket) => {
  console.log("Client Connected", socket.id)
  socket.on("chat-message",(data)=>{
    console.log(data +" by " +socket.id)
    socket.broadcast.emit("new-message",`${data} by ${socket.id}`)
  })
  socket.on("drawnByClient",(data)=>{
     historyArr.push(data)
    socket.broadcast.emit("broadcastDrawing",historyArr)
  })
  socket.emit("initializeBroadcast",[historyArr,[Math.ceil(Math.random()*265),Math.ceil(Math.random()*265),Math.ceil(Math.random()*265)]])
  socket.on("clearBtn",()=>{
    historyArr = []
    io.emit("clearBoard")
  })
})