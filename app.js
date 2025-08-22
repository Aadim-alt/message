let username, roomName, roomKey;
let peer, connections = {};
const joinBtn = document.getElementById('joinBtn');
const sendBtn = document.getElementById('sendBtn');
const loginDiv = document.getElementById('login');
const chatDiv = document.getElementById('chat');
const messagesDiv = document.getElementById('messages');
const roomTitle = document.getElementById('roomTitle');

joinBtn.onclick = () => {
    username = document.getElementById('username').value.trim();
    roomName = document.getElementById('room').value.trim();
    roomKey = document.getElementById('roomKey').value.trim();

    if(!username || !roomName || !roomKey){
        alert("All fields are required!");
        return;
    }

    loginDiv.style.display = "none";
    chatDiv.style.display = "block";
    roomTitle.innerText = `Room: ${roomName}`;

    startPeer();
};

sendBtn.onclick = sendMessage;
document.getElementById('msgInput').addEventListener('keypress', e => {
    if(e.key === 'Enter') sendMessage();
});

function startPeer(){
    peer = new Peer(null, {
        host: '0.peerjs.com',
        port: 443,
        secure: true
    });

    peer.on('open', id => {
        console.log('My Peer ID:', id);
        connectToRoom();
    });

    peer.on('connection', conn => {
        setupConnection(conn);
    });
}

function connectToRoom(){
    const roomID = roomName + '_' + roomKey;
    // Try connecting to a “room peer” (every client connects to the same ID)
    const conn = peer.connect(roomID);
    setupConnection(conn);
}

function setupConnection(conn){
    conn.on('open', () => {
        console.log("Connected to peer:", conn.peer);
        connections[conn.peer] = conn;
    });

    conn.on('data', data => {
        addMessage(data.user, data.text);
        // Broadcast to others
        broadcastMessage(data);
    });

    conn.on('close', () => {
        delete connections[conn.peer];
    });
}

function sendMessage(){
    const text = document.getElementById('msgInput').value.trim();
    if(!text) return;
    const msg = {user: username, text};
    addMessage(username, text);
    broadcastMessage(msg);
    document.getElementById('msgInput').value = '';
}

function broadcastMessage(msg){
    for(let peerId in connections){
        const conn = connections[peerId];
        if(conn.open) conn.send(msg);
    }
}

function addMessage(user, text){
    const msgDiv = document.createElement('div');
    msgDiv.className = "message";
    msgDiv.innerHTML = `<strong>${user}:</strong> ${text}`;
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
