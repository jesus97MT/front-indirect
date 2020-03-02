import { userService } from '../services';

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

    }
};

const actions = {
    saveUserData({ commit }: any, user: any) {
        userService.updateUserData(user)
            .then(
                data => {
                    console.log(user);
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

    getPublicProfile({ commit }: any, userId: any) {
        userService.updateUserData(user)
        .then(
            data => {
                console.log(user);
                commit('setUserData', user);
                //commit('loginSuccess', user);

            },
            error => {
                console.log("error")
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

};

const getters = {
    getUserData(state: any, user: any) {
        console.log(state.user)
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