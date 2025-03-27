<script>
        var chatbox = document.getElementById('chatbox');
        var userInput = document.getElementById('userInput');

        // Get the backend URL from an environment variable
        const backendUrl = process.env.RENDER_BACKEND_URL || '';

        // Initialize SocketIO connection with the backend URL
        var socket = io(backendUrl);

        socket.on('connect', function() {
            console.log('Connected to server');
        });

        socket.on('disconnect', function() {
            console.log('Disconnected from server');
        });

        socket.on('message', function(data) {
            var message = document.createElement('p');
            message.textContent = data;
            message.classList.add('bot-message');
            chatbox.appendChild(message);
            chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll
        });

        function sendMessage(message) {
            if (message.trim() === '') return; // Ignore empty messages
            socket.emit('user_message', message);
            var userMessage = document.createElement('p');
            userMessage.textContent = 'You: ' + message;
            userMessage.classList.add('user-message');
            chatbox.appendChild(userMessage);
            userInput.value = ""; // Clear input
            chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll
        }

        function handleKeyPress(event) {
            if (event.key === "Enter") {
                sendMessage(userInput.value);
            }
        }

        function sendMessageFromButton() {
            sendMessage(userInput.value);
        }
    </script>