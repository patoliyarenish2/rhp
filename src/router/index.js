import Vue from 'vue'
import VueRouter from 'vue-router'
import User from './user/index'
import Restaurant from './restaurant/index'
import Address from './address/index'
import Order from './orders/index'
import Base from '../views/Base.vue'
Vue.use(VueRouter)
const routes = [
    ...User,
    ...Restaurant,
    ...Address,
    ...Order
]

const router = new VueRouter({
    mode: 'history',
    routes: [{
        base: '',
        component: Base,
        path: '/',
        children: routes
    }, {
        path: '/',
        redirect: '/',
    }],
    scrollBehavior(to, from, savedPosition) { return { x: 0, y: 0 } }

});

router.beforeEach((to, from, next) => {
    var noauth = ['sign-in', 'sign-up', 'Home', 'newhome', 'vendor', 'promo-code', 'banner-items', 'search', 'faq', 'privacypolicy', 'terms', 'support', 'forgot-password', 'category', 'details', 'qr', 'notfound'];
    if (!noauth.includes(to.name)) { //InAuthRoute
        if (!Vue.prototype.$auth || !Vue.prototype.$auth.user) {
            Vue.prototype.$auth.setUser((type) => {
                if (noauth.includes(type)) {
                    if (type == 'sign-in') { //Token not found
                        next({ name: type });
                    } else { //User set now
                        next();
                    }
                } else {
                    next({ name: type });
                }
            });
        } else {
            next();
        }
    } else { //NoAuthRoute
        next();
    }
});

export default router