<template>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <button
      class="navbar-toggler navbar-toggler-right close-btn border-0"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    ><span><i class="fas fa-times"></i></span></button>
    <ul class="navbar-nav mr-auto">
        <div class="profile" v-if="$auth.user">
          <div class="detail-cls-lnk">
            <h5>Welcome {{$auth.user.user_name}} !</h5>
            <p>{{$auth.user.mobile_number}}</p>
          </div>
          <div class="edit-cls-lnk">
            <router-link v-if="$auth.user" to="/profile" v-slot="{ href, navigate, isActive }"> 
              <li :class="[ isActive ? 'nav-item active':'nav-item' ]">
                <a class="nav-link" :href="href" @click="navigate">
                  My profile
                </a>
              </li>
            </router-link>
          </div>
        </div>
        <div class="guest" v-if="!$auth.user">
          <div class="guest-cls">
            <h6>Welcome Guest !</h6>
          </div>
          <div class="login-cls-lnk">
            <router-link v-if="!$auth.user" to="/sign-in" v-slot="{ href, navigate, isActive }">
              <li :class="[ isActive ? 'nav-item active':'nav-item' ]">
                <a class="nav-link" :href="href" @click="navigate">
                  Sign In
                </a>
              </li>
            </router-link>
          </div>
        </div>
        <router-link to="/home" v-slot="{ href, navigate, isActive }"> 
        <li :class="[ isActive ? 'nav-item active':'nav-item' ]">
          <a class="nav-link" :href="href" @click="navigate">
            Home
          </a>
        </li>
      </router-link>
      <router-link v-if="$auth.setting && $auth.setting.is_single_restaurant == 'Yes'" to="/details" v-slot="{ href, navigate, isActive }"> 
        <li :class="[ isActive ? 'nav-item active':'nav-item' ]">
          <a class="nav-link" :href="href" @click="navigate">
            About Us
          </a>
        </li>
      </router-link>
      <router-link v-if="$auth.user" to="/address" v-slot="{ href, navigate, isActive }"> 
        <li :class="[ isActive ? 'nav-item active':'nav-item' ]">
          <a class="nav-link" :href="href" @click="navigate">
            Delivery Address
          </a>
        </li>
      </router-link>
      <router-link v-if="$auth.user && $auth.setting && $auth.setting.client_wallet_status == 'active'" to="/wallet" v-slot="{ href, navigate, isActive }"> 
        <li :class="[ isActive ? 'nav-item active':'nav-item' ]">
          <a class="nav-link" :href="href" @click="navigate">
            My Wallet 
            <div class="wallet-bal"><span v-html="$auth.setting.currency"></span>{{mywalletAmount}}</div>
          </a>
        </li>
      </router-link>
      <router-link v-if="$auth.user" to="/orders" v-slot="{ href, navigate, isActive }"> 
        <li :class="[ isActive ? 'nav-item active':'nav-item' ]">
          <a class="nav-link" :href="href" @click="navigate">
            Orders
          </a>
        </li>
      </router-link>
      <router-link to="/promo-code" v-slot="{ href, navigate, isActive }"> 
        <li :class="[ isActive ? 'nav-item active':'nav-item' ]">
          <a class="nav-link" :href="href" @click="navigate">
            Promocode
          </a>
        </li>
      </router-link>
      <router-link v-if="$auth.user" to="/help" v-slot="{ href, navigate, isActive }"> 
        <li :class="[ isActive ? 'nav-item active':'nav-item' ]">
          <a class="nav-link" :href="href" @click="navigate">
            Help
          </a>
        </li>
      </router-link>
      <router-link to="/faq" v-slot="{ href, navigate, isActive }"> 
        <li :class="[ isActive ? 'nav-item active':'nav-item' ]">
          <a class="nav-link" :href="href" @click="navigate">
            FAQ
          </a>
        </li>
      </router-link>
      <router-link v-if="terms_url" to="/terms" v-slot="{ href, navigate, isActive }"> 
        <li :class="[ isActive ? 'nav-item active':'nav-item' ]">
          <a class="nav-link" :href="href" @click="navigate">
            Terms & conditions
          </a>
        </li>
      </router-link>
      <router-link v-if="privacypolicy_url" to="/privacypolicy" v-slot="{ href, navigate, isActive }"> 
        <li :class="[ isActive ? 'nav-item active':'nav-item' ]">
          <a class="nav-link" :href="href" @click="navigate">
            Privacy Policy
          </a>
        </li>
      </router-link>
      <router-link v-if="help_url" to="/help" v-slot="{ href, navigate, isActive }"> 
        <li :class="[ isActive ? 'nav-item active':'nav-item' ]">
          <a class="nav-link" :href="href" @click="navigate">
            Help
          </a>
        </li>
      </router-link>
      <router-link to="/support" v-slot="{ href, navigate, isActive }"> 
        <li :class="[ isActive ? 'nav-item active':'nav-item' ]">
          <a class="nav-link" :href="href" @click="navigate">
            Support
          </a>
        </li>
      </router-link>
      <li class="nav-item logout-nav" @click="LogOut">
        <a class="nav-link" v-if="$auth.user">Logout</a>
      </li>
    </ul>
    <div class="store-btns d-flex align-items-center mt-4">
      <a v-if="$auth.setting && $auth.setting.ios_customer_app_url" :href="$auth.setting.ios_customer_app_url">
        <img src="@/assets/images/app-store.png" />
      </a>
      <a v-if="$auth.setting && $auth.setting.android_customer_app_url" :href="$auth.setting.android_customer_app_url">
        <img src="@/assets/images/google-play.png" />
      </a>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Wallet from '../apis/wallet';

export default {
  data() {
    return {
      menus: [],
      terms_url: null,
      privacypolicy_url: null,
      help_url: null,
      setting: null,
      is_support: false,
      email: null,
      phone: null,
      whatsapp: null,
      iswalletDisplay:false,
      mywalletAmount:0
    };
  },
  
  mounted() {
    setTimeout(()=>{
      this.setting = this.$auth.setting;
      this.setStaticPages();
      if(this.$auth.user){
        this.getWalltet();
      }
    },1200);
    
    // if (!this.$auth.setting) {
    //   Settings.settings(this.$auth.getVendorId())
    //   .then(response => {
    //     if (response.data.code == 200) {
    //       this.setting = response.data.settings;
    //       this.setStaticPages();
    //     } else {
    //       this.setting = null;
    //     }
    //   });
    // } else {
    //   this.setting = this.$auth.setting;
    //   this.setStaticPages();
    // }
  },
  methods: {
    ...mapActions("user",["checkLogout"]),
    getWalltet(){
    Wallet.getUserWalletAmount().then((response) => {
      if(response.data.code == 200){
        this.mywalletAmount = response.data.wallet_amount;
      }
    });
    },

    LogOut() {
      if (confirm("Are you sure you want to logout?")) {
        let logoutData = {
          user_id: this.$auth.user.user_id,
          devicetype: "I",
          devicetoken: this.$auth.user.token,
          unquie_id: "",
          vendor_id: this.$auth.getVendorId(),
          is_langauage: "en"
        }
        this.$auth.logout(logoutData,(callback)=>{
          this.$router.push({ name: callback }).catch(()=>{});
        });
      }
    },
    sideMenu() {
      this.menus = [
        {
          title: "Home",
          link: "Home",
          isAuthRequired: true
        },
        {
          title: "Login",
          link: "sign-in",
          isAuthRequired: (this.$auth.user) ? true : false
        },
        {
          title: "Delivery Address",
          link: "address",
          isAuthRequired: (this.$auth.user) ? true : false
        },
        {
          title: "Orders",
          link: "orders",
          isAuthRequired: (this.$auth.user) ? true : false
        },
        {
          title: "My Profile",
          link: "profile",
          isAuthRequired: (this.$auth.user) ? true : false
        },
        {
          title: "Promocode",
          link: "promo-code",
          isAuthRequired: true
        },
        {
          title: "FAQ",
          link: "faq",
          isAuthRequired: true
        },
        {
          title: "Help",
          link: "help",
          isAuthRequired: (this.$auth.user) ? true : false
        },
        {
          title: "PrivacyPolicy",
          link: "privacypolicy",
          isAuthRequired: true
        },
      ];
    },
    setStaticPages() {
      if (this.setting) {
        if (this.setting.pages && this.setting.pages.length > 0) {
          for (let index = 0; index < this.setting.pages.length; index++) {
            if (this.setting.pages[index].privacypolicy_url) {
              this.privacypolicy_url = this.setting.pages[index].privacypolicy_url;
            } else if (this.setting.pages[index].help_url) {
              this.help_url = this.setting.pages[index].help_url;
            } else if (this.setting.pages[index].terms_url) {
              this.terms_url = this.setting.pages[index].terms_url;
            }
          }
        }
        if(this.setting.support_field){
          if(this.setting.support_field[0]){
            if(this.setting.support_field[0].phone || this.setting.support_field[0].whatsapp || this.setting.support_field[0].email){
              this.is_support = true;
            }
          }

        }
      }
    }
  },
};
</script>