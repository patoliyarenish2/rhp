<template>
    <div class="signup-buttons">
        <div id="fb-root"></div>
        <a v-if="is_googleLogin && is_googleID" href="javascript:void(0)" class="google-signup" @click.prevent="loginWithGoogle">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><title>Google</title><g fill="none" fill-rule="evenodd"><path fill="#4285F4" d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"></path><path fill="#34A853" d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"></path><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"></path><path fill="#EA4335" d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"></path></g></svg>
            Google
        </a>
        <a v-if="is_facebookLogin && is_fbID" href="javascript:void(0)" class="facebook-signup" @click.prevent="loginWithFacebook">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#3578E5"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            Facebook
        </a>
    </div>
</template>

<script>
import { initFbsdk } from '@/config/facebook_oAuth.js'
import router from '../router'
import Login from "../apis/login";

export default {
  name: 'login_signup_social',
  data() {
    return {
      is_facebookLogin: false,
      is_googleLogin: false,
      is_fbID : false,
      is_googleID :false
    };
  },
  mounted () {
    
    setTimeout(() => {
      let arrayLogin = this.$auth.setting.app_signin_page;
      arrayLogin.forEach((elm,index) => {
      this.is_facebookLogin = elm.facebook == 1 ? true:false;
      this.is_googleLogin = elm.google == 1 ? true:false;
      });
      this.is_googleID = this.$auth.setting && this.$auth.setting.web_settings.google_client_id != '' &&  this.$auth.setting.web_settings.google_client_id != null ?true:false;
      this.is_fbID = this.$auth.setting && this.$auth.setting.web_settings.fb_app_id != '' && this.$auth.setting.web_settings.fb_app_id != null ?true:false;
      initFbsdk(this.$auth.setFbAppID());
    }, 1200);
    
  },
  methods: {
    loginWithGoogle () {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
        let profile = GoogleUser.getBasicProfile();
        let requestData ={
            vendor_id:this.$auth.getVendorId(),
            is_langauge:'en',
            facebookid:'',
            user_email: profile.getEmail(),
            gplusid:GoogleUser.getId(),
            devicetype:'web',
            devicetoken:'',
            unique_id:''
        };
        Login.loginGooglefacebook(requestData).then((response) => {
            if (response.data.code == 200) {
                this.$auth.setRegisterUserDetails(response.data.user_details, response.data.user_details.token);
                this.$toasted.success("Signup successfully", { duration: 2000 });
                this.$router.push({ name: "address" });
            } else {
                localStorage.setItem('email',profile.getEmail());
                this.$router.push({ path: '/sign-up' });
            }
        })
        })
        .catch(error => {
          console.log('error', error)
        })
    },

    loginWithFacebook () {
        let VID = this.$auth.getVendorId();
        let vm = this;
      window.FB.login(response => {
        if (response && response.authResponse) {
          if (response.status === 'connected') {
            window.FB.api('/me', 'get', { access_token: response.authResponse.accessToken, fields: 'id,name,email' }, function(response) {
                let requestData ={
                    vendor_id: VID,
                    is_langauge:'en',
                    facebookid:response.id,
                    user_email: response.email,
                    gplusid:'',
                    devicetype:'web',
                    devicetoken:'',
                    unique_id:''
                };
                Login.loginGooglefacebook(requestData).then((response) => {
                    if (response.data.code == 200) {
                        vm.$auth.setRegisterUserDetails(response.data.user_details, response.data.user_details.token);
                        vm.$toasted.success("Signup successfully", { duration: 2000 });
                        vm.$router.push({ name: "address" });
                    } else {
                        localStorage.setItem('email',response.email);
                        vm.$router.push({ path: '/sign-up' });
                    }
                })
            });
          }else if (response.status === 'not_authorized') {
            this.$toasted.error('Please login into this app.', { duration: 2000 });
          }else {
            // The person is not logged into Facebook, so we're not sure if they are logged into this app or not.
            this.$toasted.error('Please login into Facebook.', { duration: 2000 });
        }
        }
      }, this.params)
    }
  }
}
</script>