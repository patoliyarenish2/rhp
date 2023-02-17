export default {
    addressList: (data) => window.axios.post('list_shiping_address', data),
    deleteAddress: (data) => window.axios.post('delete_shiping_address', data),
    addAddress: (data) => window.axios.post('add_shiping_address', data),
    updateAddress: (data) => window.axios.post('update_shiping_address', data),
    primaryAddress: (data) => window.axios.post('get_user_primary_address', data),
    setPrimaryAddress: (data) => window.axios.post('set_primary_address', data)

}