let Msgbox = document.getElementById("message-box");
const messageForm = document.getElementById("send_box");
let messageinput = document.getElementById("message-input");
let messages = []
let UserNames = []

const UserName = prompt("What is your UserName");
messages.push({ UserName: "", message: "You Joined" })
UserNames.push(UserName)
ConnectToSocket()
RenderMsgs();

//? <!--------< Socket Establish>---------------------->

async function ConnectToSocket() {
    // const socket = io("https://mock-10-chatapp.onrender.com");
    const socket = io("https://mock-10-chatapp.onrender.com");
    socket.emit("new-user", { UserName: "", message: `${UserName} joined the Chat` });

    socket.on("chat-message", (data) => {
        messages.push(data);
        RenderMsgs()
    });
    socket.on("user_connected", (data) => {
        messages.push(data);
        RenderMsgs()
    });
    socket.on("user_disconnect", (UserName) => {
        messages.push({ UserName: "", message: ` ${UserName} Disconnected` });
        RenderMsgs()
    });
    messageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const message = messageinput.value;
        messages.push({ UserName, message });
        RenderMsgs()
        let data = { UserName, message }
        socket.emit("send-chat-message", data);
        messageinput.value = "";
    });

}

// ?---------------------->


function RenderMsgs() {
    console.log(UserNames);
    let first = UserNames[0]
    let data = messages.map(item => {
        return `
         <div class="${item.UserName == "" ? "NoneUser" : item.UserName === first ? "SecondUser" : "FirstUser"}">
        <p> ${item.UserName == "" ? `${item.message}` : item.UserName == first ? `${item.message} ` :
                `<label style="color:blue;font-weight:500"> ${item.UserName}</label> : ${item.message} `} </p>
         </div>`
    })
    Msgbox.innerHTML = data.join("")
}