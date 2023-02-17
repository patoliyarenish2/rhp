<template>
  <div class="login-main">
    <nav-bar></nav-bar>
    <section class="login-start-main header-top pb-4">
      <div class="review-container login-container review-main text-capitalize position-relative">
        <div class="row">
          <div class="col-md-12 p-0">
            <div class="sign-main">
              <div class="sign-top plr15">
                <img :src="$auth.getAppFavicon()" />
                <p>Forgot Password</p>
              </div>
              <div class="plr15 review-section">
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
                  <div v-if="$v.mobile_number.$error" class="invalid-feedback">
                    <span v-if="!$v.mobile_number.required">Please enter phone number</span>
                  </div>
                  <div id="recaptcha-container"></div>
                </div>

                <div class="number-boxs mt-4 position-relative numbers-box" v-if="!showPassword != true" >
                  <h6 class="mb-2">Reset Password</h6>
                  <div class="form-group position-relative rst-pass-cls">
                    <i class="fas fa-lock"></i>
                    <input class="form-control mb-0 h50" type="Password" v-model="$v.newPassword.$model" placeholder="New Password" aria-label="Password" @keyup.enter="LogIn" :class="{ 'is-invalid': $v.newPassword.$error }" />
                    <div v-if="$v.newPassword.$error" class="invalid-feedback">
                      <span v-if="!$v.newPassword.required">Please enter New password</span>
                    </div>
                  </div>
                  <div class="form-group position-relative rst-pass-cls">
                    <i class="fas fa-lock"></i>
                    <input class="form-control mb-0 h50" type="Password" v-model="$v.repeatPassword.$model" placeholder="Confirm Password" aria-label="Password" @keyup.enter="LogIn" :class="{ 'is-invalid': $v.repeatPassword.$error }" />
                    <div v-if="$v.repeatPassword.$error" class="invalid-feedback">
                      <span v-if="!$v.repeatPassword.required">Please enter Repeat Password</span>
                      <span v-else-if="!$v.repeatPassword.sameAsPassword">
                          Passwords must match
                      </span>
                    </div>
                  </div>

                </div>
                <div class="otp-boxs mt-4 position-relative" v-if="showOtp == true" >
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
                
                <div class="full-btn mt-4">
                  <button @click="checkNumber" v-if="checkMobile">Next</button>
                </div>
                <div class="full-btn mt-4">
                  <button @click="updatePassword" v-if="showPassword">Submit</button>
                </div>
                <div class="full-btn mt-4">
                  <button v-if="showOtp" @click="verifyOTP">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import { required,sameAs } from "vuelidate/lib/validators";
import Login from "../apis/login";
import firebase from "firebase";
import Vue from 'vue';

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      mobile_number: "",
      checkMobile: true,
      checksNumber: "",
      showPassword: false,
      showOtp: false,
      newPassword:"",
      repeatPassword:"",
      logins: "",
      country_code: "",
      setting: {},
      prevRoute: null
    };
  },
  validations: {
    newPassword: {
      required,
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs("newPassword"),
    },
    mobile_number: {
      required,
    },

  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevRoute = from
    })
  },
  mounted() {
    if(this.setting.country_code){
      this.country_code = this.setting.country_code; 
    }else{
      let cntrycode = localStorage.getItem('cntrycode');
      this.country_code = this.base64_decode(cntrycode) 
    }
  },
  watch: {
    mobile_number:function(){
      if (!/[0-9]/.test(this.mobile_number)) {
        this.mobile_number = '';
      }
    }
  },
  methods: {
    ...mapActions("user",["checkMobileNumber", "changePassword"]),
    
    onSelect({ dialCode }) {
      this.country_code = dialCode;
    },

    checkNumber() {
      this.$v.$touch();
      this.initFirebase();
      if (this.$v.mobile_number.$invalid) {
        return;
      } else {
        Login.CheckMobileNumber({
          vendor_id: this.$auth.getVendorId(),
          user_role: "1",
          mobile_number: this.mobile_number,
          is_langauge:'en'
        }).then((response) => {
          this.checksNumber = response.data;
          if (response.data.code == 200) {
            if (this.mobile_number.length != 10) {
              this.$toasted.error("Mobile number invalid", { duration: 5000 });
            } else {
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
                this.$toasted.error(error, { duration: 5000 });
              });
            }
          } else {
            this.$toasted.error('Mobile Number is not exist.', { duration: 5000 });
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
            // this.checkNumber();
          },
        }
      );
    },

    verifyOTP(e) {
      e.preventDefault();
      let vm = this;
      var code1 = document.getElementById("digit-1").value;
      if(code1 != ''){
        window.confirmationResult
        .confirm(this.getCode())
        .then(function (el) {
            vm.$v.$reset(); 
            vm.showPassword = true;
            vm.checkMobile = false;
            vm.showOtp = false;
        }).catch(function (err) {
          if(err.code == 'auth/invalid-verification-code'){
            vm.$toasted.error('Invalid OTP', { duration: 4000 });
          }
          if(err.code == '400'){
            vm.$toasted.error('Session Expired', { duration: 4000 });
          }
      });  
      }else{
        this.$toasted.error('Verification OTP Required', { duration: 4000 });
      }
    },
    
    updatePassword() {
        this.$v.$touch();
        if (this.$v.$invalid) {
            return;
        } else {
            Login.customerChangePassword({
                mobile_number: this.mobile_number,
                password: this.newPassword,
                vendor_id:this.$auth.getVendorId(),
                is_langauge: 'en'
            }).then((data) => {
                if (data.data.code == 200) {
                    this.$v.$reset();
                    this.$toasted.success(data.data.msg, { duration: 5000 });
                    this.$router.push({ name: 'sign-in' });
                } else {
                    this.$toasted.error(data.data.msg, { duration: 5000 });
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
            e.keyCode === 39
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