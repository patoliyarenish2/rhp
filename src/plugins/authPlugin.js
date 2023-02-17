let instance;

import { error_message, remove_token, set_axios_defaults, set_token, get_token } from '../helper/helper';
import config from './../config'
import * as VueGoogleMaps from 'vue2-google-maps';
import Login from "../apis/login";
import Logout from "../apis/logout";
import Vue from 'vue';
import firebase from "firebase";
import GoogleAuth from '@/config/google_oAuth.js'
// import { initFbsdk } from '@/config/facebook_oAuth.js'

export const useAuth = (options = {}) => {
    if (instance) return instance;
    instance = new Vue({
        data() {
            return {
                config: config,
                user: null,
                setting: null,
                languages: [],
                logging_done: false,
                restaurant_id: 0,
                google_map_key: null,
                init: false
            }
        },
        methods: {
            login(request, callback) {
                Login.CheckLogin(request).then((response) => {
                    if (response.data.code == 200) {
                        let token = response.data.user_details.token;
                        if (token) {
                            this.user = response.data.user_details;
                            this.setting = response.data.settings;
                            this.logging_done = true;
                            set_token(token)
                            set_axios_defaults(token)
                            callback('Home')
                        } else {
                            this.$toasted.error(response.data.msg, { duration: 5000 });
                        }
                    } else {
                        this.$toasted.error(response.data.msg, { duration: 5000 });
                    }
                });
            },
            logout(data, callback) {
                Logout.CheckLogout(data).then(res => {
                    this.logging_done = false;
                    this.user = '';
                    remove_token();
                    callback('sign-in')
                });
            },
            setUser(callback, token = "") {
                if (token || get_token()) {
                    set_axios_defaults(token || get_token());
                    Login.getUserDetails({
                        is_langauge: 'en'
                    }).then(response => {
                        if (response.data.code == 200) {
                            this.logging_done = true;
                            this.user = response.data.user_details;
                            this.setting = response.data.settings;
                            this.setVenodorIdInLocalStorage(this.setting.vendor_id);
                            this.getGoogleMapApiKey();
                            //this.setFireBaseSettings();
                            callback('Home')
                        } else {
                            this.logging_done = false;
                            this.user = null;
                        }
                    });
                } else {
                    this.logging_done = false;
                    callback('sign-in')
                }
            },
            setUserDetails(data) {
                this.user = data;
            },
            setRegisterUserDetails(data, token = '') {
                this.user = data;
                this.logging_done = true;
                set_token(token)
                set_axios_defaults(token)
            },
            getUserDetails() {
                return this.user;
            },
            setVendorSettings(data) {
                Login.getVendorSettings(data).then(response => {
                    if (response.data.code == 200) {
                        this.setting = response.data.settings;
                        this.init = true;
                        if (this.setting) {
                            this.setRootStyle();
                            // document.querySelector('title').innerHTML = this.getAppName();
                            // document.querySelector('[type="image/x-icon"]').setAttribute('href', this.getAppFavicon());
                            localStorage.setItem('cntrycode', this.base64_encode(this.setting.country_code));
                            this.setVenodorIdInLocalStorage(this.setting.vendor_id);
                            this.getGoogleMapApiKey();
                            this.setFireBaseSettings();
                            this.setSocialLoginAuthKey();
                            this.setFbAppID();
                        }
                    } else {
                        this.setting = null;
                        this.init = true;
                        this.removeVendorIdFromLocalStorage();
                        return [];
                    }
                });
            },
            setRootStyle() {
                if (this.setting && this.setting.web_settings) {
                    let styleEl = document.createElement('style');
                    let themePrimaryColor = this.setting.web_settings.theme_primary_color ? this.setting.web_settings.theme_primary_color : '#000';

                    let themeSecondaryColor = this.setting.web_settings.theme_secondary_color ? this.setting.web_settings.theme_secondary_color : '#eee';

                    let fontPrimaryColor = this.setting.web_settings.text_primary_color ? this.setting.web_settings.text_primary_color : '#333';

                    let fontSecondaryColor = this.setting.web_settings.text_secondary_color ? this.setting.web_settings.text_secondary_color : '#828282';

                    let newRgbPrimary = (this.hexToRgb(themePrimaryColor).r+','+this.hexToRgb(themePrimaryColor).g+','+this.hexToRgb(themePrimaryColor).b);
                    
                    styleEl.innerHTML = ':root{--theme-primary:' + newRgbPrimary + ';--theme-secondary:' + themeSecondaryColor + ' ; --theme-font-primary:' + fontPrimaryColor + ' ;--theme-font-secondary:' + fontSecondaryColor + ';}';
                    document.head.appendChild(styleEl);

                    const descEl = document.querySelector('head meta[name="description"]');
                    const titleEl = document.querySelector('head title');
                    const keywordEl = document.querySelector('head meta[name="keywords"]');

                    descEl.setAttribute('content', this.setting.web_settings.meta_description ? this.setting.web_settings.meta_description : '');

                    titleEl.textContent = this.setting.web_settings.title ? this.setting.web_settings.title : '';

                    keywordEl.setAttribute('content', this.setting.web_settings.keywords ? this.setting.web_settings.keywords : '');

                    document.querySelector('[type="image/x-icon"]').setAttribute('href', this.getAppFavicon());
                }
            },
            hexToRgb(hex) {
              var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
              return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
              } : null;
            },
            getVendorId() {
                return (this.setting && this.setting.vendor_id) ? this.setting.vendor_id : this.getVendorIdFromLocalStorage();
            },
            setVenodorIdInLocalStorage(vnid) {
                if (vnid) {
                    localStorage.setItem('vnid', this.base64_encode(vnid));
                }
            },
            getVendorIdFromLocalStorage() {
                let vnid = localStorage.getItem('vnid');
                return vnid ? this.base64_decode(vnid) : 0;
            },
            removeVendorIdFromLocalStorage() {
                localStorage.removeItem('vnid');
            },
            setLanguages(languages) {
                this.langauges = languages;
            },
            getLangauge(abbr) {
                return this.langauges.find(l => l.abbrivation == abbr);
            },
            getTaxName() {
                return this.setting && this.setting.tax_name_primary_lang || 'Service tax';
            },
            getRestaurantName() {
                return this.setting && this.setting.restaurant_name || 'Vendor';
            },
            setRestauranID(restaurant_id) {
                this.restaurant_id = restaurant_id;
            },
            getAppName() {
                return (this.setting && this.setting.app_name) ? this.setting.app_name : 'Deonde';
            },
            getAppFavicon() {
                return (this.setting && this.setting.web_logo_image_path) ? this.setting.web_logo_image_path + '/' + this.setting.web_settings.fevicon_icon : '';
            },
            getAppLogo() {
                return (this.setting && this.setting.app_logo) ? this.config.applogo + this.setting.app_logo : '';
            },
            getFlatIcon() {
                return (this.setting && this.setting.flat_icon) ? this.config.applogo + this.setting.flat_icon : '';
            },
            getGoogleMapApiKey() {
                window.google_map_key = (this.setting && this.setting.google_map_key) ? this.setting.google_map_key : '';
                if (this.google_map_key !== window.google_map_key) {
                    Vue.use(VueGoogleMaps, {
                        load: {
                            key: window.google_map_key, //config.google_key,
                            libraries: "places",
                        },
                        installComponents: true,
                    }).$gmapApiPromiseLazy().then(() => {
                        this.google_map_key = window.google_map_key;
                    });
                }
                return window.google_map_key;
            },
            setSocialLoginAuthKey() {
                if (this.setting.web_settings && this.setting.web_settings.google_client_id) {
                    const gauthOption = {
                        clientId: this.setting.web_settings.google_client_id,
                        scope: 'profile email',
                        prompt: 'select_account'
                    }
                    Vue.use(GoogleAuth, gauthOption);
                }

            },
            setFbAppID() {
                return this.setting && this.setting.web_settings && this.setting.web_settings.fb_app_id;
            },
            setFireBaseSettings(appName = '') {
                if (
                    (this.setting) &&
                    (this.setting.firebase_apiKey && this.setting.firebase_apiKey != '') &&
                    (this.setting.firebase_authDomain && this.setting.firebase_authDomain != '') &&
                    (this.setting.firebase_databaseURL && this.setting.firebase_databaseURL != '') &&
                    (this.setting.firebase_projectId && this.setting.firebase_projectId != '') &&
                    (this.setting.firebase_storageBucket && this.setting.firebase_storageBucket != '') &&
                    (this.setting.firebase_messagingSenderId && this.setting.firebase_messagingSenderId != '') &&
                    (this.setting.firebase_appId && this.setting.firebase_appId != '')
                ) {
                    const config = {
                        apiKey: this.setting.firebase_apiKey,
                        authDomain: this.setting.firebase_authDomain,
                        databaseURL: this.setting.firebase_databaseURL,
                        projectId: this.setting.firebase_projectId,
                        storageBucket: this.setting.firebase_storageBucket,
                        messagingSenderId: this.setting.firebase_messagingSenderId,
                        appId: this.setting.firebase_appId
                    };
                    if (appName != '') {
                        firebase.initializeApp(config, appName);
                    } else {
                        firebase.initializeApp(config);
                    }
                }
            },

        }
    });
    return instance;
}

export default {
    install(Vue, options = {}) {
        Vue.prototype.$auth = useAuth(options);
    }
};