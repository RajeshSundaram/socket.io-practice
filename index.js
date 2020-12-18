const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const user_messages = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/home.html");
});

io.on("connection", (socket) => {
  io.emit("message-pull", user_messages);
  console.log("client connected");
  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
  socket.on("message-push", (data) => {
    user_messages.push(data);
    io.emit("message-pull", user_messages);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
