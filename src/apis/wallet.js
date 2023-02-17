export default {
    gerUserWalletHistory: (data) => window.axios.post('get_user_wallet_history', data),
    razorpayRechargeWalletApi: (data) => window.axios.post('razorpay-recharge-wallet', data),
    paypalRechargeWalletApi: (data) => window.axios.post('paypal-recharge-wallet', data),
    stripeRechargewalletApi: (data) => window.axios.post('stripe-rechargewallet', data),
    getUserWalletAmount: (data) => window.axios.get('get_user_wallet_amount', data),

}