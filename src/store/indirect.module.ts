import { indirectService } from '../services';
import router from '../router/index';



const state = {
    indirect: {

    },
    newIndirect: {

    }

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

};


const mutations = {

};

const getters = {


}

export const indirect = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};