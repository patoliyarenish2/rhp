<template>
  <div class="homslider-cls">
  <div class="hm-slider-responsive" v-if="is_scrren_hide" >
    <home-nav-bar v-on:isDelivery="isHomeDeliverySet" v-on:getLatLong="onMobileLocationClick"></home-nav-bar>
  </div>
    <div class="home-slider-main" v-if="banners && banners.length > 0">
      <div id="testimonial-slider" class="owl-carousel">
        <div v-for="(banner,index) in banners" :key="index">
          <router-link  :to="{name:'banner-items', params:{banner_id: banner.id}}" v-if="banner.banner_restaurant.length > 1">
            <div class="testimonial-item equal-height style-6">
              <img :src="banner.image" />
            </div>
          </router-link>
          <router-link v-if="banner.banner_restaurant.length == 1" :to="{name:'vendor', params:{restaurant_name: banner.banner_restaurant[0].slug}}">
            <div class="testimonial-item equal-height style-6">
              <img :src="banner.image" />
            </div>
          </router-link>
          <div v-if="banner.banner_restaurant.length == 0" class="testimonial-item equal-height style-6">
              <img :src="banner.image" />
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import HomeNavBar from "@/components/HomeNavBar.vue";
export default {
  props:['latitude','longitude',"is_pickup_delivery"],
  components: {HomeNavBar},
  data() {
    return {
      loading: true,
      banners:[],
      is_scrren_hide:(window.screen.width < 1024 ? true:false)
    };
  },

  mounted(){
   this.getBanner().then(() => {
      window.$("#testimonial-slider").owlCarousel({
        items: 3,
        itemsDesktop: [1000, 2],
        itemsDesktopSmall: [980, 1],
        itemsTablet: [768, 1],
        pagination: true,
        navigation: true,
        navigationText: ["<", ">"],
        autoPlay: (this.$auth.setting.auto_scroll_banner=='1'?true:false),
        pagination: false,
      });
    });
  },

  watch:{
    latitude:function(){
      this.getBanner().then(() => {
      window.$("#testimonial-slider").owlCarousel({
        items: 3,
        itemsDesktop: [1000, 2],
        itemsDesktopSmall: [980, 1],
        itemsTablet: [768, 1],
        pagination: true,
        navigation: true,
        navigationText: ["<", ">"],
        autoPlay: (this.$auth.setting.auto_scroll_banner=='1'?true:false),
        pagination: false,
      });
    });
    }
  },

  methods: {
    ...mapActions("restaurant",["getBanners"]),
    
    isHomeDeliverySet(value){
      this.$emit("isDeliveryHome", value);
      this.$store.commit("order/pickupdelivery",value);
    },
    onMobileLocationClick(value){
      this.$emit("getMobileLatLong", value);
    },

    getBanner(latitude,longitude){
      latitude = this.latitude;
      longitude = this.longitude;
      let isGetRestaurant = true;
      this.loading = true;
      return this.getBanners({
        vendor_id: this.$auth.getVendorId(),
        latitude: latitude,
        longitude: longitude,
        delivery_type_time_slots : this.is_pickup_delivery
      }).then((data)=>{
        if(data.code == 200){
          this.banners = data.Result;
          isGetRestaurant = true;
          this.$emit("getRestaurantData",isGetRestaurant);
        }else if(data.code == 101){
          isGetRestaurant = false;
          this.banners=[];
          this.loading = false;
          this.$emit("getRestaurantData",isGetRestaurant);
        }else {
          this.banners=[];
          this.loading = false;
        }
      })
    }
  }
};
</script>