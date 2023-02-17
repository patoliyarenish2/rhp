import OrderHistory from '../apis/orderhistory';
import OrderDetail from '../apis/orderdetails';
import Order from '../apis/order';

const state = {
    onGoingOrders: [],
    pastOrder: [],
    orderDetail: [],
    place_order_data: [],
    isPickupDelivery: '-1'
};
const actions = {
    getOnGoingOrder({ commit }, data) {
        return OrderHistory.OnGoingOrders(data).then(response => {
            if (response.data.code == 200) {
                commit('getOnGoingOrder', response.data.Result)
            }
            return response.data;
        })
    },

    getPastOrder({ commit }, data) {
        return OrderHistory.PastOrders(data).then(response => {
            if (response.data.code == 200) {
                commit('getPastOrder', response.data.Result)
            }
            return response.data;
        })
    },

    viewOrderDetail({ commit }, data) {
        return OrderDetail.OrderDetails(data).then(response => {
            if (response.data.code == 200) {
                commit('viewOrderDetail', response.data.Result)
            }
            return response.data;
        })
    },

    placeOrder({ commit }, data) {
        return Order.placeOrder(data).then(response => {
            if (response.data.code == 200) {
                commit('placeOrder', response.data.Result)
            }
            return response.data;
        })
    },
    placeOrderData({ commit }, data) {
        commit('placeOrderData', data)
    },

    orderRatingData({ commit }, data) {
        return Order.addOrderRating(data).then(response => {
            if (response.data.code == 200) {
                //commit('orderRating', response.data.Result)
                return response.data;
            }
            return response.data;
        })
    },
    checkOrderRating({ commit }, data) {
        return Order.checkRating(data).then(response => {
            if (response.data.code == 200) {
                return response.data;
            }
            return response.data;
        })
    },
    reorderDataDetails({ commit }, data) {
        return Order.reorderDetails(data).then(response => {
            if (response.data.code == 200) {
                return response.data;
            }
            return response.data;
        })
    }


};
const mutations = {
    getOnGoingOrder(state, onGoingOrders) {
        state.onGoingOrders = [...onGoingOrders]
    },
    getPastOrder(state, pastOrder) {
        state.pastOrder = [...pastOrder]
    },
    viewOrderDetail(state, orderDetail) {
        state.orderDetail = [...orderDetail]
    },
    placeOrderData(state, orderData) {
        state.place_order_data = {...orderData };
    },
    clearPlaceOrderData(state) {
        state.place_order_data = [];
    },
    pickupdelivery(state, is_delivery) {
        state.isPickupDelivery = is_delivery;
    }
};
const getters = {
    onGoingOrders: state => state.onGoingOrders,
    pastOrder: state => state.pastOrder,
    orderDetail: state => state.orderDetail,
    place_order_data: state => state.place_order_data,
    isPickupDelivery: state => state.isPickupDelivery
}

export const order = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};