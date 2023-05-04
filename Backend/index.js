const http = require("http")
const UserRouter = require("./Routes/User.route");
const connection = require("./Config/db");
const express = require("express");
const cors = require("cors")
const socketio = require("socket.io");

/*
You can directly do ` npm i ` 
then `npm run server` to run the chat app 
I have kept the local host links in masai repo
so it is easy to test
I have changed the links in deployed repo
*/
const app = express();
app.use(express.json());
const server = http.createServer(app)

const io = socketio(server, { cors: { origin: "*" } });
app.use(cors())


io.on("connection", (socket) => {
    console.log("New Client Connected");
    socket.on("send-chat-message", (message) => {
        socket.broadcast.emit("chat-message", { message });
    });
    socket.on("new-user", (name) => {
        socket.broadcast.emit("user_connected", name);
    });
    socket.on("disconnect", () => {
        socket.broadcast.emit("user_disconnect");
    });
});


app.use("/users", UserRouter)


app.get("/", (req, res) => {
    try {
        res.status(200).json({ Message: "Welcome to Chat Application" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err })
    }
});

server.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (err) {
        console.log("Error connecting to DB");
    }
    console.log(`Server is Rocking on port ${process.env.PORT}`);
});
