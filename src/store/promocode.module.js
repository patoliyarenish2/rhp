import PromoCode from '../apis/promocode';

const state = {};
const actions = {
    updatePromoCode({ commit }, data) {
        return PromoCode.show(data).then(response => {
            if (response.data.code == 200) {
                return response.data;
            }
            return response.data;
        })
    },
    promocodeRedeem({ commit }, data) {
        return PromoCode.couponRedeem(data).then(response => {
            if (response.data.code == 200) {
                return response.data;
            }
            return response.data;
        })
    }
};
const mutations = {};
const getters = {}

export const promocode = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};