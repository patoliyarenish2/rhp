<template>
  <div id="ongoing" class="tab-pane active tab-box">
    <div class="orders-lst skelton" v-if="is_skel_loader">
      <a href="javascript:void(0);">
        <div class="order-item d-flex align-items-start">
            <div class="img-cls">
              <skeleton-loader-vue width="85px" height="85px" style="border-radius: 5px;"/>
              </div>
            <div class="order-data ml-3 d-flex align-items-start justify-content-between w-100">
              <div class="orders-status-main delivery-link">
                  <h6 class="mb-1"><skeleton-loader-vue type="string" width="130px" height="20px" /></h6>
                 <skeleton-loader-vue type="string" width="50px" height="20px" />
                  <p class="mt-2"><skeleton-loader-vue type="string" width="100px" height="20px" /></p>
              </div>
              <div class="order-status">
                  <p class="order-status-btn"><skeleton-loader-vue type="circle" width="100px" height="20px" style="border-radius: 20px !important;"/></p>
              </div>
            </div>
        </div>
      </a>
    </div>

    <div class="orders-lst" v-if="ongoingorders.length > 0 && !is_skel_loader">
      <router-link
        v-for="(order,index) in ongoingorders"
        :key="index"
        :to="{ name: 'order-status',params: { order_id: order.id }}"
      >
        <div class="order-item d-flex align-items-start">
          <div class="img-cls">
            <img :src="order.icon_image" />
          </div>
          <div class="order-data ml-3 d-flex align-items-start justify-content-between w-100">
            <div class="orders-status-main delivery-link on-going-order">
              <h6 class="mb-1">{{order.restaurant_name}}</h6>
              <span v-html="$auth.setting.currency"></span> <span>{{parseFloat(order.total_amount || 0).toFixed(2)}}</span>
              <p class="mt-2">{{moment(order.order_date).fromNow()}}</p>
            </div>
            <div class="order-status" v-if="order.order_status == 'Placed'">
              <p class="readytoserve order-status-btn">Placed</p>
            </div>
            <div class="order-status" v-else-if="order.order_status == 'InKitchen'">
              <p class="readytoserve order-status-btn">Processing</p>
            </div>
            <div class="order-status" v-else-if="order.order_status == 'ReadyToServe'">
              <p class="readytoserve order-status-btn">Processing</p>
            </div>
            <div class="order-status" v-else-if="order.order_status == 'OnTheWay'">
              <p class="readytoserve order-status-btn">On The Way</p>
            </div>
            <div class="order-status" v-else-if="order.order_status == 'Arrived'">
              <p class="readytoserve order-status-btn">Arrived</p>
            </div>
            <div class="order-status" v-else-if="order.order_status == 'Delivered'">
              <p class="delivered order-status-btn">{{order.order_status}}</p>
            </div>
            <div class="order-status" v-else-if="order.order_status == 'Cancelled'">
              <p class="canceled order-status-btn">{{order.order_status}}</p>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div v-else class="order-offers">
      <p>No Ongoing Order Found</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import moment from "moment";
import VueSkeletonLoader from 'skeleton-loader-vue';

export default {
  components: { 'skeleton-loader-vue':VueSkeletonLoader },
  computed: {
    ...mapGetters("order",["onGoingOrders"]),
  },
  data() {
    return {
      ongoingorders: [],
      moment: moment,
      is_skel_loader :true,
    };
  },
  mounted() {
    this.OnGoingOrders();
  },
  methods: {
    ...mapActions("order",["getOnGoingOrder"]),
    OnGoingOrders() {
      this.is_skel_loader = true;
      this.getOnGoingOrder({
        vendor_id: this.$auth.getVendorId(),
        is_langauge : "en",
        user_id: "",
        totalrecord: "",
        skip: "",
      }).then((data) => {
        if (data.code == 200) {
          this.is_skel_loader = false;
          this.ongoingorders = data.Result;
        }
        if (data.code == 101) {
          this.is_skel_loader = false;
        }
      });
    },
  },
};
</script>