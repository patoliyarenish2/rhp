<template>
<div class="login-main">
 <nav-bar></nav-bar>
  <section class="order-details-start">
    <div class="review-container review-main text-capitalize position-relative">
      <div class="row">
        <div class="text-center col-md-12 p-0 my-2 odr-loadr" v-if="loading">
          <b-spinner class="align-middle"></b-spinner>
        </div>
        <div class="col-md-12 p-0" v-for="(orders,index) in ordersDetail" :key="index">
          <div class="resturant-details plr15 order-id">
            <h4 class="text-left">Order #{{orders.order_id}}</h4>
          </div>
          <div class="orders-inner-main plr15 mt-2">
            <div class="orders-lst">
              <div class="order-item d-flex align-items-start pb-4">
                <img :src="orders.restaurant_image" />
                <div class="order-data ml-3 d-flex align-items-start justify-content-between w-100">
                  <div class="orderid-main">
                    <h6 class="mb-0">{{orders.restaurant_name}}</h6>
                    <p class="mt-1">{{orders.cuisine_name.join(', ')}}</p>
                    <a class="mt-2 d-inline-block" :href="'tel:'+orders.support_contact_number">
                      <i class="fas fa-phone-alt"></i> Call
                    </a>
                  </div>
                </div>
              </div>
              <div class="inner-data">
                <h6 class="mb-1 mt-3">Your Order</h6>
                <div class="order-history-main" v-for="(restaurant,index) in orders.restaurant_item_details" :key="index">
                  <div class="order-histry d-flex justify-content-between align-items-start">
                    <div class="histry-name item-heading delivery-link">
                      <div class="veg" v-if="restaurant.item_type == 0">
                        <span></span>
                      </div>
                      <div class="non-veg" v-else-if="restaurant.item_type == 1">
                        <span></span>
                      </div>
                      <div v-else-if="restaurant.item_type == 2">
                        <span></span>
                      </div>
                      <p class="mb-0">{{restaurant.restaurant_menu_item_name}}</p>
                      <span>{{restaurant.quantity}} item</span>
                    </div>
                    <div class="histry-price">
                      <span v-html="$auth.setting.currency"></span> <span>{{parseFloat(restaurant.amount).toFixed(2)}}</span>
                    </div>
                  </div>
                </div>
                <div class="billing-data border-0 mt-2">
                  <h6 class="mb-2">Billing Details</h6>
                  <ul>
                    <li class="d-flex justify-content-between">
                      SubTotal
                      <div>
                        <span v-html="$auth.setting.currency"></span> <span>{{parseFloat(orders.sub_total).toFixed(2)}}</span>
                      </div>
                    </li>
                    <li class="d-flex justify-content-between">
                      Delivery Charges
                      <div>
                        <span v-html="$auth.setting.currency"></span> <span>{{parseFloat(orders.delivery_fee).toFixed(2)}}</span>
                      </div>
                    </li>
                    <li class="d-flex justify-content-between">
                      GST
                      <div>
                        <span v-html="$auth.setting.currency"></span> <span>{{parseFloat(orders.service_fee).toFixed(2)}}</span>
                      </div>
                    </li>
                    <li class="d-flex justify-content-between discount-price" v-if="orders.discount_price">
                      Discount
                      <div>
                        <span v-html="$auth.setting.currency"></span> <span>{{parseFloat(orders.discount_price).toFixed(2)}}</span>
                      </div>
                    </li>
                    <li class="d-flex justify-content-between bold">
                      Total Paid
                      <div>
                        <span v-html="$auth.setting.currency"></span> <span>{{parseFloat(orders.total_amount).toFixed(2)}}</span>
                      </div>
                    </li>
                    <li class="d-flex justify-content-between walltline" v-if="orders.wallet_amount > 0">
                      Wallet
                      <div class="walltline">
                        - <span v-html="$auth.setting.currency"></span><span>{{parseFloat(orders.wallet_amount).toFixed(2)}}</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="billing-data border-0 mt-2">
                  <h6 class="mb-2">Order Details</h6>
                  <ul>
                    <li class="d-flex justify-content-between">
                      Order Number
                      <span>#{{orders.order_id}}</span>
                    </li>
                    <li class="d-flex justify-content-between">
                      Placed Date
                      <span>{{moment(orders.order_date).format('DD/MM/Y hh:mm A')}}</span>
                    </li>
                    <li class="d-flex justify-content-between">
                      Order Type
                      <span>{{orders.delivery_pickup_types}}</span>
                    </li>
                    <li class="d-flex justify-content-between">
                      Payment Mode
                      <span>
                        {{orders.payment_method}}
                        {{orders.payment_type != 'wallet'?' ('+orders.payment_type+')':''}}
                      </span>
                    </li>
                    <li class="d-flex justify-content-between delivery-locality">
                      Delivery Address
                      <span>{{orders.delivery_address}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div id="past" v-if="orders.cancelled_desc" class="tab-pane tab-box cncel-ordr">
            <h6>Cancelled Order</h6>
            <p>{{orders.cancelled_desc}}</p></div>
        </div>
      </div>
    </div>
  </section>
  <Footer></Footer>
</div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import { mapActions, mapGetters, mapState } from 'vuex';
import moment from "moment";
import Footer from '../components/Footer.vue';
export default {
    components: {
        NavBar,
        Footer
    },
    data(){
        return{
            ordersDetail: [],
            moment: moment,
            loading: true,
        }
    },
    computed:{
        ...mapGetters("order",["orderDetail"]),
    },
    mounted(){
      if(this.$auth.user){
        this.orderDetails();
      }else{
        this.$router.push({ name: "sign-in" });
      }
    },
    methods: {
      ...mapActions("order",["viewOrderDetail"]),
      orderDetails(){
        this.loading = true;
        this.viewOrderDetail({
            vendor_id: this.$auth.getVendorId(),
            order_id: this.$route.params.order_id,
            is_langauge : "en"
        }).then(data => {
          if (data.code == 200) {
            this.loading = false;
            this.ordersDetail = data.Result;
          }
          if (data.code == 101) {
            this.loading = false;
            this.ordersDetail = '';
          }
        })
      }
    }
};
</script>