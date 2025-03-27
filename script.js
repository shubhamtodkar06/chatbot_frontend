var chatbox = document.getElementById('chatbox');
var chatboxContent = chatbox.querySelector('div'); // The inner div where messages are added
var userInput = document.getElementById('userInput');
var socket = io('https://backend-oh7o.onrender.com');

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('message', function(data) {
    var message = document.createElement('p');
    message.textContent = data;
    message.classList.add('bot-message'); // Add class for bot messages
    chatboxContent.appendChild(message); // Append to the inner div
    // Scrolling will be handled by the MutationObserver
});

function sendMessage(message) {
    socket.emit('user_message', message);
    var userMessage = document.createElement('p');
    userMessage.textContent = 'You: ' + message;
    userMessage.classList.add('user-message'); // Add class for user messages
    chatboxContent.appendChild(userMessage); // Append to the inner div
    userInput.value = ""; // Clear input after sending
    // Scrolling will be handled by the MutationObserver
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage(userInput.value);
    }
}

function sendMessageFromButton() {
    sendMessage(userInput.value);
}

// MutationObserver to automatically scroll to the bottom when new messages are added
const observer = new MutationObserver(function(mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            chatbox.scrollTop = chatbox.scrollHeight;
        }
    }
});

// Start observing the chatbox for added nodes
observer.observe(chatbox, { childList: true, subtree: true }); // Observe chatbox directly and its subtree