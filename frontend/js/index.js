// LOGIN 

const login = document.querySelector('.form_section');
const loginForm = login.querySelector('.form_login');
const loginInput = login.querySelector('.login_input')


// CHAT

const chat = document.querySelector('.chat');
const chatForm = chat.querySelector('.chat_form');
const chatInput = chat.querySelector('.chat_input')
const chatMsg = chat.querySelector('.chat_messages')

const user = { 
    id: "", 
    name: "", 
    color: "" 
}

const colors = [
    "cadetblue",
    "gold",
    "carnflowersblue",
    "darkhakai",
    "hotpink",
    "darkgoldenrod"
]

let webscoket

const scrollScreen = () => {
    window.scrollTo({
        top:document.body.scrollHeight,
        behavior: "smooth"
    })
}

const createMessegeSelfElement = (content) =>{
    const div = document.createElement("div")

    div.classList.add("message_self")


    div.innerHTML = content

    return div
}

const createMessegeOtherElement = (content, sender, senderColor) =>{
    const div = document.createElement("div")
    const span = document.createElement("span")

    div.classList.add("message_other")

    div.classList.add("message_self")
    span.classList.add("message_sender")
    span.style.color = senderColor

    div.appendChild(span)

    span.innerHTML = sender

    div.innerHTML += content

    return div
}

const getRandonColor = () =>{
    const randonIndex = Math.floor(Math.random() * colors.length)
    return colors[randonIndex];
}

const processMessege = ({data}) => {
    const {
        userId,
        userName,
        userColor,
        content
    } = JSON.parse(data)

    const message = userId == user.id ? createMessegeSelfElement(content) : createMessegeOtherElement(content, userName, userColor)

    chatMsg.appendChild(message)

    scrollScreen();
}

const handleSubmit = (e) =>{
    e.preventDefault();
    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = getRandonColor()

    login.style.display = "none";
    chat.style.display = "flex";

    webscoket = new WebSocket('wss://chat-online-xmnt.onrender.com')
    webscoket.onmessage = processMessege

   // console.log(user); 
}

const sendMessege = (e) => {
    e.preventDefault()

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    }

    webscoket.send(JSON.stringify(message)) // JSON.stringify(message) faz virar string

    chatInput.value = ""
}

loginForm.addEventListener('submit', handleSubmit)
chatForm.addEventListener('submit', sendMessege)