const express = require('express');
const path = require('path');
const socket = require('socket.io');

//create server
const app = express();




// Serve static files from the app
app.use(express.static(path.join(__dirname, 'client')));

// Create tables for messages and users
const messages = [];
let users = [];


// Show index.html on link "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});


// Run server
const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});

// initiation emitter 
const io = socket(server); // action connection 

//add listener on socket 
io.on('connection', (socket) => {
  /* users.push({id: socket.id}) */
  console.log(users);
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    //add emitter for message action 
    socket.broadcast.emit('message', message);
    console.log(messages);
  })

  socket.on('logIn', (user) => {
    console.log('oh, we have a new user, his name is ' + user.name)
    users.push({ id: socket.id, name: user.name });
    console.log(users);
    socket.broadcast.emit('logIn', { author: 'chat bot ', name: user.name });
  })

  socket.on('disconnect', (user) => {
    console.log('Oh, socket ' + socket.id + ' has left');
    users = users.filter(user => {
    user.id != socket.id;
    socket.broadcast.emit('logOut', { author: 'chat bot ', name: user.name });
  
  });
    

  });
  console.log('I\'ve added a listener on message and disconnect events \n');
});