import { userService } from '../services';
import router from '../router/index';


const state = {
    user: {
        userId: "",
        name: "",
        surname: "",
        email: "",
        date: "",
        followers: 0,
        following: 0,
        profilePicUrl: ""
    },
    userSearched: {
        userId: "",
        name: "",
        surname: "",
        email: "",
        date: "",
        followers: 0,
        following: 0,
        profilePicUrl: ""
    }
};

const actions = {
    saveUserData({ commit }: any, user: any) {
        userService.updateUserData(user)
            .then(
                data => {
                    console.log('setUserData');
                    commit('setUserData', user);
                    //commit('loginSuccess', user);

                },
                error => {
                    console.log("error")
                    //commit('loginFailure', error);
                    //dispatch('alert/error', error, { root: true });
                }
            );

    },
    resetUserData({ commit }: any) {
        commit('setUserData', state.user);
    },
    saveUserProfilePicture({ commit }: any, { picture }: any) {

        commit('setUserData', user);
    },

    findPublicProfile({ commit }: any, userId: any) {
        userService.getUserDataByUserId(userId)
        .then(
            (data: any) => {
                const user = data.user;
                commit('setPublicProfile', user);
                //commit('loginSuccess', user);

            },
            error => {
                router.push('/profile-not-found');
                console.log("Profile not found")
                //commit('loginFailure', error);
                //dispatch('alert/error', error, { root: true });
            }
        );
    }
};

const mutations = {
    setUserData(state: any, user: any) {
        // TO DO VALIDAR DATOS
        state.user = {};
        state.user = user;
    },
    setPublicProfile(state: any, user: any) {
        // TO DO VALIDAR DATOS
        state.userSearched = {};
        state.userSearched = user;

    },

};

const getters = {
    getUserData(state: any, user: any) {
        return JSON.parse(JSON.stringify(state.user));
    },
    getPublicProfile(state: any, user: any) {
        return JSON.parse(JSON.stringify(state.userSearched));
    },

}

export const user = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};