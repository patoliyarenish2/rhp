<template>
  <div class="login-main">
    <nav-bar></nav-bar>
    <section class="promocodes-start-main">
      <div class="review-container review-main text-capitalize position-relative">
        <div class="row">
          <div class="col-md-12 p-0">
            <div class="resturant-details plr15">
              <h4 class="text-left">Promocode</h4>
            </div>
            <!----------------------->
            <div class="orders-tab-main plr15 mt-3" v-if="isSkeletonLoader">
              <div class="order-item d-flex align-items-end justify-content-between">
                <div class="d-flex align-items-start">
                  <skeleton-loader-vue height="120px" width="120px" class="img-cls" style="border-radius: 5px !important"/>
                    <div class="order-data ml-3 d-flex align-items-start justify-content-between w-100">
                      <div class="orders-status-main">
                          <h6 class="mb-0"><skeleton-loader-vue type="string" width="24%" height="20px"/></h6>
                          <p class="mt-1"><skeleton-loader-vue type="string" width="24%" height="20px"/></p>
                          <div class="promocode mt-2">
                            <p><skeleton-loader-vue type="string" width="36%" height="20px"/></p>
                          </div>
                      </div>
                    </div>
                </div>
                <div><skeleton-loader-vue width="89%" height="31px" style="border-radius: 30px !important;margin-right: 86px;"/></div>
              </div>
            </div>
            <!----------------------->
            <div class="orders-tab-main plr15 mt-3" v-if="promoCode.length > 0">
              <div id="ongoing" class="tab-pane active tab-box">
                <div class="orders-lst">
                  <div
                    class="order-item d-flex align-items-end justify-content-between"
                    v-for="(offers, index) in promoCode"
                    :key="index"
                  >
                    <div class="d-flex align-items-start">
                      <div class="img-cls">
                        <img :src="offers.coupon_image" />
                      </div>
                      <div
                        class="order-data ml-3 d-flex align-items-start justify-content-between w-100"
                      >
                        <div class="orders-status-main">
                          <h6 class="mb-0">{{ offers.coupon_name }}</h6>
                          <p class="mt-1">{{ offers.description }}</p>
                          <div class="promocode mt-2">
                            <p>Code: {{ offers.coupon_code }}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                    <a class="cart-btn" @click="doCopy(offers.coupon_code)">Copy</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="offers order-offers">
              <p v-if="!loading" >No Offers Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>
<script>
import NavBar from "../components/NavBar.vue";
import { mapActions, mapGetters } from "vuex";
import config from "../config";
import Footer from '../components/Footer.vue';
import VueSkeletonLoader from 'skeleton-loader-vue';

export default {
  components: { NavBar,Footer,'skeleton-loader-vue':VueSkeletonLoader },
  data() {
    return {
      config: config,
      loading: true,
      promoCode: [],
      isAlert : false,
      AlertData: {},
      isSelectCoupon:'',
      isSkeletonLoader : true,
    };
  },
  mounted() {
    this.getPromoCode();
  },
  computed: {
    ...mapGetters("order", ["isPickupDelivery"]),
  },
  methods: {
    ...mapActions("promocode", ["updatePromoCode"]),
    
    getPromoCode() {
      let deliveryType = 'Delivery';
      if(this.isPickupDelivery == 1 || this.isPickupDelivery == -1){
        deliveryType = 'Delivery';
      }else{
        deliveryType = 'Pickup';
      }
      this.loading = true;
      this.isSkeletonLoader = true;
      this.updatePromoCode({
        vendor_id: this.$auth.getVendorId(),
        coupon_type: deliveryType
      }).then((data) => {
        if (data.code == 200) {
          this.loading = false;
          this.isSkeletonLoader = false;
          this.promoCode = data.Result;
        }
        if(data.code == 101){
          this.loading = false;
          this.isSkeletonLoader = false;
        }
      });
    },

    doCopy(el) {
      this.isSelectCoupon = el;
      this.$copyText(this.isSelectCoupon);
      this.$toasted.success("Promocode Copied to clipboard.", { duration: 3000 });
    },
   
  },
};
</script>