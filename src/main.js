import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import "@/plugins/firebase";
// import firebase from "firebase";
import Vuelidate from "vuelidate";
import Toasted from 'vue-toasted';
import VueCountryCode from "vue-country-code-select";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import axios from 'axios';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import config from './config';
import Moment from 'moment';
import * as VueGoogleMaps from 'vue2-google-maps';
import jQuery from 'jquery';
import infiniteScroll from 'vue-infinite-scroll';
import VueClipboard from 'vue-clipboard2';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '@/assets/css/all.css';
import '@/assets/css/style.css';
import '@/assets/css/responsive.css';
import AuthPlugin from './plugins/authPlugin';
//import GoogleAuth from '@/config/google_oAuth.js'
import VueSkeletonLoader from 'skeleton-loader-vue';

// const gauthOption = {
//     clientId: '217696033954-gfa6cpd3ut98ndv90ompge0306m2lm3n.apps.googleusercontent.com',
//     scope: 'profile email',
//     prompt: 'select_account'
// }

window.axios = axios;
require('dotenv').config()
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Vuelidate);
Vue.use(VueCountryCode);
Vue.use(Moment);
Vue.use(infiniteScroll);
Vue.use(VueClipboard);
Vue.use(VueSweetalert2);
//Vue.use(GoogleAuth, gauthOption);
Vue.use('vue-skeleton-loader', VueSkeletonLoader);


window.jQuery = jQuery;
Vue.use(Toasted, {
    duration: 4000,
    position: 'top-right',
    action: {
        onClick: (e, toastObject) => {
            toastObject.goAway(0);
        }
    }
});

Vue.use(AuthPlugin);
Vue.config.productionTip = false

window.axios.defaults.baseURL = config.api_url;
window.axios.defaults.headers.common['Content-Type'] = 'application/json';

new Vue({
    router,
    store,
    directives: { infiniteScroll },
    render: h => h(App),
}).$mount('#app')