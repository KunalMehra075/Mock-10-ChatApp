const io = require("socket.io")
let socketapp = io(4500, { cors: { origin: "*" } });
const users = {}

io.on("connection", (socket) => {
    console.log("New Client Connected");
    socket.on("send-chat-message", (message) => {
        socket.broadcast.emit("chat-message", { message, name: users[socket.id] });
    });
    socket.on("new-user", (name) => {
        users[socket.id] = name;
        socket.broadcast.emit("user_connected", name);
    });
    socket.on("disconnect", () => {
        socket.broadcast.emit("user_disconnect", users[socket.id]);
        delete users[socket.id];
    });
});