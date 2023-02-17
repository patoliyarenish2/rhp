<template>
  <div>
    <nav-bar></nav-bar>
      <div v-if="showResturantDetail">
        <section class="vendor-details-main pb-4" id="reshead" :class="$auth.setting && $auth.setting.is_single_restaurant == 'No'?'menu-details':'single-menu-details'">
          <div class="container-fluid" v-if="$auth.setting && $auth.setting.is_single_restaurant == 'No'">
            <div class="row">
              <div class="col-md-9">
                <div class="vendor-left-main text-capitalize d-flex">
                  <div class="media w-100">
                    <div class="img-cls">
                      <skeleton-loader-vue v-if="!resturantDetail.icon_image" width="120px" height="120px" style="border-radius: 5px;"/>
                      <img v-else :src="resturantDetail.icon_image" class="mr-3" alt="..." />
                    </div>
                    <div class="media-body">
                      <h3 class="mt-0" v-if="!resturantDetail.name"><skeleton-loader-vue type="string" width="45%" height="20px" style="bottom: 11px" /></h3>
                      <h3 class="mt-0" v-else>{{ resturantDetail.name }}</h3>

                      <p class="mb-0" v-if="!resturantDetail.location_address"><skeleton-loader-vue type="string" width="30%" height="20px" /></p>
                      <p class="mb-0">{{ resturantDetail.location_address }}</p>
                      <div class="info-view" v-if="!resturantDetail.restaurant_id">
                         <skeleton-loader-vue type="string" class="skel_view" width="25%" height="31px" />
                      </div>
                      <view-info v-else :restaurantID="resturantDetail.restaurant_id"></view-info>
                    </div>
                    <div class="rstinfo-cls">
                      <div class="deliveryfees-main text-center d-flex align-content-center ml-auto mr-4">
                        <div class="delivery-fees p-3" v-if="is_minimuOrder && resturantDetail && resturantDetail.minimum_order_value != 0">
                          <h5 class="mb-0">
                            <span id="currency" v-if="$auth.setting.currency" v-html="$auth.setting.currency"></span
                            >{{parseFloat(resturantDetail.minimum_order_value).toFixed(1)}}
                          </h5>
                          <p class="mb-0">Minimum Order</p>
                        </div>
                        <div class="delivery-minutes p-3" v-if="is_twoPersonPrice &&resturantDetail && resturantDetail.two_person_price != 0">
                          <h5 class="mb-0">
                            <span v-if="$auth.setting.currency" v-html="$auth.setting.currency"></span
                            >{{parseFloat(resturantDetail.two_person_price).toFixed(1)}}
                          </h5>
                          <p class="mb-0">Value for Two</p>
                        </div>
                        <div class="review-cnt p-3" v-if="is_rating">
                          <div v-if="resturantDetail.rating != 0 && is_rating" class="star-rate" :class="(parseFloat(resturantDetail.rating).toFixed(1) > 2.0 || parseFloat(resturantDetail.rating).toFixed(1) == 0.0 ? 'green-cls':'red-cls')">
                            <i class="fas fa-star mr-2"></i>
                            <span v-if="resturantDetail.rating == 0">{{parseFloat(resturantDetail.rating).toFixed(1)}}</span>
                            <span v-else>{{parseFloat(resturantDetail.rating).toFixed(1)}}</span>
                          </div>
                          <p class="mb-0">{{ resturantDetail.review_count && resturantDetail.review_count == 1 ? resturantDetail.review_count+ ' Review':resturantDetail.review_count+' Reviews'}}</p>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <cart></cart>
        </section>
        <section class="resturant-menu-main">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-9 pr-0 pl-0">
                <item-list :restaurant_on_off="resturantDetail.restaurant_on_off" v-if="resturantDetail && resturantDetail.restaurant_id" :restautantDetails= "resturantDetail"/>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div v-else class="noDetails">
        <div class="no-cont-cls">
          <p>Uh oh.</p>
          <p>This page doesn't seem to exist</p>
          <button class="back-btn btn go-cls " @click="goToHome()">Add Item</button>
        </div>
      </div>
      <Footer></Footer>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Cart from "@/components/Cart.vue";
import Rating from "@/components/Rating.vue";
import ItemList from "@/components/ItemList.vue";
import ViewInfo from "@/components/ViewInfo.vue";
import Footer from '../components/Footer.vue';
import { mapActions, mapGetters, mapState } from "vuex";
import VueSkeletonLoader from 'skeleton-loader-vue';

export default {
  name: "itemDetail",
  props:["isPickupDelivery"],
  components: { NavBar, Cart, Rating, ItemList,ViewInfo,Footer,'skeleton-loader-vue':VueSkeletonLoader },
  data() {
    return {
      resturantDetail: {},
      showResturantDetail:true,
      is_rating:false,
      is_twoPersonPrice:false,
      is_minimuOrder:false,
    };
  },
  
  mounted() {
    this.getRestaurantDetail();
    setTimeout(() => this.resturantDetail.rating > 0?this.is_rating = true:'', 2000);
    setTimeout(() => this.is_twoPersonPrice = true, 2000);
    setTimeout(() => this.is_minimuOrder = true, 2000);
  },
  methods: {
    ...mapActions("restaurant", ["getRestaurantBySlug"]),
    
    getRestaurantDetail() {
      this.getRestaurantBySlug({
        vendor_id: this.$auth.getVendorId(),
        slug:this.$route.params.restaurant_name,
        is_langauge: "en",
      }).then((data) => {
        if(data.code == 200){
          this.resturantDetail = data.Result;
          this.$auth.setRestauranID(data.Result.restaurant_id);
          this.showResturantDetail=true;
        }else{
          this.showResturantDetail=false;
        }
        
      });
    },

    goToHome(){
      this.$router.go(-1);
    },
    
  },
};
</script>
<style>
.skel_view{
  border-radius: 30px !important;
    padding: 5px 10px !important;
    margin-top: 15px;
    background: rgba(0, 0, 0, 0.12);
    width: 25% !important;
    height: 31px !important;
}
</style>
