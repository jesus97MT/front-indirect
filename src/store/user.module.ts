import { userService } from '../services';
import router from '../router/index';
import Vue from 'vue';
import { Observable } from 'rxjs';


const state = {
    user: {
        userUID: 0,
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
        userUID: 0,
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
    getOwnUserdata({ commit }: any, onDestroy: Promise<any>) {
        const token: any = localStorage.getItem('token') || null;
        if (token) {
            var updateData$: any = userService.getUserData(token);
            updateData$ = updateData$.subscribe((user: any) => {
                commit('setUserData', user);
            });

            onDestroy.then((resolve: any) => {
                const event = "getUserByToken";
                updateData$.unsubscribe();
                userService.stopListenSocket(event);
            });
        }
    },

    saveUserData({ commit }: any, user: any) {
        userService.updateUserData(user)
            .then(
                data => {
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

    findPublicProfile({ commit }: any, data: any) {
        const userId = data.userId;
        const onDestroy: Promise<any> = data.promise;
        var updateData$: any = userService.getUserDataByUserId(userId, commit);

        updateData$ = updateData$.subscribe((user: any) => {
            commit('setPublicProfile', user);
        });

        onDestroy.then((resolve: any) => {
            const event = "getUserByUserId";
            updateData$.unsubscribe();
            userService.stopListenSocket(event);
        })

    },

    followUser({ commit }: any, userUID: number) {
        userService.followUser(userUID)
            .then(
                (data: any) => {
                    commit('setFollow', { toFollowUID: data[1], fromFollowUID: data[0] });
                },
                error => {
                    console.log(error);
                }
            );
    },

    unFollowUser({ commit }: any, userUID: number) {
        userService.unFollowUser(userUID)
            .then(
                (data: any) => {
                    commit('setUnFollow', { toUnFollowUID: data[1], fromUnFollowUID: data[0] });
                },
                error => {
                    console.log(error);
                }
            );
    },
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

    setFollow(state: any, users: any) {
        const fromFollowUID = users.fromFollowUID
        const toFollowUID = users.toFollowUID

        state.userSearched.followers.push(fromFollowUID);
        state.user.following.push(toFollowUID);
    },

    setUnFollow(state: any, users: any) {
        const fromUnFollowUID = users.fromUnFollowUID
        const toUnFollowUID = users.toUnFollowUID
        const index = state.userSearched.followers.indexOf(fromUnFollowUID);

        if (index > -1) {
            state.userSearched.followers.splice(index, 1);
        }

        const index2 = state.user.following.indexOf(toUnFollowUID);
        if (index2 > -1) {
            state.user.following.splice(index2, 1);
        }

    }

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