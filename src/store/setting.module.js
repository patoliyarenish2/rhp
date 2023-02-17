import Settings from '../apis/setting';

const state = {
    settings: {}
};
const actions = {
    getsetting({ commit }, vendor_id) {
        return Settings.settings(vendor_id).then(response => {
            if (response.data.code == 200) {
                commit('getSettings', response.data.settings)
            }
            return response.data;
        })
    }

};
const mutations = {
    getSettings(state, settings) {
        state.settings = settings
    }
};
const getters = {
    settings: state => state.settings
}

export const setting = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};