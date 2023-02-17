<template>
  <div class="login-main">
    <nav-bar></nav-bar>
    <section class="signup-start-main header-top pb-4">
      <div class="review-container login-container review-main text-capitalize position-relative">
        <div class="row">
          <div class="col-md-12 p-0">
            <div class="sign-main">
              <div class="sign-top plr15">
                <h4 class="mb-4">Sign up</h4>
              </div>
              <div class="plr15 review-section">
                <div class="mt-4 position-relative">
                  <h6 class="mb-2">Enter First Name</h6>
                  <input
                    class="form-control mb-0 h50"
                    type="text"
                    v-model="$v.typeform.user_name.$model"
                    placeholder="Enter First Name"
                    aria-label="First Name"
                    :class="{ 'is-invalid':  $v.typeform.user_name.$error }"
                  />
                  <div v-if="$v.typeform.user_name.$error" class="invalid-feedback">
                    <span
                      v-if="!$v.typeform.user_name.required"
                    >Please enter first name.</span>
                  </div>
                </div>
                <div class="mt-4 position-relative">
                  <h6 class="mb-2">Enter Last Name</h6>
                  <input
                    class="form-control mb-0 h50"
                    type="text"
                    v-model="$v.typeform.last_name.$model"
                    placeholder="Enter Last Name"
                    aria-label="Last Name"
                    :class="{ 'is-invalid':  $v.typeform.last_name.$error }"
                  />
                  <div v-if="$v.typeform.last_name.$error" class="invalid-feedback">
                    <span
                      v-if="!$v.typeform.last_name.required"
                    >Please enter last name.</span>
                  </div>
                </div>
                <div class="mt-4 position-relative">
                  <h6 class="mb-2">Phone Number</h6>
                  <div class="mob-number">
                    <div class="country-number" v-if = typeform.isCountryCode>
                      {{(typeform.country_code) ? typeform.country_code : ''}}
                    </div>
                    <div class="mob-number" v-if = !typeform.isCountryCode>
                    <vue-country-code
                      :enabledCountryCode="true"
                      :enableSearchField="true"
                      @onSelect="onSelect"
                      :readonly="typeform.mobile_number != ''"
                    ></vue-country-code>
                    </div>
                    <div class="mobile-number">
                      <input
                        class="form-control mb-0 h50 mb-cls"
                        type="text"
                        v-model="$v.typeform.mobile_number.$model"
                        aria-label="Phone Number"
                        :class="{ 'is-invalid':  $v.typeform.mobile_number.$error }"
                        :readonly="typeform.isReadOnlyPhone == true"
                      />
                      <div v-if="$v.typeform.mobile_number.$error" class="invalid-feedback">
                        <span v-if="!$v.typeform.mobile_number.required">Pleas enter Phone Number</span>
                      </div>
                      <div v-if="$v.mobile_number.$error" class="invalid-feedback">
                        <span v-if="!$v.mobile_number.numeric">Please enter Valid Number</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4 position-relative">
                  <h6 class="mb-2">Enter Your Email Address</h6>
                  <input
                    class="form-control mb-0 h50"
                    type="text"
                    v-model="$v.typeform.user_email.$model"
                    placeholder="Email"
                    aria-label="Email"
                    :class="{ 'is-invalid':  $v.typeform.user_email.$error }"
                    :readonly="typeform.isReadOnlyEmail == true"
                  />
                  <div v-if="$v.typeform.user_email.$error" class="invalid-feedback">
                      <span
                        v-if="!$v.typeform.user_email.required"
                      >Please enter email</span>
                      <span
                        v-if="!$v.typeform.user_email.email"
                      >This value should be a valid email</span>
                  </div>
                </div>
                <div class="mt-4 position-relative">
                  <h6 class="mb-2">Password</h6>
                  <input
                    class="form-control mb-0 h50"
                    :type="showpasword ? 'text' : 'password'"
                    v-model="$v.typeform.password.$model"
                    placeholder="Password"
                    aria-label="Password"
                    :class="{ 'is-invalid':  $v.typeform.password.$error  }"
                  />
                  <div class="eyeButton" @click="eyePassword"><i v-if="showpasword" class="fas fa-eye-slash"></i><i v-else class="fas fa-eye"></i></div>
                  <div v-if="$v.typeform.password.$error" class="invalid-feedback">
                    <span
                      v-if="!$v.typeform.password.required"
                    >Please enter password</span>
                  </div>
                </div>
                <div class="mt-4 position-relative">
                  <h6 class="mb-2">Confirm Password</h6>
                  <input
                    class="form-control mb-0 h50"
                    :type="showreapetpasword ? 'text' : 'password'"
                    v-model="$v.typeform.confirm_password.$model"
                    placeholder="Confirm Password"
                    aria-label="Confirm Password"
                    :class="{ 'is-invalid':  $v.typeform.confirm_password.$error  }"
                  />
                  <div class="eyeButton" @click="eyeReapetPasword"><i v-if="showreapetpasword" class="fas fa-eye-slash"></i><i v-else class="fas fa-eye"></i></div>
                  <div v-if="$v.typeform.confirm_password.$error" class="invalid-feedback">
                      <span
                        v-if="!$v.typeform.confirm_password.required"
                      >Please re enter your password</span>
                      <span
                        v-else-if="!$v.typeform.confirm_password.sameAsPassword"
                      >Passwords must match</span>
                  </div>
                </div>
                <div class="border-0 tconditions-main custom-checkbox mt-4">
                  <form class="d-flex align-items-center justify-content-between">
                    <div class="form-group border-0">
                      <input 
                      id="terms"
                      v-model="$v.typeform.terms.$model"
                      name="terms"
                      value="accepted"
                      type="checkbox"
                      unchecked-value="not_accepted"
                      :class="{ 'is-invalid':  $v.typeform.terms.$error }" />
                      <label for="terms">i accept the terms and conditions</label>
                     <div v-if="$v.typeform.terms.$error" class="invalid-feedback">
                      <span
                        v-if="!$v.typeform.terms.required"
                      >Please select the checkbox</span>
                    </div>
                    </div>
                    <div class="tc-main">
                      <a href="/terms" target="_blank" class="lnk">
                        View T&C
                        <i class="fas fa-angle-right"></i>
                      </a>
                    </div>
                  </form>
                </div>
                <div class="full-btn mt-4">
                  <button @click="SignIn">Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import NavBar from "@/components/NavBar.vue";
import { required, email, sameAs, numeric } from "vuelidate/lib/validators";
import Footer from '../components/Footer.vue';
export default {
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      showpasword:false,
      showreapetpasword:false,
      typeform: {
        user_email: "",
        last_name: "",
        user_name: "",
        mobile_number: "",
        country_code: "",
        password: "",
        time_zone: "+05:30",
        os: "web",
        device_model: "web",
        app_version: "web",
        country: "India",
        vendor_id: this.$auth.getVendorId(),
        devicetoken: "",
        devicetype: "web",
        unique_id: "",
        confirm_password: "",
        terms: "",
        is_langauge: 'en',
        isCountryCode:false,
        isReadOnlyEmail : false,
        isReadOnlyPhone : false,
        showrepeatpasword:false,
      },
    };
  },
  validations: {
    typeform: {
      mobile_number:{
        required,
        numeric
      },
      user_name: {
        required,
      },
      last_name: {
        required,
      },
      user_email: {
        required,
        email,
      },
      password: {
        required,
      },
      confirm_password: {
        required,
        sameAsPassword: sameAs("password"),
      },
      terms: {
        required,
      },
    },
  },
  
  mounted() {
    if (!localStorage.getItem('mobile_number')) {
      if(!localStorage.getItem('email')){
        this.$toasted.error('Please verify your number in sign-in page first', { duration: 5000 });
        this.$router.push({ name: "sign-in" });
      }
    }
    if (localStorage.getItem('mobile_number')) {
      this.typeform.isReadOnlyPhone = true;
      this.typeform.isCountryCode = true;
      this.typeform.mobile_number = localStorage.getItem('mobile_number');
      this.typeform.country_code = localStorage.getItem('country_code');
    }
    if (localStorage.getItem('email')) {
      this.typeform.isReadOnlyEmail = true;
      this.typeform.user_email = localStorage.getItem('email');
    }
  },
  methods: {
    ...mapActions("user",["updateSignUp"]),
  
  onSelect({name, iso2, dialCode}) {
     this.typeform.country = name;
     this.typeform.country_code = dialCode;
   },
    
  eyePassword(){
    if(this.showpasword){
      this.showpasword = false;
    } else {
      this.showpasword = true;
    }
  },

  eyeReapetPasword(){
    if(this.showreapetpasword){
      this.showreapetpasword = false;
    } else {
      this.showreapetpasword = true;
    }
  },
  
  SignIn() {
    this.$v.$touch();
    if (this.$v.typeform.$invalid) {
      return;
    } else {
      this.typeform.country_code = this.country_code == ''?this.typeform.country_code:this.typeform.country_code;
      this.typeform.country = this.country == ''?this.typeform.country:this.typeform.country;
      this.typeform.time_zone = new Date().toString().match(/([-\+][0-9]+)\s/)[1];
      this.updateSignUp(this.typeform).then((response) => {
        if (response.code == 200) {
          if (response.user_details && response.user_details.token) {
            this.$auth.setRegisterUserDetails(response.user_details, response.user_details.token);
            localStorage.removeItem('mobile_number');
            localStorage.removeItem('email');
            this.$toasted.success("Signup successfully", { duration: 2000 });
            this.$router.push({ name: "address" });
          } else {
            this.$toasted.error('Something went wrong..!!!', { duration: 2000 });  
          }
        } else {
          this.$toasted.error(response.msg, { duration: 2000 });
        }
      });
    }
  },
  },
};
</script>

<style scoped>
  .mob-number {
    display: flex;
  }
  .country-number { 
    text-align: center;
    width: 20%;
    height: 50px;
    background-color: #e9ecef;
    padding: .8rem .75rem;
    margin-right: 5px;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    font-weight: 400;
  }
  .mobile-number {
    width: 100%;
  }
  .mb-cls{
    padding-left: 85px;
  }
</style>