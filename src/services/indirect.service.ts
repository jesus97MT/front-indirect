//import config from 'config';//url
import { socketOperations } from '../socket/socket'
import { Observable, Subject } from 'rxjs';

export const indirectService = {
    addIndirect
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
