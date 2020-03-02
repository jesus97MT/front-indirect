//import config from 'config';//url
import { socketOperations } from '../socket/socket'
import socket from '../socket/socket'
export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    updateUserData,
    getUserDataByUserId
};

function login(email: string, password: string) {
    socketOperations.login(email, password);
    var socket = socketOperations.getSocket()

    return new Promise((resolve, reject) => {
        socket.on('error', (error: any) => {
            socket.close();
            reject(null);
        })
        socket.on("getToken", (token: any) => {
            localStorage.setItem('user', email);
            localStorage.setItem('token', token);
            console.log('CONTECTADOSSS')
            resolve({ email, token })
        })
    });
}

function logout() {
    var socket = socketOperations.getSocket();
    socket.emit("logout");
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

function register(email: string, password: string, userId: string) {
    socketOperations.createUser(email, password, userId);
    var socket = socketOperations.getSocket();
    
    return new Promise((resolve, reject) => {
        socket.on('error', (error: any) => {
            socket.close();
            reject(null);
        })
        socket.on("getToken", (token: any) => {
            localStorage.setItem('user', email);
            localStorage.setItem('token', token);
            console.log('CONTECTADOSSS')
            resolve({ email, token })
        })
    });
}

function updateUserData(user: any) {
    socketOperations.updateUserData(user);
    var socket = socketOperations.getSocket();
    
    return new Promise((resolve, reject) => {
        resolve(true)
        /*socket.on('error', (error: any) => {
            socket.close();
            reject(null);
        })
        socket.on("getToken", (token: any) => {
            localStorage.setItem('user', email);
            localStorage.setItem('token', token);
            console.log('CONTECTADOSSS')
            resolve({ email, token })
        })*/
    });
}

function getUserDataByUserId(userId: string) {
    socketOperations.getUserByUserId(userId);
    var socket = socketOperations.getSocket()

    return new Promise((resolve, reject) => {
        socket.on('error', (error: any) => {
            socket.close();
            reject(null);
        })
        socket.on("getUserByUserId", (user: any) => {
            console.log('user')
            resolve({ user })
        })
    });
}

function getAll() {

}


function getById() {

}

function update() {

}

function _delete() {

}

function handleResponse(response: any) {
    /*return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });*/
}