<template>
  <div id="editprofile" class="tab-pane active tab-box">
    <div class="mt-4">
      <div class="mt-4 position-relative">
        <h6 class="mb-2">Name</h6>
        <input
          class="form-control mb-0 h50"
          type="text"
          placeholder="Name"
          aria-label="Name"
          v-model="$v.profile.user_name.$model"
          :class="{
            'is-invalid': $v.profile.user_name.$error,
          }"
        />
        <div v-if="$v.profile.user_name.$error" class="invalid-feedback">
          <span v-if="!$v.profile.user_name.required"
            >Please enter user name.</span
          >
        </div>
      </div>
      <div class="mt-4 position-relative">
        <h6 class="mb-2">Email Address</h6>
        <input
          class="form-control mb-0 h50"
          type="text"
          placeholder="Email"
          aria-label="Email"
          v-model="$v.profile.user_email.$model"
          :class="{
            'is-invalid': $v.profile.user_email.$error,
          }"
        />
        <div v-if="$v.profile.user_email.$error" class="invalid-feedback">
          <span v-if="!$v.profile.user_email.required">Please enter email</span>
          <span v-if="!$v.profile.user_email.email"
            >This value should be a valid email</span
          >
        </div>
      </div>
      <input type="hidden" v-model="profile.country_code">
      <div class="mt-4 position-relative">
        <h6 class="mb-2">Phone Number</h6>
        <input
          class="form-control mb-0 h50"
          type="text"
          placeholder="Phone"
          aria-label="Phone"
          v-model="profile.mobile_number"
          readonly
        />
      </div>
    </div>
    <div class="mt-4 position-relative">
      <h6 class="mb-2">Select Language</h6>
        <select class="custom-select" @change="languageChange" v-model="language" >
            <option :value="l.value" v-for="l in languages" :key="l.value">{{l.text}}</option>
          </select>
    </div>
    <div class="delivery-address border-0">
      <div class="full-btn" id="editprofile">
        <button @click="editProfile">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import {
  required,
  email
} from "vuelidate/lib/validators";
export default {
  
  data() {
    return {
      profile: {
        user_email: "",
        user_name: "",
        mobile_number: "",
        country_code: "",
        is_langauge:'en'
      },
      prim_lang : '',
      seco_lang : '',
      languages: [],
      language : 'en'
    };
  },
  validations: {
    profile: {
      user_email: {
        required,
        email,
      },
      user_name: {
        required,
      },
    },
  },
  mounted() {
    if (this.$auth.user && this.$auth.setting) {
      this.profile = {
        user_email: this.$auth.user.user_email,
        user_name: this.$auth.user.user_name,
        mobile_number : this.$auth.user.mobile_number,
        country_code : this.$auth.user.country_code
      };
      this.languages = [       
        { 'value' : this.$auth.setting.primary_lang , text: 'English' },
      ];
      if (this.$auth.setting.secondary_lang) {
        this.languages.push({'value' : this.$auth.setting.secondary_lang, text: 'Spanish'});
      }
      this.prim_lang = this.$auth.setting.primary_lang,
      this.seco_lang = this.$auth.setting.secondary_lang
    } else {
      this.$router.push({ name: "sign-in" });
    }
  },
  methods: {
    ...mapActions("user",["updateUserDetails"]),
    editProfile() {
      this.$v.$touch();
      if (this.$v.profile.$invalid) {
        return;
      } else {
        this.updateUserDetails(this.profile).then((data) => {
          if (data.code == 200) {
            this.$auth.setUserDetails(data.user_details);
            this.$toasted.success('Profile update successfully', { duration: 5000 });
          } else {
            this.$toasted.success(data.msg, { duration: 5000 });
          }
        });
      }
    },
    languageChange() {
      localStorage.setItem('language',this.language);
    }
  },
};
</script>