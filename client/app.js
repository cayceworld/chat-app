
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');
let userName;

// initiation Socket.IO
const socket = io();
socket.connect("http://lilcayce.com");

// add listener on event message 
//socket.on('message', addMessage);
//socket.on('message', (event) => addMessage(event.author, event.content));
socket.on('message', ({ author, content }) => addMessage(author, content)); // shirt version of code above
socket.on('logIn', ({ author, name }) => addMessage(author, `<i>${name} has joined the conversation!</i>`));
socket.on('logOut', ({ author, name }) => addMessage(author, `<i>${name} has left the conversation... :(</i>`));



function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}

loginForm.addEventListener('submit', function login(e) {
  e.preventDefault();

  userName = userNameInput.value;
  console.log('userName:', userName);

  if (userNameInput.value === '') {
    alert('please enter your name')
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
    socket.emit('logIn', { name: userName });
  }

})

addMessageForm.addEventListener('submit', function sendMessage(e) {
  e.preventDefault();

  let messageContent = messageContentInput.value;

  if (!messageContent.length) {
    alert('You have to type something!');
  }
  else {
    addMessage(userName, messageContent);

    // add emitter for message action
    socket.emit('message', { author: userName, content: messageContent })
    messageContentInput.value = '';
  }
})

