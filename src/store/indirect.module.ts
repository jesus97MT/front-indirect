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
    indirects: {
        data: [],
        avatars: {}
    }

};

const actions = {

    addIndirect({ commit }: any, newIndirect: object) {
        indirectService.addIndirect(newIndirect)
            .then(
                (data: any) => {
                    //commit('setAddIndirect', { toFollowUID: data[1], fromFollowUID: data[0] });
                    //alerta añadido?
                },
                error => {
                    console.log(error);
                }
            );
    },

    loadIndirects({ commit }: any, countScroll?:number) {
        indirectService.loadIndirect(countScroll)
        .then(
            (data: any) => {
                const indirects = data[0];
                const avatars = data[1];

                if (indirects)
                    commit('setIndirectsData', indirects);
                else
                    commit('setIndirectsData', []);

                if (avatars)
                    commit('setIndirectsAvatars', avatars);
                else
                    commit('setIndirectsAvatars', []);
            },
            error => {
                console.log(error);
            }
        );
    }

};


const mutations = {
    setIndirectsData(state: any, indirects: any) {
        const oldData = JSON.parse(JSON.stringify(state.indirects.data));
        
        state.indirects.data = [];
        state.indirects.data = oldData.concat(indirects);
    },

    setIndirectsAvatars(state: any, images: any) {
        const imagesURL: any = {};
        Object.keys(images).forEach((uid: any) => {
            var blob = new Blob([images[uid]]);
            imagesURL[uid] = URL.createObjectURL(blob);
        });
        
        state.indirects.avatars = [];
        state.indirects.avatars = imagesURL;
    }

    
};

const getters = {
    getIndirects(state: any) {
        return JSON.parse(JSON.stringify(state.indirects));
    },

    getIndirectsData(state: any) {
        return JSON.parse(JSON.stringify(state.indirects.data));
    },

    getIndirectsAvatars(state: any) {
        return JSON.parse(JSON.stringify(state.indirects.avatars));
    }

}

export const indirect = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};