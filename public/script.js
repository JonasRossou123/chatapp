let socket = io.connect();
let sendToAll = document.getElementById('sendToAll');
let sendToMe = document.getElementById('sendToMe');

let userName = prompt("What is your name?");
let targetMessage = document.getElementById('targetMessage');
let chatList = document.getElementById('chatList')

socket.emit('sendName', userName);
socket.on('displayName', (data) => {
    chatList.innerHTML = data;
});

sendToAll.addEventListener('click', function() {
    let message = document.getElementById("message").value;
    socket.emit('sendToAll', {message: message, name: userName});
});

sendToMe.addEventListener('click', function() {
    let message = document.getElementById("message").value;
    socket.emit('sendToMe', {message: message, name: userName});
});

socket.on('displayMessage', (data) => {
    targetMessage.innerHTML += '<span style=color:mediumblue;>' + data.name + ': </span>' + data.message + '<br>';
});

socket.on('userLeft', function(data) {
    targetMessage.innerHTML += data + '<br>';
})


//sendToMe.addEventListener('click', function() {
    //message = document.getElementById("message").value;
    //document.getElementById("target").innerHTML = message;
//});


