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


function loadIndirect(options) {
    socketOperations.getIndirects(options);
    var socket = socketOperations.getSocket();

    const p1 = new Promise((resolve, reject) => {
        socket.on('error', (error: any) => {
            socket.close();
            reject(null);
        });

        socket.on("onGetIndirects", (response: any) => {
            console.log(response)
            resolve(response);
        });
        
    });

    const p2 = new Promise((resolve, reject) => {
        socket.on('error', (error: any) => {
            socket.close();
            reject(null);
        });

        socket.on("onGetIndirectsAvatars", (response: any) => {
            resolve(response);
        });
        
    });

    const promises = [p1,p2];
    return Promise.all(promises);
    
}
