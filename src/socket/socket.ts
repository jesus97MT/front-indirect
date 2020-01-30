import io from 'socket.io-client'
const  url = "http://localhost:8000";
var socket: any = io(url);

export default socket;

function login(email: string, password: string) {
    const user = { email, password }
    socket = io.connect(url, {
        query: { op: "login", user: JSON.stringify(user) }
    });
}

function createUser(email: string, password: string) {
    const user = { email, password }
    socket = io.connect(url, {
        query: { op: "createUser", user: JSON.stringify(user) }
    });
}
function getSocket() {
    return socket;
}

function reconnect() {
    const token = localStorage.getItem('token');
    if (token) {
        socket = io.connect(url, {
            query: { op: "token", token }
        });
    }

}

export const socketOperations = {
    login,
    getSocket,
    reconnect,
    createUser
} 