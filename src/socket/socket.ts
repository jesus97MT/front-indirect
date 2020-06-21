import io from 'socket.io-client'
const urlProd = "https://indirect-back.herokuapp.com/";
const urlDev = "http://localhost:8000";
const url = urlProd;

var socket: any = io(url);

import { store } from '../store/'
export default socket;

function login(email: string, password: string) {
    const user = { email, password }
    socket = io.connect(url, {
        query: { op: "login", user: JSON.stringify(user) }
    });
    const opData = "getUserByLogin";
    const opAvatar = "getUserAvatarByLogin";
    socket.on('connect', () => {
        setUserData(opData);
        setUserAvatar(opAvatar);
    });
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
            const opData = "getUserByToken";
            const opAvatar = "getUserAvatarByToken";
            socket.on('connect', () => {
                setUserData(opData);
                setUserAvatar(opAvatar);
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

function setUserAvatar(op: string) {
    socket.on(op, (image: any) => {
        const loginStore: any = store;
        if (image) {
            loginStore['_mutations']['user/setUserDataAvatar'][0](image);
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

function getUserByToken(token: string) {
    const op = "findUserByToken";
    socket.emit(op, token);
}

function followUser(userUID: number) {
    const token = getToken();
    const op = "followUser";
    const data = {token, data: userUID};
    socket.emit(op, data);
}

function unFollowUser(userUID: number) {
    const token = getToken();
    const op = "unFollowUser";
    const data = {token, data: userUID};
    socket.emit(op, data);
}

function getToken() {
    const accountStore: any = store;
    const token = accountStore['state']['account']['token'] || localStorage.getItem('token');
    
    return token;    
}

function getUserFollowList(userId: string, typeList: string) {
    const op = "getUserFollowList";
    const token = getToken();
    const data = {userId, typeList, token};
    socket.emit(op, data);
}

function getUserMutualList(userId: string) {
    const op = "getUserMutuals";
    const token = getToken();
    const data = {userId, token};
    socket.emit(op, data);
}

function addIndirect(indirect: object) {
    const token = getToken();
    const op = "addIndirect";
    const data = {token, data: indirect};
    socket.emit(op, data);
}

function getIndirects(options) {
    const token = getToken();
    const op = "getIndirects";
    const data = {token, options};
    socket.emit(op, data);
}

function setNewProfilePic(image: File) {
    const token = getToken();
    const op = "setNewProfilePic";
    const data = {token, image, fileName: image.name};
    socket.emit(op, data);
}




export const socketOperations = {
    login,
    getSocket,
    reconnect,
    createUser,
    updateUserData,
    getUserByUserId,
    followUser,
    unFollowUser,
    getUserByToken,
    getUserFollowList,
    getUserMutualList,
    addIndirect,
    getIndirects,
    setNewProfilePic
} 