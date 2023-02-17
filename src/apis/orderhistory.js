
export default {
    OnGoingOrders: (data) => window.axios.post('ongoing_orders',data),
    PastOrders: (data) => window.axios.post('order_history',data)
}