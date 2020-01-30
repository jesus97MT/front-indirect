//import config from 'config';//url
import io from 'socket.io-client'
export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(email: string, password:string) {
    const user = {email, password}
    var socket = io.connect("http://localhost:8000", {
        query: {op: "login", user: JSON.stringify(user)}
    }); 

    return new Promise((resolve, reject) => {
        socket.on('error', (error: any) => {
            socket.close();
            reject(null);
        })
        socket.on("getToken", (token: any) => {
            localStorage.setItem('user', email);
            localStorage.setItem('token', token);
            console.log('CONTECTADOSSS')
            resolve({email, token})
        })
    });
}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

function register(email: string, password:string) {
    const user = {email, password}
    console.log(user)
    var socket = io.connect("http://localhost:8000", {
        query: {op: "createUser", user: JSON.stringify(user)}
    }); 

    return new Promise((resolve, reject) => {
        socket.on('error', (error: any) => {
            socket.close();
            reject(null);
        })
        socket.on("getToken", (token: any) => {
            localStorage.setItem('user', email);
            localStorage.setItem('token', token);
            console.log('CONTECTADOSSS')
            resolve({email, token})
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

function handleResponse(response:any) {
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