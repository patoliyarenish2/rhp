import Faq from '../apis/faq';
import PromoCode from '../apis/promocode';
import Login from '../apis/login';
import Profile from '../apis/profile';
import Logout from '../apis/logout';
import SignUp from '../apis/signup';
import OrderHistory from '../apis/orderhistory';
import OrderDetail from '../apis/orderdetails';
import Settings from '../apis/setting';
import Address from '../apis/address';
import Cuisines from '../apis/cuisine';
import Banner from '../apis/banner';
import Vendor from '../apis/vendor';

 const updateFaq = ({commit},data) => {
    return Faq.show(data).then(response => {
        if(response.data.code == 200) {
            commit('updateFaq', response.data.Result);
        }
        return response.data;
    })
  }
  const updatePromoCode = ({commit},data) => {
    return PromoCode.show(data).then(response => {
        if(response.data.code == 200) {
            commit('updatePromoCode', response.data.Result);
        }
        return response.data;
    })
  }
  
  const checkMobileNumber = ({commit},) => {
     return Login.CheckMobileNumber({
          vendor_id : '40818',
          user_role : '1',
          mobile_number: '',
      }).then(response => {
        commit('checkMobileNumber', response.data);
    })
 }

 const checkLogin = ({commit}, data) => {
    return Login.CheckLogin(data).then(response => {
      if (response.data.code == 200) {
        commit('checkLogin', response.data.user_details)
        window.axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.user_details.token}`;        
      }
      return response.data;
  })
 }

 const checkLogout = ({commit}, data) => {
     return Logout.CheckLogout(data).then(response => {
       if(response.data.code == 200) {
          commit('checkLogin', {})
          delete window.axios.defaults.headers.common["Authorization"];
       }
       return response.data;
      })
 }

 const changePassword = ({commit}, data) => {
      return Profile.ChangePassword(data).then(response => {
          if(response.data.code == 200) {
            commit('changePassword', response.data)
          }
          return response.data;
      })
 }

 const updateSignUp = ({commit}, data) => {
    return SignUp.checkSignUp(data).then(response => {
        if(response.data.code == 200) {
            commit('updateSignUp', response.data.user_details)
        }
        return response.data;
    })
 }

 const getOnGoingOrder = ({commit}, data) => {
      return OrderHistory.OnGoingOrders(data).then(response => {
          if(response.data.code == 200) {
              commit('getOnGoingOrder', response.data.Result)
          }
          return response.data;
      })
 }

 const updateUserDetails = ({commit}, data) => {
      return Profile.UpdateProfile(data).then(response => {
          if(response.data.code == 200) {
              commit('updateUserDetails', response.data.user_details)
          }
          return response.data;
      })
 }

 const getPastOrder = ({commit}, data) => {
        return OrderHistory.PastOrders(data).then(response => {
            if(response.data.code == 200) {
                commit('getPastOrder', response.data.Result)
            }
            return response.data;
        })
 }

 const viewOrderDetail = ({commit}, data) => {
        return OrderDetail.OrderDetails(data).then(response => {
            if(response.data.code == 200) {
                commit('viewOrderDetail', response.data.Result)
            }
            return response.data;
        })
 }

 const getSettings = ({commit}, data) => {
     return Settings.settings(data).then(response => {
         if(response.data.code == 200) {
             commit('getSettings', response.data.settings)
         }
         return response.data;
     })
 }

 const getAddress = ({commit}, data) => {
    return Address.addressList(data).then(response => {
        if(response.data.code == 200) {
            commit('getAddress', response.data.Result)
        }
        return response.data;
    })
 }
 const removeAddress = ({commit}, data) => {
     return Address.deleteAddress(data).then(response => {
         if(response.data.code == 200) {
             commit("removeAddress", response.data.Result)
         }
         return response.data;
     })
 }

 const newAddress = ({commit}, data) => {
    return Address.addAddress(data).then(response => {
        if(response.data.code == 200) {
            commit("newAddress", response.data.Result)
        }
        return response.data;
    })
}

const updateNewAddress = ({commit},data) => {
    return Address.updateAddress(data).then(response => {
            if(response.data.code == 200) {
                commit("updateNewAddress", response.data.Result)
            }
            return response.data;
    })
}

const getCuisines = ({commit},data) => {
    return Cuisines.getCuisineList(data).then(response => {
        if(response.data.code == 200) {
            commit("getCuisines", response.data.Result)
        }
        return response.data;
    })
}

const getRestaurants = ({commit},data) => {
    return Vendor.getVendorListing(data).then(response => {
        if(response.data.code == 200) {
            commit("getRestaurants", response.data.Result)
        }
        return response.data;
    })
}

const getRestaurantDetails = ({commit},data) => {
    return Vendor.getVendorDetails(data).then(response => {
        if(response.data.code == 200) {
            commit('getRestaurantDetails', response.data.Result)
        }
        return response.data;
    })
}

const getBanners = ({commit},data) => {
    return Banner.getBanner(data).then(response => {
        if(response.data.code == 200) {
            commit('getBanners',response.data.Result)
        }
        return response.data;
    })
}

 const fetchAccessToken = ({commit}) => {
      commit('updateAccessToken', localStorage.getItem('accessToken'));
 }

export {
    updateFaq,
    updatePromoCode,
    checkMobileNumber,
    checkLogin,
    fetchAccessToken,
    checkLogout,
    changePassword,
    updateSignUp,
    getOnGoingOrder,
    updateUserDetails,
    getPastOrder,
    viewOrderDetail,
    getSettings,
    getAddress,
    removeAddress,
    newAddress,
    getCuisines,
    getRestaurants,
    getRestaurantDetails,
    updateNewAddress,
    getBanners
}