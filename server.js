const express = require('express');
const http = require('http');
const app = express(); //to define our application
const server = http.createServer(app); //To use http to serve the app that express provides
const io = require('socket.io')(server);

const PORT = process.env.PORT || 8080;
require('dotenv').config();


app.use(express.static('public')); //To use express to host the client


let counter = 0;
let participants = ["Anoniempje", "Jan", "Tom"];


participants.length = 0;


io.on('connection', (socket) => {
    console.log(counter + ' someone connected');
    counter += 1;

    socket.on('sendName', (message) => {
        participants.push(message);
        console.log(participants);
        let pLen = participants.length;
        let text = "<ul><li>&lt;Alle&gt;</li>";
        for (let i = 0; i < pLen; i++) {
            text += "<li>" + participants[i] + "</li>";
        }
        text += "</ul>";
        io.emit("displayName", text);
    });

    socket.on('sendToAll', (message) => {
        io.emit("displayMessage", message);
    });

    socket.on('sendToMe', (message) => {
        socket.emit("displayMessage", message)
    });

    let name = socket.id
    socket.on("disconnect", function() {
        io.emit('userLeft', `a user left the chatroom`)
    });
});

server.listen(PORT, () => {
    console.log("server running on " + PORT);
});