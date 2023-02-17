<template>
  <div class="login-main">
    <nav-bar></nav-bar>
    <section>
      <div class="review-container review-main text-capitalize position-relative">
        <div class="row">
          <div class="col-md-12 p-0">
            <div>
              <div class="resturant-details plr15">
                <h4 class>Select Payment Method</h4>
              </div>
              <div class="plr15 mt-4">
                <div class="payble-amount">
                  <span class="mb-1 d-inline-block">Payable Amount</span>
                  <h2><span v-html="$auth.setting.currency"></span
                  >{{(placeOrderData && placeOrderData.total_amount) ? placeOrderData.total_amount : 0}}</h2>
                </div>
                <div class="custom-checkbox">
                  <div class="wallt-amount form-group" v-if="$auth.setting.wallet_status == 'active' && $auth.user.wallet_status == 'active' && $auth.setting.customer_wallet_recharge == 'active' && $auth.user.wallet_amount > 0">
                    <input type="checkbox" name="wallt" id="wallt" v-model="walletamount" :value="$auth.user.wallet_amount" class="form-check-inline" @click="checked()">
                    <label for="wallt">Use your <span class="dsply-wlt"><span v-html="$auth.setting.currency"></span>{{$auth.user.wallet_amount}} wallet balance</span></label>
                  </div>
                </div>
                
                <!-- <div class="mt-5" v-if="isdisplayOprions"> -->
                <div class="mt-3">
                  <form class="boxed payment-box" v-if="isPayCodEnable || isPayOnlineEnable">
                    <div class="d-block position-relative" v-if="isPayCodEnable && codCheckPayment">
                      <input type="radio" id="cod" name="payusing" value="cod" v-model="payusing" />
                      <label for="cod">
                        <div class="card-cls">
                          <img src="@/assets/images/card1.svg" />
                        </div>
                        <span>Cash On Delivery</span>
                      </label>
                    </div>
                    <div v-if="isPayOnlineEnable && onlineCheckPayment">
                      <div class="d-block position-relative" v-for="(pay,index) in payment_gateway_list" :key="index">
                        <input type="radio" :id="'payonline'+index" name="payusing" :value="pay" v-model="payusing" v-if="onlinePaymentEnableOption.includes(pay)"/>
                        <label :for="'payonline'+index" v-if="onlinePaymentEnableOption.includes(pay)">
                          <div class="card-cls">
                            <img src="@/assets/images/card2.svg" />
                          </div>
                          <span>Pay Online Via {{pay}}</span>
                        </label>
                      </div>
                    </div>
                  </form>
                   <div v-else class="order-offers rest-not-found">
                    <div class="text-center my-2" v-if="loading">
                      <b-spinner class="align-middle"></b-spinner>
                    </div>
                    <!-- <p v-else>No {{$auth && $auth.getRestaurantName()}} Found</p> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="plr15 delivery-address">
              <div class="full-btn green-btn">
                <b-button variant="primary" class="nxt-btn" disabled v-if="isDisabled">
                  <b-spinner small type="grow"></b-spinner>
                  Loading...
                </b-button>
                <button v-else @click="checkOrder" :disabled='isDisabled'>
                  {{(isDisabled) ? 'Placing Order...' : 'Place Order'}}
                </button>
              </div>
            </div>
            <track-order v-if="isOrderSuccess" :orderId="placeOrderId" :iswallet="iswallet"></track-order>
            <fail-order v-if="isOrderfail"></fail-order>
          </div>
        </div>
      </div>
    </section>
    <!--Alert Modal start-->
    <AlertModal v-if="isAlert" :DisplayAlertData="AlertData" v-on:modalClose="onModalCloseFun"></AlertModal>
    <!--Alert Modal End-->
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import TrackOrder from '../components/TrackOrder.vue';
import FailOrder from '../components/FailOrder.vue';
import { mapGetters, mapActions } from "vuex";
import AlertModal from '../components/AlertModal.vue';

export default {
  components: { NavBar, TrackOrder, FailOrder,AlertModal },
  data() {
    return {
      onlinePaymentEnableOption: ['razorpay', 'paypal', 'stripe','omise'], //Only this payment gateway are will be enable for online payment
      isOrderfail: false, //Fail order popup
      isOrderSuccess: false, //Success order popup
      payusing:"", //Customer's selected payment gateway
      payment_gateway_list:[], //Admin payment gateway list
      restaurant_payment_option: "", //Admin payment setting
      payment_option:"", //Store payment setting
      restaurantId:0, //StoreId
      restaurantData:[], //Store data
      isPayCodEnable:false, //Check cod payment
      isPayOnlineEnable:false, //Check online payment
      is_cod_enable:false, //Check customer cod option
      placeOrderData : {}, //Place order data
      placeOrderId:0, //Place orderid, it get used when need to redirect to track screen
      isDisabled:false, //Used to enable/disable place order button, also for loading
      loading: true,
      isAlert : false,
      AlertData: {},
      iswallet:0,
      walletamount:false,
      isdisplayOprions: false,
      codCheckPayment:true,
      onlineCheckPayment:true,
    }
  },
  computed: {
    ...mapGetters("order", ["place_order_data","isPickupDelivery"]), //To get current order data to place
    ...mapGetters("address", ["primaryAddress"]), //To Get Primary address
    ...mapGetters("product", ["cart"]), //To cart items to check
  },
  mounted() {
    //Check customer login
    if(this.$auth.user){
      this.is_cod_enable = (this.$auth.user.is_cod_enable) ? true : false;
    } else {
      this.$router.push({ name: "Home" });
      return false;
    }

    //Get placing order data
    this.placeOrderData = this.place_order_data;
    if (this.placeOrderData == undefined || this.placeOrderData == null || this.placeOrderData.length == 0) {
      this.$router.push({name:'Home'});
      return false;
    } else {
      if (this.placeOrderData) {
        if (this.placeOrderData.restaurant_id && this.placeOrderData.restaurant_id > 0) {
          this.restaurantId = this.placeOrderData.restaurant_id;
        }
      }
    }
    
    if(this.$auth.user.wallet_amount > this.placeOrderData.total_amount){
      this.isdisplayOprions = false;
      this.walletamount = false;
    }else if(this.$auth.user.wallet_amount > this.placeOrderData.total_amount){
      this.isdisplayOprions = true;
    }
    //Web pay order status
    let routeQry = this.$route.query;
    if (routeQry.success) {
      this.placeOrderId = routeQry.success;
      //window.$(this.$refs.PlaceOrderModal).modal();
      this.isOrderSuccess = true;
    } else if (routeQry.fail) {
      this.isOrderfail = true;
    }

    //Get admin setting
    if (this.$auth.setting) {
      if (this.$auth.setting && this.$auth.setting.payment_gateway_new) {
        this.payment_gateway_list = this.$auth.setting.payment_gateway_new;
        this.restaurant_payment_option = this.$auth.setting.restaurant_payment_option;
      }
    }
    //Call function to get restaurant details
    this.getRestaurantInfo();
    this.checked();
  },
  methods: {
    ...mapActions("restaurant", ["getRestaurantDetails", "getVendorOnOffStatus", "checkVendorRadius", "checkVendorMenuWithPrice"]), //To get restaurant details
    ...mapActions("order", ["placeOrder"]), //To place an order
    
    checked() {
      if($('#wallt').is(':checked')){
        if(this.$auth.user.wallet_amount >= this.placeOrderData.total_amount){
          this.codCheckPayment = false;
          this.onlineCheckPayment = false;
          // this.isPayCodEnable = false;
          // this.isPayOnlineEnable = false;
          this.loading= false;
        }else{
          this.codCheckPayment = true;
          this.onlineCheckPayment = true;
          // this.isPayCodEnable = true;
          // this.isPayOnlineEnable = true;
          this.loading= false;
        }
      }else{
        this.codCheckPayment = true;
        this.onlineCheckPayment = true;
        // this.isPayCodEnable = true;
        // this.isPayOnlineEnable = true;
        this.loading= false;
      }
    },

    paymentOption(){
      if(this.isdisplayOprions){
        this.isdisplayOprions = false;  
      }else{
        this.isdisplayOprions = true;
      }
    },
    //Get restaurant details
    getRestaurantInfo() {
      if (this.restaurantId > 0) {
        this.getRestaurantDetails({
          vendor_id: this.$auth.getVendorId(),
          restaurant_id: this.restaurantId,
          is_langauge: "en",
        }).then((data) => {
          if (data.code == 200) {
            this.restaurantData = data.Result;
            this.payment_option = this.restaurantData.payment_option;
            this.handlePaymentOptions();
          } else {
            alert("Store not found");
          }
        });
      } else {
        alert("Store not found");
      }
    },
    //Check enable/disable payment options
    handlePaymentOptions() {
      //Check master settings, As per store/vendor/restaurant choice
      if (this.restaurant_payment_option == "Restaurant Select Payment Option") {
        if (this.payment_option == 'Both') {
          this.isPayCodEnable = (this.is_cod_enable) ? true :false;
          this.isPayOnlineEnable = true;
        } else if (this.payment_option == 'PAY ONLINE') {
          this.isPayCodEnable = false;
          this.isPayOnlineEnable = true;
        } else if (this.payment_option == 'COD') {
          this.isPayCodEnable = (this.is_cod_enable) ? true :false;
          this.isPayOnlineEnable = false;
        }
        this.loading = false;
      } else { //Check master settings, As per admin choice
        if (this.restaurant_payment_option == 'Both') {
          this.isPayCodEnable = (this.is_cod_enable) ? true :false;
          this.isPayOnlineEnable = true;
        } else if (this.restaurant_payment_option == 'PAY ONLINE') {
          this.isPayCodEnable = false;
          this.isPayOnlineEnable = true;
        } else if (this.restaurant_payment_option == 'COD') {
          this.isPayCodEnable = (this.is_cod_enable) ? true :false;
          this.isPayOnlineEnable = false;
        }
      }
    },
    
    onModalCloseFun(value){
      this.isAlert = false;
    },
    
    //Check order, update payment method and type to place order
    checkOrder() {
      if(this.walletamount){
        if(this.$auth.user.wallet_amount >= this.placeOrderData.total_amount){
          this.payusing = 'wallet';
          this.placeOrderData.remaining_amount = 0;
          this.placeOrderData.wallet_amount = this.placeOrderData.total_amount; // coupen minus
        }else{
          this.placeOrderData.wallet_amount = this.$auth.user.wallet_amount; // coupen minus
          this.placeOrderData.remaining_amount = parseFloat(this.placeOrderData.total_amount - this.placeOrderData.wallet_amount).toFixed(2);
        }
      }  
      
      this.placeOrderData.payment_method = '';
      this.placeOrderData.payment_type = '';
    
      if (this.payusing != '') {
        if (this.payusing == 'cod') {
          this.placeOrderData.payment_method = 'Cash On Delivery';
          this.placeOrderData.payment_type = 'Cash On Delivery';
        }else if(this.payusing == 'wallet'){
          this.placeOrderData.payment_method = 'Wallet';
          this.placeOrderData.payment_type = 'wallet';
        }else {
          this.placeOrderData.payment_method = 'Online';
          this.placeOrderData.payment_type = this.payusing;
        }
        this.orderRequest();
      } else {
        this.AlertData = {
          displayMessage : 'Please select any payment option to pay',
          isSetClass : 'paymnt-modal-cls'
        };
        this.isAlert = true;
        window.$(this.$refs.AlertModal).modal();
      }
    },
    
    //Place order and redirect if payment is web payment
    orderRequest() {
      this.isDisabled = true;
      this.getRestaurantOnOffStatus();
    },

    getRestaurantOnOffStatus() {
      let date='';
      let time ='';
      if(this.placeOrderData.future_delivery_date && this.placeOrderData.future_delivery_date !=''){
        let datetime = this.placeOrderData.future_delivery_date.split(' ');
        date = datetime[0];
        time = datetime[1];
      }
      let data = {
        is_langauge:'en',
        delivery_type_time_slots:this.isPickupDelivery, //this.placeOrderData.delivery_type,
        starttime:time,
        restaurant_id:this.restaurantId,
        vendor_id:this.placeOrderData.vendor_id,
        date:date,
      };
      this.getVendorOnOffStatus(data).then((data) => {
        if (data.code == 200) {
          if (data.Result.status == '1' || data.Result.status == 1) {
            this.checkRestaurantRadius();
          } else {
            alert('Restaurant is currently off, Please try after some time');
            this.isDisabled = false;
          }
        } else {
          alert(data.msg);
          this.isDisabled = false;
        }
      }).catch(function () {
        alert('Something went wrong, Please try again');
        this.isDisabled = false;
      });
    },
    checkRestaurantRadius() {
      let data = {
        is_langauge:'en',
        latitude:this.primaryAddress.latitude,
        longitude:this.primaryAddress.longitude,
        restaurant_id:this.restaurantId,
        vendor_id:this.placeOrderData.vendor_id,
      };
      this.checkVendorRadius(data).then((data) => {
        if (data.code == 200) {
          this.checkRestaurantMenuWithPrice();
        } else {
          alert('Your location is out of reach');
          this.isDisabled = false;
        }
      }).catch(function () {
        alert('Something went wrong, Please try again');
        this.isDisabled = false;
      });
    },
    checkRestaurantMenuWithPrice() {
      let menu_item_ids = [];
      let menu_item_price = [];
      let customisation_menu_item_ids = [];
      let customisation_menu_item_price = [];
      
      this.cart.forEach(item => {
        menu_item_ids.push(item.item_id);
        menu_item_price.push(item.item_price);
        if(item.selected_type.length){
          customisation_menu_item_ids.push(item.selectCustoizeID);
          customisation_menu_item_price.push(item.selectCustoizePrice);
        }
      });
      let data = {
        is_langauge:'en',
        vendor_id:this.placeOrderData.vendor_id,
        restaurant_id:this.restaurantId,
        menu_item: menu_item_ids.join(),
        item_price:menu_item_price.join(),
        customisation_id:customisation_menu_item_ids.join(),
        customisation_price:customisation_menu_item_price.join(),
        beverage_ids:''
      }
      this.checkVendorMenuWithPrice(data).then((data)=>{
        if (data.code == 200) {
          this.placeNewOrder();
        } else {
          alert(data.msg);
          this.isDisabled = false;
        }
      });
    },

    placeNewOrder() {
      this.placeOrder(this.placeOrderData).then((data) => {
        if (data.code == 200) {
          if (!['cod','wallet'].includes(this.payusing) ) {
            window.open(data.webpayurl, "_self");
          } else {
            if (data.Item) {
              if (data.Item.orderid && data.Item.orderid > 0) {
                this.placeOrderId = data.Item.orderid;
                this.isOrderSuccess = true;
              }
            }
            this.isOrderSuccess = true;
            window.$(this.$refs.PlaceOrderModal).modal();
          }
        } else {
          this.isOrderfail = true;
        }
        this.isDisabled = false;
      }).catch(function () {
        this.isDisabled = false;
        alert('Something went wrong, Please try again');
      });
    }
  }
};
</script>