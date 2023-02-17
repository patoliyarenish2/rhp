<template>
<div>
  <div class="collapse navbar-collapse-left show" id="slidepanel">
    <div class="fix-orderdetails h-100">
      <button
        class="navbar-toggler navbar-toggler-right close-btn border-0 orderpanel-close-btn"
        type="button"
        data-toggle="collapse"
        data-target="#slidepanel"
        aria-controls="slidepanel"
        aria-expanded="true"
        aria-label="Toggle navigation"
      >
        <span><i class="fas fa-times"></i></span>
      </button>
      <div class="order-details h-100 d-flex justify-content-between flex-column">
        <div class="order-top">
          <h4 v-if="cart.length > '0'">Your Order <span class="total-items">({{cart.reduce((a, c) => (a + c.quantity),0)}} {{cart.reduce((a, c) => (a + c.quantity),0) > 1 ? 'Items':'Item'}})</span></h4>
        
          <div class="order-items-main orderitems-nw" v-if="cart.length > '0'">
            <div class="order-item d-flex align-content-center justify-content-between mt-3"
              v-for="(item, index) in cart" :key="index">
              <div class="item-heading">
                <span class="remove_item" @click="deleteProduct(index)">&times;</span>
                <!-- <div class="veg"><span></span></div> -->
                <p class="mb-0">{{ item.name }} : </p>
                <div class="selected_type">
                  <div class="selected-main" v-for="(itemOption,key) in item.selected_type" :key="key">
                    <p class="selected-radio">{{itemOption}}</p>
                  </div>
                </div>
              </div>
              <div class="number d-flex align-items-center">
                <span class="minus d-flex justify-content-center align-items-center" @click="minusItem(item,index)">-</span>
                <input type="text" :value="item.quantity"  readonly/>
                <span class="plus d-flex justify-content-center align-items-center" @click="plusItem(item,index)" >+</span>
              </div>
              <div class="cart-price-div">
                <span v-html="$auth.setting && $auth.setting.currency"></span>{{getTotalItemPrice(item).toFixed(2)}}
              </div>
            </div>
          </div>
          <div v-else class="order-items-main cart-emt-cls">
              <img src="@/assets/images/empty cart.png" />
              <p class="empty-cart">Your cart is empty Add items to get started</p>
          </div>
        </div>
        <div class="checkout-btn full-btn" v-if="cart.length > '0' && $auth.setting && $auth.setting.is_system_available == '1'">
          <b-button variant="primary" class="nxt-btn" disabled v-if="is_btn_spinner">
            <b-spinner small type="grow"></b-spinner>
            Loading...
          </b-button>
          <a v-else href="javascript:void(0)" @click="minimunOrderValue()">{{cart.reduce((a, c) => (a + c.quantity),0)}} {{cart.reduce((a, c) => (a + c.quantity),0) > 1 ? 'Items':'Item'}} | <span v-html="$auth.setting && $auth.setting.currency"></span>{{getTotalAmount().toFixed(2)}} View Cart</a>
        </div>
      </div>
    </div>
  </div>
  <!--Alert Modal start-->
  <AlertModal v-if="isAlert" :DisplayAlertData="AlertData" v-on:modalClose="onModalCloseFun"></AlertModal>
  <!--Alert Modal End-->
</div>
</template>

<script>
import { mapGetters, mapActions ,mapMutations} from "vuex";
import AlertModal from '../components/AlertModal.vue';

export default {
  prop : ["restMinimumOrder"],
  components: { AlertModal },
  
  data() {
    return {
      isAuthenticated:false,
      restaurantData:{},
      restMinimumOrder:0,
      isAlert : false,
      AlertData: {},
      is_btn_spinner:false
    };
  },
  mounted() {
    this.getTotalAmount();
    if(this.$auth.user){
        this.isAuthenticated = true;
      }else{
        this.isAuthenticated = false;
      }
  },
  computed: {
    ...mapGetters("product", ["cart"]),
    ...mapGetters("restaurant", ["restaurantDetails"]),
  },
  methods:{
    ...mapActions("product", ["addProductToCart","removeProductFromCart"]),
    ...mapMutations("product",["decrementProductInventary","IncrementItemQuantity"]),
    ...mapActions("restaurant", ["getRestaurantDetails"]),
    
    onModalCloseFun(value){
      this.isAlert = false;
    },

    getRestaurantInfo() {
      if (this.cart.length) {
        var restaurantId = this.cart[0].restaurant_id;
        this.getRestaurantDetails({
            vendor_id: this.$auth.getVendorId(),
            restaurant_id: restaurantId,
            is_langauge: "en",
          }).then((data) => {
            this.restaurantData = data.Result;
            this.restMinimumOrder = data.Result.minimum_order_value;
          });
      }
    },
    //Increament Item
    plusItem(item,index){
       if(item.itemTotalQuantity > item.quantity){
         this.$store.commit("product/IncrementItemQuantity", index);
       }
    },

     //Decrement Item
    minusItem(cartProduct,index){
      if(cartProduct.quantity == '1' || cartProduct.quantity == '0'){
        this.deleteProduct(index);
      }else{
        this.$store.commit("product/decrementProductInventary", index);
      }
    },
    
    //Remove Item from cart
    deleteProduct: function(index) {
      this.$store.dispatch("product/removeProductFromCart",index)
    },

    //Display Total Amount Of item cart
    getTotalItemPrice(item){
      return item.price * item.quantity;
    },

    //Display Total Amount Of Cart
    getTotalAmount(){
      let total = 0;
      this.cart.forEach(item => {
        total += (item.price * item.quantity);
      });
      return total;
    },

    minimunOrderValue(){
      this.is_btn_spinner = true;
      if (!this.cart.length) {
        alert("Please add Item in to cart");
        this.is_btn_spinner = false;
        return false;
      }
      var restaurantId = this.cart[0].restaurant_id;
      this.getRestaurantDetails({
          vendor_id: this.$auth.getVendorId(),
          restaurant_id: restaurantId,
          is_langauge: "en",
        }).then((data) => {
          this.restaurantData = data.Result;
          this.restMinimumOrder = data.Result.minimum_order_value
          if(this.$auth.user){
            if(parseFloat(this.getTotalAmount().toFixed(2)) >= parseFloat(this.restaurantData.minimum_order_value)) {
              this.is_btn_spinner = false;
              this.$router.push({ name: "review-cart" });
            }else{
              let currency = '';
              if (document.getElementById('currency') && document.getElementById('currency').childNodes[0]) {
                currency = document.getElementById('currency').childNodes[0].textContent;
              }
              this.AlertData = {
                displayMessage : 'Minimum items total must be '+currency+this.restaurantData.minimum_order_value,
                isSetClass : 'cart-modal-cls'
              };
              this.isAlert = true;
              window.$(this.$refs.AlertModal).modal();
              this.is_btn_spinner = false;
            }
          }else {
            this.is_btn_spinner = false;
            this.$router.push({ name: "sign-in" });
          }
        });      
    },

  }
};
</script>
