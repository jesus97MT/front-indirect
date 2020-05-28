//import config from 'config';//url
import { socketOperations } from '../socket/socket'
import { Observable, Subject } from 'rxjs';

export const indirectService = {
    addIndirect,
    loadIndirect
};



function addIndirect(newIndirect: object) {
    socketOperations.addIndirect(newIndirect);
    var socket = socketOperations.getSocket()

    return new Promise((resolve, reject) => {
        socket.on('error', (error: any) => {
            socket.close();
            reject(null);
        })
        socket.on("onAddIndirect", (response: any) => {
            resolve(response);
        })
    });
}


function loadIndirect() {
    socketOperations.getIndirects();
    var socket = socketOperations.getSocket()

    return new Promise((resolve, reject) => {
        socket.on('error', (error: any) => {
            socket.close();
            reject(null);
        })
        socket.on("onGetIndirects", (response: any) => {
            resolve(response);
        })
    });
}
