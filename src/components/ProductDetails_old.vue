<template>
  <div>
    <div class="modal fade prdtmodel-nw" id="item-popup" tabindex="-1" aria-labelledby="itemModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="itemModalLabel">
              {{ productDetail.item_name }}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="text-center modal-body" v-if="loading">
            <b-spinner label="Spinning"></b-spinner>
          </div>
          <div v-else class="modal-body" :id="'item-id-' + productDetail.item_id">
            <p class="desc">{{ productDetail.item_description }}</p>
            <!-- <div class="item-img" v-if="!imgError">
              <img class="item-img" :src="productDetail.image"  @error="onImgError()" />
            </div> -->
            <div id="prod-details-slider" class="owl-carousel">
              <div v-for="(slide,index) in productDetail.item_images" :key="index">
                <div class="testimonial-item equal-height style-6" v-if="!imgError">
                  <img class="item-img" :src="slide.image_name"  @error="onImgError()"/>
                  </div>
              </div>
            </div>

            <div class="container">
              <div class="product-content pt-3" v-if="productDetail.is_customizable != '0'">
                  <div v-for="(customize, customizeIndex) in productDetail.customize_type"
                    :key="customizeIndex">
                    <div class="cus-title">
                      <h6 class="cus-name">{{ customize.name }}</h6>
                      <p v-if="customize.is_selection == '1'">
                        Max {{ customize.is_selection }} item
                      </p>
                      <p v-else-if="customize.is_selection >= '1'">
                        Max {{ customize.is_selection }} items
                      </p>
                    </div>
                    <!--Radio Button start-->
                    <div v-if="customize.is_min_selection == '1' && customize.is_selection == '1'">
                      <div class="form-check form__radio-group"  v-for="(optionData, index) in customize.option" :key="index">
                        <div data-toggle="collapse" :href="'#collapseExample'+customizeIndex+index">
                          <!-- v-model="productDetail.selected_type[customizeIndex].roption"  -->
                          <input class="form__radio-input" type="radio" :name="'radio-' + customizeIndex" :id="'radio-' + customizeIndex + '-' + index"
                          :value="optionData"
                          vmodel="optionData.is_selected" 
                          @change="check($event, customizeIndex, optionData.selection_price,optionData,'radio','')"
                          :checked="optionData.is_selected"
                          />
                          {{optionData.is_selected}}
                          <label class="form__label-radio" :for="'radio-' + customizeIndex + '-' + index"><span class="form__radio-button"></span>{{ optionData.selection_name }}</label>
                          <span class="ch-price"><span v-html="$auth.setting.currency"></span
                            >{{ optionData.selection_price }}</span>
                        </div>

                          
                          <!--------Sub Customization Start Radio------------->
                          <div v-if="optionData.is_min_selection == '1' && optionData.is_selection == '1' && optionData.options.length > 0 ">
                            <div class="chld-rdio collapse show"  v-if="optionData.options.length > 0">
                              <div v-for="(subOption,subi) in optionData.options" :key="subi" class="form-check form__radio-group">
                                
                                <!-- v-model="productDetail.selected_type[customizeIndex].subradio"  -->
                                <input class="form__radio-input" type="radio" 
                                :name="'radio-' +index+'-'+ customizeIndex" 
                                :id="'radio-' + customizeIndex + '-' +index+'-'+subi" 
                                :value="subOption" 
                                vmodel="subOption.is_selected" 
                                @change="check($event, customizeIndex, subOption.selection_price,optionData,'radio','subradio')"
                                :checked="subOption.is_selected"
                                />
                                {{subOption.is_selected}}
                                <label class="form__label-radio" :for="'radio-' + customizeIndex + '-' +index+'-'+subi"><span class="form__radio-button"></span>{{ subOption.selection_name }}</label>
                                <span class="ch-price"><span v-html="$auth.setting.currency"></span>{{ subOption.selection_price }}</span>
                              </div> 
                            </div>
                          </div>
                          <!---------Sub Customization End Radio------------>
                          <!---------Sub Customization Start Checkbox------------>
                          <div v-else class="custom-checkbox">
                            <div class="chld-rdio collapse show" v-if="optionData.options.length > 0">
                            <div class="form-group" v-for="(suboptionCheckbox, subindex) in optionData.options" :key="subindex">
                              
                              <!-- v-model="productDetail.selected_type[customizeIndex].subcheckbox" -->
                              <input class="form-check-input" type="checkbox"   
                                :value="suboptionCheckbox"
                                :id="'subcheckbox-' + customizeIndex + '-' + index +'-'+ subindex" 
                                :name="'subcheckbox_' + customizeIndex+index+'_'+subindex" 
                                vmodel="suboptionCheckbox.is_selected"
                                @change="check($event, customizeIndex, suboptionCheckbox.selection_price,optionData,'radio','subcheckbox')"
                                :checked="suboptionCheckbox.is_selected"
                                />{{suboptionCheckbox.is_selected}}
                              <label class="form-check-label" 
                              :for="'subcheckbox-' + customizeIndex + '-' + index+'-'+subindex"> 
                              {{ suboptionCheckbox.selection_name }}</label>
                              <span class="ch-price"><span v-html="$auth.setting.currency"></span
                                >{{ suboptionCheckbox.selection_price }}</span>
                            </div>
                            </div>
                          </div>
                          <!---------Sub Customization End Checkbox------------>
                        </div>
                    </div>
                    <!--Radio Button end-->

                    <!--CheckBox start-->
                    <div v-else class="custom-checkbox">
                      <div class="form-group" v-for="(optionCheckbox, index) in customize.option" :key="index">
                        
                        <div data-toggle="collapse" :href="'#collapseExample'+customizeIndex+index">
                          <!-- v-model="productDetail.selected_type[customizeIndex].option"  -->
                          <input class="form-check-input" type="checkbox" 
                          :value="optionCheckbox"
                            :id="'checkbox-' + customizeIndex + '-' + index" 
                            :name="'checkbox_' + customizeIndex" 
                            v-model="optionCheckbox.is_selected" @change="check($event, customizeIndex, optionCheckbox.selection_price,optionCheckbox,'checkbox','')" />
                            {{optionCheckbox.is_selected}}
                          <label class="form-check-label" :for="'checkbox-' + customizeIndex + '-' + index"> {{ optionCheckbox.selection_name }} {{ customize.customizeIndex }}</label>
                          <span class="ch-price"><span v-html="$auth.setting.currency"></span
                            >{{ optionCheckbox.selection_price }}</span>
                        </div>

                        <!--------Sub Customization Start Radio------------->
                          <div v-if="optionCheckbox.is_min_selection == '1' && optionCheckbox.is_selection == '1' && optionCheckbox.options.length > 0 ">
                            <div class="chld-rdio collapse" :id="'collapseExample'+customizeIndex+index" v-if="optionCheckbox.options.length > 0">
                              <div v-for="(subOption,subi) in optionCheckbox.options" :key="subi" class="form-check form__radio-group">
                                 <!-- v-model="productDetail.selected_type[customizeIndex].subradio" -->
                                <input class="form__radio-input" type="radio" 
                                :name="'radio-' +index+'-'+ customizeIndex" 
                                :id="'radio-' + customizeIndex + '-' +index+'-'+subi" 
                                :value="subOption.is_selected" 
                                v-model="subOption.is_selected" 
                                @change="check($event, customizeIndex, subOption.selection_price,optionCheckbox,'checkbox','subradio')" />
                                {{subOption.is_selected}}
                                <label class="form__label-radio" :for="'radio-' + customizeIndex + '-' +index+'-'+subi"><span class="form__radio-button"></span>{{ subOption.selection_name }}</label>
                                <span class="ch-price"><span v-html="$auth.setting.currency"></span>{{ subOption.selection_price }}</span>
                              </div> 
                            </div>
                          </div>
                          <!---------Sub Customization End Radio------------>
                          <!---------Sub Customization Start Checkbox------------>
                          <div v-else class="custom-checkbox">
                            <div class="chld-rdio collapse" :id="'collapseExample'+customizeIndex+index" v-if="optionCheckbox.options.length > 0">
                            <div class="form-group" v-for="(suboptionCheckbox, subindex) in optionCheckbox.options" :key="subindex">
                              
                              <input class="form-check-input" type="checkbox"   :value="suboptionCheckbox.selection_price"
                                :id="'subcheckbox-' + customizeIndex + '-' + index+'-'+subindex" 
                                :name="'subcheckbox_' + customizeIndex+index+'_'+subindex" 
                                v-model="suboptionCheckbox.is_selected"
                                @change="check($event, customizeIndex, optionCheckbox.selection_price,optionCheckbox,'checkbox','subcheckbox')"
                                 />
                                 {{suboptionCheckbox.is_selected}}
                              <label class="form-check-label" 
                              :for="'subcheckbox-' + customizeIndex + '-' + index+'-'+subindex"> 
                              {{ suboptionCheckbox.selection_name }}</label>
                              <span class="ch-price"><span v-html="$auth.setting.currency"></span
                                >{{ suboptionCheckbox.selection_price }}</span>
                            </div>
                            </div>
                          </div>
                          <!---------Sub Customization End Checkbox------------>
                      </div>
                    </div>
                    <!--CheckBox end-->
                  </div>
              </div>
            </div>
          </div>
          <div class="modal-footer" v-if="!closeLabel">
            <div class="quantityInc" v-if="productDetail.is_sold_out == '0'">
              <div class="number d-flex align-items-center">
                <span class="minus d-flex justify-content-center align-items-center" @click="decrementItem()">-</span>
                <input type="text" :value="quantityTotal" readonly/>
                <span class="plus d-flex justify-content-center align-items-center" @click="incrementItem()">+</span>
              </div>
            </div>
            <button v-if="productDetail.is_sold_out == '0'" class="add-to-cart btn btn-outline-warning btn-sm" @click="addProductToCart()">Add To Cart(<span v-html="$auth.setting.currency"></span>
            {{getTotalOptionPrice()*this.quantityTotal}})</button>
            <button v-else class="sold add-to-cart btn btn-outline-warning btn-sm">
              Sold Out
            </button>
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
import { mapGetters, mapActions, mapMutations } from "vuex";
import AlertModal from '../components/AlertModal.vue';
import treeview from '../components/treeview.vue';

export default {
  components: { AlertModal,treeview },
  props: ["productId","restaurantID","restaurant_on_off"],
  data() {
    return {
      productDetail: [],
      imgError: "",
      loading: true,
      optionCollection: [],
      selectedCustomisation: [],
      selectedCheckbox: [],
      itemTotal: 0,
      quantityTotal: 1,
      closeLabel:false,
      isAlert : false,
      AlertData: {},
      tempProduct:{}
    };
  },
  mounted(){
    //Restaurant close or schedule for
    if(this.restaurant_on_off == '0' && this.$auth.setting && this.$auth.setting.is_enable_schedule_order_after_business_hours == '0'){
      this.closeLabel = true;
    }else{
      this.closeLabel = false;
    }
  },
  computed: {
    ...mapGetters("product", ["cart"]),
  },
  watch : {
    'data.checked' :{
      function(){
        this.productDetail.selectedCheckOption = this.productDetail.selectedCheckOption
      }
    }
    
  },
  methods: {
    ...mapActions("product", ["addProductToCart", "getProductDetails"]),
    ...mapMutations("product",["clearCartItems"]),

    openProductModel: function(itemId) {
      this.itemTotal = 0;
      this.quantityTotal = 1;
      this.loading = true;
      this.getProductDetails({
        vendor_id: this.$auth.getVendorId(),
        is_langauge: "en",
        latitude: localStorage.getItem("latitude"),
        starttime: "",
        longitude: localStorage.getItem("longitude"),
        restaurant_id: this.restaurantID,
        date: "",
        item_id: itemId,
      }).then((data) => {
        if (data.code == 200) {
          this.loading = false;
          console.log(data.Result[0]);
          if(data.Result[0] != undefined && data.Result[0].length != 0){
            this.productDetail = {
              ...data.Result[0],
              
              selectedCheckOption :data.Result[0].customize_type.map((optionList) =>{
                optionList.is_selected = false;
                if(optionList.option.length > 0){
                  subOptionsList : optionList.option.map((subops)=>{
                    subops.is_selected = subops.is_default == "1" ? true : false;
                    if(subops.options.length > 0){
                      subOptdata : subops.options.map((childopt)=>{
                        childopt.is_selected = childopt.is_default == "1" ? true : false;
                      })
                    }
                  })
                }
                return optionList;
              })
              
              // selected_type: data.Result[0].customize_type.map((p) =>{
              // let ops;
              // if(p.is_selection!=1){
              //   ops = p.option.filter((q) =>q.is_default == "1")
              //   if(ops){
              //     ops.map(op =>
              //     {
              //       return ({
              //         ...op,
              //         option:op.options.filter((q) =>q.is_default == "1"),
              //         roption:op.options.find((q) =>q.is_default == "1"),
              //       })
              //     })
              //   }
              // }else{
              //   ops = p.option.find((q) =>q.is_default == "1")
              //   if(ops){
              //     ops.option = op.options.filter((q) =>q.is_default == "1");
              //     ops.roption = op.options.find((q) =>q.is_default == "1");
              //   }
              // }
              // return ({
              //   customize_type_id: p.customize_type_id,
              //   max_selection: parseInt(p.is_selection),
              //   min_selection: parseInt(p.is_min_selection),
              //   selection_name: p.name,
              //   /* ...(p.is_selection!=1?{option:p.option.filter(
              //     (q) =>
              //       q.is_default == "1"
              //   )}:{option:[]}),
              //   ...(p.is_selection == 1 ?{roption: p.option.find(
              //     (q) => q.is_default == "1"
              //   )}:{roption: undefined}), */

              //   /* ...(p.is_selection!=1?{
              //     option:p.option.filter((q) =>q.is_default == "1"),
              //     }:{option:[]}),*/ 
              //     ...(p.is_selection!=1?{
              //     option:ops,
              //     }:{option:[]}),
              //     /* ...(p.options && p.options.length > 0 ?{
              //         subcheckbox:
              //         p.options.map((subop)=>{p.options.filter((subop) =>subop.is_default == "1")}),
              //       }:{subcheckbox:[]}), */
              //     ...(p.is_selection == 1 ?{
              //     roption: ops
              //     // ...p.option.map((so)=> ({
              //     //   soroption:(so.is_selection == 1? {soroption: so.options.find((k)=>k.is_default == "1")}:{soroption:undefined}),
              //     // })),
              //     }:{roption: undefined}),

              //   /* ...(p.is_selection == 1 ?{
              //     roption: p.option.find((q) => q.is_default == "1")
              //     // ...p.option.map((so)=> ({
              //     //   soroption:(so.is_selection == 1? {soroption: so.options.find((k)=>k.is_default == "1")}:{soroption:undefined}),
              //     // })),
              //     }:{roption: undefined}), */
                  
              //     /* ...(p.options && p.options.length > 0 && p.is_selection == 1 ?{
              //         subradio:
              //         p.options.map((subop)=>{p.options.find((subop) =>subop.is_default == "1")}),
              //       }:{subradio:undefined}), */
              // })
              // }),
            };
          }
        }
      });
    },
    
    //Display Total Amount Of item cart
    getTotalOptionPrice(){
      let radioTotal = 0;
      let checkboxTotal = 0;
      let subradioTotal = 0;
      let subCheckBoxTotal = 0;
      // this.productDetail.selected_type.forEach((el) => {
      //   if(el.roption != undefined){
      //     radioTotal += el.roption.selection_price;
      //   }
      //   if(el.option.length){
      //     el.option.forEach((elm) => {
      //         checkboxTotal += elm.selection_price;
      //     })
      //   }
      //   /* console.log("el.subradio",el.subradio);
      //   if(el.subradio && el.subradio != undefined){
      //     subradioTotal += el.subradio.selection_price;
      //   } */
      //   /* if(el.subcheckbox.length){
      //     el.subcheckbox.forEach((elm) => {
      //         subCheckBoxTotal += elm.selection_price;
      //     })
      //   } */
        
      // });
      // console.log("subradioTotal",subCheckBoxTotal);
      return this.productDetail.price+radioTotal+checkboxTotal+subradioTotal+subCheckBoxTotal;
    },
    
    onModalCloseFun(value){
      this.isAlert = false;
      if(value == 'yes'){
        this.$store.commit("product/clearCartItems");
        this.addToCartItem(this.tempProduct);
      }
    },

    addProductToCart() {
      var alertshown = false;
      // this.productDetail.selected_type.forEach((el, key) => {
      //   if (!alertshown) {
      //     var selectcountradio = this.productDetail.selected_type[key].roption;
      //     var selectcountcheckbox = this.productDetail.selected_type[key].option
      //       .length;
      //     var maxSelection = this.productDetail.selected_type[key]
      //       .max_selection;
      //     var minSelection = this.productDetail.selected_type[key]
      //       .min_selection;
          
      //     if (maxSelection == 1 && minSelection == 1 && (selectcountradio == undefined || selectcountradio == 0)) {
      //       alertshown = true;
      //       alert(el.selection_name + " Max 1 item select");
      //     }
      
      //     if (maxSelection != 1  && minSelection != 1) {
      //       if (minSelection <= selectcountcheckbox) {
      //         return true;
      //       } else {
      //         alertshown = true;
      //         alert(el.selection_name + " Required Minimum " + minSelection + " item");
      //       }
      //     }else if(minSelection == 1 && maxSelection >1){
      //        if (minSelection <= selectcountcheckbox) {
      //         return true;
      //       } else {
      //         alertshown = true;
      //         alert(el.selection_name + " Required Minimum " + minSelection + " item");
      //       }
      //     }
      //   }
      // });
      this.productDetail.selectedCheckOption.forEach((el, key) => {
        console.log("el",el.option);
        if(this.productDetail.selectedCheckOption[key].is_selection == 1){
          console.log(el.option.reduce((a, v) => (v.is_selected == true ? a + 1 : a), 0));
        }
        return false;
      });
      return false;

      if (!alertshown) {
        let arraySelectCustoizeID = [];
        let arraySelectCustoizePrice = [];
        this.productDetail.selected_type.forEach((el) => {
          if(el.roption){
            arraySelectCustoizeID.push(el.roption.selection_id);
            arraySelectCustoizePrice.push(el.roption.selection_price);
          }
          if(el.option.length){
              el.option.forEach((elm) => {
                  arraySelectCustoizeID.push(elm.selection_id);
                  arraySelectCustoizePrice.push(elm.selection_price);
              })
          }
        });
        var AddToCartItemArray = {
          restaurant_id: this.restaurantID,
          item_id: this.productDetail.item_id,
          item_name: this.productDetail.item_name,
          price: this.getTotalOptionPrice(),
          quantity: this.quantityTotal,
          itemTotalQuantity: this.productDetail.quantity,
          selected_type: this.productDetail.selected_type,
          selectCustoizeID: arraySelectCustoizeID,
          selectCustoizePrice: arraySelectCustoizePrice,
          item_type:this.productDetail.item_type,
          item_price:this.productDetail.price
        };
        
        var checkRestarant = this.cart.find((ele)=>(ele.restaurant_id == this.restaurantID));
        if(this.cart.length){
          if(checkRestarant){
            this.addToCartItem(AddToCartItemArray);
          }else{
            this.AlertData ={
              displayMessage : 'Your cart contain items from another '+ (this.$auth && this.$auth.getRestaurantName()) +'. Do you wish to clear cart and start a new order here?',
              isSetClass : 'prdct-modal-cls'
            };
            this.isAlert = true;
            this.tempProduct = AddToCartItemArray;
            window.$("#item-popup").modal("hide");
            window.$(this.$refs.AlertModal).modal();
          }
        }else{
          this.addToCartItem(AddToCartItemArray);
        }
      }
    },

    addToCartItem(prodcuct){
      this.$store.dispatch("product/addProductToCart", prodcuct);
      window.$("#item-popup").modal("hide");
    },

    check(event, index, value, currentObject, type, subtype) {
      
      console.log(this.productDetail.selectedCheckOption);
      console.log("subtype",subtype);
      console.log("type",type);
      console.log("radioObject",currentObject);
      let maxSelection = 0;

      if(type == 'radio' && (subtype == 'subradio' || subtype == 'subcheckbox')){
        if(subtype == 'subradio' || subtype == 'subcheckbox'){
          this.productDetail.selected_type[index].roption = currentObject;
          //this.productDetail.selected_type[index].subcheckbox = [];
        }
      }
      
      // if(subtype == 'checkbox' || subtype == 'radio'){
      //   this.productDetail.selected_type[index].subradio = undefined;
      //   this.productDetail.selected_type[index].subcheckbox = [];
      // }

      // if (event.target.checked) {
      //   this.itemTotal = parseFloat(parseFloat(this.itemTotal) + parseFloat(value));
      // } else {
      //   this.itemTotal = parseFloat(parseFloat(this.itemTotal) - parseFloat(value));
      // }
      if(subtype == 'subcheckbox'){
        var selectcount = this.productDetail.selected_type[index].subcheckbox.length;
        maxSelection = currentObject.is_selection;
      }
      if(type == 'radio' || type == 'checkbox' && subtype == '' ){
        var selectcount = this.productDetail.selected_type[index].option.length;
        maxSelection = this.productDetail.selected_type[index].max_selection;
      }
      
      
      if (maxSelection && maxSelection != 0) {
        if (maxSelection < selectcount) {
          // this.itemTotal = parseFloat(parseFloat(this.itemTotal) - parseFloat(this.productDetail.selected_type[index].option[0].selection_price)
          // );
          this.productDetail.selected_type[index].option.splice(0, 1);
          this.productDetail = {
            ...this.productDetail,
            selected_type: this.productDetail.selected_type,
          };
        }
      }
    },

    incrementItem() {
      if (this.productDetail.quantity > this.quantityTotal) {
        this.quantityTotal++;
      }
    },

    decrementItem() {
      if (this.quantityTotal != 1) {
        this.quantityTotal--;
      }
    },

    checkInCart(itemId) {
      var checkItem = this.cart.find((ele) => ele.item_id == itemId);
      if (checkItem) {
        return false;
      } else {
        return true;
      }
    },

    onImgError() {
      this.imgError = true;
    },
  },
};
</script>
