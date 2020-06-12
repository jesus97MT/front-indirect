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

    loadIndirects({ commit }: any, options:any) {
        indirectService.loadIndirect(options)
        .then(
            (data: any) => {
                const indirects = data[0];
                const avatars = data[1];

                if (indirects)
                    commit('setIndirectsData', {indirects, direction: options.direction});
                else
                    commit('setIndirectsData', {indirects: [], direction: options.direction});

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
    setIndirectsData(state: any, data:any) {
        const indirects = data.indirects;
        const direction = data.direction;
        if (!direction) { //añadir abajo
            const oldData = JSON.parse(JSON.stringify(state.indirects.data));
        
            state.indirects.data = [];
            state.indirects.data = oldData.concat(indirects);
        } else { //añadir arriba
            const oldData = JSON.parse(JSON.stringify(state.indirects.data));
            state.indirects.data = [];
            state.indirects.data = indirects.concat(oldData);
        }
        
    },

    setIndirectsAvatars(state: any, images: any) {
        const imagesURL: any = {};
        Object.keys(images).forEach((uid: any) => {
            var blob = new Blob([images[uid]]);
            imagesURL[uid] = URL.createObjectURL(blob);
        });

        const oldsAvatars = state.indirects.avatars;
        state.indirects.avatars = {...imagesURL, ...oldsAvatars}
    },

    resetIndirectsData(state: any) {
        state.indirects.data = [];
    },

    resetIndirectsAvatars(state: any) {
        state.indirects.avatars = {};
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