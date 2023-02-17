const baseUrl = window.location.protocol + "//" + window.location.hostname + window.location.pathname;
const image_baseUrl = 'https://storage.googleapis.com/deonde-prod/';
export default {
    appurl: baseUrl,
    base_folder: +window.location.pathname, //'/deonde/', // put base folder path here
    coupon: image_baseUrl + 'media/Coupon/',
    applogo: image_baseUrl + 'media/foodapp/original/',
    api_url: 'https://api.deonde.co/api/v1/',
    //api_url: 'http://34.93.104.230/deondeapi/api/v1/',
    google_key: window.google_map_key //'AIzaSyBrRMClJGHRoAHnihqH_uGE_8DXDClGWA4'
}