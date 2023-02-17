export default {
    MenuProductList: (data) => window.axios.post('restaurantcategorymenus', data),
    RestaurantMenusItemDetails: (data) => window.axios.post('restaurant_menus_details', data),
    RestaurantInfo: (data) => window.axios.post('get_restaurant_detail', data),

}