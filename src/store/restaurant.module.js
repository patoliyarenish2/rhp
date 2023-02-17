import Cuisines from '../apis/cuisine';
import Banner from '../apis/banner';
import Vendor from '../apis/vendor';

const state = {
    cuisines: [],
    restaurantDetails: {},
    filters: {
        sort: '',
        cuisine_id: []
    },
    restaurantTimingList: [],
    restaurantRatingList: [],
    restaurantDetailsBySlug: {},
};
const actions = {
    getCuisines({ commit }, data) {
        return Cuisines.getCuisineList(data).then(response => {
            if (response.data.code == 200) {
                commit("getCuisines", response.data.Result)
            }
            return response.data;
        })
    },
    getRestaurants({ commit }, data) {
        return Vendor.getVendorListing(data).then(response => {
            if (response.data.code == 200) {
                //commit("getRestaurants", response.data.Result)
                return response.data;
            }
            return response.data;
        })
    },
    getRestaurantDetails({ commit }, data) {
        return Vendor.getVendorDetails(data).then(response => {
            if (response.data.code == 200) {
                commit('getRestaurantDetails', response.data.Result)
            }
            return response.data;
        })
    },
    getBanners({ commit }, data) {
        return Banner.getBanner(data).then(response => {
            if (response.data.code == 200) {
                return response.data;
            }
            return response.data;
        })
    },
    updateFilterSort({ commit }, data) {
        commit('updateFilterSort', data);
    },
    updateFilterCuisines({ commit }, data) {
        commit('updateFilterCuisines', data);
    },
    getVendorOnOffStatus({ commit }, data) {
        return Vendor.getVendorOnOffStatus(data).then(response => {
            if (response.data.code == 200) {
                commit('getVendorOnOffStatus', response.data.Result)
            }
            return response.data;
        });
    },
    checkVendorRadius({ commit }, data) {
        return Vendor.checkVendorRadius(data).then(response => {
            if (response.data.code == 200) {
                commit('checkVendorRadius', response.data.Result)
            }
            return response.data;
        });
    },
    checkVendorMenuWithPrice({ commit }, data) {
        return Vendor.checkVendorMenuWithPrice(data).then(response => {
            if (response.data.code == 200) {
                commit('checkVendorMenuWithPrice', response.data.Result)
            }
            return response.data;
        });
    },
    getRestaurantTimingData({ commit }, data) {
        return Vendor.getRestaurantTiming(data).then(response => {
            if (response.data.code == 200) {
                commit('restaurantTimingList', response.data.Result)
            }
            return response.data;
        });
    },
    getRestaurantRating({ commit }, data) {
        return Vendor.getRestaurantRating(data).then(response => {
            if (response.data.code == 200) {
                commit('restaurantRatingList', response.data.Result)
            }
            return response.data;
        });
    },

    getRestaurantBanner({ commit }, data) {
        return Vendor.getBannerRestaurant(data).then(response => {
            if (response.data.code == 200) {
                return response.data;
                //commit('getRestaurantBannerList', response.data.Result)
            }
            return response.data;
        });
    },

    getSearchRestaurant({ commit }, data) {
        return Vendor.searchRestaurant(data).then(response => {
            if (response.data.code == 200) {
                //commit('getSearchRestaurantList', response.data.Result)
                return response.data;
            }
            return response.data;
        });
    },

    getSearchRestaurantItem({ commit }, data) {
        return Vendor.searchRestaurantItems(data).then(response => {
            if (response.data.code == 200) {
                //commit('getSearchRestaurantItemList', response.data.Result)
                return response.data;
            }
            return response.data;
        });
    },

    getRestaurantBySlug({ commit }, data) {
        return Vendor.getRestaurantDetailsBySlug(data).then(response => {
            if (response.data.code == 200) {
                commit('getRestaurantBySlug', response.data.Result)
            }
            return response.data;
        })
    },

    getBusinessCategoryList({ commit }, data) {
        return Vendor.getRestaurantCategorylisting(data).then(response => {
            if (response.data.code == 200) {
                //commit('getCategoryList', response.data.Result)
                return response.data;
            }
            return response.data;
        })
    },

    getRestaurantMenuCategoryList({ commit }, data) {
        return Vendor.getRestaurantMenuCategory(data).then(response => {
            if (response.data.code == 200) {
                return response.data;
            }
            return response.data;
        })
    },

    getItemSoldStatusList({ commit }, data) {
        return Vendor.getItemsSoldStatus(data).then(response => {
            if (response.data.code == 200) {
                return response.data;
            }
            return response.data;
        })
    },

    getMenuWiseItem({ commit }, data) {
        return Vendor.MenuWiseItems(data).then(response => {
            if (response.data.code == 200) {
                return response.data;
            }
            return response.data;
        })
    },
    getCategoryWiseMenu({ commit }, data) {
        return Vendor.getRestaurantMenuWiseCategory(data).then(response => {
            if (response.data.code == 200) {
                return response.data;
            }
            return response.data;
        })
    },
    getSearchRestaurantCategoryItem({ commit }, data) {
        return Vendor.searchRestaurantCategoryItem(data).then(response => {
            if (response.data.code == 200) {
                return response.data;
            }
            return response.data;
        });
    },


};
const mutations = {
    getCuisines(state, cuisines) {
        state.cuisines = [...cuisines]
    },
    // getRestaurants(state, restaurants) {
    //     state.restaurants = [...restaurants]
    // },
    getRestaurantDetails(state, restaurantDetails) {
        state.restaurantDetails = restaurantDetails
    },
    updateFilterSort(state, data) {
        state.filters.sort = data;
    },
    updateFilterCuisines(state, data) {
        state.filters.cuisine_id = data;
    },
    restaurantTimingList(state, data) {
        state.restaurantTimingList = data;
    },
    restaurantRatingList(state, data) {
        state.restaurantRatingList = data;
    },
    getRestaurantBySlug(state, data) {
        state.restaurantDetailsBySlug = data;
    },
};
const getters = {
    cuisines: state => state.cuisines,
    restaurantDetails: state => state.restaurantDetails,
    filters: state => state.filters,
    restaurantTimingList: state => state.restaurantTimingList,
    restaurantRatingList: state => state.restaurantRatingList,
    restaurantDetailsBySlug: state => state.restaurantDetailsBySlug,
};

export const restaurant = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};