<template>
  <div id="past" class="tab-pane tab-box">
    <div class="orders-lst skelton" v-if="is_skel_loader">
      <a href="javascript:void(0);">
        <div class="order-item d-flex align-items-start">
            <div class="img-cls">
              <skeleton-loader-vue width="60px" height="60px" style="border-radius: 5px;"/>
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
    <div v-else> 
    <div class="orders-lst new-orders-lst" v-if="pastorders.length > 0">
      <div class="pastorderloop" v-for="(past,index) in pastorders" :key="index">
        <router-link :to="{ name: past.order_status == 'Cancelled'? 'order-details':'order-status',params: { order_id: past.id }}">
          <div class="order-item d-flex align-items-start">
            <div class="img-cls">
              <img :src="past.icon_image" />
            </div>
            <div class="order-data ml-3 d-flex align-items-start justify-content-between w-100">
              <div class="orders-status-main delivery-link">
                <h6 class="mb-1">{{past.restaurant_name}}</h6>
                <span v-html="$auth.setting.currency"></span> <span>{{ parseFloat(past.total_amount).toFixed(2)}}</span>
                <p class="mt-2">{{moment.utc(past.created_at).fromNow()}}</p>
              </div>
            </div>
             </div>
        </router-link>
        <div class="new-btn-order">
          <div class="order-status" v-if="past.order_status == 'Delivered'">
            <p class="delivered order-status-btn">{{past.order_status}}</p>
          </div>
          <div class="order-status" v-else>
            <p class="canceled order-status-btn">{{past.order_status}}</p>
          </div>
          <div class="reorder-div">
            <p class="order-status-btn reorder" @click="reorderClick(past)">Reorder</p>  
          </div>
        </div>
      </div>
    </div>
    <div v-else class="order-offers">
      <p>No Past Order Found</p>
    </div>
    </div>
    <!--Alert Modal start-->
    <AlertModal v-if="isAlert" :DisplayAlertData="AlertData" v-on:modalClose="onModalCloseFun"></AlertModal>
    <!--Alert Modal End-->
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import moment from "moment";
import VueSkeletonLoader from 'skeleton-loader-vue';
import AlertModal from '../../components/AlertModal.vue';

export default {
  components: { 'skeleton-loader-vue':VueSkeletonLoader,AlertModal },
  computed: {
    ...mapGetters("order",["pastOrder"]),
  },
  data() {
    return {
      pastorders: [],
      perPage: 10,
      moment: moment,
      totalrecord:20,
      isStopCallingApi:false,
      skip:0,
      is_skel_loader:true,
      isAlert: false,
      AlertData: {},
      tempOrder:{}
    };
  },
  mounted() {
    if(this.skip == 0){
      this.getPastOrders();
    }
     window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (!this.isStopCallingApi) {
          this.getPastOrders();
          this.is_skel_loader = false;
        }
      }
    });
  },
  computed: {
        ...mapGetters("product", ["cart"]),
    },
  methods: {
    ...mapActions("order",["getPastOrder","reorderDataDetails"]),
    ...mapMutations("product",["clearCartItems"]),
    
    getPastOrders() {
      this.is_skel_loader = true;
      this.getPastOrder({
        vendor_id: this.$auth.getVendorId(),
        is_langauge : "en",
        totalrecord: this.totalrecord,
        skip:this.skip
      }).then((data) => {
        if (data.code == 200) {
          this.is_skel_loader = false;
          this.totalrecord = this.totalrecord+20;
          if (!this.pastorders.length) {
            data.Result.forEach((resOrder) => {
              this.pastorders.push(resOrder);
            });
          } else {
            data.Result.forEach((resOrder) => {
              let checkRest = this.pastorders.find((elm) => elm.id == resOrder.id);
              if (!checkRest) {
                this.pastorders.push(resOrder);
              }
            });
          }
        } else if (data.Result.length == 0) {
          this.is_skel_loader = false;
          this.isStopCallingApi = true;
        }

      });
    },
    
    onModalCloseFun(value) {
      this.isAlert = false;
      if (value == 'yes') {
        this.$store.commit("product/clearCartItems");
        this.createCart(this.tempOrder);
      }
    },
    
    reorderClick(order){
      if(this.cart.length == 0){
        this.createCart(order);
      }else{
        var checkCartRestaurant= this.cart.find((ele) => (ele.restaurant_id == order.restaurant_id));
        if (checkCartRestaurant) {
          this.createCart(order);
        }else{
          this.AlertData = {
            displayMessage: 'Your cart contain items from another store. Do you wish to clear cart and start a new order here?',
            isSetClass: 'prdct-modal-cls'
            };
            this.isAlert = true;
            this.tempOrder = order;
            window.$("#item-popup").modal("hide");
            window.$(this.$refs.AlertModal).modal();
          
        }
      }
    },

    createCart(order){
      this.reorderDataDetails({
        vendor_id: this.$auth.getVendorId(),
        is_langauge : "en",
        order_id : order.id,
      }).then((data) => {
        if (data.code == 200) {
          let restaurant = data.restaurant_details;
          let arraySelectCustoizeID = [];
          let arraySelectCustoizePrice = [];
          if(data.Result.length > 0){
            data.Result.forEach((res)=>{
            let roption = {};
            let selected_type = [];
            if(res.customize_type.length > 0){
              let option = [];
              res.customize_type.forEach((elm) => {
                elm.option.forEach((elmoption) => {
                  selected_type.push(elmoption.selection_name);
                  arraySelectCustoizeID.push(elmoption.selection_id);
                  arraySelectCustoizePrice.push(elmoption.selection_price);
                  
                  if(elmoption.options.length > 0){
                    elmoption.options.forEach((elm)=>{
                      selected_type.push(elm.selection_name);
                      arraySelectCustoizeID.push(elm.selection_id);
                      arraySelectCustoizePrice.push(elm.selection_price);
                    });
                  }
                });
              });
             }
             var AddToCartItemArray = {
              restaurant_id: res.restaurant_id,
              item_id: res.item_id,
              item_name: res.item_name,
              price: res.amount,
              quantity: res.quantity,
              itemTotalQuantity: res.item_quantitys,
              selected_type: selected_type,
              selectCustoizeID: arraySelectCustoizeID,
              selectCustoizePrice: arraySelectCustoizePrice,
              item_type:res.item_type,
              item_price:res.price
            };
            this.$store.dispatch("product/addProductToCart", AddToCartItemArray);
            this.$router.push({ name: "vendor", params: { restaurant_name: restaurant.slug} }).catch(()=>{});
            });
          }
        }
        if(data.inactive_item > 0){
          alert("Few items are not available");
        }
      });
    }
  },
};
</script>