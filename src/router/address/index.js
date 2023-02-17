const Address = () => import('../../views/Address.vue')
const AddAddress = () => import('../../views/AddAddress.vue')
const UpdateAddress = () => import('../../views/UpdateAddress.vue')
const address = [
    {
        path: 'address',
        name: 'address',
        component: Address
    },
    {
        path: 'add-address',
        name: 'add-address',
        component: AddAddress
    },
    {
        path: 'update-address/:shiping_id',
        name: 'update-address',
        component: UpdateAddress
    }
]

export default address;