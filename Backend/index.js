const http = require("http")
const UserRouter = require("./Routes/User.route");
const connection = require("./Config/db");
const express = require("express");
const cors = require("cors")
const socketio = require("socket.io");

const app = express();
app.use(express.json());

app.use(cors())
app.use("/users", UserRouter)


app.get("/", (req, res) => {
    try {
        res.status(200).json({ Message: "Welcome to Chat Application" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: err })
    }
});

const server = app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (err) {
        console.log("Error connecting to DB");
    }
    console.log(`Server is Rocking on port ${process.env.PORT}`);
});


const SocketServer = socketio(server, { cors: { origin: "*" } });

SocketServer.on("connection", (socket) => {
    console.log("New Client Connected" + " : " + socket.id);
    socket.on("new-user", (data) => {
        socket.broadcast.emit("user_connected", data);
    });

    socket.on("send-chat-message", (data) => {

        socket.broadcast.emit("chat-message", data);
    });
    socket.on("disconnect", () => {
        socket.broadcast.emit(`User With ID : ${socket.id}`);
    });
});
