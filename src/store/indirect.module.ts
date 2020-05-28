import { indirectService } from '../services';
import router from '../router/index';



const state = {
    indirect: {
        dateUpdated: "",
        text: "",
        ownerName: "",
        ownerID: "",
        ownerProfilePic: "",
    },
    indirects: []

};

const actions = {

    addIndirect({ commit }: any, newIndirect: object) {
        indirectService.addIndirect(newIndirect)
            .then(
                (data: any) => {
                    //commit('setAddIndirect', { toFollowUID: data[1], fromFollowUID: data[0] });
                    //alerta añadido?
                    console.log("addedIndirect")
                },
                error => {
                    console.log(error);
                }
            );
    },

    loadIndirects({ commit }: any) {
        indirectService.loadIndirect()
        .then(
            (data: any) => {
                commit('setIndirects', data);
                //alerta (?)
                console.log("loadIndirects")
            },
            error => {
                console.log(error);
            }
        );
    }

};


const mutations = {
    setIndirects(state: any, indirects: any) {
        console.log(indirects)
        state.indirects = [];
        state.indirects = indirects.reverse();
    }
};

const getters = {
    getIndirects(state: any) {
        return JSON.parse(JSON.stringify(state.indirects));
    }

}

export const indirect = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};