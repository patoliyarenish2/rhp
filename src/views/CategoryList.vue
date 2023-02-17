<template>
  <div>
    <nav-bar></nav-bar>
    <section class="resturant-main tab-content header-top categorylist">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <!---------Restaurant Skeleton list Start-------->
            <div class="hme-res-itm" v-if="items && items.length == 0 && is_skeleton_loadr">
              <div class="filter-title justify-content-between align-items-center mb-4">
               <h4><skeleton-loader-vue type="string" width="24%" height="20px" style="bottom: 11px" /></h4>
               <p class="mb-0"><skeleton-loader-vue type="string" width="30%" height="20px" /></p>
              </div>               
              <div id="resturant-item-main" class="resturant-item-main">
                <a href="javascript:void(0)" v-for="itemcount in 4" :key="itemcount">
                    <div class="resturant-item d-flex align-items-start">
                    <skeleton-loader-vue width="120" class="img-cls" style="border-radius: 5px"/>
                    <div class="resturant-data ml-3">
                      <h4><skeleton-loader-vue type="string" height="20"/></h4>
                      <span><skeleton-loader-vue type="string" width="80%" height="20px" /></span>
                        <div class="res-price-main mt-2 d-flex">
                          <div>
                          <skeleton-loader-vue type="string" width="44px" height="24px" />
                          </div>
                          <ul class="time-price d-flex justify-content-center mb-0 ml-3">
                            <li><skeleton-loader-vue type="string" width="44px" height="24px" /></li>
                            <li><span></span><skeleton-loader-vue type="string" width="100px" height="24px" /></li>
                          </ul>
                        </div>
                        <div class="offer-sec"><p class="mb-0 mt-1"></p></div>
                      </div>
                  </div>
                </a>
              </div>
           </div>
           <!---------Restaurant Skeleton list End-------->
           <!-- <home-title v-if="items && items.length > 0" :title="categoryName" subtitle="Discover Unique Taste around you."> -->
           <home-title :title="categoryName" subtitle="Discover Unique Taste around you.">
              <filter-sort v-on:getFilterData="filterData"></filter-sort>
            </home-title>
            <div :class="'resturant-item-main'+(webVendorListingLayout == '1'?'':webVendorListingLayout)" id="resturant-item-main" v-if="items && items.length > 0">
              <item
                v-for="item in items"
                :key="item.name"
                :item="item"
                :currencys="$auth.setting && $auth.setting.currency"
                :isPickupDelivery="filter.is_pickup_delivery"
                :isSchedule="$auth.setting.is_enable_schedule_order_after_business_hours"
                :webVendorLayout="webVendorListingLayout"
              ></item>
            </div>
            <div v-else class="order-offers rest-not-found">
              <div class="text-center my-2" v-if="loading">
                <b-spinner class="align-middle"></b-spinner>
              </div>
              <div v-else class="no-contnt-cls">
                <div class="nostr-img-cls">
                <img src="@/assets/images/no_store.png" />
                <div class="no-fnd-cls">No {{categoryName}} Found Data</div>
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
// @ is an alias to /src
import HomeTitle from "@/components/HomeTitle.vue";
import NavBar from "@/components/NavBar.vue";
import Item from "@/components/Item.vue";
import Footer from '../components/Footer.vue';
import FilterSort from "@/components/FilterSort.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import VueSkeletonLoader from 'skeleton-loader-vue';

export default {
  components: {
    HomeTitle,
    NavBar,
    Item,
    FilterSort,
    Footer,
    'skeleton-loader-vue':VueSkeletonLoader,
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
      categID : 0,
      categoryName : '',
      is_skeleton_loadr: true,
      webVendorListingLayout:1
    };
  },
  
  mounted() {
    this.webVendorListingLayout = this.$auth.setting.vendor_listing_layout;
    if(this.webVendorListingLayout == ''){
      this.webVendorListingLayout = 1;
    }
    if(this.skip == 0){
      this.getRestaurant();
    }
    window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (!this.isStopCallingApi) {
          this.getRestaurant();
        }
      }
    });
    
  },
  methods: {
    ...mapActions("restaurant", ["getRestaurantBanner","getRestaurants"]),
    
    filterData(cuisine) {
      this.sort = cuisine.sort;
      this.skip = 0;
      this.items =[];
      if (cuisine.cusinesIds) {
        this.cuisine_id = cuisine.cusinesIds.join();
      } else {
        this.cuisine_id = "";
      }
      this.filter.lat = parseFloat(localStorage.getItem("latitude"));
      this.filter.lng = parseFloat(localStorage.getItem("longitude"));
      this.getRestaurant();
      this.isStopCallingApi = false;
    },
    //Get All banner Restaurant
    getRestaurant() {
      this.is_skeleton_loadr = true;
      let urlParmam = this.base64_decode(this.$route.params.category_id);
      let categoryData = urlParmam.split('/');  
      if(categoryData && categoryData.length == 2){
        this.categID = categoryData[0];
        this.categoryName = categoryData[1];
        this.loading = true;
        let restData = {
            date: "",
            category_id: this.categID,
            cityname: this.filter.city,
            latitude: parseFloat(localStorage.getItem("latitude")),
            cuisine_id: this.cuisine_id,
            skip: this.skip,
            starttime: "",
            is_langauge: "en",
            sort_type: this.sort,
            user_id: "",
            filter_type: "",
            cost_range: "",
            vendor_id: this.$auth.getVendorId(),
            state: this.filter.state,
            delivery_type_time_slots: this.filter.is_pickup_delivery,
            longitude: parseFloat(localStorage.getItem("longitude")),
          };
        this.getRestaurants(restData).then((data) => {
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
          } else if(data.code == 101){
            this.loading = false;
            this.isStopCallingApi = true;
            this.is_skeleton_loadr = false;
          } else {
            if (data.Result.length == 0) {
              this.loading = false;
              this.isStopCallingApi = true;
              this.is_skeleton_loadr = false;
            }
            //this.loading = false;
          }
        });
      }else{
        this.items = [];
        this.loading = false;
      }

    },
  },
};
</script>
