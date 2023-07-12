const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
do {
    name = prompt('Enter your name')
}
while (!name)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
            user: name,
            message: message.trim()
        }
        //append msg

    appendMessage(msg, 'outgoing')
    textarea.value = '',
        scrollToBottom()

    //send to server
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let newdiv = document.createElement('div')
    let className = type

    newdiv.classList.add(className, 'message')
    let markup = `
     <h4>${msg.user}</h4>
     <p>${msg.message}</p>
     `
    newdiv.innerHTML = markup
    messageArea.appendChild(newdiv)
}
// Recieve message

socket.on('message', (msg) => {
    // console.log(msg)
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}