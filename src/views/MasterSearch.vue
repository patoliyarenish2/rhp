<template>
  <div>
    <nav-bar></nav-bar>
    <section class="resturant-main tab-content header-top">
       <div class="searchbar-item mastr-search">
         <div class="container">
            <div class="row">
              <input type="search" v-model="search" name="search" class="srch-itm" placeholder="Search" v-on:keyup="searchRestaurant" autocomplete="off">
              <router-link :to="{name:'Home'}" class="srchclose">
                <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" class="sc-64ptou-0 faawBe nukjgu-4 kztNWe"><g stroke-width="2" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><path d="M13 1L1 13M1 1l12 12"></path></g></svg><br><span>Close</span>
              </router-link>
            </div>
            <div class="tb-cls">
              <ul class="nav nav-tabs border-0 mb-3" v-if="openTab && $auth.setting && $auth.setting.is_single_restaurant == 'No'">
              <li class="nav-item">
                <a href="#vendor" class="nav-link navbar-default active" data-toggle="tab" @click="searchRestaurant()">Vendor</a>
              </li>
              <li class="nav-item">
                <a href="#item" class="nav-link navbar-default" data-toggle="tab" @click="searchItem(search)">Item</a>
              </li>
            </ul>
            </div>
         </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="tab-content">
              <div id="vendor" class="tab-pane active tab-box" v-if="$auth.setting && $auth.setting.is_single_restaurant == 'No'">
                <!---------Skeleton list Start-------->
                <div id="resturant-item-main" class="resturant-item-main" v-if="is_skel_loader">
                  <a href="javascript:void(0)" v-for="itemcount in 6" :key="itemcount">
                    <div class="resturant-item d-flex align-items-start">
                      <skeleton-loader-vue width="120" class="img-cls" style="border-radius: 5px"/>
                      <div class="resturant-data ml-3">
                        <skeleton-loader-vue type="string" width="24%" height="20"/>
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
                <div v-else class="order-offers rest-not-found">
                  <div v-if="loading">
                    <p>No search Found</p></div>
                </div>
                <!---------Skeleton list End-------->
                <div :class="'resturant-item-main'+(webVendorListingLayout == '1'?'':webVendorListingLayout)" id="resturant-item-main" v-if="items && items.length > 0" >
                  <item
                    v-for="item in items"
                    :key="item.name"
                    :item="item"
                    :currencys="$auth.setting.currency"
                    :isPickupDelivery="filter.is_pickup_delivery"
                    :isSchedule="$auth.setting.is_enable_schedule_order_after_business_hours"
                    :webVendorLayout="webVendorListingLayout"
                  ></item>
                </div>
              </div>
              <div id="item" class="tab-pane tab-box">
                <div class="menuitems-main">
                  <div class="main-content">
                    <div class="menulength">
                      <section class="srcsectin">
                        <!------------Product Skeleton Start-------------->
                        <div class="vendor-left-main text-capitalize d-flex" v-if="is_prod_skel_loadr">
                          <div class="media w-100">
                              <div class="img-cls">
                                <skeleton-loader-vue width="120" class="mr-3" style="border-radius: 5px"/>
                              </div>
                              <div class="media-body">
                                <h3 class="mt-0">
                                    <skeleton-loader-vue type="string" width="24%" height="20px"/>
                                   <p><skeleton-loader-vue width="96%" height="26px" style="border-radius: 30px !important;margin-right: 75px;"/></p>
                                </h3>
                                <skeleton-loader-vue type="string" width="40%" height="20px"/>
                                <div class="d-flex rating-star mt-2">
                                    <skeleton-loader-vue type="string" width="24%" height="20px"/>
                                </div>
                              </div>
                          </div>
                        </div>
                        <div v-if="is_prod_skel_loadr" class="media-itms">
                          <div class="item_detail" right="true" v-for="prdt in 4" :key="prdt">
                            <div class="media">
                              <a href="javascript:void(0)" id="element" class="btn btn-default show-modal">
                                <div class="media-body">
                                  <h5 class="mt-0 mr-5 item-name"><skeleton-loader-vue type="string" width="24%" height="20px"/></h5>
                                  <p class="mb-0 mt-2 item-descr"> <skeleton-loader-vue type="string" width="80%" height="20px" /> </p>
                                  <div class="prc-show">
                                    <span class="mt-2 d-inline-block item-price"><skeleton-loader-vue type="string" width="54px" height="24px" /></span>
                                  </div>
                                </div>
                              </a>
                              <div class="img-btn">
                                <div class="item-img">
                                  <skeleton-loader-vue width="120" class="img-cls" style="border-radius: 5px"/></div>
                                <div class="pgnme-cls">
                                    <div>
                                      <div class="sold-de">
                                          <div class="icus"><button class="btn btn-sm"><skeleton-loader-vue type="string" width="50px" height="24px" /></button></div>
                                      </div>
                                    </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-else class="order-offers rest-not-found">
                          <p v-if="loading">No search Found</p>
                        </div>
                      
                        <!------------Product Skeleton End-------------->
                        <div v-if="products.length > 0 && $auth.setting && $auth.setting.is_single_restaurant == 'No'" >
                          <div v-for="productData in products" :key="productData.restaurant_menu_id" class="proditm">
                            <div class="vendor-left-main text-capitalize d-flex" v-if="$auth.setting && $auth.setting.is_single_restaurant == 'No'">
                              <div class="media w-100">
                                <div class="img-cls">
                                <img :src="productData.icon_image" class="mr-3" alt="..." />
                                </div>
                                <div class="media-body">
                                  <h3 class="mt-0">{{ productData.name }}
                                    <router-link :to="{name:'vendor', params:{restaurant_name: productData.slug}}" class="fltr-srt-cls">
                                      <p v-if="productData.restaurant_on_off == '0' && $auth.setting.is_enable_schedule_order_after_business_hours">View More</p>
                                      <p v-else-if="productData.restaurant_on_off == '0' && !$auth.setting.is_enable_schedule_order_after_business_hours">View More</p>
                                      <p v-else>View More</p>
                                    </router-link>
                                  </h3>
                                  <p class="mb-0">{{ productData.location_address }}</p>
                                  <rating :rating="productData.avg_rating"></rating>
                                </div>
                              </div>
                            </div>
                            <div class="media-itms" :class="'media-itms-theme'+itemlayout">
                              <Product
                              v-for="item in productData.item" :key="item.restaurant_menu_item_id"
                              :item="item"
                              :right="true"
                              :menuId="item.restaurant_menu_id"
                              :restaurantID="productData.restaurant_id"
                              :restaurant_on_off="productData.restaurant_on_off"
                              :pagename="pageName"
                              :slug="productData.slug"
                              v-on:openProductDetailModal="openProductDeails"
                              :itemlayout="itemlayout"
                            ></Product>
                            </div>
                          </div>
                        </div>
                        <div v-else class="media-itms" :class="'media-itms-theme'+itemlayout">
                            <Product
                            v-for="item in products" :key="item.restaurant_menu_item_id"
                            :item="item"
                            :right="true"
                            :menuId="item.restaurant_menu_id"
                            :restaurantID="item.restaurant_id"
                            :restaurant_on_off="item.restaurant_on_off"
                            :pagename="pageName"
                            :slug="slug"
                            v-on:openProductDetailModal="openProductDeails"
                            :itemlayout="itemlayout"
                          ></Product>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ProductDetails ref="childComponent" :restaurantID="restaurantID" :restaurant_on_off="restaurant_on_off" :pagename="pageName"></ProductDetails>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import Item from "@/components/Item.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import Product from "@/components/Product.vue";
import Rating from "@/components/Rating.vue";
import Footer from '../components/Footer.vue';
import VueSkeletonLoader from 'skeleton-loader-vue';
import ProductDetails from "@/components/ProductDetails.vue";

export default {
  components: {
    NavBar,
    Item,
    Product,
    Rating,
    Footer,
    'skeleton-loader-vue':VueSkeletonLoader,
    ProductDetails
  },
  data() {
    return {
      items: [],
      loading: true,
      filter: {
        lat: "",
        lng: "",
        city: "",
        state: "",
        is_pickup_delivery: 1,
      },
      skip: 0,
      isStopCallingApi:false,
      search:'',
      products:[],
      imgError:'',
      openTab:false,
      pageName:'mastersearch',
      is_skel_loader:false,
      is_prod_skel_loadr:false,
      restaurant_on_off:0,
      restaurantID:0,
      slug:'',
      webVendorListingLayout:1,
      itemlayout:'1'
    };
  },

  mounted() {
    this.filter.lat = parseFloat(localStorage.getItem("latitude"));
    this.filter.lng = parseFloat(localStorage.getItem("longitude"));
    this.filter.city = localStorage.getItem("city");
    this.filter.state = localStorage.getItem("state");
    
    this.itemlayout = this.$auth.setting && this.$auth.setting.web_settings && this.$auth.setting.web_settings.web_restaurant_item_layout;
    
    this.webVendorListingLayout = this.$auth.setting.vendor_listing_layout;
    if(this.webVendorListingLayout == '' || this.webVendorListingLayout == undefined){
      this.webVendorListingLayout = 1;
    }
    if(this.$auth.setting && this.$auth.setting.is_single_restaurant == 'Yes'){
      let element = document.getElementById('item');
      $("#vendor").removeClass("active");
      element.className += " active";
    }
  },
  methods: {
    ...mapActions("restaurant", ["getSearchRestaurant","getSearchRestaurantItem","getItemSoldStatusList","getSearchRestaurantCategoryItem"]),

    //Search Item
    searchItem(value){
      if(this.$auth.setting && this.$auth.setting.is_single_restaurant == 'Yes'){
        this.searchCategoryItem(value);
      } else {
        let restData = {
        searchtext:value,
        date:'',
        startrime:'',
        vendor_id: this.$auth.getVendorId(),
        cityname: this.filter.city,
        latitude: this.filter.lat,
        skip:0,
        state: this.filter.state,
        longitude: this.filter.lng,
        is_langauge:"en",
        total_record:10
      };
      if(value && value.length >= 3 && value.trim() != '' && value != null && value.indexOf(' ') == -1) {
        this.is_prod_skel_loadr = true;
        this.products = [];
        this.getSearchRestaurantItem(restData).then((data) => {
          if (data.code == 200) {
            this.loading = false;
            this.openTab = true;
            this.is_prod_skel_loadr = false;
            //this.products = data.Result;
            let temProduct =  data.Result;
            let searchItemsArray = [];
            data.Result.forEach((rest)=>{
              if(rest.item.length > 0){
                let tempArray = {
                  restaurant_id : rest.restaurant_id,
                  items : []
                }
                rest.item.forEach((itm)=>{
                  tempArray.items.push({restaurant_menu_item_id : itm.restaurant_menu_item_id,restaurant_menu_id:itm.restaurant_menu_id})
                });
                searchItemsArray.push(tempArray);
              }
            });
            let itemlistsArray = {vendor_id : this.$auth.getVendorId(),item_list : JSON.stringify(searchItemsArray),is_langauge:"en"};

            this.getItemSoldStatusList(itemlistsArray).then(({Result,code}) => {
              let itemdata =  Result;
              if (code == 200) {
                this.loading = false;
                this.openTab = true;
                this.is_prod_skel_loadr = false;
                itemdata.forEach((item,index) => {
                  var rIndex = temProduct.findIndex(r => r.restaurant_id == item.restaurant_id);
                  if(rIndex !== -1 && temProduct[rIndex].item.length > 0){
                    var iIndex = temProduct[rIndex].item.findIndex(r => r.restaurant_menu_item_id == item.restaurant_menu_item_id);
                    temProduct[rIndex].item[iIndex].is_sold_out = item.is_sold_out;
                    temProduct[rIndex].item[iIndex].is_customization = item.is_customization;
                    temProduct[rIndex].item[iIndex].item_id = item.restaurant_menu_item_id;
                    temProduct[rIndex].item[iIndex].restaurant_id = item.restaurant_id;
                    temProduct[rIndex].item[iIndex].quantity = item.quantity;
                  }
                })
                this.products = temProduct;
              }
            })
          }
          if (data.code == 101) {
            this.is_prod_skel_loadr = false;
            this.loading = false;
            this.openTab= false;
            this.products = '';
          }
        });
      } else {
        this.loading = false;
        this.openTab= false;
        this.products = '';
      }
      }
      
    },

    //Get All Search Restaurant
    searchRestaurant() {
      let search = this.search;
      if(this.$auth.setting && this.$auth.setting.is_single_restaurant == 'Yes'){
        let element = document.getElementById('item');
        $("#vendor").removeClass("active");
        element.className += " active";
        //this.searchItem(search);
        this.searchCategoryItem(search);
      }
      if(this.$auth.setting && this.$auth.setting.is_single_restaurant == 'No'){
      let restData = {
        searchtext:this.search,
        date:'',
        startrime:'',
        vendor_id: this.$auth.getVendorId(),
        cityname: this.filter.city,
        latitude: this.filter.lat,
        skip:0,
        state: this.filter.state,
        longitude: this.filter.lng,
        is_langauge:"en",
      };
      this.items=[];
      if(search && search.length >= 3 && search.trim() != '' && search != null && search.indexOf(' ') == -1) {
        this.is_skel_loader = true;
        //this.searchItem(search);
        //this.searchCategoryItem(search);
        this.getSearchRestaurant(restData).then((data) => {
          if (data.code == 200) {
            this.is_skel_loader = false;
            this.items='';
            this.loading = false;
            this.openTab= true;
            this.items = data.Result;
          }
          if (data.code == 101) {
            this.is_skel_loader = false;
            this.loading = true;
            this.openTab= true;
            this.items = '';
            this.products = [];
          }
        });
      } else {
        this.loading = true;
        this.openTab= false;
        this.items = '';
        this.products = [];
      }
      }
    },

    //Search Category Item
    searchCategoryItem(value){
      let restData = {
        searchtext:value,
        date:'',
        startrime:'',
        vendor_id: this.$auth.getVendorId(),
        cityname: this.filter.city,
        latitude: this.filter.lat,
        skip:0,
        state: this.filter.state,
        longitude: this.filter.lng,
        is_langauge:"en",
        total_record:10
      };
      if(value && value.length >= 3 && value.trim() != '' && value != null && value.indexOf(' ') == -1) {
        this.is_prod_skel_loadr = true;
        this.products = [];
        this.getSearchRestaurantCategoryItem(restData).then((data) => {
          if (data.code == 200) {
            this.loading = false;
            this.openTab = true;
            this.is_prod_skel_loadr = false;
            //this.products = data.Result;
            let temProduct =  data.Result;
            this.slug = data.restaurant_details.slug;
            let searchItemsArray = [];
            data.Result.forEach((rest)=>{
              if(rest.item.length > 0){
                let tempArray = {
                  restaurant_id : rest.restaurant_id,
                  items : []
                }
                rest.item.forEach((itm)=>{
                  if(itm.items && itm.items.length > 0 && itm.items != null){
                    itm.items.forEach((itmcat)=>{
                      tempArray.items.push({restaurant_menu_item_id : itmcat.restaurant_menu_item_id,restaurant_menu_id:itmcat.restaurant_menu_id})
                  });
                  }
                });
                searchItemsArray.push(tempArray);
              }
            });
            let itemlistsArray = {vendor_id : this.$auth.getVendorId(),item_list : JSON.stringify(searchItemsArray),is_langauge:"en"};

          this.getItemSoldStatusList(itemlistsArray).then(({Result,code}) => {
              let itemdata =  Result;
              if (code == 200) {
                this.loading = false;
                this.openTab = true;
                this.is_prod_skel_loadr = false;
                itemdata.forEach((item,index) => {
                  var rIndex = temProduct.findIndex(r => r.restaurant_id == item.restaurant_id);
                  if(temProduct[rIndex] && temProduct[rIndex].item.length > 0){
                    temProduct[rIndex].item.forEach((itmname, inx)=>{
                      itmname.items.forEach((restitem,restindx)=> {
                          const result = temProduct[rIndex].item.reduce((acc, d, i) => {
                          if(acc){
                            if(d.items){
                              var iIndex = temProduct[rIndex].item[i].items.findIndex(r => r.restaurant_menu_item_id == item.restaurant_menu_item_id);
                              if(iIndex != -1){
                                temProduct[rIndex].item[i].items[iIndex].is_sold_out = item.is_sold_out;
                                temProduct[rIndex].item[i].items[iIndex].is_customization = item.is_customization;
                                temProduct[rIndex].item[i].items[iIndex].item_id = item.restaurant_menu_item_id;
                                temProduct[rIndex].item[i].items[iIndex].restaurant_id = item.restaurant_id;
                                temProduct[rIndex].item[i].items[iIndex].quantity = item.quantity;
                              }
                            }
                          }
                         return acc.concat(temProduct[rIndex].item[i]);
                         }, []);
                      })
                    });
                  }
                })
                let mainProducts = [];
                temProduct.forEach((tmpprod,ii)=>{
                  tmpprod.item.forEach((items,k)=>{
                    items.items.forEach((itm,k)=>{
                      mainProducts.push(itm)
                    })
                  })
                })
                this.products = mainProducts;
              }
            })
          }
          if (data.code == 101) {
            this.is_prod_skel_loadr = false;
            this.loading = false;
            this.openTab= false;
            this.products = '';
          }
        });
      } else {
        this.loading = false;
        this.openTab= false;
        this.products = '';
      }
    },
    //ProductDetails Popup Modal Open
    openProductDeails(value) {
      this.restaurantID = value.restaurant_id;
      this.restaurant_on_off = value.restaurant_on_off
      window.$("#item-popup").modal("show");
      window.$("#item-popup").on('shown.bs.modal',function(){
        window.$("#prod-details-slider").owlCarousel({
          loop:true,
          items: 1,
          pagination: false,
          navigation: true,
          navigationText: ["<", ">"],
          autoPlay: true,
        });
      });
      this.$refs.childComponent.openProductModel(value.item_id);
    },
    onImgError() {
      this.imgError = false;
    }, 
  },
};
</script>
