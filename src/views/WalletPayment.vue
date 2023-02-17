<template>
  <div class="login-main">
    <nav-bar></nav-bar>
    <section>
      <div class="review-container review-main text-capitalize position-relative">
        <div class="row">
          <div class="col-md-12 p-0">
            <div>
              <div class="resturant-details plr15">
                <h4 class>Add Money to Wallet</h4>
              </div>
              <div class="plr15 mt-3">
                <div class="">
                  <form class="boxed payment-box" v-if="isPayOnlineEnable" >
                    <div class="wallet-boxs">
                      <span v-html="$auth.setting && $auth.setting.currency"></span>
                      <input class="form-control pay-amount mb-0 h50" type="number" :placeholder="placeholder" id="amount" name="amount" v-model="amount" />
                    </div>
                    <div v-if="isPayOnlineEnable">
                      <div class="d-block position-relative" v-for="(pay,index) in payment_gateway_list" :key="index">
                        <input type="radio" :id="'payonline'+index" name="payusing" :value="pay" v-model="payusing" v-if="onlinePaymentEnableOption.includes(pay)"/>
                        <label :for="'payonline'+index" v-if="onlinePaymentEnableOption.includes(pay)">
                          <div class="card-cls">
                            <img src="@/assets/images/card2.svg" />
                          </div>
                          <span>Add Money Via {{pay}}</span>
                        </label>
                      </div>
                    </div>
                  </form>
                   <div v-else class="order-offers rest-not-found">
                    <div class="text-center my-2" v-if="loading">
                      <b-spinner class="align-middle"></b-spinner>
                    </div>
                    <p v-else>No {{$auth && $auth.getRestaurantName()}} Found</p>
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
                <button v-else @click="payRecharge" :disabled='isDisabled'>
                  {{(isDisabled) ? 'Add...' : 'ADD MONEY'}}
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
import AlertModal from '../components/AlertModal.vue';
import Wallet from '../apis/wallet';
export default {
  components: { NavBar, TrackOrder, FailOrder,AlertModal },
  data() {
    return {
      onlinePaymentEnableOption: ['razorpay', 'paypal', 'stripe'], //Only this payment gateway are will be enable for online payment
      isOrderfail: false, //Fail order popup
      isOrderSuccess: false, //Success order popup
      payusing:"", //Customer's selected payment gateway
      payment_gateway_list:[], //Admin payment gateway list
      isPayOnlineEnable:false, //Check online payment
      placeOrderId:0, //Place orderid, it get used when need to redirect to track screen
      isDisabled:false, //Used to enable/disable place order button, also for loading
      loading: true,
      isAlert : false,
      AlertData: {},
      amount:'',
      iswallet:1,
      placeholder :'0.0' 
    }
  },
  mounted() {
    //Check customer login
     if(!this.$auth.user){
      this.$router.push({ name: "Home" });
      return false;
     }
    //Get admin setting
    if (this.$auth.setting) {
      if (this.$auth.setting && this.$auth.setting.payment_gateway_new) {
        this.isPayOnlineEnable = true;
        this.payment_gateway_list = this.$auth.setting.payment_gateway_new;
      }
    }
    let routeQry = this.$route.query;
    if (routeQry.success) {
      this.isOrderSuccess = true;
    } else if (routeQry.fail) {
      this.isOrderfail = true;
    }
  },
  methods: {
    onModalCloseFun(value){
      this.isAlert = false;
    },
    //Check order, update payment method and type to place order
    payRecharge() {
      if(this.amount == '' || this.amount == 0){
        this.$toasted.error('Please Add Amount!', { duration: 1000 });
      }else{
        if (this.payusing != '') {
            if(Number(this.amount) >= Number(this.$auth.setting.wallet_recharge_limit)){
                this.AlertData = {
                    displayMessage : 'Wallet Recharge Limit exceeded',
                    isSetClass : 'paymnt-modal-cls'
                };
                this.isAlert = true;
                window.$(this.$refs.AlertModal).modal();
            }else{
                this.placeWalletRecharge();
            }
            
        } else {
            this.AlertData = {
            displayMessage : 'Please select any payment option to pay',
            isSetClass : 'paymnt-modal-cls'
            };
            this.isAlert = true;
            window.$(this.$refs.AlertModal).modal();
        }
      }
      
    },

    placeWalletRecharge() {
      this.isDisabled = true;
      if(this.payusing == 'razorpay'){
        this.payUsingGatway('razorpayRechargeWalletApi');  
      }else if(this.payusing == 'paypal'){
        this.payUsingGatway('paypalRechargeWalletApi');  
      }else if(this.payusing == 'stripe'){
        this.payUsingGatway('stripeRechargewalletApi');  
      }
    },

    payUsingGatway(apiname){
      Wallet[apiname]({
        'user_id':this.$auth.user.user_id,
        'vendor_id':this.$auth.getVendorId(),
        'is_langauge':'en',
        'recharge_amount':this.amount,
        // 'currency':'INR',
        'isweb':1
      }).then((response) => {
        if (response.data.code == 200) {
          if(response.data.Result.recharge_link && response.data.Result.recharge_link != ''){
            window.open(response.data.Result.recharge_link, "_self");
          }
        }else {
          this.isDisabled = false;
          this.$toasted.error(response.data.msg, { duration: 2000 });
        }
      }).catch(function () {
        this.isDisabled = false;
        alert('Something went wrong, Please try again');
      });
    }
    
  }
};
</script>