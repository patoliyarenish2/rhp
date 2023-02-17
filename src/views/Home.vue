<template>
  <div>
    <nav-bar v-on:getLatLong="onLocationClick" v-on:isDelivery="isDeliverySet" :settingData="$auth.setting"></nav-bar>
    <section class="resturant-main tab-content header-top">
      <div class="slider-home-top">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <home-slider v-if="showBanner && $auth && $auth.getVendorId() > 0" :latitude="filter.lat" :longitude="filter.lng" :v-on:getRestaurantData="getRestaurantByBanner" v-on:isDeliveryHome="isDeliverySet" v-on:getMobileLatLong="onLocationClick" :is_pickup_delivery="filter.is_pickup_delivery"/>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <!---------Business Category Start-------->
            <home-title v-if="businessCategoryItems && businessCategoryItems.length > 1" :title="($auth.setting && ($auth.setting.home_page_category_title == null || $auth.setting.home_page_category_title == ''?'':$auth.setting.home_page_category_title))" :subtitle="$auth.setting && $auth.setting.home_page_sub_title">
            </home-title>
            <div class="category-item-main" id="resturant-item-main" v-if="isBusinessCatloading">
              <skeleton-loader-vue v-for="count in 4" :key="count" type="string" width="100%" height="150px" style="border-radius: 5px" class="resturant-item busines-img-box d-flex align-items-start" />
            </div>
            <!-- <div class="category-item-main" id="resturant-item-main" v-if="$auth && $auth.getVendorId() > 0 && businessCategoryItems.length > 1"> -->
            <div class="homslider-cls cate-slider" :class="'cat-layout-business'+businessCategoryLayout" v-if="$auth && $auth.getVendorId() > 0 && businessCategoryItems.length > 1">
              <div class="home-slider-main" v-if="businessCategoryItems && businessCategoryItems.length > 1">
                <div id="businesscategory-slider" class="owl-carousel">
                  <Category v-for="cat in businessCategoryItems" :key="cat.category_id" :item=cat :businessCategoryLayout="businessCategoryLayout"></Category>
                </div>
              </div>
            </div>
            <!-- </div> -->
            <!---------Business Category End-------->
            
            <!---------Restaurant Skeleton list Start-------->
            <div class="hme-res-itm" v-if="items.length == 0 && isItemLoader">
              <div class="filter-title justify-content-between align-items-center mb-4">
               <h4><skeleton-loader-vue type="string" width="24%" height="20px" style="bottom: 11px" /></h4>
               <p class="mb-0"><skeleton-loader-vue type="string" width="30%" height="20px" /></p>
              </div>               
              <div id="resturant-item-main" class="resturant-item-main">
                <a href="javascript:void(0)" v-for="itemcount in 6" :key="itemcount">
                    <div class="resturant-item d-flex align-items-start">
                    <skeleton-loader-vue class="skel-img-cls" type="string"/>
                    <div class="resturant-data">
                      <h4><skeleton-loader-vue type="string" height="20px" width="135px"/></h4>
                      <span><skeleton-loader-vue type="string" width="65%" height="20px" /></span>
                        <div class="res-price-main mt-2 d-flex">
                          <div>
                          <skeleton-loader-vue type="string" width="44px" height="24px" />
                          </div>
                          <ul class="time-price d-flex justify-content-center mb-0 ml-3">
                            <li><skeleton-loader-vue type="string" width="44px" height="24px" /></li>
                            <li><span></span><skeleton-loader-vue type="string" width="44px" height="24px" /></li>
                          </ul>
                        </div>
                        <div class="offer-sec"><p class="mb-0 mt-1"></p></div>
                      </div>
                  </div>
                </a>
              </div>
           </div>
           <!---------Restaurant Skeleton list End-------->

           <!---------Restaurant list start-------->
           <!-- <div class="hme-res-itm" v-if="items.length > 0 && !isItemLoader"> -->
            <div class="hme-res-itm" v-if="isSingleRestaurant == 'No'">
              <home-title :title="$auth && $auth.getRestaurantName()"
              subtitle="Discover Unique Taste around you.">
              <filter-sort v-on:getFilterData="filterData"></filter-sort>
              </home-title>
              <div :class="'resturant-item-main'+(webVendorListingLayout == '1'?'':webVendorListingLayout)" id="resturant-item-main" v-if="items && items.length > 0 && $auth && $auth.getVendorId() > 0">
                <item
                  v-for="item in items"
                  :key="item.slug"
                  :item="item"
                  :currencys="currencys"
                  :isPickupDelivery="filter.is_pickup_delivery"
                  :isSchedule="$auth.setting.is_enable_schedule_order_after_business_hours"
                  :webVendorLayout="webVendorListingLayout"
                  >
                  </item>
              </div>
            </div>
            <!---------Restaurant list end-------->
            
            <!--------Single vendor Start---------------->
            <div v-if="iscateMenusLoader" class="hme-cate-mnu-cls">
              <a href="javascript:void(0);" v-for="prod in 6" :key="prod">
                <div id="menucateID" class="menucate-cls">
                  <skeleton-loader-vue type="string"  height="150px" class="menu-cat-img" width="150px"/>
                  <h4><skeleton-loader-vue type="string" width="46%" height="20px" style="margin: 5px 38px;" /></h4>
                  </div>
                </a>
            </div>
            <div v-if="cateMenus.length > 0" class="hme-cate-mnu-cls">
              <home-title title="Browse Items By Category" subtitle=""></home-title>
              <div :class="'category-item-main-theme'+cateMenuLayout+' '+'cat-layout-business'+cateMenuLayout" >
                <a href="javascript:void(0);" v-for="catmenu in cateMenus" :key="catmenu.id" @click="getSingleRestaurant(catmenu.id)">
                  <menu-category :menu="catmenu" :cateMenuLayout=cateMenuLayout :pagename=pagename></menu-category>
                </a>
              </div>
            </div>
            <!--------Single vendor End---------------->

            <div class="home-res-not-found" v-if="cateMenusNotFound && isSingleRestaurant == 'Yes' && cateMenus.length == 0">
              <div class="nostr-img-cls">
                <img src="@/assets/images/no_store.png" />
                <div class="no-txt-fnd">No {{$auth && $auth.getRestaurantName()}} Found</div>
                <span>Service not available in this area. Please change location and try again.</span>
              </div>
            </div>

            <div class="home-res-not-found" v-if="items.length == 0 && !isItemLoader && isSingleRestaurant == 'No'">
              <div class="nostr-img-cls">
                <img src="@/assets/images/no_store.png" />
                <div class="no-txt-fnd">No {{$auth && $auth.getRestaurantName()}} Found</div>
                <span>Service not available in this area. Please change location and try again.</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
    <!-------Business Close Modal start------->
     <div class="modal fade order-placed" data-backdrop="static" data-keyboard="false" id="businessClosed" tabindex="-1" aria-labelledby="businessClosedLabel" aria-hidden="true" ref="businessClosedModal" style="z-index: 9999;">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content business-modal-contnt">
          <div class="modal-body text-center">
            <p class="mt-3 mb-1">{{$auth.setting && ($auth.setting.not_available_reason == ''?'not_available_reason':'')}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-------Business Close Modal end------->
    <!--Alert Modal start-->
    <AlertModal v-if="isAlert" :DisplayAlertData="AlertData" v-on:modalClose="onModalCloseFun"></AlertModal>
    <!--Alert Modal End-->
    <a v-if="whatsappSupport != ''" :href="'https://api.whatsapp.com/send?phone='+whatsappSupport+'&text=Order Deonde'" class="float" target="_blank">
      <img class="wp-button" src="@/assets/images/whatsapp-icon.png" />
    </a>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapMutations } from "vuex";
import HomeSlider from "@/components/HomeSlider.vue";
import HomeTitle from "@/components/HomeTitle.vue";
import NavBar from "@/components/NavBar.vue";
import Item from "@/components/Item.vue";
import FilterSort from "@/components/FilterSort.vue";
import AlertModal from '../components/AlertModal.vue';
import Category from '../components/Category.vue';
import Footer from '../components/Footer.vue';
import moment from "moment";
import MenuCategory from "@/components/MenuCategory.vue";
import VueSkeletonLoader from 'skeleton-loader-vue';

export default {
  name: "Home",
  components: {
    HomeSlider,
    HomeTitle,
    NavBar,
    Item,
    FilterSort,
    AlertModal,
    Category,
    Footer,
    MenuCategory,
    'skeleton-loader-vue':VueSkeletonLoader
  },
  data() {
    return {
      pagename:'home',
      items: [],
      currencys: "",
      sort: "",
      cuisine_id: "",
      loading: true,
      setting: {},
      addres: "",
      latitude: "",
      filter: {
        lat: "",
        lng: "",
        city: "",
        state: "",
        is_pickup_delivery: -1,
      },
      skip: 0,
      isStopCallingApi:false,
      moment:moment,
      showBanner:true,
      whatsappSupport:'',
      isAlert : false,
      AlertData: {},
      businessCategoryItems:[],
      isBusinessStopCallingApi:false,
      cateMenus:[],
      isBusinessCatloading:true,
      iscateMenusLoader:true,
      isItemLoader: true,
      iscateMenuApi:false,
      isnoVendorFound:false,
      isnoVendorFoundBusiness:false,
      isScrollStart:false,
      singleRestaurant:{},
      isSingleRestaurant:'',
      cateMenuLayout:'',
      webVendorListingLayout:'', //Vendor Layout Display
      singleVendorRestaurantID:0, //Setting API in single vendor Id not definde
      cateMenusNotFound:false, //Single Vendor In category Not Found
      businessCategoryLayout:'', //Business Category Layout
    };
  },
  
  mounted() {
    if(this.$route.name == 'Home'){
      window.addEventListener("scroll", () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          this.isScrollStart = true;
          if (!this.isStopCallingApi) {
            this.getRestaurant();
          }
        }
      });
    }
    
    if(this.$auth){
      setTimeout(() => {
        if(this.$auth.setting){
          if(this.$auth.setting && this.$auth.setting.support_field != 'undefined'){
            this.$auth.setting.support_field.forEach(element => {
              this.whatsappSupport = this.$auth.setting.country_code+element.whatsapp;
            });
          }
        }
        if(this.$auth.setting ) {
          let is_system_available = this.$auth.setting.is_system_available;
          if(is_system_available == '0'){
            window.$(this.$refs.businessClosedModal).modal();
          }
          var formatd = 'HH:mm:ss';
          var timedateGet = moment().format('HH:mm:ss');
          var beforeTimeGet = moment(this.$auth.setting.system_start_time).format('HH:mm:ss');
          var afterTime = moment(this.$auth.setting.system_end_time).format('HH:mm:ss');
          let afterTimeGet = (afterTime == '00:00:00') ? '23:59:00' : afterTime;
          var timed = moment(timedateGet,formatd),
            beforeTime = moment(beforeTimeGet, formatd),
            afterTime = moment(afterTimeGet, formatd);
          if(!timed.isBetween(beforeTime, afterTime)) {
            this.AlertData = {
            displayMessage : this.$auth.setting.schedule_order_after_business_hours_text,
              isSetClass : 'schedule-modal'
            };
            this.isAlert = true;
            window.$(this.$refs.AlertModal).modal();
          }
          this.businessCategoryLayout = this.$auth.setting.category_layout;
          if(this.businessCategoryLayout == '' || this.businessCategoryLayout == undefined) {
            this.businessCategoryLayout = '1';
          }
          this.cateMenuLayout = this.$auth.setting.master_menu_category;
          if(this.cateMenuLayout == undefined ||this.cateMenuLayout == ''){
            this.cateMenuLayout = 3;
          }
          this.webVendorListingLayout = this.$auth.setting.vendor_listing_layout;
          if(this.webVendorListingLayout == '' || this.webVendorListingLayout == undefined){
            this.webVendorListingLayout = 1;
          }
        }
        localStorage.setItem("isSingleRestaurant", this.base64_encode(this.$auth.setting.is_single_restaurant));
        this.filter.lat = parseFloat(localStorage.getItem("latitude"));
        this.filter.lng = parseFloat(localStorage.getItem("longitude"));
     
        if(this.$auth.setting && this.$auth.setting.is_single_restaurant == 'Yes') {
          this.isBusinessCatloading = false;
          this.isItemLoader = false;
          this.iscateMenusLoader = true;
          this.iscateMenuApi = false;
          this.getRestaurant();
        } else {
          this.getRestaurant();
        }
        this.isBusinessCatloading = false;
      }, 1500);
    }
  },


  methods: {
    ...mapActions("restaurant", ["getRestaurants","getBusinessCategoryList","getRestaurantMenuCategoryList"]),
    ...mapMutations("product",["clearCartItems"]),

    /*************
     * Close Alert Modal component 
     * 
     *************/
    onModalCloseFun(value) {
      this.isAlert = false;
    },

    /*************
     * 
     * Delivery and pickup set so this function call
     * 
     *************/
    isDeliverySet(value) {
      this.filter.is_pickup_delivery = value;
      this.$store.commit("product/clearCartItems");
      this.skip = 0;
      this.items =[];
      this.getRestaurant();
      this.isStopCallingApi = false;
    },
    
    /*************
     * 
     * Multivendor in filter select so this function call
     * 
     *************/
    filterData(cuisine) {
      this.isItemLoader = true;
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

    /*************
     * 
     * Select location to get address and latitude and longitude to call function
     * 
     *************/
    onLocationClick(value) {
      this.isItemLoader=true;
      this.items = [];
      if (value.lat && value.lng) {
        this.filter.lat = parseFloat(value.lat);
        this.filter.lng = parseFloat(value.lng);
      } else {
        this.filter.lat = parseFloat(localStorage.getItem("latitude"));
        this.filter.lng = parseFloat(localStorage.getItem("longitude"));
      }
      this.filter.city = value.city;
      this.filter.state = value.state;
      this.skip = 0;
      this.isStopCallingApi = false;
      this.iscateMenuApi = false;
      setTimeout(() => {
        this.getRestaurant();  
      }, 2000);
      this.showBanner = true;
    },

    /*************
     * 
     * First home slider banner call in function emit
     * 
     *************/
    getRestaurantByBanner(value){
      if(!value){
        this.items = [];
      }else{
        this.getRestaurant();
      }
    },

    /*************
     * 
     * Multivendor for restaurnat and business category list
     * Single Restaurnat for menu category Display
     * 
     *************/
    getRestaurant() {
      if(this.$auth.setting){
        this.isSingleRestaurant = this.$auth.setting.is_single_restaurant;
      }else{
        this.isSingleRestaurant = this.base64_decode(localStorage.getItem("isSingleRestaurant"));
      }
      if(this.isSingleRestaurant == 'Yes' && this.filter.lat != ''){
        /****If Restaurant Id first getting and response restaurant id save in local storage***/
        if(localStorage.getItem("restaurantId") == null){
          this.singleVendorRestaurantID = this.$auth.setting.restaurant_id;
        } else {
          this.singleVendorRestaurantID  = this.base64_decode(localStorage.getItem("restaurantId"));
        }
        this.isBusinessCatloading = false;
        this.isItemLoader = false;
        this.iscateMenusLoader = true;
        if(this.$route.name == 'Home' && !this.iscateMenuApi){
          this.getRestaurantMenuCategoryList({
            restaurant_id: this.singleVendorRestaurantID, //Using this id Setting API this.$auth.setting.restaurant_id,
            vendor_id: this.$auth.getVendorId(),
            is_langauge: "en",
            latitude: this.filter.lat,
            longitude: this.filter.lng,
          }).then((data) => {
            if (data.code == 200) {
              this.iscateMenusLoader = false;
              this.singleRestaurant = data.restaurant_details;
              localStorage.setItem("restaurantId", this.base64_encode(data.restaurant_details.restaurant_id));
              this.cateMenus = data.Result;
              this.iscateMenuApi = true;
              this.cateMenusNotFound = false;
            }else if(data.code == 101){
              this.cateMenus=[];
              this.cateMenusNotFound = true;
              this.iscateMenusLoader = false;
              this.iscateMenuApi = true;
              this.isnoVendorFound= true;
              this.singleRestaurant = data.restaurant_details;
              localStorage.setItem("restaurantId", this.base64_encode(data.restaurant_details.restaurant_id));
            }else {
              this.iscateMenusLoader = false;
              this.iscateMenuApi = true;
              this.isnoVendorFound= true;
            }
          });
        }else{
          this.iscateMenusLoader = false;
        }
      } else if(this.isSingleRestaurant == 'No' && this.filter.lat != '') {
        this.iscateMenusLoader = false;
        //Disaplay Business Category 
        let catList = {
          city: this.filter.city,
          state: this.filter.state,
          vendor_id: this.$auth.getVendorId(),
          latitude: this.filter.lat,
          longitude: this.filter.lng,
          is_langauge: "en"
        };
        if(this.$auth.setting && this.$auth.setting.business_category_item > 1){
          if(this.$route.name == 'Home' && !this.isBusinessStopCallingApi){
            this.getBusinessCategoryList(catList).then((data) => {
              if (data.code == 200) {
                this.businessCategoryItems = data.Result;
                this.isBusinessStopCallingApi = true;
              }else{
                this.isnoVendorFoundBusiness= true;
              }
            });
          }
        } else {
          //this.isBusinessCatloading = false;
        }
        
        //Disaplay Restaurant 
        let restData = {
          date: "",
          cityname: this.filter.city,
          latitude: this.filter.lat,
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
          longitude: this.filter.lng,
        };
        if(this.$route.name == 'Home'){
          this.getRestaurants(restData).then((data) => {
            this.isItemLoader = true;
            if (data.code == 200) {
              this.isItemLoader = false;
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
                this.isItemLoader = false;
                this.isStopCallingApi = true;
            }else {
              if (data.Result.length == 0) {
                this.isStopCallingApi = true;
                this.isnoVendorFound= true;
              }
              this.isItemLoader = false;
            }
          });
        }
      }
    },

    /*************
     * 
     * single vendor menu category Onclick to redirect Single Restautant 
     * 
     *************/
    getSingleRestaurant(id){
      localStorage.setItem("menuCatID", id);
      this.$router.push({ name: "vendor", params: { restaurant_name: this.singleRestaurant.slug } });
    },
    
  },
};
</script>
<style>
.skel-img-cls{
  width: 120px;
  height: 120px;
  margin-right: 7px;
  border-radius: 5px !important;
}
</style>