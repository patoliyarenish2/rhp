const Orders = () =>
    import ('../../views/Orders.vue')
const OrderDetails = () =>
    import ('../../views/OrderDetails.vue')
const ReviewCart = () =>
    import ('../../views/ReviewCart.vue')
const Payment = () =>
    import ('../../views/Payment.vue')
const OrderStatus = () =>
    import ('../../views/OrderStatus.vue')
const Rating = () =>
    import ('../../views/Rating.vue')

const order = [{
        path: 'orders',
        name: 'orders',
        component: Orders
    },
    {
        path: 'order-details/:order_id',
        name: 'order-details',
        component: OrderDetails
    },
    {
        path: 'order-status/:order_id',
        name: 'order-status',
        component: OrderStatus
    },
    {
        path: 'rating/:order_id',
        name: 'rating',
        component: Rating
    },
    {
        path: 'review-cart',
        name: 'review-cart',
        component: ReviewCart
    },
    {
        path: 'payment',
        name: 'payment',
        component: Payment
    }
]

export default order;