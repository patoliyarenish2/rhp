export default {
    ChangePassword: (data) => window.axios.post('change_password', data),
    UpdateProfile: (data) => window.axios.post('update_profile', data),
}