<template>
  <div class="login-main">
    <nav-bar v-on:sendDefaultAddress="getAddress" :checkpage="page"></nav-bar>
    <section class="review-order-start">
      <div class="review-container review-main text-capitalize position-relative">
        <div class="row" v-if="cartItemCount > 0">
          <div class="col-md-12 p-0">
            <div class="resturant-details d-flex align-items-start plr15">
              <div class="rst-nme-add">
                <h4 class="mt-0">Your Cart <span class="total-items">({{cart.reduce((a, c) => (a + c.quantity),0)}} {{cart.reduce((a, c) => (a + c.quantity),0) > 1 ? 'Items':'Item'}})</span></h4>
                <p class="frm-txt">From :  
                  <a href="javascript:void(0)" v-if="!restaurantData.slug"><skeleton-loader-vue  type="string" width="50%" height="20px" />
                  </a>
                  <router-link v-else :to="{name:'vendor', params:{restaurant_name: restaurantData.slug}}" class="resst-lnk">{{ this.restaurantData.name }}</router-link></p>
              </div>
            </div>
            <div class="order-items-main plr15">
              <div
                class="order-item d-flex align-content-start justify-content-between"
                v-for="(item, index) in this.cart"
                :key="index"
              >
                <div class="item-heading">
                  <div class="veg" v-if="item.item_type == '0'"><span></span></div>
                  <div class="non-veg" v-if="item.item_type == '1'"><span></span></div>
                  <p class="mb-0">{{ item.name }} :</p>
                </div>
                <div class="d-flex align-items-center">
                  <div class="number d-flex align-items-start mr-4">
                    <span
                      class="minus d-flex justify-content-center align-items-center"
                       @click="minusItem(item,index)" >-</span
                    >
                    <input type="text" :value="item.quantity" readonly/>
                    <span
                      class="plus d-flex justify-content-center align-items-center"
                       @click="plusItem(item,index)" >+</span
                    >
                  </div>
                  <div class="final-item-price">
                    <p class="mb-0"><span id="currency" v-html="$auth.setting.currency"></span
                  >{{parseFloat(getTotalItemPrice(item)).toFixed(2)}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="plr15 review-section">
              <div class="review-boxs mt-4">
                <h6 class="mb-2">special instructions</h6>
                <input
                  class="form-control mb-0 h50"
                  type="search"
                  placeholder="Any Instructions related to order"
                  aria-label="instructions" v-model="instructions"
                />
              </div>
              <div class="review-boxs mt-4 promocode-sec">
                <h6 class="mb-2">promo code</h6>
                  <a href="javascript:void(0)"  @click="promocodeModal" class="lnk offer-btn">View Offers</a>
                <!-- v-b-modal.promocodeModal -->
                <input
                  class="form-control mb-0 h50"
                  type="text"
                  placeholder="Enter Promo code"
                  aria-label="promocode"
                  v-model="promocode"
                  ref="promocode"
                />
                <a href="javascript:void(0)" @click="applyPromocode(promocode)" class="lnk" v-if="!isPromocodeApply">Apply</a>
                <a href="javascript:void(0)" @click="removePromocode()" class="lnk" v-if="isPromocodeApply">Remove</a>
              </div>
              <p v-if="promoError" class="promoerr">{{promoError}}</p>
              <div class="review-boxs mt-4 delivery-time">
                <div class="d-flex justify-content-between align-items-center">
                  <h6 class="mb-0">
                    {{(isPickupDelivery == 1 || isPickupDelivery == -1) ? 'Delivery Time' : 'Takeaway Time'}}
                  </h6>
                  <delivery-time v-if="restaurantId > 0" ref="DeliveryTime" :isDelivery="isPickupDelivery" :restaurantId="restaurantId" :restaurantData="restaurantData" v-on:setOrderTime="onSetOrderTime"></delivery-time>
                </div>
                <p class="mb-0 mt-2">
                  {{
                    (scheduleDateTime.time && scheduleDateTime.time != '' && scheduleDateTime.time != 'asap') ? 
                    scheduleDateTime.displayText : 
                    (
                      (isAsapEnable) ? (restaurantData && (!isRestaurantClosed || !isSameDayDelivery))?'Select Time Slot': 'As soon As possible' : 
                      (
                        (isPickupDelivery == 1 || isPickupDelivery == -1) ? 'Select delivery time' : 'Select takeaway time'
                      )
                    )
                  }}
                </p>
              </div>
            </div>
            <div class="billing-data custom-checkbox" v-if="$auth.setting.contact_less_delivery && (isPickupDelivery == 1 || isPickupDelivery == -1) && $auth.setting.is_pickup_enable">
              <div class="d-flex justify-content-between align-items-center form-group">
                <h6>Opt in for No-contact Delivery</h6>
                <input class="form-group" id="cntctdelivery" type="checkbox" true-value="1" false-value="0" v-model="contactDelivery">
                <label class="form-check-label" for="cntctdelivery"></label>
              </div>
              <p class="pcolor">{{this.$auth.setting.terminology && $auth.setting.terminology[0].contact_less_delivery_text}}</p>
            </div>
            <div id="billing-data" class="billing-data">
              <h6 class="mb-3">Billing Details</h6>
              <ul>
                <li class="d-flex justify-content-between">
                  SubTotal
                  <span><span v-html="$auth.setting.currency"></span
                  >{{getTotalItemAmount()}}</span>
                </li>
                <li class="d-flex justify-content-between" v-if="this.$auth.setting && (this.$auth.setting.included_tax == 0 || this.$auth.setting.included_tax == 'Yes')">
                  {{this.$auth.setting && this.$auth.setting.terminology[0].tax_name}}({{this.gstMaxtax}}%)
                  <span><span v-html="$auth.setting.currency"></span
                  >{{gstTotalAmount()}}</span>
                </li>
                <li class="d-flex justify-content-between" v-if="getDeliveryChrge() > 0">
                  Delivery Charges
                  <span><span v-html="$auth.setting.currency"></span
                  >{{getDeliveryChrge()}}</span>
                </li>
                <li class="d-flex justify-content-between discount" v-if="promoDiscount">
                  Discount
                  <span><span v-html="$auth.setting.currency"></span
                  >{{promoDiscount}}</span>
                </li>
                <li class="d-flex justify-content-between promo-discount" v-if="promoCashback">
                  Cashback
                  <span><span v-html="$auth.setting.currency"></span
                  >{{promoCashback}}</span>
                </li>

                <li class="d-flex justify-content-between bold">
                  To Pay
                  <span><span v-html="$auth.setting.currency"></span
                  >{{getTotalAmount()}}</span>
                </li>
              </ul>
              <li v-if="(isPickupDelivery == 1 ||isPickupDelivery  == -1)"><p class="pcolor">{{$auth.setting && $auth.setting.cart_info_text}}</p></li>
            </div>
            
            <div class="delivery-address plr15">
              <div class="d-flex align-items-center justify-content-between" v-if="(isPickupDelivery == 1 || isPickupDelivery  == -1)">
                <h6 class="mb-0">Delivery To Home
                  <div v-if="this.address == ''" class="addaddrs">
                      <router-link :to="{ name: 'add-address' }">Add New Address</router-link>
                  </div>
                  <div v-else class="chng-addrs">
                    <a href="javascript:void(0)" @click="deliveryModalOpen" class="lnk">Change Address</a>
                  </div>
                </h6>
                <p>{{ this.address }}</p>
              </div>
              <div v-if="isPickupDelivery == 0" class="pckup-addr-cls">
                  <div class="pic-cls-con">
                    <h6>You will need to take away this order from</h6>
                    <p v-bind:title="restaurantData.location_address">{{ this.restaurantData.location_address }}</p>
                  </div>
                  <div class="map-add-cls">
                    <a :href="'https://www.google.com/maps?saddr='+latitude+','+longitude+'&daddr='+restaurantLat+','+restaurantLong" target="_blank">></a>
                  </div>
              </div>
              <div class="full-btn">
                <a href="#billing-data" class="btn billing-btn view-dtail-cls"><span v-html="$auth.setting.currency"></span>{{getTotalAmount()}}<span>View Bill Details</span></a>
                <a v-if="(getTotalItemAmount() < parseInt(this.restaurantData.minimum_order_value))" href="javascript:void(0);"  class="prcc-cls">Minimum Order Value<span v-html="$auth.setting.currency"></span>{{this.restaurantData.minimum_order_value}}</a>
                <b-button variant="primary" class="review-cart-btn" disabled v-else-if="is_btn_spinner">
                  <b-spinner small type="grow"></b-spinner>
                  Loading...
                </b-button>
                <a v-else href="javascript:void(0);" class="prcc-cls-blr" @click="processToPay()">Proceed To Pay</a>
                <router-link ref="redirectPayment" style="display:none !important;" :to="{ name: 'payment' }">Proceed To Pay</router-link>
              </div>
            </div>
          </div>
          <!--------All Promocode Modal start---------->
           <div class="modal fade order-placed" id="promocodeModal" tabindex="-1" aria-labelledby="promocodeModallabel" aria-hidden="true" ref="promocodeModalRef" style="z-index: 9999;">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title" id="filterLabel">Promocode</h4>
                      <a data-dismiss="modal" class="lnk">Close</a>
                    </div>
                    <div class="modal-body text-center" v-if="promoCodes.length > 0">
                      <div class="order-item d-flex align-items-end justify-content-between"
                        v-for="(offers, index) in this.promoCodes" :key="index">
                        <div class="d-flex align-items-start">
                          <img :src="offers.coupon_image" />
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
                          <a class="cart-btn" @click="applyPromocode(offers.coupon_code)">Apply</a>
                        </div>
                      </div>
                    </div>
                    <div v-else class="modal-body text-center">
                      <p>No Offers Available</p>
                    </div>
                </div>
              </div>
            </div>
          <!--------All Promocode Modal End---------->
        </div>
        <div v-else class="order-items-main">
          <div class="full-btn">
            <div class="crt-img-cls"><img src="@/assets/images/empty cart.png" /></div>
            <p class="empty-cart">Cart Empty</p>
            <a href="javascript:void(0)" @click="goToHome()">Go Back</a>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import DeliveryTime from "../components/DeliveryTime.vue";
import Footer from '../components/Footer.vue';
import { mapGetters, mapActions, mapMutations } from "vuex";
import moment from "moment";
import VueSkeletonLoader from 'skeleton-loader-vue';

export default {
  components: { NavBar, DeliveryTime, Footer,'skeleton-loader-vue':VueSkeletonLoader },
  data() {
    return {
      moment:moment,
      restaurantData: "",
      address:'',
      gstMaxtax : '',
      minimumOrder:'',
      cartItemCount:1,
      promocode:'',
      promoError:'',
      promoDiscount:0,
      isPromocodeApply:false,
      promoCashback:0,
      promoCodeType:0,
      // promocodeModal:false,
      contactDelivery:0,
      place_order_parameter:[],
      shiping_id:'',
      coupon_id:'',
      instructions:'',
      restaurantId:0,
      scheduleDateTime:{},
      promoCodes:[],
      latitude:'',
      longitude:'',
      restaurantLat:'',
      restaurantLong:'',
      page:'review_page',
      isAsapEnable: false,
      timeFormat: 'HH:mm:ss',
      isRestaurantClosed: false,
      isSameDayDelivery:false,
      is_btn_spinner:false
    };
  },
  mounted() {
    if(this.$auth.user){  
      this.getRestaurantInfo();
      this.getAddress();
      this.getDeliveryLocation();
      let user = JSON.parse(localStorage.getItem("vuex"));
      this.token = this.$auth.user.token;
      this.userId = this.$auth.user.user_id;
      
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
      let currentTime = moment().format(this.timeFormat);
      if (this.$auth.setting) {
        let system_start_time = (this.$auth.setting && this.$auth.setting.system_start_time != '') ? this.$auth.setting.system_start_time.split(' ').pop() : '00:00:00';
        let system_end_time = (this.$auth.setting && this.$auth.setting.system_end_time != '') ? this.$auth.setting && this.$auth.setting.system_end_time.split(' ').pop() : '23:59:00';
        this.isSameDayDelivery = (this.$auth.setting && this.$auth.setting.is_same_day_delivery == 0) ? false : true;
        let beforeTime = moment(system_start_time, this.timeFormat);
        let afterTime = moment(system_end_time, this.timeFormat);
        if (moment(currentTime, this.timeFormat).isBetween(beforeTime, afterTime)) {
          this.isAsapEnable = true;
        } else {
          this.isAsapEnable = false;
        }
      }
    }
    else{
      this.$router.push({ name: "sign-in" });
    }
  },
  computed: {
    ...mapGetters("product", ["cart"]),
    ...mapGetters("restaurant", ["restaurantDetails"]),
    ...mapGetters("address",["addressList","primaryAddress"]),
    ...mapGetters("order", ["isPickupDelivery"]),
  },
  methods: {
    ...mapActions("product", ["removeProductFromCart"]),
    ...mapMutations("product",["decrementProductInventary","IncrementItemQuantity"]),
    ...mapActions("address",["getPrimaryAddress"]),
    ...mapActions("restaurant", ["getRestaurantDetails"]),
    ...mapActions("promocode",["promocodeRedeem","updatePromoCode"]),
    ...mapMutations("order",["placeOrderData", "clearPlaceOrderData"]),

    deliveryModalOpen(){
      $('#deliveryModal').modal('show');
    },

    promocodeModal(){
      let deliveryType = 'Delivery';
      if(this.isPickupDelivery == 1 || this.isPickupDelivery == -1){
        deliveryType = 'Delivery';
      }else{
        deliveryType = 'Pickup';
      }
      this.updatePromoCode({
        vendor_id: this.$auth.getVendorId(),
        coupon_type: deliveryType
      }).then((data) => {
        if (data.code == 200) {
          this.loading = false;
          this.promoCodes = data.Result;
        }
        if(data.code == 101){
          this.loading = false;
        }
        $('#promocodeModal').modal('show');
      });
    },

    onSetOrderTime(value) {
      this.scheduleDateTime = value;
    },

    //Get address for API call
    getAddress(){
      this.getPrimaryAddress({
      }).then((data) => {
        if (data.code == 200) {
          this.address = data.Result.adress_clarification + " " + data.Result.flat_no + " " + data.Result.house_name + " " + data.Result.Shiping_address;
          this.shiping_id = data.Result.shiping_id;
        }
        if (data.code == 101) {
          this.address = '';
        }
        if (data.code == 401) {
          this.address = '';
        }
      });
    },
    
    //Get Restaurant Information
    getRestaurantInfo() {
      if (this.cart.length) {
        this.restaurantId = this.cart[0].restaurant_id;
        this.getRestaurantDetails({
            vendor_id: this.$auth.getVendorId(),
            restaurant_id: this.restaurantId,
            is_langauge: "en",
          }).then((data) => {
            if(data.code == 200){
              this.restaurantData = data.Result;
              this.restaurant_service_tax = data.Result.restaurant_service_tax;
              this.restaurantLat = data.Result.latitude;
              this.restaurantLong = data.Result.longitude;
              this.isRestaurantClosed = (data.Result.restaurant_on_off=='0'?false:true);
            }
          });
      }
    },
    
    //Display Total Amount Of item cart
    getTotalItemPrice(item){
      return item.price * item.quantity;
    },

    //Get Total Amount of Items
    getTotalItemAmount(){
      let itmTotal = 0;
      let itemCount = 0;
      this.cart.forEach(item => {
        itmTotal += (item.price * item.quantity);
        itemCount++;
      });
      this.cartItemCount = itemCount;
      return parseFloat(itmTotal).toFixed(2);
    },
    
    //Increament Item
    plusItem(item,index){
       if(item.itemTotalQuantity > item.quantity){
         this.$store.commit("product/IncrementItemQuantity", index);
       }
    },

    //Decrement Item
    minusItem(cartProduct,index){
      this.removePromocode();
      if(cartProduct.quantity == '1' || cartProduct.quantity == '0'){
        this.deleteProduct(index);
      }else{
        this.$store.commit("product/decrementProductInventary", index);
      }
    },

    //Remove Item from cart
    deleteProduct: function(index) {
      this.$store.commit("order/clearPlaceOrderData");
      this.$store.dispatch("product/removeProductFromCart",index)
    },

    //GST Total Amount Display
    gstTotalAmount(){
      let gstServiceTax = parseFloat(this.restaurantDetails.restaurant_service_tax);
      this.gstMaxtax = gstServiceTax;
      return ((this.getTotalItemAmount() / 100) * gstServiceTax).toFixed(2);
    },
    
    //Get Delivery Location Distance Find
    getDeliveryLocation(lat1,lon1,lat2,lon2,unit){
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    },

    //Delivery Charge Total Amount Display
    getDeliveryChrge(){
      let deliveryCharge = 0;
      if(this.isPickupDelivery == 1 || this.isPickupDelivery == -1){
        if(this.$auth.setting && this.$auth.setting.delivery_charges_type == "Distance" ){
          let unit = "K";
          if(this.$auth.setting && this.$auth.setting.distance_metric == "Miles"){
            unit = "N";
          }
          let clntLatlng = this.primaryAddress;
          let restLatlng = this.restaurantDetails;
          let getDistance = this.getDeliveryLocation(clntLatlng.latitude,clntLatlng.longitude,restLatlng.latitude,restLatlng.longitude,unit);
          
          this.$auth.setting.charges.forEach(charge =>{
              if(charge.min_value < getDistance && getDistance <= charge.max_value) {
                deliveryCharge = charge.delivery_charges;
              }
          });
        }else if(this.$auth.setting && this.$auth.setting.delivery_charges_type == "Amount" ){
          this.$auth.setting.charges.forEach(charge =>{
              if(charge.min_value < parseInt(this.getTotalItemAmount()) && parseInt (this.getTotalItemAmount()) <= charge.max_value) {
                deliveryCharge = charge.delivery_charges;
              }
          });
        }
      }else{
        deliveryCharge = 0;
      }
      return deliveryCharge;
    },
    
    //Grand Total Amount Display
    getTotalAmount(){
      let gstTotalPrice = 0;
      if(this.$auth.setting && (this.$auth.setting.included_tax == 0 || this.$auth.setting.included_tax == 'Yes')){
        gstTotalPrice = parseFloat(this.gstTotalAmount());
      }
      let totalItemPrice = parseFloat(this.getTotalItemAmount());
      let deliveryTotalPrice = parseFloat(this.getDeliveryChrge());
      let grandTotal = (totalItemPrice + gstTotalPrice + deliveryTotalPrice - this.promoDiscount).toFixed(2);
      return grandTotal;
    },

    //Apply Promocode For function
    applyPromocode(code){
      let currency = '';
      if (document.getElementById('currency') && document.getElementById('currency').childNodes[0]) {
        currency = document.getElementById('currency').childNodes[0].textContent;
      }

      this.promoCashback = '';
      this.promoDiscount = '';
      this.promocode = code;
      this.$refs.promocode.value = code;
      if(this.$refs.promocode.value){
      this.promocodeRedeem({
          user_id:this.userId,
          vendor_id:this.$auth.getVendorId(),
          is_language:"en",
          original_price:this.getTotalItemAmount(),
          coupon_code:this.$refs.promocode.value,
          restaurant_id:this.restaurantData.restaurant_id,
        }).then((data) => {
          if (data.code == 200) {
            let result = data.Result;
            if(result.minimum_order_amount <= this.getTotalItemAmount()) {
              this.coupon_id = result.id;
              if(result.promo_code_type == 2){
                //Falt Discount
                let flatDiscount = result.flat_discount;
                this.promoCodeType = 2;
                if(flatDiscount > this.getTotalItemAmount()){
                  this.promoDiscount = this.getTotalItemAmount();
                }else{
                  this.promoDiscount = flatDiscount;
                }
                this.isPromocodeApply = true;
                alert("Coupon applied successfully. You have got "+ currency +this.promoDiscount+ " Discount");
              }else if(result.promo_code_type == 1){
                //Percenage Discount
                this.promoCodeType = 1;
                let discountAmount = ((this.getTotalItemAmount() / 100) * result.discount_percentage).toFixed(2);
                this.promoDiscount =  Math.min.apply(Math, [discountAmount,result.maximum_discount_amount]);
                this.isPromocodeApply = true;
                alert("Coupon applied successfully. You have got "+currency+this.promoDiscount+ " Discount");
              }else if(result.promo_code_type == 3){
                //Flat cashback
                this.promoCodeType = 3;
                let flatCashback = result.flat_discount;
                if(flatCashback > this.getTotalItemAmount()){
                  this.promoCashback = this.getTotalItemAmount();
                }else{
                  this.promoCashback = flatCashback;
                }
                this.isPromocodeApply = true;
                alert("Coupon applied successfully. You have got "+currency+this.promoCashback+" cashback");
              }else if(result.promo_code_type == 4){
                //Percenage Discount
                this.promoCodeType = 4;
                let discountAmount = ((this.getTotalItemAmount() / 100) * result.discount_percentage).toFixed(2);
                this.promoCashback =  Math.min.apply(Math, [discountAmount,result.maximum_discount_amount]);
                this.isPromocodeApply = true;
                alert("Coupon applied successfully. You have got "+currency+ this.promoCashback+" cashback");
              }
            }else{
              alert('Sorry, the minimum order amount is '+currency+result.minimum_order_amount+' for this coupon');
            }
            
          }else if(data.code == 101){
            this.promoError = data.msg;
            setTimeout(() => this.promoError = false, 3000);
          }
        });
      }else{
        this.promoError = "Please Enter Promocode";
        setTimeout(() => this.promoError = false, 3000);
      }
      $('#promocodeModal').modal('hide');
    },
    //Remove Apply Code
    removePromocode(){
      this.promocode = '';
      this.isPromocodeApply = false;
      this.promoDiscount = 0;
      this.promoCashback = 0;
    },
    
    processToPay(){
      if(this.isPickupDelivery == 1 || this.isPickupDelivery == -1){
        if(this.shiping_id == ''){
          this.$toasted.error("Plaese select or add address", { duration: 5000 });
          return false;
        }
      }
      this.is_btn_spinner= true;
      if (!this.isAsapEnable || !this.isRestaurantClosed || !this.isSameDayDelivery) {
        if (
          !this.scheduleDateTime.time || 
          this.scheduleDateTime.time == '' || 
          this.scheduleDateTime.time == 'asap'
        ) {
          this.$refs.DeliveryTime.openTime();
          this.is_btn_spinner= false;
          return false;
        }
      }
      if(this.$auth.user){ 
        let itemDetailsArray = [];
        let itemDetails = {};
        
        this.cart.forEach(item => {
          let singleSelection ='';
          let multipleSelection = [];
          let multiple_selection = '';
          multiple_selection = item.selectCustoizeID.join();
          itemDetails = {
            'item_id' : item.item_id,
            'amount': parseFloat(this.getTotalItemPrice(item)).toFixed(2),
            'single_selection':singleSelection,
            'is_bravges':'0',
            'multiple_selection':multiple_selection,
            'quantity':item.quantity
          }
          itemDetailsArray.push(itemDetails);
        });
        
        let future_delivery_date = '';
        if (this.scheduleDateTime) {
          if (this.scheduleDateTime.time && this.scheduleDateTime.time != 'asap') { //Schedule order
            future_delivery_date = this.scheduleDateTime.date + ' ' + this.scheduleDateTime.time;
          }
        }
        let deliveryType = 'Delivery';
        if(this.isPickupDelivery == 1 || this.isPickupDelivery == -1){
          deliveryType = 'Delivery';
        }else{
          deliveryType = 'Pickup';
        }
        this.place_order_parameter = {
          'address_id':this.shiping_id,
          'app_version_code':'',
          'braveges_amount':0,
          'card_id':'',
          'cashback':this.promoCashback,
          'CGST':'0.0',
          'contact_less_delivery':this.contactDelivery,
          'coupon_id':this.coupon_id,
          'coupon_redeem':this.coupon_id == ''?'':this.promocode,
          'delivery_fee':this.getDeliveryChrge(),
          'delivery_pickup_types':deliveryType,
          'delivery_type':this.isPickupDelivery,
          'device_type':'Web',
          'discount_price':this.promoDiscount,
          'driver_tip':0,
          'future_delivery_date':future_delivery_date,
          'is_langauge':'en',
          'notes':this.instructions,
          'original_price':this.getTotalItemAmount(),//this.getTotalAmount(),
          'payment_method':'',
          'payment_type':'',
          'remaining_amount':this.getTotalAmount(),
          'restaurant_id':this.restaurantData.restaurant_id,
          'restaurant_item_details': JSON.stringify(itemDetailsArray),
          'restaurant_service_fee':this.gstMaxtax,
          'service_fee': this.gstTotalAmount(),
          'SGST':0.0,
          'sub_total': this.getTotalItemAmount(),
          'suggestion':'',
          'total_amount':this.getTotalAmount(),
          'transaction_id':'',
          'user_id':this.userId,
          'vendor_id':this.$auth.getVendorId(),
          'wallet_amount':0.0,
        };
        
        this.is_btn_spinner= false;
        this.$store.dispatch("order/placeOrderData",this.place_order_parameter);
        this.$refs.redirectPayment.$el.click();
      }else{
        this.$router.push({ name: "sign-in" });
      }
    },

    goToHome(){
      this.$router.go(-1);
    },

  },
};
</script>
