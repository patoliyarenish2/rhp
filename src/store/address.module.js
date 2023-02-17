import Address from '../apis/address';

const state = {
    addressList: [],
    deleteAddress: [],
    addAddress: {},
    primaryAddress: {}
};
const actions = {

    getAddress({ commit }, data) {
        return Address.addressList(data).then(response => {
            if (response.data.code == 200) {
                commit('getAddress', response.data.Result)
            }
            return response.data;
        })
    },

    removeAddress({ commit }, data) {
        return Address.deleteAddress(data).then(response => {
            if (response.data.code == 200) {
                commit("removeAddress", response.data.Result)
            }
            return response.data;
        })
    },

    newAddress({ commit }, data) {
        return Address.addAddress(data).then(response => {
            if (response.data.code == 200) {
                commit("newAddress", response.data.Result)
            }
            return response.data;
        })
    },

    updateNewAddress({ commit }, data) {
        return Address.updateAddress(data).then(response => {
            if (response.data.code == 200) {
                //commit("updateNewAddress", response.data.Result)
                return response.data
            }
            return response.data;
        })
    },

    getPrimaryAddress({ commit }, data) {
        return Address.primaryAddress(data).then(response => {
            if (response.data.code == 200) {
                commit("primaryAddress", response.data.Result)
            }
            return response.data;
        })
    },
    setPrimaryAddress({ commit }, data) {
        return Address.setPrimaryAddress(data).then(response => {
            if (response.data.code == 200) {
                commit("primaryAddress", response.data.Result)
            }
            return response.data;
        });
    }
};
const mutations = {
    getAddress(state, addressList) {
        state.addressList = [...addressList]
    },
    newAddress(state, addAddress) {
        state.addAddress = addAddress
    },
    primaryAddress(state, primaryAddress) {
        state.primaryAddress = primaryAddress
    }
};
const getters = {
    addressList: state => state.addressList,
    deleteAddress: state => state.deleteAddress,
    addAddress: state => state.addAddress,
    primaryAddress: state => state.primaryAddress,
}

export const address = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};