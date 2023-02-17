import Login from '../apis/login';
import Profile from '../apis/profile';
import Logout from '../apis/logout';
import SignUp from '../apis/signup';

const state = {};
const actions = {
    checkMobileNumber({ commit }) {
        return Login.CheckMobileNumber({
            vendor_id: this.$auth.getVendorId(),
            user_role: '1',
            mobile_number: '',
            is_langauge: 'en'
        }).then(response => {
            commit('checkMobileNumber', response.data);
        })
    },

    checkLogin({ commit }, data) {
        return Login.CheckLogin(data).then(response => {
            if (response.data.code == 200) {
                //commit('checkLogin', response.data.user_details)
                window.axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.user_details.token}`;
                return response.data;
            }
            return response.data;
        })
    },

    checkLogout({ commit }, data) {
        return Logout.CheckLogout(data).then(response => {
            if (response.data.code == 200) {
                //commit('checkLogin', {})
                delete window.axios.defaults.headers.common["Authorization"];
                return response.data;
            }
            return response.data;
        })
    },

    changePassword({ commit }, data) {
        return Profile.ChangePassword(data).then(response => {
            if (response.data.code == 200) {
                return response.data;
                //commit('changePassword', response.data)
            }
            return response.data;
        })
    },

    updateSignUp({ commit }, data) {
        return SignUp.checkSignUp(data).then(response => {
            if (response.data.code == 200) {
                // commit('updateSignUp', response.data.user_details)
                return response.data;
            }
            return response.data;
        })
    },

    updateUserDetails({ commit }, data) {
        return Profile.UpdateProfile(data).then(response => {
            if (response.data.code == 200) {
                //commit('updateUserDetails', response.data.user_details)
                return response.data;
            }
            return response.data;
        })
    },

    getUserDetailsData({ commit }, data) {
        return Login.getUserDetails(data).then(response => {
            if (response.data.code == 200) {
                //commit('getUserData', response.data);
                return response.data;
            }
            return response.data;
        })
    },


};
const mutations = {
    // checkMobileNumber(state, mobileNumber) {
    //     state.mobileNumber = mobileNumber
    // },
    // checkLogin(state, login) {
    //     state.login = login
    // },
    // updateUserDetails(state, userdetails) {
    //     state.login = {
    //         ...state.login,
    //         ...userdetails
    //     }
    // },
    // changePassword(state, password) {
    //     state.password = password
    // },
    // updateSignUp(state, signUp) {
    //     state.signUp = signUp
    // },
    // getUserData(state, userDetails) {
    //     state.userDetails = userDetails
    // }
};
const getters = {
    // logout: state => state.logout,
}

export const user = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};