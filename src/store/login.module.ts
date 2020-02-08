import { userService } from '../services';
import router from '../router/index';

const user = localStorage.getItem('user') || {};
const token = localStorage.getItem('token') || {};
const state = user && !(Object.entries(user).length === 0 && user.constructor === Object)
    ? { status: { loggedIn: true }, user, token }
    : { status: {}, user: null, token: null };

const actions = {
    login({ dispatch, commit }:any, { email, password }:any) {
        console.log(email)
        console.log(password)
        commit('loginRequest', { email });
    
        userService.login(email, password)
            .then(
                user => {
                    console.log(user);
                    commit('loginSuccess', user);
                    router.push('/');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }: any) {
        userService.logout();
        commit('logout');
        router.push('/login');
    },
    register({ dispatch, commit }: any, { email, password }:any) {
        commit('registerRequest', user);
    
        userService.register(email, password)
            .then(
                user => {
                    commit('registerSuccess', user);
                    //router.push('/');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Registration successful', { root: true });
                    })
                },
                error => {
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    }
};

const mutations = {
    loginRequest(state:any, user:string) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state:any, user:any) {
        state.status = { loggedIn: true };
        state.user = user.email;
        state.token = user.token;
    },
    loginFailure(state:any) {
        state.status = {};
        state.user = null;
    },
    
    logout(state:any) {
        state.status = {};
        state.user = null;
    },/*
    registerRequest(state, user) {
        state.status = { registering: true };
    },
    registerSuccess(state, user) {
        state.status = {};
    },
    registerFailure(state, error) {
        state.status = {};
    }*/
};

export const login = {
    namespaced: true,
    state,
    actions,
    mutations
};