const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message');

let peer;

// Prompt user to create or join
const action = prompt("Type 'host' to host a chat, or 'join' to join:");
if(action === 'host'){
    peer = new SimplePeer({ initiator: true, trickle: false });
    peer.on('signal', data => {
        alert("Send this to your friend: " + JSON.stringify(data));
    });
} else {
    const signalData = prompt("Paste host's code here:");
    peer = new SimplePeer({ initiator: false, trickle: false });
    peer.signal(JSON.parse(signalData));
}

peer.on('signal', data => {
    if(action === 'join'){
        alert("Send this back to host: " + JSON.stringify(data));
    }
});

peer.on('connect', () => {
    appendMessage("Connected!");
});

peer.on('data', data => {
    appendMessage("Friend: " + data.toString());
});

function sendMessage(){
    const msg = messageInput.value;
    if(msg.trim() === "") return;
    peer.send(msg);
    appendMessage("You: " + msg);
    messageInput.value = "";
}

function appendMessage(msg){
    const div = document.createElement('div');
    div.textContent = msg;
    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
