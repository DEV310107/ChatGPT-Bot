const users = JSON.parse(localStorage.getItem('users') || '{}');
let currentUser = localStorage.getItem('currentUser') || null;

function register() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;
  
  if (users[username]) {
    alert('Usuário já existe!');
    return;
  }

  users[username] = { password, chats: [] };
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registrado com sucesso!');
}

function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  if (users[username] && users[username].password === password) {
    currentUser = username;
    localStorage.setItem('currentUser', currentUser);
    document.querySelector('.form-container').style.display = 'none';
    document.querySelector('.chat-container').style.display = 'block';
    loadChat();
  } else {
    alert('Usuário ou senha inválidos!');
  }
}

function logout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  document.querySelector('.form-container').style.display = 'block';
  document.querySelector('.chat-container').style.display = 'none';
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;

  appendMessage('user', message);
  users[currentUser].chats.push({ sender: 'user', message });
  localStorage.setItem('users', JSON.stringify(users));

  // Simular resposta
  const botReply = `Você disse: ${message}`;
  appendMessage('bot', botReply);
  users[currentUser].chats.push({ sender: 'bot', message: botReply });
  localStorage.setItem('users', JSON.stringify(users));

  input.value = '';
}

function appendMessage(sender, text) {
  const log = document.getElementById('chat-log');
  const msg = document.createElement('div');
  msg.className = sender;
  msg.innerHTML = `<strong>${sender === 'user' ? 'Você' : 'NeoTalk'}:</strong> ${text}`;
  log.appendChild(msg);
}

function loadChat() {
  const log = document.getElementById('chat-log');
  log.innerHTML = '';
  const chats = users[currentUser].chats || [];
  chats.forEach(({ sender, message }) => appendMessage(sender, message));
}
