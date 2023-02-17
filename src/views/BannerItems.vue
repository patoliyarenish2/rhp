<template>
  <div>
    <nav-bar></nav-bar>
    <section class="resturant-main tab-content header-top">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <home-title :title="'Banner '+($auth && $auth.getRestaurantName())" subtitle="Discover Unique Taste around you."></home-title>
            <div class="resturant-item-main" id="resturant-item-main" v-if="items && items.length > 0">
              <item
                v-for="item in items"
                :key="item.name"
                :item="item"
                :currencys="$auth.setting && $auth.setting.currency"
                :isPickupDelivery="filter.is_pickup_delivery"
                :isSchedule="$auth.setting && $auth.setting.is_enable_schedule_order_after_business_hours"
                :webVendorLayout="webVendorListingLayout"
              ></item>
            </div>
            <div v-else class="order-offers rest-not-found">
              <div class="text-center my-2" v-if="loading">
                <b-spinner class="align-middle"></b-spinner>
              </div>
              <p v-else>No Restaurants Found</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeTitle from "@/components/HomeTitle.vue";
import NavBar from "@/components/NavBar.vue";
import Item from "@/components/Item.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import Footer from '../components/Footer.vue';

export default {
  components: {
    HomeTitle,
    NavBar,
    Item,
    Footer
  },
  data() {
    return {
      items: [],
      currencys: "",
      loading: true,
      setting: {},
      filter: {
        lat: "",
        lng: "",
        city: "",
        state: "",
        is_pickup_delivery: 1,
      },
      skip: 0,
      isStopCallingApi:false,
      webVendorListingLayout:''
    };
  },
  
  mounted() {
    setTimeout(() => {
    this.webVendorListingLayout = this.$auth.setting.vendor_listing_layout;
    if(this.webVendorListingLayout == ''){
      this.webVendorListingLayout = 1;
    }
    },1200);
    this.getRestaurant();
  },
  methods: {
    ...mapActions("restaurant", ["getRestaurantBanner"]),
    //Get All banner Restaurant
    getRestaurant() {
      this.loading = true;
      let restData = {
        vendor_id:this.$auth.getVendorId(),
        is_langauge:'en',
        banner_id:this.$route.params.banner_id,
        skip:0,
      };
      this.getRestaurantBanner(restData).then((data) => {
        this.loading = true;
        if (data.code == 200) {
          this.loading = false;
          this.skip = data.open_restaurant;
          if (!this.items.length) {
            data.Result.forEach((resItem) => {
              this.items.push(resItem);
            });
          } else {
            data.Result.forEach((resItem) => {
              let checkRest = this.items.find((elm) => elm.restaurant_id == resItem.restaurant_id);
              if (!checkRest) {
                this.items.push(resItem);
              }
            });
          }
        } else {
          if (data.Result.length == 0) {
            this.loading = false;
            this.isStopCallingApi = true;
          }
        }
      });
    },
  },
};
</script>
