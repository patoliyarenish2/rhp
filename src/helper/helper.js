
import config from "../config";
import router from "../router"
import moment from 'moment';
import Vue from "vue";

const debounce = (func, delay) => { 
    let debounceTimer 
    return function() { 
        const context = this
        const args = arguments 
        clearTimeout(debounceTimer) 
              debounceTimer 
        = setTimeout(() => func.apply(context, args), delay) 
    } 
} 

const set_axios_defaults = (token) => {
    window.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    window.axios.defaults.headers.common["Accept"] = "application/json";
    window.axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    window.axios.interceptors.response.use(
        res => res,
        debounce(err => {
            if (err.response.status === 401) {
                if (window.axios.defaults.headers.common.Authorization !== 'Bearer null'){
                    Vue.toasted.error('Session Expired. Try login again',{
                        duration: 5000
                    });
                }
                remove_token()
                Vue.prototype.$auth.user = null;
                router.push({name: 'sign-in'}).catch(()=>{})
            } else if (err.response.status === 500) {
                Vue.toasted.error('Server error',{
                    duration: 5000
                });
                // throw new Error(`${err.config.url} not found`);
            } else if (err.response.status === 422) {
                var message = Object.values(err.response.data.errors)[0][0]
                Vue.toasted.error(message,{
                    duration: 5000
                });
                //throw new Error(`${err.config.url} not found`);
            }
            throw err;
        },500)
    );
}
  
const set_user_detail = (details) => {
    // localStorage.setItem('user_details', JSON.stringify(details));
}
  
const get_user_detail = () => {
    return Vue.prototype.$auth.setting;
    //return JSON.parse(localStorage.getItem('user_details'));
}
  
const set_user = (user) => {
    // localStorage.setItem('user', JSON.stringify(user));
    // if(user.setting && user.setting.settings){
    //   localStorage.setItem('setting', JSON.stringify(user.setting.settings));
    // }
}

const get_date_format = () => {
    return Vue.prototype.$auth.setting.date_format.substr(0,5);
}

const get_currency = () => {
    const setting = get_user_detail();
    if(setting) {
      return setting.currency;
    }
    return '&#x20B9;';
}
  
const get_decimal = () => {
    const setting = get_user_detail();
    if(setting) {
      return setting.decimal || 2;
    }
    return '&#x20B9;';
}

const get_user = () => {
    return Vue.prototype.$auth.user;
    // return JSON.parse(localStorage.getItem('user'));
} 

const get_languages = () => {
    return Vue.prototype.$auth.langauges;
}

const multipart_headers = () => ({'Content-Type': 'multipart/form-data'})
//const multipart_headers = () => ({'Content-Type': 'multipart/form-data; charset=utf-8; boundary=' + Math.random().toString().substr(2)})

// error messages
const error_message = (message) => Vue.toasted.error(message,{duration: 5000});
const success_message = (message) => Vue.toasted.success(message,{duration: 5000});
const toastr_message = (message, type) => Vue.toasted[type](message,{duration: 5000});

const get_permitted_menus = (menus, permissions) => {
    const pmsns = permissions.map(p => p.name);
    window.access = pmsns;
    return menus.reduce((acc, menu) => {
        const newmenu = {...menu};
        const items = menu.subItems.filter(item => item.required_permission == 'All' || pmsns.includes(item.required_permission))
        if (items.length > 0) {
            newmenu.subItems = [...items]
            return acc.concat(newmenu);
        }
        return acc;
    },[])
}

const check_permission = (permission) => {
    return window.access.includes(permission)
}

const set_partner = (partner) => localStorage.setItem('partner',JSON.stringify(partner))

const get_partner = () => JSON.parse(localStorage.getItem('partner'))

const set_token = (token) => localStorage.setItem('token',token)
const get_token = () => localStorage.getItem('token')
const remove_token = () => localStorage.removeItem('token');

const set_partner_login = () => localStorage.setItem('partner_login','1')
const get_partner_login = () => localStorage.getItem('partner_login')
const remove_partner_login = () => localStorage.removeItem('partner_login')

const remove_get_user = () => localStorage.removeItem('user')
const remove_get_user_detail = () => localStorage.removeItem('user_details')

const remove_partner = () => localStorage.removeItem('partner')
const remove_partner_details = () => localStorage.removeItem('partner_details')

const replaceByDefault = (event) => (event.target.src = config.no_image)

const generate_csv = (data, name) => {
    var blob = new Blob([ data ], { "type" : "csv/plain" });
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = name
    link.click()
}

const order_statuses = {
    placed: "Placed",
    inkitchen: "InKitchen",
    readytoserve: "ReadyToServe",
    ontheway: "OnTheWay",
    arrived: "Arrived",
    delivered: "Delivered",
    cancelled: "Cancelled",
    scheduled: "Scheduled",
    paymentpending: "PaymentPending",
    paymentfailure: "PaymentFailure",
}
  
const date_ranges = () =>{
    let today = new Date()
    today.setHours(0, 0, 0, 0)
        
    return {
      'Today': [moment().startOf('day').toDate(), moment().startOf('day').toDate()],
      'Yesterday': [moment().subtract(1,'day').startOf('day').toDate(), moment().subtract(1,'day').startOf('day').toDate()],
      'Last 7 days': [moment().subtract(1,'week').startOf('day').toDate(), moment().startOf('day').toDate()],
      'Last 30 Days': [moment().subtract(30,'days').startOf('day').toDate(),moment().startOf('day').toDate()],
      'This year': [new Date(today.getFullYear(), 0, 1), new Date(today.getFullYear(), 11, 31)],
      'Last month': [new Date(today.getFullYear(), today.getMonth() - 1, 1), new Date(today.getFullYear(), today.getMonth(), 0)],
    }
}
  
const toKebabCase = str =>
    str && str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');

export { 
    debounce,
    set_axios_defaults,
    set_user_detail,
    set_user,
    get_user,
    get_user_detail,
    error_message,
    success_message,
    toastr_message,
    multipart_headers,
    get_permitted_menus,
    check_permission,
    replaceByDefault,
    get_currency,
    get_decimal,
    set_partner,
    get_partner,
    set_partner_login,
    get_partner_login,
    remove_get_user,
    remove_get_user_detail,
    remove_partner_login,
    remove_partner,
    remove_partner_details,
    generate_csv,
    set_token,
    get_token,
    remove_token,
    get_languages,
    order_statuses,
    date_ranges,
    toKebabCase,
    get_date_format
};