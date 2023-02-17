export default {
    CheckMobileNumber: (data) => window.axios.post('check_user_details', data),
    CheckLogin: (data) => window.axios.post('login', data),
    getUserDetails: (data) => window.axios.post('get_user_details_web', data),
    getVendorSettings: (data) => window.axios.post('get-vendor-settings', data),
    customerChangePassword: (data) => window.axios.post('customer_change_password', data),
    loginGooglefacebook: (data) => window.axios.post('facebook_login', data),
}