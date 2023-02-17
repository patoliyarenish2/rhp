const Front = () =>
    import ('../../views/Front.vue')
const Home = () =>
    import ('../../views/Home.vue')
const ItemDetail = () =>
    import ('../../views/ItemDetail.vue')
const PromoCode = () =>
    import ('../../views/PromoCode.vue')
const BannerItems = () =>
    import ('../../views/BannerItems.vue')
const MasterSearch = () =>
    import ('../../views/MasterSearch.vue')
const CategoryList = () =>
    import ('../../views/CategoryList.vue')
const Information = () =>
    import ('../../views/Information.vue')
const QR = () =>
    import ('../../views/Qr.vue')

const restaurant = [{
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/',
        name: 'newhome',
        component: Front
    },
    {
        path: 'vendor/:restaurant_name',
        name: 'vendor',
        component: ItemDetail
    },
    {
        path: 'promo-code',
        name: 'promo-code',
        component: PromoCode
    },
    {
        path: 'banner-items/:banner_id',
        name: 'banner-items',
        component: BannerItems
    },
    {
        path: 'search',
        name: 'search',
        component: MasterSearch
    },
    {
        path: 'category/:category_id',
        name: 'category',
        component: CategoryList
    },
    {
        path: 'details',
        name: 'details',
        component: Information
    },
    {
        path: 'qr/:restaurantid',
        name: 'qr',
        component: QR
    },
]

export default restaurant;