<template>
<div>
    <div class="modal fade prdtmodel-nw" id="item-popup" tabindex="-1" aria-labelledby="itemModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <skeleton-loader-vue v-if="!productDetail" type="string" width="50%" height="20px" />
                    <h5 v-else class="modal-title" id="itemModalLabel">
                        {{ productDetail.item_name }}
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <!---------Customization Skeleton start------------->
                <div class="container" v-if="customize_skelloader">
                    <div class="product-content pt-3">
                        <div>
                            <div class="cus-title">
                                <skeleton-loader-vue type="string" width="37%" height="20px" />
                                <skeleton-loader-vue type="string" width="20%" height="20px" />
                            </div>
                            <div>
                                <div class="form-check form__radio-group">
                                    <label for="radio-0-0" class="form__label-radio" style="padding-left: 0px">
                                        <skeleton-loader-vue type="circle" class="form__radio" width="20px" height="20px" style="margin-right: 20px;" />
                                        <skeleton-loader-vue type="string" width="170px" height="20px" style="position: absolute;" />
                                    </label>
                                    <span class="ch-price"><skeleton-loader-vue type="string" width="30px" height="24px" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!---------Customization Skeleton End------------->
                <div class="modal-body" v-if="productDetail" :id="'item-id-' + productDetail.item_id">
                    <p class="desc" v-if="!productDetail">
                        <skeleton-loader-vue type="string" width="100%" height="20px" />
                    </p>
                    <p v-else class="desc">{{ productDetail.item_description }}</p>
                    <div id="prod-details-slider" class="owl-carousel">
                        <div v-for="(slide,index) in productDetail.item_images" :key="index">
                            <div class="testimonial-item equal-height style-6" v-if="!imgError">
                                <img class="item-img" :src="slide.image_name" @error="onImgError()" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="container">
                        <div class="product-content pt-3" v-if="productDetail.is_customizable != '0' && !customize_skelloader">
                            <div v-for="(customize, customizeIndex) in productDetail.customize_type" :key="customizeIndex">
                                <div class="cus-title">
                                    <h6 class="cus-name">{{ customize.name }}</h6>
                                    <p v-if="customize.is_selection != 0">Maximum {{ customize.is_selection }} items</p>
                                </div>
                                <!--Radio Button start-->
                                <div v-if="customize.is_min_selection == '1' && customize.is_selection == '1'"
                                  :class="{'is-invalid': $v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id].value.$error}">
                                    <div class="form-check form__radio-group"
                                      v-for="(optionData, index) in customize.option" :key="index">
                                        <div data-toggle="collapse" class="rdiotogl" :href="'#collapseExample'+customizeIndex+index">
                                            <input class="form__radio-input" type="radio" :name="'radio-' + customizeIndex" :id="'radio-' + customizeIndex + '-' + index" :value="optionData.selection_id" v-model="$v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id].value.$model" @change="checkNested($event,customize.customize_type_id)" />
                                            <label class="form__label-radio" :for="'radio-' + customizeIndex + '-' + index"><span class="form__radio-button"></span>{{ optionData.selection_name }}</label>
                                            <span class="ch-price">
                                                <span v-html="$auth.setting.currency"></span>
                                                {{ optionData.selection_price }}
                                                <b-icon-arrow-right-circle-fill v-if="optionData.options.length > 0"></b-icon-arrow-right-circle-fill>
                                            </span>
                                        </div>
                                        <!--------Sub Customization Start Radio------------->
                                        <div class="rdiotogllist" v-if="optionData.is_min_selection == '1' && optionData.is_selection == '1' && optionData.options.length > 0 ">
                                            <div class="chld-rdio collapse show"
                                              :class="{'is-invalid': $v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id]['child_'+optionData.selection_id].value.$error}"
                                              v-if="optionData.options.length > 0 && selectedCustomisation.customize_type['parent_'+customize.customize_type_id].value == optionData.selection_id">
                                                <div v-for="(subOption,subi) in optionData.options" :key="subi" class="form-check form__radio-group">
                                                    <!-- v-model="productDetail.selected_type[customizeIndex].subradio"  -->
                                                    <input class="form__radio-input" type="radio" :name="'radio-' +index+'-'+ customizeIndex" :id="'radio-' + customizeIndex + '-' +index+'-'+subi" :value="subOption.selection_id" v-model="$v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id]['child_'+optionData.selection_id].value.$model" @change="checkNestedSub($event)" />
                                                    {{subOption.is_selected}}
                                                    <label class="form__label-radio" :for="'radio-' + customizeIndex + '-' +index+'-'+subi"><span class="form__radio-button"></span>{{ subOption.selection_name }}</label>
                                                    <span class="ch-price"><span v-html="$auth.setting.currency"></span>{{ subOption.selection_price }}</span>
                                                </div>
                                            </div>

                                            <div class="invalid-feedback">
                                                <span v-if="!$v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id]['child_'+optionData.selection_id].value.crequired" >{{optionData.selection_name}} Maximum {{optionData.is_selection}} item select</span>
                                                <span v-else-if="!$v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id]['child_'+optionData.selection_id].value.valueBetween" >{{optionData.selection_name}} Maximum {{optionData.is_selection}} item select valid</span>
                                            </div>
                                        </div>
                                        <!---------Sub Customization End Radio------------>
                                        <!---------Sub Customization Start Checkbox------------>
                                        <div v-else class="custom-checkbox">
                                            <div class="chld-rdio collapse show"
                                              :class="{'is-invalid': $v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id]['child_'+optionData.selection_id].value.$error}"
                                              v-if="optionData.options.length > 0 && selectedCustomisation.customize_type['parent_'+customize.customize_type_id].value == optionData.selection_id">
                                                <div class="form-group" v-for="(suboptionCheckbox, subindex) in optionData.options" :key="subindex">
                                                    <!-- v-model="productDetail.selected_type[customizeIndex].subcheckbox" -->
                                                    <input class="form-check-input" type="checkbox" :value="suboptionCheckbox.selection_id" :id="'subcheckbox-' + customizeIndex + '-' + index +'-'+ subindex" :name="'subcheckbox_' + customizeIndex+index+'_'+subindex" v-model="$v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id]['child_'+optionData.selection_id].value.$model" @change="checkNestedSub($event)"   />{{suboptionCheckbox.is_selected}}
                                                    <label class="form-check-label" :for="'subcheckbox-' + customizeIndex + '-' + index+'-'+subindex">
                                                        {{ suboptionCheckbox.selection_name }}</label>
                                                    <span class="ch-price"><span v-html="$auth.setting.currency"></span>{{ suboptionCheckbox.selection_price }}</span>
                                                </div>
                                            </div>
                                            <div class="invalid-feedback">
                                                <span v-if="!$v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id]['child_'+optionData.selection_id].value.crequired" >{{optionData.selection_name}} Maximum {{optionData.is_selection}} item select</span>
                                                <span v-else-if="!$v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id]['child_'+optionData.selection_id].value.valueBetween" >{{optionData.selection_name}} Maximum {{optionData.is_selection}} item select valid</span>
                                            </div>
                                        </div>
                                        <!---------Sub Customization End Checkbox------------>
                                    </div>
                                </div>
                                <!--Radio Button end-->
                                <!--CheckBox start-->
                                <div v-else class="custom-checkbox" 
                                    :class="{'is-invalid': $v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id].value.$error}">
                                    <div  v-for="(optionData, index) in customize.option" :key="index">
                                    <div class="form-group">
                                        <input class="form-check-input" type="checkbox" :value="optionData.selection_id" :id="'checkbox-' + customizeIndex + '-' + index" :name="'checkbox_' + customizeIndex" v-model="$v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id].value.$model" @change="checkNestedSub($event)"  />
                                        <label class="form-check-label" :for="'checkbox-' + customizeIndex + '-' + index"> {{ optionData.selection_name }} {{ customize.customizeIndex }}</label>
                                        <span class="ch-price"><span v-html="$auth.setting.currency"></span>{{ optionData.selection_price }} <b-icon-arrow-right-circle-fill v-if="optionData.options.length > 0"></b-icon-arrow-right-circle-fill></span>
                                    </div>
                                    <!--------Sub Customization Start Radio------------->
                                    <div v-if="optionData.is_min_selection == '1' && optionData.is_selection == '1' && optionData.options.length > 0 ">
                                        <div class="chld-rdio "
                                            :class="{'is-invalid': $v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id]['child_'+optionData.selection_id].value.$error}"
                                            v-if="optionData.options.length > 0 && selectedCustomisation.customize_type['parent_'+customize.customize_type_id].value == optionData.selection_id">
                                            <div v-for="(subOption,subi) in optionData.options" :key="subi" class="form-check form__radio-group">
                                                <!-- v-model="productDetail.selected_type[customizeIndex].subradio"  -->
                                                <input class="form__radio-input" type="radio" :name="'radio-' +index+'-'+ customizeIndex" :id="'radio-' + customizeIndex + '-' +index+'-'+subi" :value="subOption.selection_id" v-model="$v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id]['child_'+optionData.selection_id].value.$model" @change="checkNestedSub($event)" />
                                                {{subOption.is_selected}}
                                                <label class="form__label-radio" :for="'radio-' + customizeIndex + '-' +index+'-'+subi"><span class="form__radio-button"></span>{{ subOption.selection_name }}</label>
                                                <span class="ch-price"><span v-html="$auth.setting.currency"></span>{{ subOption.selection_price }}</span>
                                            </div>
                                        </div>
                                        <div class="invalid-feedback">
                                            <span v-if="!$v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id]['child_'+optionData.selection_id].value.crequired" >{{optionData.selection_name}} Maximum 1 item select</span>
                                            <span v-else-if="!$v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id]['child_'+optionData.selection_id].value.valueBetween" >{{optionData.selection_name}} Maximum 1 item select valid</span>
                                        </div>
                                    </div>
                                    <!---------Sub Customization End Radio------------>
                                    <!---------Sub Customization Start Checkbox------------>
                                    <div v-else class="custom-checkbox">
                                        <div class="chld-rdio "
                                            :class="{'is-invalid': $v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id]['child_'+optionData.selection_id].value.$error}"
                                            v-if="optionData.options.length > 0 
                                                && selectedCustomisation.customize_type['parent_'+customize.customize_type_id].value 
                                                && selectedCustomisation.customize_type['parent_'+customize.customize_type_id].value.includes(optionData.selection_id)">
                                            <div class="form-group" v-for="(suboptionCheckbox, subindex) in optionData.options" :key="subindex">

                                                <!-- v-model="productDetail.selected_type[customizeIndex].subcheckbox" -->
                                                <input class="form-check-input" :data-id="customize.customize_type_id+','+optionData.selection_id" type="checkbox" :value="suboptionCheckbox.selection_id" :id="'subcheckbox-' + customizeIndex + '-' + index +'-'+ subindex" v-model="$v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id]['child_'+optionData.selection_id].value.$model" @change="checkNestedSub($event)"   />{{suboptionCheckbox.is_selected}}
                                                <label class="form-check-label" :for="'subcheckbox-' + customizeIndex + '-' + index+'-'+subindex">
                                                    {{ suboptionCheckbox.selection_name }}</label>
                                                <span class="ch-price"><span v-html="$auth.setting.currency"></span>{{ suboptionCheckbox.selection_price }}</span>
                                            </div>
                                        </div>
                                        <div class="invalid-feedback">
                                            <span v-if="!$v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id]['child_'+optionData.selection_id].value.crequired" >{{optionData.selection_name}} Maximum {{optionData.is_selection}} item select</span>
                                            <span v-else-if="!$v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id]['child_'+optionData.selection_id].value.valueBetween" >{{optionData.selection_name}} Maximum {{optionData.is_selection}} item select valid</span>
                                        </div>
                                    </div>
                                    <!---------Sub Customization End Checkbox------------>
                                    </div>
                                </div>
                                <!--CheckBox end-->
                                <div
                                    class="invalid-feedback"
                                    v-if="$v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id].value.$error"
                                    >
                                    <span v-if="!$v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id].value.crequired">
                                        <span v-if="customize.is_min_selection == 1">{{customize.name}} Required Minimun 1 item select</span>
                                        <span v-if="customize.is_min_selection != 1 ">{{customize.name}} Required Minimum {{customize.is_min_selection}} items</span>
                                    </span>
                                    <span v-else-if="!$v.selectedCustomisation.customize_type['parent_'+customize.customize_type_id].value.valueBetween">
                                        <span v-if="customize.is_min_selection == 1">{{customize.name}} Required Minimun 1 item select</span>
                                        <span v-if="customize.is_min_selection != 1">{{customize.name}} Required Minimum {{customize.is_selection}} items</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" v-if="!closeLabel && pagename != 'qr'" >
                    <div class="quantityInc" v-if="productDetail && productDetail.is_sold_out == '0'">
                        <div class="number d-flex align-items-center">
                            <span class="minus d-flex justify-content-center align-items-center" @click="decrementItem()">-</span>
                            <input type="text" :value="quantityTotal" readonly />
                            <span class="plus d-flex justify-content-center align-items-center" @click="incrementItem()">+</span>
                        </div>
                    </div>
                    <button v-if="productDetail && productDetail.is_sold_out == '0'" class="add-to-cart btn btn-outline-warning btn-sm" @click="addProductToCart">Add To Cart(<span v-html="$auth.setting.currency"></span>
                        {{(getTotalOptionPrice()*this.quantityTotal).toFixed(2)}})
                    </button>
                    
                    <button v-if="productDetail && productDetail.is_sold_out != '0' && !customize_skelloader"  class="sold add-to-cart btn btn-outline-warning btn-sm">
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
import {
    mapGetters,
    mapActions,
    mapMutations
} from "vuex";
import AlertModal from '../components/AlertModal.vue';
import VueSkeletonLoader from 'skeleton-loader-vue';
import {requiredIf} from 'vuelidate/lib/validators';

export default {
    components: {
        AlertModal,
        'skeleton-loader-vue': VueSkeletonLoader
    },
    props: ["productId", "restaurantID", "restaurant_on_off","pagename"],
    data() {
        return {
            productDetail: null,
            imgError: "",
            loading: true,
            optionCollection: [],
            selectedCustomisation: {
              customize_type: {}
            },
            selectedCheckbox: [],
            itemTotal: 0,
            quantityTotal: 1,
            closeLabel: false,
            isAlert: false,
            AlertData: {},
            tempProduct: {},
            customize_skelloader: true,
            
        };
    },
    mounted() {
        //Restaurant close or schedule for
        if (this.restaurant_on_off == '0' && this.$auth.setting && this.$auth.setting.is_enable_schedule_order_after_business_hours == 0) {
            this.closeLabel = true;
        } else {
            this.closeLabel = false;
        }
    },
    validations() {
      if(this.productDetail){
        let data = {
          selectedCustomisation:{
            customize_type:{}
          }
        }
        this.productDetail && this.productDetail.customize_type.forEach((item,index)=>{
          let pvalue = null;
          if(!this.selectedCustomisation.customize_type['parent_'+item.customize_type_id]){
            this.selectedCustomisation.customize_type['parent_'+item.customize_type_id] = {value: item.is_selection != 1?[]:null}
          }
          pvalue = this.selectedCustomisation.customize_type['parent_'+item.customize_type_id].value;
          data['selectedCustomisation']['customize_type']['parent_'+item.customize_type_id] = {
              'value':{
                  crequired: ((value) => {
                    return item.is_min_selection > 0 ? (value && value.toString().length > 0 ? true : false) : true;
              } ),
              valueBetween: ((value) => item.is_selection > 1 ?
                value.length >= item.is_min_selection && value.length <= item.is_selection : true)
            }
          }
          this.productDetail.customize_type[index].option.forEach((op, ind) => {
            if(op.is_default == 1){
                let setvalue = this.selectedCustomisation.customize_type['parent_'+op.customize_type_id].value;
                if(setvalue && setvalue != null) {
                    if(typeof setvalue == 'number' || typeof setvalue == 'string') {
                        setvalue = op.selection_id;
                    }else{
                        setvalue.push(op.selection_id);
                    }
                }
            }
            let temp = this.selectedCustomisation.customize_type['parent_'+item.customize_type_id]['child_'+op.selection_id];
            if(!temp || (pvalue && typeof pvalue == 'object' && (pvalue.length == 0 || !pvalue.includes(op.selection_id)) || pvalue == null || pvalue == '') ){
                if(op.is_selection < op.is_min_selection){
                    this.productDetail.customize_type[index].option[ind].is_selection = op.is_min_selection;
                }
                this.selectedCustomisation.customize_type['parent_'+item.customize_type_id]['child_'+op.selection_id] = {value: op.is_selection != 1?[]:op.is_selection < op.is_min_selection?[]: null}
            }

            if(op.options.length > 0){
                op.options.forEach((itm,key)=>{
                    if(itm.is_default == 1){
                        let setopvalue = this.selectedCustomisation.customize_type['parent_'+op.customize_type_id]['child_'+itm.parent_item_id].value;
                        if(setopvalue != null ){
                            if(typeof setopvalue == 'number' || typeof setopvalue == 'string') {
                                setopvalue = itm.selection_id;
                            }else{
                                setopvalue.push(itm.selection_id);
                            }
                        }
                    }
                })
            }
            data['selectedCustomisation']['customize_type']['parent_'+item.customize_type_id]['child_'+op.selection_id] = {
              'value':{
                crequired: ((value)=> {
                    if(typeof value != 'object'){
                        return (op.is_min_selection > 0 && 
                        (pvalue &&  typeof pvalue == 'object' ? pvalue.includes(op.selection_id) : pvalue == op.selection_id)
                        ? (value && value.toString().length > 0 ? true : false) : true)
                    }
                    return (op.is_min_selection > 0 && 
                    (pvalue && typeof pvalue == 'object' ? pvalue.includes(op.selection_id) : pvalue == op.selection_id)
                    ? (value && value.length > 0 ? true : false) : true)
                }),
                
                valueBetween: ((value) => {
                    if(typeof value != 'object'){
                        return op.is_selection > 1 && 
                        (pvalue && typeof pvalue == 'object' ? pvalue.includes(op.selection_id) : pvalue == op.selection_id) ?
                        value && value.toString().length >= op.is_min_selection &&
                        value && value.toString().length <= op.is_selection : true;
                    }
                    return op.is_selection > 1 && 
                        (pvalue && typeof pvalue == 'object' ? pvalue.includes(op.selection_id) : pvalue == op.selection_id)?
                        value && value.length >= op.is_min_selection &&
                        value && value.length <= op.is_selection : true;
                })
              }
            }
          })
        });
        return data;
      }else{
        return {}
      }
    },
    computed: {
        ...mapGetters("product", ["cart"]),
    },

    methods: {
        ...mapActions("product", ["addProductToCart", "getProductDetails"]),
        ...mapMutations("product", ["clearCartItems"]),

        openProductModel: function (itemId) {
            this.itemTotal = 0;
            this.quantityTotal = 1;
            this.loading = true;
            this.customize_skelloader = true;
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
                    if (data.Result[0] != undefined && data.Result[0].length != 0) {
                        this.customize_skelloader = false;
                        this.productDetail = {
                            ...data.Result[0],
                            selected_type: data.Result[0].customize_type.map((p) => ({
                                customize_type_id: p.customize_type_id,
                                max_selection: parseInt(p.is_selection),
                                min_selection: parseInt(p.is_min_selection),
                                selection_name: p.name,

                                ...(p.is_selection != 1 ? {
                                    option: p.option.filter(
                                        (q) =>
                                        q.is_default == "1"
                                    )
                                } : {
                                    option: []
                                }),
                                ...(p.is_selection == 1 ? {
                                    roption: p.option.find(
                                        (q) => q.is_default == "1"
                                    )
                                } : {
                                    roption: undefined
                                }),

                            })),
                        };
                    }
                }
            });
        },

        //Display Total Amount Of item cart
        getTotalOptionPrice() {
            let radioTotal = 0;
            let checkboxTotal = 0;
            let pvalue = null;
            this.productDetail.customize_type.forEach((itm,index)=>{
                let parentId = 'parent_'+itm.customize_type_id;
                if(this.selectedCustomisation.customize_type['parent_'+itm.customize_type_id]){
                    pvalue = this.selectedCustomisation.customize_type['parent_'+itm.customize_type_id].value;
                }else{
                    pvalue = null;
                }
                if(itm.option){
                    itm.option.forEach((itmoption,key)=>{
                        if(pvalue && pvalue != null && pvalue.includes(itmoption.selection_id)){
                            radioTotal += itmoption.selection_price;
                            if(itmoption.options) {
                                let temp = null;
                                itmoption.options.forEach((option,okey)=>{
                                    temp = this.selectedCustomisation.customize_type['parent_'+itm.customize_type_id]['child_'+option.parent_item_id].value;
                                    if(temp && typeof temp == 'number' && temp == option.selection_id){
                                        radioTotal += option.selection_price;
                                    }
                                    if(temp && typeof temp == 'object' && temp.includes(option.selection_id)){
                                        radioTotal += option.selection_price;
                                    }
                                })
                            }
                        }
                    })
                }
            })

            // this.productDetail.selected_type.forEach((el) => {
            //     if (el.roption != undefined) {
            //         radioTotal += el.roption.selection_price;
            //     }
            //     if (el.option.length) {
            //         el.option.forEach((elm) => {
            //             checkboxTotal += elm.selection_price;
            //         })
            //     }
            // });

            return this.productDetail.price + radioTotal + checkboxTotal;
        },

        onModalCloseFun(value) {
            this.isAlert = false;
            if (value == 'yes') {
                this.$store.commit("product/clearCartItems");
                this.addToCartItem(this.tempProduct);
            }
        },

        addProductToCart() {
            this.$v.$touch();
            if(this.$v.selectedCustomisation.customize_type.$invalid){
                return false;
            }
            //var alertshown = false;
            // this.productDetail.selected_type.forEach((el, key) => {
            //     if (!alertshown) {
            //         var selectcountradio = this.productDetail.selected_type[key].roption;
            //         var selectcountcheckbox = this.productDetail.selected_type[key].option
            //             .length;
            //         var maxSelection = this.productDetail.selected_type[key]
            //             .max_selection;
            //         var minSelection = this.productDetail.selected_type[key]
            //             .min_selection;

            //         if (maxSelection == 1 && minSelection == 1 && (selectcountradio == undefined || selectcountradio == 0)) {
            //             alertshown = true;
            //             alert(el.selection_name + " Max 1 item select");
            //         }

            //         if (
            //             maxSelection != 1 &&
            //             minSelection != 1
            //         ) {
            //             if (minSelection <= selectcountcheckbox) {
            //                 return true;
            //             } else {
            //                 alertshown = true;
            //                 alert(el.selection_name + " Required Minimum " + minSelection + " item");
            //             }

            //         } else if (minSelection == 1 && maxSelection > 1) {
            //             if (minSelection <= selectcountcheckbox) {
            //                 return true;
            //             } else {
            //                 alertshown = true;
            //                 alert(el.selection_name + " Required Minimum " + minSelection + " item");
            //             }
            //         }
            //     }
            // });
            
            //if (!alertshown) {
                let pvalue = null;
                let arraySelectCustoizeID = [];
                let arraySelectCustoizePrice = [];
                let selected_type = [];
                this.productDetail.customize_type.forEach((itm,index)=>{
                    let parentId = 'parent_'+itm.customize_type_id;
                    pvalue = this.selectedCustomisation.customize_type['parent_'+itm.customize_type_id].value;

                    if(itm.option){
                        itm.option.forEach((itmoption,key)=>{
                            if(pvalue && pvalue != null && pvalue.includes(itmoption.selection_id)){
                                arraySelectCustoizeID.push(itmoption.selection_id);
                                arraySelectCustoizePrice.push(itmoption.selection_price);
                                selected_type.push(itmoption.selection_name);

                                if(itmoption.options) {
                                    let temp = null;
                                    let subOptionCustoizeID = [];
                                    let subOptionCustoizePrice = [];
                                    itmoption.options.forEach((option,okey)=>{
                                        temp = this.selectedCustomisation.customize_type['parent_'+itm.customize_type_id]['child_'+option.parent_item_id].value;
                                        if(temp && typeof temp == 'number' && temp == option.selection_id){
                                            arraySelectCustoizeID.push(option.selection_id);
                                            arraySelectCustoizePrice.push(option.selection_price);
                                            selected_type.push(option.selection_name);
                                        }
                                        if(temp && typeof temp == 'object' && temp.includes(option.selection_id)){
                                            arraySelectCustoizeID.push(option.selection_id);
                                            arraySelectCustoizePrice.push(option.selection_price);
                                            selected_type.push(option.selection_name);
                                        }
                                    });
                                }
                                
                            }
                        })
                    }
                   
                })
                // this.productDetail.selected_type.forEach((el) => {
                //     if (el.roption) {
                //         arraySelectCustoizeID.push(el.roption.selection_id);
                //         arraySelectCustoizePrice.push(el.roption.selection_price);
                //     }
                //     if (el.option.length) {
                //         el.option.forEach((elm) => {
                //             arraySelectCustoizeID.push(elm.selection_id);
                //             arraySelectCustoizePrice.push(elm.selection_price);
                //         })
                //     }
                // });
                var AddToCartItemArray = {
                    restaurant_id: this.restaurantID,
                    item_id: this.productDetail.item_id,
                    item_name: this.productDetail.item_name,
                    price: this.getTotalOptionPrice(),
                    quantity: this.quantityTotal,
                    itemTotalQuantity: this.productDetail.quantity,
                    selected_type: selected_type,
                    selectCustoizeID: arraySelectCustoizeID,
                    selectCustoizePrice: arraySelectCustoizePrice,
                    item_type: this.productDetail.item_type,
                    item_price: this.productDetail.price
                };
                
                var checkRestarant = this.cart.find((ele) => (ele.restaurant_id == this.restaurantID));
                if (this.cart.length) {
                    if (checkRestarant) {
                        this.addToCartItem(AddToCartItemArray);
                    } else {
                        this.AlertData = {
                            displayMessage: 'Your cart contain items from another store. Do you wish to clear cart and start a new order here?',
                            isSetClass: 'prdct-modal-cls'
                        };
                        this.isAlert = true;
                        this.tempProduct = AddToCartItemArray;
                        window.$("#item-popup").modal("hide");
                        window.$(this.$refs.AlertModal).modal();
                    }
                } else {
                    this.addToCartItem(AddToCartItemArray);
                }
            //}
        },

        addToCartItem(prodcuct) {
            this.$store.dispatch("product/addProductToCart", prodcuct);
            window.$("#item-popup").modal("hide");
        },
        checkNested(e, cust_id){
          this.selectedCustomisation.customize_type = {
            ...this.selectedCustomisation.customize_type,
            ['parent_'+cust_id]:{value : e.target.value}  
          }
        },
        checkNestedSub(e, cust_id){
          let types = Object.keys(this.selectedCustomisation.customize_type);
             this.selectedCustomisation.customize_type = {
                ...this.selectedCustomisation.customize_type,
                /* ...(types.reduce((acc,ire) => {
                    acc[ire] = {...this.selectedCustomisation.customize_type[ire]};
                    return acc;
                },{})) */
            }
        },
        // check(event, index, value) {
        //     // this.selectedCustomisation = {...this.selectedCustomisation}
        //     /* if (event.target.checked) {
        //         this.itemTotal = parseFloat(
        //             parseFloat(this.itemTotal) + parseFloat(value)
        //         );
        //     } else {
        //         this.itemTotal = parseFloat(
        //             parseFloat(this.itemTotal) - parseFloat(value)
        //         );
        //     }

        //     //var selectcountradio = this.productDetail.selected_type[index].roption;
        //     var selectcount = this.productDetail.selected_type[index].option.length;
        //     let maxSelection = this.productDetail.selected_type[index].max_selection;
        //     //var minSelection = this.productDetail.selected_type[index].min_selection;
        //     if (maxSelection && maxSelection != 0) {
        //         if (maxSelection < selectcount) {
        //             this.itemTotal = parseFloat(
        //                 parseFloat(this.itemTotal) -
        //                 parseFloat(
        //                     this.productDetail.selected_type[index].option[0]
        //                     .selection_price
        //                 )
        //             );
        //             this.productDetail.selected_type[index].option.splice(0, 1);
        //             this.productDetail = {
        //                 ...this.productDetail,
        //                 selected_type: this.productDetail.selected_type,
        //             };
        //         }
        //     } */
        // },

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
