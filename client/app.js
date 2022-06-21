
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

console.log(loginForm);

let userName;

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if(author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author }</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}



loginForm.addEventListener('submit', function login(e) {
  e.preventDefault();
  console.log('click');

  console.log(userNameInput.value);

  if (userNameInput.value === '') {
    alert('please enter your name')
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }

})

addMessageForm.addEventListener('submit', function sendMessage(e) {
  e.preventDefault();

  if (messageContentInput.value === '') {
    alert('please enter your message')
  } else {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = ('');
  }
})