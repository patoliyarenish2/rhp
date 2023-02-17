<template>
  <div :class="'item_detail '+noImgClass +' '+ layoutClass">
    <!-----Layout-1 Start---->
    <div class="media" v-if="itemlayout == '1'">
      <div class="item-img" v-if="!imgError">
        <img :src="item.image" @error="onImgError()" />
      </div>
      <a :href="(pagename=='itemslist' || pagename == 'qr')?'javascript:void(0)':'/vendor/'+ slug+'#item'+menuId" id="element" class="btn btn-default show-modal" @click="productModal(item)">
        <div class="media-body">
          <div class="veg" v-if="item.item_type == '0'"><span></span></div>
          <div class="non-veg" v-if="item.item_type == '1'"><span></span></div>
          <h5 class="mt-0 mr-5 item-name">{{ item.item_name }}</h5>
          <p class="mb-0 mt-2 item-descr" v-if="item.item_description">
            {{(item.item_description && item.item_description.length > 80 ? item.item_description.substring(0,80)+".." :item.item_description) }}
          </p>
          <div class="prc-show">
          <span class="mt-2 d-inline-block item-price" v-if="item.price != '0'"><span v-html="$auth.setting && $auth.setting.currency"></span>{{(item.price).toFixed(2)}}</span>
          <span class="mt-2 d-inline-block item-price strikeout" v-if="item.mrp != item.price"><span v-html="$auth.setting && $auth.setting.currency"></span>{{(item.mrp).toFixed(2)}}</span>
          </div>
        </div>
      </a>
      <!--Image with button start----->
      <div class="img-btn">
        <div class="pgnme-cls" v-if="pagename != 'qr'">
          <div v-if="!closeLabel">
            <div v-if="item.is_sold_out == '0'" class="sold-de">
              <div v-if="item.is_customization >= '1'" class="csm-de">
                <button class="add-to-cart btn btn-outline-warning btn-sm" @click="productModal(item)" v-if="checkInCart(item.item_id)">Add</button>
                <div v-else>
                  <div>
                    <div class="quantityInc 1">
                      <div class="number d-flex align-items-center">
                        <span class="minus d-flex justify-content-center align-items-center" @click="minusItem(item)">-</span>
                        <input type="text" :value="cart.reduce((a, c) => (a + (c.item_id == item.item_id ? c.quantity : 0)),0)" readonly/>
                        <span class="plus d-flex justify-content-center align-items-center" @click="productModal(item)">+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="icus">
                <button v-if="item.is_sold_out == '0' && checkInCart(item.item_id)" class="add-to-cart btn btn-outline-warning btn-sm" @click="addProductToCart(item)">Add</button>
                <div v-else >
                  <div class="quantityInc 2">
                    <div class="number d-flex align-items-center">
                      <span class="minus d-flex justify-content-center align-items-center" @click="minusItem(item)">-</span>
                      <input type="text" :value="cart.reduce((a, c) => (a + (c.item_id == item.item_id ? c.quantity : 0)),0)" readonly/>
                      <span class="plus d-flex justify-content-center align-items-center" @click="plusItem(item)">+</span>
                    </div>
                  </div>
                </div>
              </div>
              <p v-if="item.is_customization" class="tag-customize tagcust-nw">Customisable</p>
            </div>
            <div v-else class="sold-bt">
              <button v-if="item.is_sold_out != '0'" class="sold add-to-cart btn btn-outline-warning btn-sm">Sold Out</button>
            </div>
        </div>
      </div>
    </div>
    <!--Image with button end----->
   </div>
    <!-----Layout-1 End---->
    <!-----Layout-2 Start---->
    <div class="media" v-if="itemlayout == '2' ">
      <a :href="(pagename=='itemslist' || pagename == 'qr')?'javascript:void(0)':'/vendor/'+ slug+'#item'+menuId" id="element" class="btn btn-default show-modal" @click="productModal(item)">
        <div class="media-body">
          <div class="veg" v-if="item.item_type == '0'"><span></span></div>
          <div class="non-veg" v-if="item.item_type == '1'"><span></span></div>
          <h5 class="mt-0 mr-5 item-name">{{ item.item_name }}</h5>
          <p class="mb-0 mt-2 item-descr" v-if="item.item_description">
            {{(item.item_description && item.item_description.length > 80 ? item.item_description.substring(0,80)+".." :item.item_description) }}
          </p>
          <div class="prc-show">
          <span class="mt-2 d-inline-block item-price" v-if="item.price != '0'"><span v-html="$auth.setting && $auth.setting.currency"></span>{{(item.price).toFixed(2)}}</span>
          <span class="mt-2 d-inline-block item-price strikeout" v-if="item.mrp != item.price"><span v-html="$auth.setting && $auth.setting.currency"></span>{{(item.mrp).toFixed(2)}}</span>
          </div>
        </div>
      </a>
      <!--Image with button start----->
      <div class="img-btn">
        <div class="item-img" v-if="!imgError">
          <img :src="item.image" @error="onImgError()" />
        </div>
        <div class="pgnme-cls" v-if="pagename != 'qr'">
          <div v-if="!closeLabel">
            <div v-if="item.is_sold_out == '0'" class="sold-de">
              <div v-if="item.is_customization >= '1'" class="csm-de">
                <button class="add-to-cart btn btn-outline-warning btn-sm" @click="productModal(item)" v-if="checkInCart(item.item_id)">Add</button>
                <div v-else>
                  <div>
                    <div class="quantityInc 1">
                      <div class="number d-flex align-items-center">
                        <span class="minus d-flex justify-content-center align-items-center" @click="minusItem(item)">-</span>
                        <input type="text" :value="cart.reduce((a, c) => (a + (c.item_id == item.item_id ? c.quantity : 0)),0)" readonly/>
                        <span class="plus d-flex justify-content-center align-items-center" @click="productModal(item)">+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="icus">
                <button v-if="item.is_sold_out == '0' && checkInCart(item.item_id)" class="add-to-cart btn btn-outline-warning btn-sm" @click="addProductToCart(item)">Add</button>
                <div v-else >
                  <div class="quantityInc 2">
                    <div class="number d-flex align-items-center">
                      <span class="minus d-flex justify-content-center align-items-center" @click="minusItem(item)">-</span>
                      <input type="text" :value="cart.reduce((a, c) => (a + (c.item_id == item.item_id ? c.quantity : 0)),0)" readonly/>
                      <span class="plus d-flex justify-content-center align-items-center" @click="plusItem(item)">+</span>
                    </div>
                  </div>
                </div>
              </div>
              <p v-if="item.is_customization" class="tag-customize tagcust-nw">Customisable</p>
            </div>
            <div v-else class="sold-bt">
              <button v-if="item.is_sold_out != '0'" class="sold add-to-cart btn btn-outline-warning btn-sm">Sold Out</button>
            </div>
        </div>
      </div>
    </div>
    <!--Image with button end----->
   </div>
    <!-----Layout-2 End---->
    <!-----Layout-2 Start---->
    <div class="media" v-if="itemlayout == '3'">
      <div class="image-sec">
        <div class="item-img" v-if="!imgError">
          <img :src="item.image" @error="onImgError()" />
        </div>
      </div>
      <div nme-sec>
        <a :href="(pagename=='itemslist')?'javascript:void(0)':'/vendor/'+ slug+'#item'+menuId" id="element" class="btn btn-default show-modal" @click="productModal(item)">
          <div class="media-body">
            <div class="veg" v-if="item.item_type == '0'"><span></span></div>
            <div class="non-veg" v-if="item.item_type == '1'"><span></span></div>
            <h5 class="mt-0 mr-5 item-name">{{ item.item_name }}</h5>
            <p class="mb-0 mt-2 item-descr" v-if="item.item_description">
              {{(item.item_description && item.item_description.length > 80 ? item.item_description.substring(0,80)+".." :item.item_description) }}
            </p>
          </div>
        </a>
      </div>
      <div class="prc-btn-sec">
        <div class="prc-show">
            <span class="mt-2 d-inline-block item-price" v-if="item.price != '0'"><span v-html="$auth.setting && $auth.setting.currency"></span>{{(item.price).toFixed(2)}}</span>
            <span class="mt-2 d-inline-block item-price strikeout" v-if="item.mrp != item.price"><span v-html="$auth.setting && $auth.setting.currency"></span>{{(item.mrp).toFixed(2)}}</span>
          </div>
        <div v-if="!closeLabel">
          <div v-if="item.is_sold_out == '0'" class="sold-de">
            <div v-if="item.is_customization >= '1'" class="csm-de">
              <button class="add-to-cart btn btn-outline-warning btn-sm" @click="productModal(item)" v-if="checkInCart(item.item_id)">Add</button>
              <div v-else>
                <div>
                  <div class="quantityInc 1">
                    <div class="number d-flex align-items-center">
                      <span class="minus d-flex justify-content-center align-items-center" @click="minusItem(item)">-</span>
                      <input type="text" :value="cart.reduce((a, c) => (a + (c.item_id == item.item_id ? c.quantity : 0)),0)" readonly/>
                      <span class="plus d-flex justify-content-center align-items-center" @click="productModal(item)">+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="icus">
              <button v-if="item.is_sold_out == '0' && checkInCart(item.item_id)" class="add-to-cart btn btn-outline-warning btn-sm" @click="addProductToCart(item)">Add</button>
              <div v-else >
                <div class="quantityInc 2">
                  <div class="number d-flex align-items-center">
                    <span class="minus d-flex justify-content-center align-items-center" @click="minusItem(item)">-</span>
                    <!-- <input type="text" :value="cartItem.quantity" /> -->
                    <input type="text" :value="cart.reduce((a, c) => (a + (c.item_id == item.item_id ? c.quantity : 0)),0)" readonly/>
                    <span class="plus d-flex justify-content-center align-items-center" @click="plusItem(item)">+</span>
                  </div>
                </div>
              </div>
            </div>
            <p v-if="item.is_customization" class="tag-customize tagcust-nw">Customisable</p>
          </div>
          <div v-else class="sold-bt">
              <button v-if="item.is_sold_out != '0'" class="sold add-to-cart btn btn-outline-warning btn-sm">Sold Out</button>
          </div>
        </div>
      </div>
    </div>
    <!-----Layout-2 End---->
    <!--Alert Modal start-->
    <AlertModal v-if="isAlert" :DisplayAlertData="AlertData" v-on:modalClose="onModalCloseFun"></AlertModal>
    <!--Alert Modal End-->
  </div>
</template>

<script>
import { mapActions, mapGetters,mapMutations } from "vuex";
import AlertModal from '../components/AlertModal.vue';

export default {
  props: ["item", "menuId", "currencys","restaurantID","restaurant_on_off","pagename","slug","itemlayout"],
  components: { AlertModal },
  data() {
    return {
      imgError: "",
      productId: "",
      noImgClass:'',
      closeLabel:false,
      isAlert : false,
      AlertData: {},
      tempProduct:{},
      layoutClass:''
    };
  },
  mounted(){
    //Restaurant close or schedule for
    if(this.restaurant_on_off == '0' && this.$auth.setting && this.$auth.setting.is_enable_schedule_order_after_business_hours == 0){
      this.closeLabel = true;
    }else{
      this.closeLabel = false;
    }
    
    if(this.itemlayout == '3'){
      this.layoutClass = 'secondlayout';
    }
  },
  
  computed: {
    ...mapGetters("product", ["cart"]),
  },
  
  methods: {
    ...mapActions("product", ["addProductToCart","removeProductFromCart"]),
    ...mapMutations("product",["decrementProductInventary","IncrementItemQuantity","clearCartItems"]),
    
    onModalCloseFun(value){
      this.isAlert = false;
      if(value == 'yes'){
        this.$store.commit("product/clearCartItems");
        this.addProductCart(this.tempProduct);
      }
    },

    addProductToCart(product) {
      var checkRestarant = this.cart.find((ele)=>(ele.restaurant_id == this.restaurantID));
      if(this.cart.length){
        if(checkRestarant){
          this.addProductCart(product);
        }else{
          this.AlertData ={
            displayMessage : 'Your cart contain items from another '+ (this.$auth && this.$auth.getRestaurantName()) +'. Do you wish to clear cart and start a new order here?',
            isSetClass : 'prdct-modal-cls'
            };
          this.isAlert = true;
          this.tempProduct = product;
          window.$(this.$refs.AlertModal).modal();
        }
      }else{
        this.addProductCart(product);
      }
    },

    addProductCart(product){

      var AddToCartItemArray = {
          vendor_id: product.vendor_id,
          restaurant_id:product.restaurant_id,
          item_id: product.item_id,
          item_name: product.item_name,
          price: product.price,
          quantity: 1,
          itemTotalQuantity : product.quantity,
          selected_type: [],
          selectCustoizeID:[],
          selectCustoizePrice: [],
          item_type:product.item_type,
          item_price:product.price
        };
      this.$store.dispatch("product/addProductToCart", AddToCartItemArray);
    },

    productModal(item) {
      item.restaurant_on_off = this.restaurant_on_off;
      item.restaurant_id = this.restaurantID;
      this.$emit("openProductDetailModal", item);
    },

    plusItem(product){
      const cartItemIndex = this.cart.findIndex(item => item.item_id === product.item_id);
      var itemTotalQuantity = this.cart[cartItemIndex].quantity;
      if(itemTotalQuantity < product.quantity){
        this.$store.commit("product/IncrementItemQuantity", cartItemIndex);
      }
    },

    minusItem(product){
      const cartItemIndex = this.cart.findIndex(item => item.item_id === product.item_id);
      let  totalSmCartID = [];
        this.cart.forEach(item => {
          if(item.item_id === product.item_id){
            totalSmCartID.push(item.item_id);
          }
        });
      if(totalSmCartID.length > 1){
        alert("Please Remove Item From Cart!");
      }else{
        var itemQuantity = this.cart[cartItemIndex].quantity;
        if(itemQuantity == '1' || itemQuantity == '0'){
          this.deleteProduct(cartItemIndex);
        }else{
          this.$store.commit("product/decrementProductInventary", cartItemIndex);
        }
      }
      return false;
     
    },
    
    deleteProduct: function(index) {
      this.$store.dispatch("product/removeProductFromCart",index)
    },

    checkInCart(itemId){
      var checkItem = this.cart.find((ele)=>(ele.item_id == itemId));
      if(checkItem){
        return false;
      }else{
        return true;
      }
    },

    onImgError() {
      this.imgError = true;
      this.noImgClass = 'noImgClass';
    },   
  },
};
</script>
