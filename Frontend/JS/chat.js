
const socket = io("https://mock-10-chat-app.vercel.app");
let Msgbox = document.getElementById("message-box");
const messageForm = document.getElementById("send_box");
let messageinput = document.getElementById("message-input");

const name = prompt("What is your name");
AppendMessage("You Joined");
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
    AppendMessage(`User :  ${data.message}`);
    console.log(data);
});
socket.on("user_connected", (data) => {
    AppendMessage(`${data} connected`);
    console.log(data);
});
socket.on("user_disconnect", (name) => {
    AppendMessage(`${name} disconnected`);
    console.log(data);
});
messageForm.addEventListener("submit", (e) => {
    console.log("Hello");
    e.preventDefault();
    const message = messageinput.value;
    AppendMessage(`You : ${message}`);
    socket.emit("send-chat-message", message);
    messageinput.value = "";
});
function AppendMessage(msg) {
    const div = document.createElement("div");
    div.innerText = msg;
    Msgbox.append(div);
}