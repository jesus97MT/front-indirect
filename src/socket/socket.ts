import io from 'socket.io-client'
const url = "http://localhost:8000";
var socket: any = io(url);

import { store } from '../store/'
export default socket;

function login(email: string, password: string) {
    const user = { email, password }
    socket = io.connect(url, {
        query: { op: "login", user: JSON.stringify(user) }
    });
    const operation = "getUserByLogin";
    socket.on('connect', () => setUserData(operation));
}

function createUser(email: string, password: string, userId: string) {
    const user = { email, password, userId };
    socket = io.connect(url, {
        query: { op: "createUser", user: JSON.stringify(user) }
    });
}
function getSocket() {
    return socket;
}

function reconnect() {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        if (token) {

            socket = io.connect(url, {
                query: { op: "token", token }
            });
            const op = "getUserByToken";
            socket.on('connect', () => {
                setUserData(op);
                resolve(true);
            });
            socket.on('error', (error: any) => {
                logout();
                reject(error)
            });
        } else {
            reject("Not token allowed");

        }
    });
    

}

function setUserData(op: string) {
    socket.on(op, (user: any) => {
        const loginStore: any = store;

        if (user) {
            loginStore['_mutations']['user/setUserData'][0](user);
        }

    });
}

function updateUserData(userData: any) {
    socket.emit("updateUserData", userData);
}

function logout() {
    //Todo mirar otra forma más limpia
    const loginStore: any = store;
    loginStore['_actions']['account/logout'][0]();
}

function getUserByUserId(userId: string) {
    const op = "findUserByUserId";
    socket.emit(op, userId);
}

export const socketOperations = {
    login,
    getSocket,
    reconnect,
    createUser,
    updateUserData,
    getUserByUserId
} 