import io from 'socket.io-client'
const  url = "http://localhost:8000";
var socket: any = io(url);

import { store } from '../store/'
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
        socket.on('connect', () => setUserData())
        socket.on('error', (error: any) => logout());
    }

}
function setUserData() {
    socket.on("getUserByToken", (user: any) => {
        const loginStore:any = store;

        if(user) {
            loginStore['_actions']['user/recconect'][0]({user});
        }
            
    })
}

function logout() {
    //Todo mirar otra forma más limpia
    const loginStore:any = store;
    loginStore['_actions']['account/logout'][0]();
}

export const socketOperations = {
    login,
    getSocket,
    reconnect,
    createUser
} 