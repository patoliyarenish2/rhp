<template>
  <div class="login-main">
    <nav-bar></nav-bar>
    <section class="review-order-start order-status-main">
      <div class="review-container review-main text-capitalize position-relative">
        <div class="row" v-if="ordersDetail.length > 0">
          <div class="col-md-12 p-0" v-for="(orders, index) in ordersDetail"
            :key="index">
            <div class="resturant-details d-flex align-items-start plr15">
              <div class="resturant-details-box">
                <div class="img-cls">
                  <img :src="orders.restaurant_image" class="mr-3" />
                </div>
                <div class="status-con">
                  <h6>{{ orders.restaurant_name }}</h6>
                  <p class="orderid">Order #{{ orders.order_id }}</p>
                  <a class="status-call-btn" :href="'tel:' + orders.support_contact_number"><i class="fas fa-phone-alt mr-2"></i>Call</a>
                </div>
              </div>
              <div class="rdctr-dedetail">
                <router-link :to="{name: 'order-details',params: { order_id: orders.order_id },}">
                  <span>></span></router-link>
              </div>
            </div>
            <div class="order-status-timeline">
              <div class="timeline-block timeline-block-right">
                <div class="marker" :class="{
                    active: [
                      'Placed',
                      'ReadyToServe',
                      'InKitchen',
                      'OnTheWay',
                      'Arrived',
                      'Delivered',
                    ].includes(orders.order_status),
                  }"
                >
                  <i class="fa fa-check" :class="{
                      active: [
                        'Placed',
                        'ReadyToServe',
                        'InKitchen',
                        'OnTheWay',
                        'Arrived',
                        'Delivered',
                      ].includes(orders.order_status),
                    }"
                    aria-hidden="true"
                  ></i>
                </div>
                <div
                  class="timeline-content"
                  :class="{
                    active: [
                      'Placed',
                      'ReadyToServe',
                      'InKitchen',
                      'OnTheWay',
                      'Arrived',
                      'Delivered',
                    ].includes(orders.order_status),
                  }"
                >
                  <h3>Order Placed</h3>
                  <span
                    v-if="
                      [
                        'Placed',
                        'ReadyToServe',
                        'InKitchen',
                        'OnTheWay',
                        'Arrived',
                        'Delivered',
                      ].includes(orders.order_status)
                    "
                    >We have Received your order Request.Waiting for
                    {{ orders.restaurant_name }} to confirm the order.</span
                  >
                  <span v-else>Waiting</span>
                </div>
              </div>

              <div class="timeline-block timeline-block-left">
                <div
                  class="marker"
                  :class="{
                    active: [
                      'ReadyToServe',
                      'InKitchen',
                      'OnTheWay',
                      'Arrived',
                      'Delivered',
                    ].includes(orders.order_status),
                  }"
                >
                  <i
                    class="fa fa-check"
                    :class="{
                      active: [
                        'ReadyToServe',
                        'InKitchen',
                        'OnTheWay',
                        'Arrived',
                        'Delivered',
                      ].includes(orders.order_status),
                    }"
                    aria-hidden="true"
                  ></i>
                </div>
                <div
                  class="timeline-content"
                  :class="{
                    active: [
                      'ReadyToServe',
                      'InKitchen',
                      'OnTheWay',
                      'Arrived',
                      'Delivered',
                    ].includes(orders.order_status),
                  }"
                >
                  <h3>Order Confirmed</h3>
                  <span
                    v-if="
                      [
                        'ReadyToServe',
                        'InKitchen',
                        'OnTheWay',
                        'Arrived',
                        'Delivered',
                      ].includes(orders.order_status)
                    "
                    >{{ orders.restaurant_name }} is processing your order. As
                    soon as it is ready, we will notify you</span
                  >
                  <span v-else>Waiting</span>
                </div>
              </div>

              <div class="timeline-block timeline-block-left" v-if="orders.delivery_pickup_types == 'Delivery'">
                <div class="marker" :class="{ active: ['OnTheWay', 'Arrived', 'Delivered'].includes(orders.order_status)}">
                  <i class="fa fa-check" :class="{ active: ['OnTheWay', 'Arrived', 'Delivered'].includes(orders.order_status)}"
                    aria-hidden="true"></i>
                </div>
                <div class="timeline-content d-flex justify-content-between align-items-start" :class="{ active: ['OnTheWay', 'Arrived', 'Delivered'].includes(orders.order_status)}">
                  <div class="ontheway">
                    <h3>On The Way</h3>
                    <span v-if="['OnTheWay', 'Arrived', 'Delivered'].includes(orders.order_status)"
                      >Our Delivery is out for delivery. You can track exact status on track screen</span>
                    <span v-else>Waiting</span>
                  </div>
                  <!-- <a v-if="['OnTheWay'].includes(orders.order_status)" href="#" class="status-call-btn d-flex">Live Track</a> -->
                </div>
              </div>
              
              <div class="timeline-block timeline-block-left" v-else>
                <div class="marker" :class="{ active: ['ReadyToServe', 'Arrived', 'Delivered'].includes(orders.order_status)}">
                  <i class="fa fa-check" :class="{ active: ['ReadyToServe', 'Arrived', 'Delivered'].includes(orders.order_status)}"
                    aria-hidden="true"></i>
                </div>
                <div class="timeline-content d-flex justify-content-between align-items-start" :class="{ active: ['OnTheWay', 'Arrived', 'Delivered'].includes(orders.order_status)}">
                  <div class="ontheway">
                    <h3>Order Ready To Pickup</h3>
                    <span v-if="['ReadyToServe', 'Arrived', 'Delivered'].includes(orders.order_status)"
                      >Your order is ready to pickup. Collect order as soon as possible from {{ orders.restaurant_name }}.</span>
                    <span v-else>Waiting</span>
                  </div>
                </div>
              </div>

              <div class="timeline-block timeline-block-left" v-if="orders.delivery_pickup_types == 'Delivery'">
                <div
                  class="marker"
                  :class="{
                    active: ['Arrived', 'Delivered'].includes(
                      orders.order_status
                    ),
                  }"
                >
                  <i
                    class="fa fa-check"
                    :class="{
                      active: ['Arrived', 'Delivered'].includes(
                        orders.order_status
                      ),
                    }"
                    aria-hidden="true"
                  ></i>
                </div>
                <div
                  class="timeline-content"
                  :class="{
                    active: ['Arrived', 'Delivered'].includes(
                      orders.order_status
                    ),
                  }"
                >
                  <h3>Arrived</h3>
                  <span
                    v-if="
                      ['Arrived', 'Delivered'].includes(orders.order_status)
                    "
                    >Your order has just arrived at your doorstep</span
                  >
                  <span v-else>Waiting</span>
                </div>
              </div>
              <div class="timeline-block timeline-block-right" v-if="orders.delivery_pickup_types == 'Delivery'">
                <div class="marker" :class="{ active: ['Delivered'].includes(orders.order_status)}">
                  <i class="fa fa-check" :class="{ active: ['Delivered'].includes(orders.order_status)}" aria-hidden="true"></i>
                </div>
                <div class="timeline-content" :class="{ active: ['Delivered'].includes(orders.order_status)}">
                  <h3>Delivered</h3>
                  <span v-if="['Delivered'].includes(orders.order_status)">Your Order has been Delivered. Please don't forget to rate
                    our service.</span>
                    <span v-else>Waiting</span>
                </div>
              </div>
              <div class="timeline-block timeline-block-right" v-else>
                <div class="marker" :class="{ active: ['Delivered'].includes(orders.order_status)}">
                  <i class="fa fa-check" :class="{ active: ['Delivered'].includes(orders.order_status)}" aria-hidden="true"></i>
                </div>
                <div class="timeline-content" :class="{ active: ['Delivered'].includes(orders.order_status)}">
                  <h3>Order Collected</h3>
                  <span v-if="['Delivered'].includes(orders.order_status)">Your Order has been Delivered. Please don't forget to rate
                    our service.</span>
                    <span v-else>Waiting</span>
                </div>
              </div>
            </div>
            <div v-if="orders.order_status == 'Delivered'">
              <div class="delivery-address plr15 rate-btn" v-if="ratingExiting == 'false'">
                <div class="full-btn">
                  <router-link :to="{name:'rating', params:{order_id: orders.order_id}}">Rate Us</router-link>
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
import NavBar from "@/components/NavBar.vue";
import { mapActions } from "vuex";
import Footer from '../components/Footer.vue';
export default {
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      ordersDetail: [],
      ratingExiting: '',
    };
  },
  mounted() {
    if(this.$auth.user){
      this.orderDetails();
      this.checkRating();
    }else{
      this.$router.push({ name: "sign-in" });
    }
  },

  methods: {
    ...mapActions("order", ["viewOrderDetail", "checkOrderRating"]),
    orderDetails() {
      this.viewOrderDetail({
        vendor_id: this.$auth.getVendorId(),
        order_id: this.$route.params.order_id,
        is_langauge: "en",
      }).then((data) => {
        if (data.code == 200) {
          this.ordersDetail = data.Result;
          if(data.Result && data.Result[0].order_status == 'Cancelled'){
            this.$router.push({ name: "order-details", params: { order_id: data.Result[0].order_id }})
          }
        }
      });
    },

    checkRating() {
      this.checkOrderRating({
        vendor_id: this.$auth.getVendorId(),
        order_id: this.$route.params.order_id,
        is_langauge: "en",
      }).then((data) => {
        if (data.code == 200) {
          this.ratingExiting = data.Result.status;
        }
      });
    },
  },
};
</script>
