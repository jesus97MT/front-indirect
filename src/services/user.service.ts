//import config from 'config';//url
import { socketOperations } from '../socket/socket'
import socket from '../socket/socket'
import { Observable, Subject } from 'rxjs';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    updateUserData,
    getUserDataByUserId,
    followUser,
    unFollowUser,
    getUserData,
    stopListenSocket,
    getUserFollowList
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
            //console.log('CONTECTADOSSS')
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
            //console.log('CONTECTADOSSS')
            resolve({ email, token })
        })
    });
}

function getUserData(token: string) {
    socketOperations.getUserByToken(token);
    var socket = socketOperations.getSocket();

    return Observable.create((subject: Subject<any>) => {
        socket.on('error', (error: any) => {
            socket.close();
            subject.next(null);
        });

        socket.on("getUserByToken", (user: any) => {
            subject.next(user);
        })
    })

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

function getUserDataByUserId(userId: string, commit: any) {
    socketOperations.getUserByUserId(userId);
    var socket = socketOperations.getSocket();

    return Observable.create((subject: Subject<any>) => {
        socket.on('error', (error: any) => {
            socket.close();
            subject.next(null);
        });

        socket.on("getUserByUserId", (user: any) => {
            subject.next(user);
        })
    })

}

function followUser(userUID: number) {
    socketOperations.followUser(userUID);
    var socket = socketOperations.getSocket()

    return new Promise((resolve, reject) => {
        socket.on('error', (error: any) => {
            socket.close();
            reject(null);
        })
        socket.on("onFollowUser", (response: any) => {
            resolve(response);
        })
    });
}

function unFollowUser(userUID: number) {
    socketOperations.unFollowUser(userUID);
    var socket = socketOperations.getSocket()

    return new Promise((resolve, reject) => {
        socket.on('error', (error: any) => {
            socket.close();
            reject(null);
        })
        socket.on("onUnFollowUser", (response: any) => {
            resolve(response);
        })
    });
}

function getUserFollowList(userId: string, typeList: string) {
    socketOperations.getUserFollowList(userId, typeList);
    var socket = socketOperations.getSocket();

    return new Promise((resolve, reject) => {
        socket.on('error', (error: any) => {
            socket.close();
            reject(null);
        });
        socket.on("getFollowList", (followList: any) => {
            resolve(followList);
        });
    });
}

function stopListenSocket(event: string) {
    var socket = socketOperations.getSocket();
    socket.off(event);
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