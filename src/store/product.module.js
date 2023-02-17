import CategoryProduct from '../apis/product';

const state = {
    //CategoryProductList: [],
    cart: [],
    products: [],
    MenuProductList: [],

};
const actions = {
    // getCateoryProduct({ commit }, data) {
    //     return CategoryProduct.CategoryProductList(data).then(response => {
    //         if (response.data.code == 200) {
    //             commit('getCateoryProduct', response.data.Result)
    //         }
    //         return response.data;
    //     })
    // },
    getMenuProductList({ commit }, data) {
        return CategoryProduct.MenuProductList(data).then(response => {
            if (response.data.code == 200) {
                commit('getMenuProductList', response.data.Result)
            }
            return response.data;
        })
    },
    getProductDetails({ commit }, data) {
        return CategoryProduct.RestaurantMenusItemDetails(data).then(response => {
            if (response.data.code == 200) {
                commit('getProductDetails', response.data.Result)
            }
            return response.data;
        })
    },

    addProductToCart(context, product) {
        if (product.quantity > 0) {
            const cartItem = context.state.cart.find(item => item.item_id === product.item_id);
            let itemIndex = '';
            if (product.selectCustoizeID.length) {
                itemIndex = context.state.cart.findIndex((item) => {
                    if (product.item_id == item.item_id) {
                        if (product.selectCustoizeID) {
                            return item.selectCustoizeID.every(function(element) {
                                return product.selectCustoizeID.includes(element) && item.selectCustoizeID.length == product.selectCustoizeID.length;
                            });
                        }
                    }

                });
            }
            if (!cartItem || itemIndex == '-1') {
                //Push product
                if (!cartItem && cartItem && cartItem.item_id === product.item_id) {
                    product.itemQuntity = cartItem.quantity + product.quantity;
                } else {
                    product.itemQuntity = product.quantity;
                }
                context.commit('pushProductToCart', product);
            } else {
                //Increment Item Quantity
                if (itemIndex == '') {
                    itemIndex = context.state.cart.findIndex(item => item.item_id === product.item_id);
                    context.state.cart[itemIndex].quantity = cartItem.quantity + product.quantity;
                } else if (itemIndex >= 0) {
                    // itemIndex = context.state.cart.findIndex(item => item.item_id === product.item_id);
                    context.state.cart[itemIndex].quantity = cartItem.quantity + product.quantity;
                }
            }

        } else {
            alert("Product Quantity Not Available select other product");
        }
    },

    removeProductFromCart(context, product) {
        context.commit('removeProductFromCartItem', product);
    },

};

const mutations = {
    // getCateoryProduct(state, CategoryProductList) {
    //     state.CategoryProductList = [...CategoryProductList]
    // },
    getMenuProductList(state, products) {
        state.products = [...products]
    },
    getProductDetails(state, product) {
        state.product = [...product]
    },

    pushProductToCart(state, cartItem) {
        let quantity = 1;
        if (cartItem.quantity > 1) {
            quantity = cartItem.quantity;
        }
        state.cart.push({
            restaurant_id: cartItem.restaurant_id,
            item_id: cartItem.item_id,
            name: cartItem.item_name,
            price: cartItem.price,
            selected_type: cartItem.selected_type,
            quantity: quantity,
            itemTotalQuantity: cartItem.itemTotalQuantity,
            selectCustoizeID: cartItem.selectCustoizeID,
            itemQuntity: cartItem.itemQuntity,
            selectCustoizePrice: cartItem.selectCustoizePrice,
            item_type: cartItem.item_type,
            item_price: cartItem.item_price
        })
    },

    IncrementItemQuantity(state, index) {
        state.cart[index].quantity++;
    },
    decrementProductInventary(state, index) {
        state.cart[index].quantity--;
    },
    clearCartItems(state) {
        state.cart = [];
    },
    removeProductFromCartItem(state, index) {
        state.cart = state.cart.filter((item, key) => {
            return key !== index;
        })
    },


};

const getters = {
    //CategoryProductList: state = state.CategoryProductList
    cart: state => state.cart,
    cartTotal(state, getters) {
        return getters.cartProducts.reduce((total, product) =>
            total + product.price * product.quantity, 0)
    },
}

export const product = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}