<template>
  <div class="login-main">
    <nav-bar></nav-bar>
    <section class="login-start-main header-top pb-4">
      <div class="review-container login-container review-main text-capitalize position-relative">
        <div class="row">
          <div class="col-md-12 p-0">
            <div class="sign-main">
              <div class="sign-top plr15">
                <img :src="$auth.getFlatIcon()" />
                <h6 class="mb-1">Get Started with {{$auth.getAppName()}}</h6>
                <p v-if="showPassword == false">Sign in or Sign up</p>
                <p v-if="showPassword == true">Looks like you already have account with us</p>
              </div>
              <skeleton-loader-vue v-if="!is_emailLogin && !is_phoneLogin" type="string" class="email-signup" width="98%" height="54px"/>
              <div class="tab-cls-section" v-if="!is_display_button">
                <button v-if="is_phoneLogin" class="phone-signup" @click="swipeTab('phone')"><i class="fas fa-phone-alt"></i>Phone</button>
                <button v-if="is_emailLogin" class="email-signup" @click="swipeTab('email')"><i class="fas fa-envelope"></i>Email</button>
              </div>
              <div class="plr15 lgn-wth-emil" v-if="is_email">
                <div class="mt-4 position-relative" v-if="checkEmail">
                    <h6 class="mb-2">Enter Your Email</h6>
                    <div class="input-email">
                      <i class="fas fa-envelope"></i>
                      <input class="form-control mb-0 h50"
                        type="email"
                        id="email"
                        name="email"
                        v-model="$v.email.$model"
                        placeholder="Enter Email"
                        aria-label="email"
                        :class="{ 'is-invalid': $v.email.$error }"
                      />
                    </div>
                    <div class="tc-main">
                    <p>By doing sign up i agree <a href="/terms" target="_blank" class="lnk">Terms & Conditions</a> of {{$auth.getAppName()}}</p>
                  </div>
                  <div v-if="$v.mobile_number.$error" class="invalid-feedback">
                    <span v-if="!$v.mobile_number.required">Please enter Email</span>
                  </div>
                  
                </div>
                <div class="full-btn mt-4">
                  <button @click="checkEmail" v-if="is_email">Next</button>
                </div>
              </div>
              <div class="plr15" v-if="is_phone">
                <div class="number-boxs mt-4 position-relative" v-if="checkMobile">
                  <h6 class="mb-2">Enter Your Mobile Number</h6>
                  <vue-country-code
                    :enabledCountryCode="true"
                    :enableSearchField="true"
                    :defaultCountry="country_code"
                    @onSelect="onSelect"
                  ></vue-country-code>
                  <i class="fas fa-phone-alt"></i>
                  <input class="form-control mb-0 h50"
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    v-model="$v.mobile_number.$model"
                    placeholder="Enter your Mobile Number"
                    aria-label="phone number"
                    :class="{ 'is-invalid': $v.mobile_number.$error }"
                    @keyup.enter="checkNumber"
                  />
                  <div class="tc-main">
                  <p>By doing sign up i agree <a href="/terms" target="_blank" class="lnk">Terms & Conditions</a> of {{$auth.getAppName()}}</p>
                  </div>
                  <div v-if="$v.mobile_number.$error" class="invalid-feedback">
                    <span v-if="!$v.mobile_number.required">Please enter phone number</span>
                  </div>
                  <div v-if="$v.mobile_number.$error" class="invalid-feedback">
                    <span v-if="!$v.mobile_number.numeric">Please enter Valid Number</span>
                  </div>
                  <div id="recaptcha-container"></div>
                </div>
                <div class="number-boxs mt-4 position-relative numbers-box" v-if="checkMobileNumber.code == 200 || showPassword == true">
                  <h6 class="mb-2">Enter Your Password</h6>
                  <i class="fas fa-lock"></i>
                  <input class="form-control mb-0 h50" :type="show ? 'text' : 'password'"  v-model="$v.password.$model" placeholder="Password" aria-label="Password" @keyup.enter="LogIn" :class="{ 'is-invalid': $v.password.$error }" />
                  <div class="eyeButton" @click="eyepassword"><i v-if="show" class="fas fa-eye-slash"></i><i v-else class="fas fa-eye"></i></div>
                  <div v-if="$v.password.$error" class="invalid-feedback">
                    <span v-if="!$v.password.required">Please enter password</span>
                  </div>
                  <div class="col-md-12 frgt-ps-lnk text-right"><a href="/forgot-password">Forgot Password?</a></div>
                </div>

                <div class="otp-boxs mt-4 position-relative" v-if="checkMobileNumber.code == 101 || showOtp == true" >
                  <h6 class="mb-2">Enter OTP</h6>
                  <form method="get" class="digit-group" data-group-name="digits" data-autosubmit="false" autocomplete="off">
                    <input type="text" id="digit-1" name="digit-1" data-next="digit-2" />
                    <input type="text" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1" />
                    <input type="text" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2" /><span class="splitter">&ndash;</span>
                    <input type="text" id="digit-4" name="digit-4" data-next="digit-5" data-previous="digit-3" />
                    <input type="text" id="digit-5" name="digit-5" data-next="digit-6" data-previous="digit-4" />
                    <input type="text" id="digit-6" name="digit-6" data-previous="digit-5" />
                  </form>
                </div>
                
              </div>
              <div v-if="is_phone" class="btn-sets">
                <div class="full-btn mt-4" v-if="checkMobile">
                  <b-button variant="primary" class="nxt-btn text-center" disabled v-if="is_btn_spinner">
                    <b-spinner small type="grow"></b-spinner>
                    Loading...
                  </b-button>
                  <button @click="checkNumber" v-if="checkMobile && !is_btn_spinner" class="nxt-btn text-center">
                    <span>Next</span>
                  </button>
                </div>
                
                <div class="full-btn mt-4" v-if="showPassword">
                  <b-button variant="primary" class="nxt-btn text-center" disabled v-if="is_btn_spinner">
                    <b-spinner small type="grow"></b-spinner>
                    Loading...
                  </b-button>
                  <button @click="LogIn" v-if="showPassword && !is_btn_spinner" class="nxt-btn">
                    <span>Submit</span>
                  </button>

                </div>
                <div class="full-btn mt-4" v-if="showOtp">
                  <b-button variant="primary" class="nxt-btn" disabled v-if="is_btn_spinner">
                    <b-spinner small type="grow"></b-spinner>
                    Loading...
                  </b-button>
                  <button @click="verifyOTP" v-if="!is_btn_spinner" class="nxt-btn">
                    <span>Submit</span>
                  </button>
                </div>
              </div>
              <div class="map-add-cls plr15" v-if="is_display_button" ><a href="javascript:void(0)" @click="openPreviewPage()">&lt;</a></div>
              <SocialLogin v-if="!is_display_button"/>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { required, numeric } from "vuelidate/lib/validators";
import Login from "../apis/login";
import firebase from "firebase";
import Vue from 'vue';
import Footer from '../components/Footer.vue';
import SocialLogin from '../components/SocialLogin.vue';
import VueSkeletonLoader from 'skeleton-loader-vue';

export default {
  components: {
    NavBar,
    Footer,
    SocialLogin,
    'skeleton-loader-vue':VueSkeletonLoader
  },
  data() {
    return {
      mobile_number: "",
      checkMobile: true,
      checksNumber: "",
      showPassword: false,
      showOtp: false,
      password: "",
      logins: "",
      country_code: "",
      setting: {},
      prevRoute: null,
      email:'',
      is_email:false,
      is_phone:false,
      is_phoneLogin : false,
      is_emailLogin : false,
      is_display_button:false,
      is_btn_spinner:false,
      show:false
    };
  },
  validations: {
    mobile_number: {
      required,
      numeric
    },
    password: {
      required,
    },
    email:{
      required,
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from
    })
  },
  mounted() {
    if(this.$auth.user){
      this.$router.push({ name: "Home" });
    }
    if(this.$auth.setting && this.$auth.setting.country_code){
      this.country_code = this.$auth.setting.country_code; 
    }else{
      let cntrycode = localStorage.getItem('cntrycode');
      this.country_code = this.base64_decode(cntrycode) 
    }
    setTimeout(() => {
      let arrayLogin = this.$auth.setting && this.$auth.setting.app_signin_page;
      if(arrayLogin && arrayLogin.length > 0){
        arrayLogin.forEach((elm,index) => {
          this.is_phoneLogin = elm.phone== 1 ? true:false;
          this.is_emailLogin = elm.email== 1 ? true:false;
        });
      }
    }, 1200);
  },
  watch: {
    mobile_number:function(){
      if (!/[0-9]/.test(this.mobile_number)) {
        this.mobile_number = '';
      }
    }
  },
  
  methods: {
    ...mapActions("user",["checkMobileNumber", "checkLogin"]),
    
    eyepassword(){
      if(this.show){
        this.show = false;
      } else {
        this.show = true;
      }
    },

    swipeTab(val) {
      if(val == 'email'){
        this.mobile_number = '';
        this.email = '';
        this.is_display_button = true;
        this.is_email = true;
        this.is_phone = false;
      }else if(val == 'phone'){
        this.mobile_number = '';
        this.email = '';
        this.is_email = false;
        this.is_phone = true;
        this.checkMobile = true;
        this.is_display_button = true;
        this.showPassword = false;
      }else{
        this.is_email = false,
        this.is_phone = false
        this.is_display_button = false;
      }
      this.is_btn_spinner = false;
    },

    openPreviewPage(){
      localStorage.removeItem('email');
      localStorage.removeItem('mobile_number');
      this.$v.$reset(); 
      this.is_display_button = false;
      this.is_phone = false;
      this.is_email = false;
      this.is_btn_spinner = false;
      this.showOtp = false;
    },

    onSelect({ dialCode }) {
      this.country_code = dialCode;
    },
    
    checkEmail(){
      this.$v.$touch();
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.$toasted.error("Please enter a valid email address", { duration: 2000 });
        return false;
      }
      if (this.$v.email.$invalid) {
        return;
      }else{
         Login.CheckMobileNumber({
          vendor_id: this.$auth.getVendorId(),
          user_role: "1",
          mobile_number: this.email,
          is_langauge:'en'
        }).then((response) => {
          this.checksNumber = response.data;
          if (response.data.code == 200) {
            this.$v.$reset(); 
            this.is_email = false,
            this.is_phone = true
            this.checkMobile = false;
            this.showPassword = true;
          }else{
            localStorage.setItem('email',this.email);
            this.$router.push({ path: '/sign-up' });
          }
        });
       
      }
    },

    checkNumber() {
      this.$v.$touch();
      if (
          (this.$auth.setting) &&
          (this.$auth.setting.firebase_apiKey && this.$auth.setting.firebase_apiKey != '') &&
          (this.$auth.setting.firebase_authDomain && this.$auth.setting.firebase_authDomain != '') &&
          (this.$auth.setting.firebase_databaseURL && this.$auth.setting.firebase_databaseURL != '') &&
          (this.$auth.setting.firebase_projectId && this.$auth.setting.firebase_projectId != '') &&
          (this.$auth.setting.firebase_storageBucket && this.$auth.setting.firebase_storageBucket != '') &&
          (this.$auth.setting.firebase_messagingSenderId && this.$auth.setting.firebase_messagingSenderId != '') &&
          (this.$auth.setting.firebase_appId && this.$auth.setting.firebase_appId != '')
      ) {
        this.initFirebase();
      }
      
      if (this.$v.mobile_number.$invalid) {
        return;
      } else {
        this.is_btn_spinner = true;
        Login.CheckMobileNumber({
          vendor_id: this.$auth.getVendorId(),
          user_role: "1",
          mobile_number: this.mobile_number,
          is_langauge:'en'
        }).then((response) => {
          this.checksNumber = response.data;
          if (response.data.code == 200) {
            this.$v.$reset(); 
            this.showPassword = true;
            this.checkMobile = false;
            this.is_btn_spinner = false;
          } else {
            if (this.mobile_number.length != 10) {
              this.$toasted.error("Mobile number invalid", { duration: 5000 });
              this.is_btn_spinner = false;
            } else {
              this.is_btn_spinner = false;
              var appVerifier = window.recaptchaVerifier;
              firebase.auth().signInWithPhoneNumber(
                "+" + this.country_code + this.mobile_number,
                appVerifier
              ).then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                this.showOtp = true;
                localStorage.setItem('mobile_number',this.mobile_number);
                localStorage.setItem('country_code', "+" + this.country_code);
                setTimeout(() => this.otpJs(), 1000);
                this.checkMobile = false;
                this.showPassword = false;
              }).catch((error) => {
                this.$toasted.error('API key not valid. Please pass a valid API key.', { duration: 5000 });
              });
            }
          }
        });
      }
    },

    getCode() {
      var code1 = document.getElementById("digit-1").value;
      var code2 = document.getElementById("digit-2").value;
      var code3 = document.getElementById("digit-3").value;
      var code4 = document.getElementById("digit-4").value;
      var code5 = document.getElementById("digit-5").value;
      var code6 = document.getElementById("digit-6").value;
      return (code1 + "" + code2 + "" + code3 + "" + code4 + "" + code5 + "" + code6);
    },

    initFirebase() {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: function () {
          },
        }
      );
    },

    verifyOTP(e) {
      this.is_btn_spinner = true;
      e.preventDefault();
      let vm = this;
      var code1 = document.getElementById("digit-1").value;
      if(code1 != ''){
        window.confirmationResult
        .confirm(this.getCode())
        .then(function (el) {
          vm.is_btn_spinner = false;
          vm.$router.push({ path: '/sign-up' });
        }).catch(function (err) {
          if(err.code == 'auth/invalid-verification-code'){
            vm.is_btn_spinner = false;
            vm.$toasted.error('Invalid OTP', { duration: 4000 });
          }
          if(err.code == '400'){
            vm.$toasted.error('Session Expired', { duration: 4000 });
            vm.is_btn_spinner = false;
          }
      });  
      }else{
        this.$toasted.error('Verification OTP Required', { duration: 5000 });
        this.is_btn_spinner = false;
      }
    },
    
    LogIn() {
      this.$v.$touch();
      if (this.$v.password.$invalid) {
        this.is_btn_spinner = false;
        return;
      } else {
        let loginData = {
          email: (this.mobile_number?this.mobile_number:this.email),
          password: this.password,
          vendor_id: this.$auth.getVendorId(),
          is_langauge: 'en',
          env: 'web'
        };
        this.$auth.login(loginData, (type) => {
          this.is_btn_spinner = false;
          if (this.prevRoute && this.prevRoute.name){
            if(this.prevRoute.name == 'vendor'){
              this.$router.go(-1);
            } else {
              this.$router.push({ name: "Home" });
            }
          } else {
            this.is_btn_spinner = false;
            this.$router.push({ name: type });
          }
        });
      }
    },

    otpJs() {
      window.$(".digit-group").find("input").each(function () {
        window.$(this).attr("maxlength", 1);
        window.$(this).on("keyup", function (e) {
          var parent = window.$(window.$(this).parent());
          if (e.keyCode === 8 || e.keyCode === 37) {
            var prev = parent.find(
              "input#" + window.$(this).data("previous")
            );
            if (prev.length) {
              window.$(prev).select();
            }
          } else if (
            (e.keyCode >= 48 && e.keyCode <= 57) ||
            (e.keyCode >= 65 && e.keyCode <= 90) ||
            (e.keyCode >= 96 && e.keyCode <= 105) ||
            e.keyCode === 39 || e.keyCode == 229
          ) {
            var next = parent.find("input#" + window.$(this).data("next"));
            if (next.length) {
              window.$(next).select();
            } else {
              if (parent.data("autosubmit")) {
                parent.submit();
              }
            }
          }
        });
      });
    },
  },
};
</script>