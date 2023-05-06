

let Msgbox = document.getElementById("message-box");
const messageForm = document.getElementById("send_box");
let messageinput = document.getElementById("message-input");
let messages = []
let names = []

const name = prompt("What is your name");
messages.push({ name: "", message: "You Joined" })
names.push(name)
ConnectToSocket()


RenderMsgs();

//? <!--------< Socket Establish>---------------------->

async function ConnectToSocket() {
    const socket = await io("https://mock-10-chat-app.vercel.app");
    socket.emit("new-user", { name: "", message: `${name} joined the Chat` });

    socket.on("chat-message", (data) => {
        messages.push(data);
        RenderMsgs()
    });
    socket.on("user_connected", (data) => {
        messages.push(data);
        RenderMsgs()
    });
    socket.on("user_disconnect", (name) => {
        messages.push({ name: "", message: ` ${name} Disconnected` });
        RenderMsgs()
    });
    messageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const message = messageinput.value;
        messages.push({ name, message });
        RenderMsgs()
        let data = { name, message }
        socket.emit("send-chat-message", data);
        messageinput.value = "";
    });

}

// ?---------------------->


function RenderMsgs() {
    console.log(names);
    let first = names[0]
    let data = messages.map(item => {
        return `
         <div class="${item.name == "" ? "NoneUser" : item.name === first ? "SecondUser" : "FirstUser"}">
        <p> ${item.name == "" ? `${item.message}` : item.name == first ? `${item.message} ` :
                `<label style="color:blue;font-weight:500"> ${item.name}</label> : ${item.message} `} </p>
         </div>`
    })
    Msgbox.innerHTML = data.join("")
}