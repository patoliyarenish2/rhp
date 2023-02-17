export default {
    show: (data) => window.axios.post('couponlisting', data),
    couponRedeem: (data) => window.axios.post('coupon_redeem', data)
}