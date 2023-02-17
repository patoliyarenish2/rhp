import axios from 'axios';
let user = JSON.parse(localStorage.getItem('vuex'));
let token = user.user.login.token;

const Api = axios.create({
        baseURL : process.env.VUE_API_URL,
        headers : {
                'Authorization' : `Bearer ${token}`
        }
});

export default Api;