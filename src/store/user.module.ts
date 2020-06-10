import { userService } from '../services';
import router from '../router/index';



const state = {
    user: {
        data: {
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
        avatar: null
        
    },
    userSearched: {
        data: {
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
        avatar: null
        
    },
    followList: {
        data: [],
        avatars: {}
    },
    mutualList: []
};

const actions = {
    getOwnUserdata({ commit }: any, onDestroy: Promise<any>) {
        const token: any = localStorage.getItem('token') || null;
        if (token) {
            var updateData$: any = userService.getUserData(token);
            updateData$ = updateData$.subscribe((data: any) => {
                if (data && data.userUID) {
                    commit('setUserData', data);

                } else {
                    commit('setUserDataAvatar', data);
                }
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

    findPublicProfile({ commit }: any, data: any) {
        const userId = data.userId;
        const onDestroy: Promise<any> = data.promise;
        var updateData$: any = userService.getUserDataByUserId(userId, commit);

        updateData$ = updateData$.subscribe((data: any) => {

            if (data === "UserNotFound") {
                router.push('/profile-not-found');
            } else {
                if (data && data.userUID) {
                    commit('setPublicProfile', data);
                } else {
                    if (data)
                        commit('setPublicUserAvatar', data);
                    else
                        commit('setPublicUserAvatar', null);

                }
            }

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
                    //console.log(error);
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
                    //console.log(error);
                }
            );
    },

    findUserFollowList({ commit }: any, data: any) {
        const userId = data.userId;
        const typeList = data.typeList;

        userService.getUserFollowList(userId, typeList).then(
            (data: any) => {
                const followList = data[0];
                const avatars = data[1];
                
                if (followList)
                    commit('setFollowListData', followList);
                else
                    commit('setFollowListData', []);

                if (avatars)
                    commit('setFollowListAvatar', avatars);
                else
                    commit('setFollowListAvatar', []);


            },
            error => {
                commit('setFollowListData', []);
                commit('setFollowListAvatar', {});
                //console.log(error);
            }
        );

        /*onDestroy.then((resolve: any) => {
            const event = "getUserByUserId";
            updateFollowList$.unsubscribe();
            userService.stopListenSocket(event);
        })*/

    },

    findUserMutuals({ commit }: any, data: any) {
        const userId = data.userId;

        userService.getUserMutualList(userId).then(
            (mutualList: any) => {
                commit('setMutualList', mutualList);
            },
            error => {
                commit('setMutualList', []);
                //console.log(error);
            }
        );

        /*onDestroy.then((resolve: any) => {
            const event = "getUserByUserId";
            updateFollowList$.unsubscribe();
            userService.stopListenSocket(event);
        })*/

    },

    saveNewProfilePic({ commit }: any, image: File) {

        userService.setNewProfilePic(image).then(
            (response: any) => {
                commit('setNewProfilePic', image);
            },
            error => {
                commit('setNewProfilePic', null);
                //console.log(error);
            }
        );

        /*onDestroy.then((resolve: any) => {
            const event = "getUserByUserId";
            updateFollowList$.unsubscribe();
            userService.stopListenSocket(event);
        })*/

    },


};


const mutations = {
    setUserData(state: any, user: any) {
        // TO DO VALIDAR DATOS
        state.user.data = {};
        state.user.data = user;
    },

    setUserDataAvatar(state: any, image: any) {
        const blob = new Blob([image]);
        const imageUrl = URL.createObjectURL(blob);

        state.user.avatar = null;
        state.user.avatar = imageUrl;
    },

    setPublicProfile(state: any, user: any) {
        // TO DO VALIDAR DATOS
        state.userSearched.data = {};
        state.userSearched.data = user;

    },

    setPublicUserAvatar(state: any, image: any) {
        if (image) {
            const blob = new Blob([image]);
            const imageUrl = URL.createObjectURL(blob);
    
            state.userSearched.avatar = null;
            state.userSearched.avatar = imageUrl;
        } else {
            state.userSearched.avatar = null;
        }
        
    },

    setFollow(state: any, users: any) {
        //const fromFollowUID = users.fromFollowUID
        const toFollowUID = users.toFollowUID

        // if (state.userSearched.followers && state.userSearched.followers.length)
        //     state.userSearched.followers.push(fromFollowUID);
        if (state.user.data.following && state.user.data.following.length) {
            state.user.data.following.push(toFollowUID);
        } else {
            state.user.data.following = [toFollowUID];
        }

    },

    setUnFollow(state: any, users: any) {
        //const fromUnFollowUID = users.fromUnFollowUID
        const toUnFollowUID = users.toUnFollowUID

        /*if (state.userSearched.followers) {
            const index = state.userSearched.followers.indexOf(fromUnFollowUID);

            if (index > -1) {
                state.userSearched.followers.splice(index, 1);
            }
        }*/

        if (state.user.data.following && state.user.data.following.length) {
            const index2 = state.user.data.following.indexOf(toUnFollowUID);
            if (index2 > -1) {
                state.user.data.following.splice(index2, 1);
            }
        }
    },

    setFollowListData(state: any, list: any) {
        // TO DO VALIDAR DATOS
        state.followList.data = [];
        state.followList.data = list;
    },

    setFollowListAvatar(state: any, images: any) {
        // TO DO VALIDAR DATOS
        const imagesURL: any = {};
        Object.keys(images).forEach((uid: any) => {
            var blob = new Blob([images[uid]]);
            imagesURL[uid] = URL.createObjectURL(blob);
        });

        state.followList.avatars = {};
        state.followList.avatars = imagesURL;
    },

    setMutualList(state: any, list: any) {
        // TO DO VALIDAR DATOS
        state.mutualList = []
        state.mutualList = list;
    },

    setNewProfilePic(state: any, image: any) {
        console.log(image)
        const blob = new Blob([image]);
        const imageUrl = URL.createObjectURL(blob);

        state.user.avatar = null;
        state.user.avatar = imageUrl;
    }

    

};

const getters = {
    getUserData(state: any, user: any) {
        return JSON.parse(JSON.stringify(state.user));
    },
    getPublicProfile(state: any, user: any) {
        return JSON.parse(JSON.stringify(state.userSearched));
    },

    getFollowList(state: any, user: any) {
        return JSON.parse(JSON.stringify(state.followList));
    },

    getFollowListData(state: any, user: any) {
        return JSON.parse(JSON.stringify(state.followList.data));
    },

    getFollowListAvatars(state: any, user: any) {
        return JSON.parse(JSON.stringify(state.followList.avatars));
    },

    getMutualList(state: any, user: any) {
        return JSON.parse(JSON.stringify(state.mutualList));
    }

}

export const user = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};