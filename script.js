class SimpleMessenger {
    constructor() {
        this.messages = [];
        this.username = 'Anonymous';
        this.isUsernameSet = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.loadUsername();
    }

    initializeElements() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.usernameInput = document.getElementById('usernameInput');
        this.setUsernameButton = document.getElementById('setUsername');
    }

    setupEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        this.setUsernameButton.addEventListener('click', () => this.setUsername());
        this.usernameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.setUsername();
            }
        });

        // Auto-focus on message input when username is set
        this.usernameInput.addEventListener('input', () => {
            if (this.usernameInput.value.trim()) {
                this.setUsernameButton.disabled = false;
            } else {
                this.setUsernameButton.disabled = true;
            }
        });

        // Enable/disable send button based on input
        this.messageInput.addEventListener('input', () => {
            this.sendButton.disabled = !this.messageInput.value.trim();
        });
    }

    setUsername() {
        const newUsername = this.usernameInput.value.trim();
        if (newUsername) {
            this.username = newUsername;
            this.isUsernameSet = true;
            localStorage.setItem('chatUsername', this.username);
            
            // Show username set confirmation
            this.addSystemMessage(`Username set to: ${this.username}`);
            
            // Focus on message input
            this.messageInput.focus();
            
            // Update UI
            this.usernameInput.disabled = true;
            this.setUsernameButton.disabled = true;
            this.setUsernameButton.textContent = '✓ Name Set';
            this.setUsernameButton.style.background = '#6c757d';
        }
    }

    loadUsername() {
        const savedUsername = localStorage.getItem('chatUsername');
        if (savedUsername) {
            this.username = savedUsername;
            this.usernameInput.value = savedUsername;
            this.isUsernameSet = true;
            this.usernameInput.disabled = true;
            this.setUsernameButton.disabled = true;
            this.setUsernameButton.textContent = '✓ Name Set';
            this.setUsernameButton.style.background = '#6c757d';
        }
    }

    sendMessage() {
        const messageText = this.messageInput.value.trim();
        
        if (!messageText) return;
        
        if (!this.isUsernameSet) {
            this.addSystemMessage('Please set your username first!');
            this.usernameInput.focus();
            return;
        }

        const message = {
            text: messageText,
            username: this.username,
            timestamp: new Date(),
            type: 'sent'
        };

        this.messages.push(message);
        this.displayMessage(message);
        
        // Clear input and refocus
        this.messageInput.value = '';
        this.sendButton.disabled = true;
        this.messageInput.focus();

        // Simulate receiving a response after a short delay
        this.simulateResponse(messageText);
    }

    simulateResponse(userMessage) {
        // Simple response simulation - in a real app, this would be replaced with actual messaging logic
        setTimeout(() => {
            const responses = [
                "That's interesting!",
                "I see what you mean.",
                "Thanks for sharing!",
                "Cool!",
                "Nice one!",
                "I agree with that.",
                "Tell me more about that.",
                "That makes sense.",
                "Interesting perspective!",
                "I'm listening..."
            ];

            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            const responseMessage = {
                text: randomResponse,
                username: 'Chat Bot',
                timestamp: new Date(),
                type: 'received'
            };

            this.messages.push(responseMessage);
            this.displayMessage(responseMessage);
        }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
    }

    displayMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.type}`;
        
        const timestamp = this.formatTime(message.timestamp);
        
        messageElement.innerHTML = `
            ${message.type === 'received' ? `<div class="username">${message.username}</div>` : ''}
            <div class="text">${this.escapeHtml(message.text)}</div>
            <span class="timestamp">${timestamp}</span>
        `;

        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
    }

    addSystemMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message system-message';
        messageElement.textContent = text;
        
        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    formatTime(date) {
        return date.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        }).toLowerCase();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Utility methods for potential future features
    clearChat() {
        this.messages = [];
        this.chatMessages.innerHTML = '';
        this.addSystemMessage('Chat cleared. Messages will disappear when you refresh the page.');
    }

    exportChat() {
        const chatData = JSON.stringify(this.messages, null, 2);
        const blob = new Blob([chatData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    }
}

// Initialize the messenger when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.messenger = new SimpleMessenger();
    
    // Add some demo messages if chat is empty
    setTimeout(() => {
        if (window.messenger.messages.length === 0) {
            window.messenger.addSystemMessage('Type a message to start chatting!');
        }
    }, 1000);
});

// Add some utility functions to the global scope for testing
window.utils = {
    clearChat: () => window.messenger.clearChat(),
    exportChat: () => window.messenger.exportChat(),
    simulateMessage: (text) => {
        const message = {
            text: text,
            username: 'Test User',
            timestamp: new Date(),
            type: 'received'
        };
        window.messenger.messages.push(message);
        window.messenger.displayMessage(message);
    }
};
