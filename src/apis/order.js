export default {
    placeOrder: (data) => window.axios.post('place_order', data),
    viewOrderDetails: (data) => window.axios.post('view_order_details', data),
    getOrderStatus: (data) => window.axios.post('get_order_status', data),
    addOrderRating: (data) => window.axios.post('add_rating', data),
    checkRating: (data) => window.axios.post('check_rating', data),
    reorderDetails: (data) => window.axios.post('reorder_details', data),

}