import { userService } from '../services';

const state = {
    user: {
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
        console.log(user)
        userService.updateUserData(user)
            .then(
                data => {
                    console.log(user);
                    commit('setUserData', user);
                    //commit('loginSuccess', user);

                },
                error => {
                    //console.log("error")
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
};

const mutations = {
    setUserData(state: any, user: any) {
        // TO DO VALIDAR DATOS
        state.user = {};
        state.user = user;
    },

};

const getters = {
    getUserData(state: any, user: any) {
        return JSON.parse(JSON.stringify(state.user));
    },
    
}

export const user = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};