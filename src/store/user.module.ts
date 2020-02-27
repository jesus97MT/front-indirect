
const state = {user:{
    name: "",
    surname: "",
    email: "",
    date: "",
    followers: 0,
    following: 0,
    profilePicUrl: ""

}};

const actions = {
    recconect({ commit }: any, {user}:any) {

        commit('setUserData', user);
    },
};

const mutations = {
    setUserData(state:any, user:any) {
        state.user = user
    },
    
};

export const user = {
    namespaced: true,
    state,
    actions,
    mutations
};