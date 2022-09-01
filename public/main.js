
const socket = io.connect(`http://localhost:${process.env.PORT || 8000}/`)
const inputEl = document.querySelector("#message")

let color;
socket.on("new-message",(data)=>console.log(data))
socket.on("clearBoard",()=>setup())
function sendMessage(e){
  socket.emit('chat-message',inputEl.value)
  inputEl.value =''
}
function clearDrawing(e){
  socket.emit('clearBtn')
}
function setup() {
  createCanvas(400, 400);
  background(70);
  }
  // function draw() {
    
    // }
    socket.on("broadcastDrawing", (history)=>{
      noStroke()
      history.forEach(ele => {
        fill(ele.c[0],ele.c[1],ele.c[2])
        ellipse(ele.x, ele.y, 10, 10)
      });
    })
    socket.on("initializeBroadcast", (data)=>{
      noStroke()
      color =data[1]
      data[0].forEach(ele => {
        fill(ele.c[0],ele.c[1],ele.c[2])
        ellipse(ele.x, ele.y, 10, 10)
      });
    })
    function mouseDragged(){
    noStroke()
    fill(color[0],color[1],color[2])
    ellipse(mouseX, mouseY, 10, 10);
    socket.emit('drawnByClient',{x:mouseX,y:mouseY,c:color})
  }

