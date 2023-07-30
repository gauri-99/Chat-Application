const socket = io('http://localhost:8000',{ transports : ['websocket'] });

const form = document.getElementById("send-form");
const msgInput = document.querySelector(".msg-input");
const msgContainer = document.querySelector(".container");

// Funtion to append the event message to the container
const append=(message,position)=>{
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    msgElement.classList.add('msg');
    msgElement.classList.add(position);
    msgContainer.append(msgElement);
}

// Asking new user for his name when he joins
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

// When a new user joins append the info to the container
socket.on('user-joined', name=>{
    append(`${name} joined the chat`,'center')
})

// Append the message to the container sent by other users
socket.on('receive', data=>{
    append(`${data.name} : ${data.message}`,'left')
})

// When a user leaves the chat append the info to the container
socket.on('left', name=>{
    append(`${name} left the chat`,'center')
})

// Sends the message to the server after submitting
form.addEventListener('submit', (e)=>{
    e.preventDefault();                              // Prevents reloading the page
    const msg = msgInput.value;
    append(`You: ${msg}`,'right');
    socket.emit('send',msg);
    msgInput.value = '';
})