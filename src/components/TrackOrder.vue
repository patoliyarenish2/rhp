<template>
  <div>
    <div
      class="modal fade order-placed"
      id="orderplaced"
      tabindex="-1"
      aria-labelledby="orderplacedLabel"
      aria-hidden="true"
      ref="PlaceOrderModal"
      style="z-index: 9999;"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" v-if="iswallet == '0'">
          <div class="modal-body text-center">
            <img src="@/assets/images/confirmed-icn.svg" />
            <p class="mt-3 mb-1">
              Your order has been placed.
              <br />You can track order status on orders tab.
            </p>
          </div>
          <div class="modal-footer full-btn d-block">
            <a href="javascript:void(0);" data-dismiss="modal">Track Order</a>
          </div>
        </div>
        <div class="modal-content" v-if="iswallet == '1'">
          <div class="modal-body text-center">
            <img src="@/assets/images/confirmed-icn.svg" />
            <p class="mt-3 mb-1">
              Your recharge has been successfully.
            </p>
          </div>
          <div class="modal-footer full-btn d-block">
            <a href="javascript:void(0);" data-dismiss="modal">Ok</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props:['orderId','iswallet'],
  mounted() {
    window.$(this.$refs.PlaceOrderModal).modal();
    $(this.$refs.PlaceOrderModal).on("hidden.bs.modal", this.oncloseModle);
  },
  methods: {
    ...mapMutations("product",["clearCartItems"]),
    ...mapMutations("order",["clearPlaceOrderData"]),
    oncloseModle() {
      if(this.iswallet == '0'){
        this.$store.commit("product/clearCartItems");
        this.$store.commit("order/clearPlaceOrderData");
        this.$router.push({ name: "order-status", params: { order_id: this.orderId } });
      }else{
        this.$router.push({ name: "wallet" });
      }
      
    }
  }
};
</script>