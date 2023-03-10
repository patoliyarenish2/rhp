import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

import { user } from "./user.module";
import { address } from "./address.module";
import { faq } from "./faq.module";
import { order } from './order.module';
import { promocode } from './promocode.module';
import { restaurant } from './restaurant.module';
//import { setting } from './setting.module';
import { product } from './product.module';

Vue.use(Vuex)
const vuexLocalStorage = new VuexPersist({
    key: 'vuex', // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
    // Function that passes the state and returns the state with only the objects you want to store.
    reducer: state => {
        return state;
    },
    // Function that passes a mutation and lets you decide if it should update the state in localStorage.
    // filter: mutation => (true)
})
export default new Vuex.Store({
    plugins: [vuexLocalStorage.plugin],
    modules: {
        user,
        address,
        faq,
        order,
        promocode,
        restaurant,
        // setting,
        product,
    }
})