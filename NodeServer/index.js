// Node server which handles the socket io connection

const io = require('socket.io')(8000)
const users = {};

io.on('connection', socket=>{
    // Event which informs all the connected users when a new user joins the chat
    socket.on('new-user-joined', name=>{               
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send', message=>{
        // Event for broadcasting the message when it is sent by a user
        socket.broadcast.emit('receive', {message:message, name: users[socket.id]})
    });

    socket.on('disconnect', message=>{
        // Event which informs all the connected users when a user leaves the chat
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})