import Faq from '../apis/faq';

const state = {
    faqs: []
};
const actions = {
    updateFaq({ commit }, data){
        return Faq.show(data).then(response => {
            if (response.data.code == 200) {
                commit('updateFaq', response.data.Result);
            }
            return response.data;
        })
    }
};
const mutations = {
    updateFaq(state, faqs) {
        state.faqs = [...faqs];
    }
};
const getters = { 
    faqs: state => state.faqs
}

export const faq = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};