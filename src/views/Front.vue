<template>
  <div>
    <header class="front-header-main">
      <div class="container">
        <div class="row">
          <router-link to="/home" class="front-logo">
            <img class="nav-logo" :src="$auth.getAppLogo()"/>
          </router-link>
          <router-link :to="{name: 'sign-in'}" class="btn btnnw-primary signinlnk-nw">Sign In</router-link>
        </div>
      </div>
    </header>
    <section class="search-start" :style="{ background: 'url(' +backgroundImg+ ')', backgroundRepeat:'no-repeat !important',backgroundSize:'cover !important', backgroundPosition: 'center !important'  }">
      <div class="container">
        <div class="row">
          <div class="col-md-10 m-auto text-center">
            <div class="search-main">
              <!-- <h1 class="mb-4">Restaurants and more, <br>delivered to your door</h1> -->
              <h1 class="mb-4">{{heading}}</h1>
              <div class="searchbar d-flex">
                <div class="search-box d-flex mr-3 w-100">
                  <div class="position-relative w-100">
                    <!-- <input type="text" id="map" placeholder="Search for an area or Location name" value="" class="form-control pac-target-input" autocomplete="off"> -->
                     <vue-google-autocomplete
                     v-if="$auth.google_map_key"
                      id="map"
                      ref="address"
                      class="form-control pac-target-input"
                      type="text"
                      v-model="addresses"
                      v-on:placechanged="getAddressData"
                      :placeholder="placeholderValue"
                    ></vue-google-autocomplete>
                    <i class="fas fa-search search-icon"></i>
                    <a href="javascript:void(0)" class="current-location front-gps">
                      <div class="current-address">
                        <b-button variant="primary" class="nxt-btn" disabled v-if="is_btn_spinner">
                          <b-spinner small type="grow"></b-spinner>
                          Loading...
                        </b-button>
                        <span v-if="!is_btn_spinner" @click="locatorButtonPressed">
                          <!-- <img src="@/assets/images/gps-ic.svg">  -->
                          <svg width="25" height="25" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M255.863 168.699C207.816 168.699 168.723 207.793 168.723 255.844C168.723 303.891 207.816 342.984 255.863 342.984C303.914 342.984 343.008 303.891 343.008 255.844C343.008 207.793 303.914 168.699 255.863 168.699Z" fill="#FF8300"/>
                          <path d="M497.003 240.843H441.948C434.679 149.84 361.866 77.0233 270.859 69.7577V14.9961C270.859 6.71483 264.144 0 255.863 0C247.582 0 240.867 6.71483 240.867 14.9961V69.7577C149.859 77.0233 77.0467 149.84 69.7772 240.843H14.9961C6.71483 240.843 0 247.558 0 255.843C0 264.124 6.71483 270.839 14.9961 270.839H69.7772C77.0467 361.843 149.859 434.659 240.867 441.929V496.687C240.867 504.968 247.582 511.683 255.863 511.683C264.148 511.683 270.859 504.968 270.859 496.687V441.929C361.866 434.659 434.683 361.843 441.948 270.839H497.003C505.284 270.839 511.999 264.124 511.999 255.843C511.999 247.558 505.284 240.843 497.003 240.843V240.843ZM255.863 412.538C169.461 412.538 99.1678 342.242 99.1678 255.843C99.1678 169.441 169.461 99.1443 255.863 99.1443C342.265 99.1443 412.558 169.441 412.558 255.843C412.558 342.242 342.265 412.538 255.863 412.538Z" fill="#FF8300"/>
                          </svg> Use current location</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="foodcat-main" v-if="sectionImages.length > 0">
      <div class="container">
        <div class="row">
        <div class="col-md-4" v-for="sectionContent in sectionImages" :key="sectionContent.id">
            <a :href="sectionContent.link" target="_blank">
              <div class="foodcat-card">
                <div class="foodcat-img">
                  <img v-if="sectionContent.image" :src="$auth.setting.section_image_path+'/'+sectionContent.image">
                </div>
                <div class="foodcat-con">
                  <h4>{{sectionContent.heading}}</h4>
                  <p>{{sectionContent.description}}</p>
                  <a v-if="sectionContent.link" :href="sectionContent.link" target="_blank" class="read-more-btn">Read more</a>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
    <footer class="footer-nw">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="d-flex flex-column justify-content-between h-100">
              <div class="footernw-logo">
              <img :src="$auth.getAppLogo()">
            </div>
            <div class="footernw-store">
              <a v-if="$auth.setting && $auth.setting.ios_customer_app_url" :href="$auth.setting.ios_customer_app_url"><img src="@/assets/images/app-store.png" /></a>
              <a v-if="$auth.setting && $auth.setting.android_customer_app_url" :href="$auth.setting.android_customer_app_url"><img src="@/assets/images/google-play.png" /></a>
            </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="row">
              <div class="col-md-6 col-sm-6 col-6">
                <div class="footernw-right">
                  <router-link to="/privacypolicy">Privacy Policy</router-link>
                  <router-link to="/terms">Terms</router-link>
                  <router-link to="/faq">Faq</router-link>
                  <router-link to="/help">Help</router-link>
                  <router-link to="/support">Support</router-link>
                  <router-link to="#">Pricing</router-link>
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-6">
                <div class="footernw-left">
                  <a href="#">Facebook</a>
                  <a href="#">Twitter</a>
                  <a href="#">Instagram</a>
                </div>
              </div> 
            </div>
          </div>
          <div class="col-md-12 footer-bottom">
            <div class="footer-bottom-inner">
              <div class="row">
                <div class="col-md-12 text-center">
                  <div class="footerother-links">
                    <p>© {{ new Date().getFullYear() }} {{$auth.getAppName()}} All Rights Reserved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";

export default {
  name: "Home",
  components: {VueGoogleAutocomplete},
  data() {
    return {
      addresses: "", //Input type in display for field
      marker: { position: { lat: 10, lng: 10 } },
      address:'',
      latitude:'',
      longitude:'',
      state:'',
      city:'',
      is_btn_spinner:false,
      placeholderValue:'Search for an area or Location name',
      backgroundImg:'',
      heading:'',
      sectionImages:[],
    };
  },
  mounted(){
    if(localStorage.getItem("address") || localStorage.getItem("latitude")){
      this.$router.push({ name: "Home" });
    }
    setTimeout(() => {
      this.heading = this.$auth.setting.web_settings && this.$auth.setting.web_settings.home_page_title;
      this.backgroundImg = (this.$auth.setting && this.$auth.setting.web_home_page_image_path && this.$auth.setting.web_settings.home_page_image) ? this.$auth.setting.web_home_page_image_path + '/' + this.$auth.setting.web_settings.home_page_image : '';
      if(this.$auth.setting.web_settings && this.$auth.setting.web_settings.front_images){
        this.sectionImages = this.$auth.setting.web_settings.front_images;
      }
    }, 2000);
    
  },

  methods: {
    getAddressData: function(addressData, placeResultData) {
      this.is_btn_spinner = true;
      this.addresses = placeResultData.formatted_address;
      this.address = placeResultData.formatted_address;
      this.latitude = addressData.latitude;
      this.longitude = addressData.longitude;
      this.marker.position = {
        lat: addressData.latitude,
        lng: addressData.longitude,
      };
      var value = this.address.split(", ");
      var value1 = this.address.split(" ");
      var count = value.length;
      var count1 = value1.length;
      this.locality = value[count - 4];
      this.city = value[count - 3];
      this.state = value[count - 4];
      localStorage.setItem("address", this.addresses);
      localStorage.setItem("latitude", this.latitude);
      localStorage.setItem("longitude", this.longitude);
      localStorage.setItem("city", this.city);
      localStorage.setItem("state", this.state);
      this.addresses = "";
      this.$router.push({ name: "Home" });
    },

    locatorButtonPressed() {
      this.is_btn_spinner = true;
      this.placeholderValue = 'Fetching Your location..';
      let vm = this;
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: parseFloat(position.coords.latitude),
          lng: parseFloat(position.coords.longitude),
        };
        this.latitude = parseFloat(position.coords.latitude);
        this.longitude =parseFloat(position.coords.longitude);
        if(!this.$auth.google_map_key){
          return false;
        }
        this.locateAddress(position.coords.latitude, position.coords.longitude);
      },function(error) {
          vm.is_btn_spinner = false;
          vm.placeholderValue = 'Search for an area or Location name';
        }
      );
    },

    locateAddress(lat, lng) {
      if(!this.$auth.google_map_key){
        return false;
      }
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK") {
          this.address = results[0].formatted_address;
          var value = this.address.split(", ");
          var value1 = this.address.split(" ");
          var count = value.length;
          var count1 = value1.length;
          this.locality = value[count - 4];
          this.state = value1[count1 - 3];
          this.city = value[count - 3];
          this.zip_code = value1[count1 - 2];
          localStorage.setItem("address", this.address);
          localStorage.setItem("latitude", this.latitude);
          localStorage.setItem("longitude", this.longitude);
        }
      });
      this.address = localStorage.getItem("address");
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
<style>
.search-start{
  background-repeat:no-repeat !important;
  background-size:cover !important;
  background-position: center !important;
}
</style>