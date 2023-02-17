<template>
<div>
    <header class="index-header header-start">
        <div class="fixed-top header-main">
            <nav class="navbar navbar-light bg-white">
                <div class="d-flex align-items-center">
                <div class="delivery-pickup-main d-flex align-items-center">
                </div>
                <div class="logo-main">
                    <router-link to="/" class="desktop-logo"> <img class="nav-logo" :src="$auth.getAppLogo()" /></router-link>
                    <router-link to="/" class="mobi-logo"> <img class="nav-logo" :src="$auth.getAppLogo()" /></router-link>
                </div>
                </div>
            </nav>
        </div>
    </header>
    <section id="reshead" class="vendor-details-main pb-4 menu-details">
      <div class="container-fluid">
         <div class="row">
            <div class="col-md-9">
               <div class="vendor-left-main text-capitalize d-flex">
                  <div class="media w-100">
                    <div class="img-cls"><img :src="resturantDetail.icon_image" alt="..." class="mr-3"></div>
                    <div class="media-body">
                        <h3 class="mt-0">{{resturantDetail.name}}</h3>
                        <p class="mb-0">{{resturantDetail.location_address}}</p>
                        <div class="info-view" v-if="!resturantDetail.restaurant_id">
                            <skeleton-loader-vue type="string" class="skel_view" width="25%" height="31px" />
                        </div>
                        <view-info v-else :restaurantID="resturantDetail.restaurant_id"></view-info>
                    </div>
                    <div class="rstinfo-cls">
                        <div class="deliveryfees-main text-center d-flex align-content-center ml-auto mr-4">
                            <div class="delivery-fees p-3" v-if="is_minimuOrder && resturantDetail && resturantDetail.minimum_order_value != 0 && resturantDetail.minimum_order_value != ''">
                            <h5 class="mb-0">
                                <span id="currency" v-if="$auth.setting.currency" v-html="$auth.setting.currency"></span
                                >{{parseFloat(resturantDetail.minimum_order_value).toFixed(1)}}
                            </h5>
                            <p class="mb-0">Minimum Order</p>
                            </div>
                            <div class="delivery-minutes p-3" v-if="is_twoPersonPrice &&resturantDetail && resturantDetail.two_person_price != 0">
                            <h5 class="mb-0">
                                <span v-if="$auth.setting.currency" v-html="$auth.setting.currency"></span
                                >{{parseFloat(resturantDetail.two_person_price).toFixed(1)}}
                            </h5>
                            <p class="mb-0">Value for Two</p>
                            </div>
                            <div class="review-cnt p-3" v-if="is_rating">
                            <div v-if="resturantDetail.rating != 0 && is_rating" class="star-rate" :class="(parseFloat(resturantDetail.rating).toFixed(1) > 2.0 || parseFloat(resturantDetail.rating).toFixed(1) == 0.0 ? 'green-cls':'red-cls')">
                                <i class="fas fa-star mr-2"></i>
                                <span v-if="resturantDetail.rating == 0">{{parseFloat(resturantDetail.rating).toFixed(1)}}</span>
                                <span v-else>{{parseFloat(resturantDetail.rating).toFixed(1)}}</span>
                            </div>
                            <p class="mb-0">{{ resturantDetail.review_count && resturantDetail.review_count == 1 ? resturantDetail.review_count+ ' Review':resturantDetail.review_count+' Reviews'}}</p>
                            </div>
                        </div>
                    </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </section>
    <section class="resturant-menu-main">
        <div class="container-fluid">
            <div class="row1">
                <div class="col-md-12 pr-0 pl-0">
                    <div class="menuitems-main">
                        <div class="menu-class-sticky">
                            <div id="side-bar" class="side-bar">
                                <nav id="menulist" class="navigation">
                                    <ul>
                                        <li class="d-flex align-items-center">
                                            <button class="btn"><i class="fas fa-bars"></i></button>
                                            <div v-if="menus.length == 0 && is_menu_skel_loader" class="skel-loader">
                                                <skeleton-loader-vue type="string" v-for="mn in 6" :key="mn" width="93px" height="29px" class="menuSkel" />    
                                            </div>
                                            <div v-for="menu in menus" :key="menu.restaurant_menu_id">
                                                <a href="javascript:void(0);" :id="'menuitem' + menu.restaurant_menu_id" :class="{ active : active_el == menu.restaurant_menu_id }" v-if="menu.item_counts != 0" @click="activeMenu(menu.restaurant_menu_id)">{{ menu.menu_name }}</a>
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                                <div class="searchbar-item">
                                    <input type="search" v-model="search" name="search" class="srch-itm" placeholder="Search">
                                </div>
                            </div>
                        </div>
                        <div class="main-content">
                            <!-----skeleton Start---------->
                            <div v-if="is_menu_skel_loader" class="menulength" id="itemmenumain">
                                <section>
                                <div class="media-heading">
                                    <h4 class="mb-4"><skeleton-loader-vue type="string" width="24%" height="20px"/></h4>
                                </div>
                                <div class="media-itms">
                                    <div class="item_detail" right="true" v-for="prdt in 4" :key="prdt">
                                    <div class="media">
                                        <a href="javascript:void(0)" id="element" class="btn btn-default show-modal">
                                        <div class="media-body">
                                            <h5 class="mt-0 mr-5 item-name"><skeleton-loader-vue type="string" width="24%" height="20px"/></h5>
                                            <p class="mb-0 mt-2 item-descr"> <skeleton-loader-vue type="string" width="80%" height="20px" /> </p>
                                            <div class="prc-show">
                                            <span class="mt-2 d-inline-block item-price"><skeleton-loader-vue type="string" width="54px" height="24px" /></span>
                                            </div>
                                        </div>
                                        </a>
                                        <div class="img-btn">
                                        <div class="item-img"><skeleton-loader-vue width="120" class="img-cls" style="border-radius: 5px"/></div>
                                        <div class="pgnme-cls">
                                            <div>
                                                <div class="sold-de">
                                                    <div class="icus"><button class="btn btn-sm"><skeleton-loader-vue type="string" width="50px" height="24px" /></button></div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </section>
                            </div>
                            <!-----skeleton End---------->
                            <div v-if="menus && menus.length > 0 && menusdata.length ==  0" class="menulength" id="itemmenumain">
                                <div v-for="menu in filteredData" :key="menu.restaurant_menu_id">
                                <section :id="'item' + menu.restaurant_menu_id" v-if="menu.item_counts != 0">
                                    <div class="media-heading">
                                    <h4 class="mb-4">{{ menu.menu_name }}</h4>
                                    </div>
                                    <!-- <div class="media-itms"> -->
                                    <div class="media-itms" :class="'media-itms-theme'+itemlayout">
                                    <Product
                                        v-for="item in menu"
                                        :key="item.item_id"
                                        :item="item"
                                        :right="true"
                                        :menuId="menu.restaurant_menu_id"
                                        v-on:openProductDetailModal="openProductDeails"
                                        :restaurantID="item.restaurant_id"
                                        :restaurant_on_off="restaurant_on_off"
                                        :class="item.item_id"
                                        :pagename="pageName"
                                        :itemlayout="itemlayout"
                                        ></Product>
                                    </div>
                                </section>
                                </div>
                            </div>
                            <!---Category wise Menu item Open--->
                            <div v-else-if="menusdata && menusdata.length != 0" class="menulength" id="itemmenumain">
                                <div>
                                <section :id="'item' + menusdata.restaurant_menu_id" v-if="menusdata.menu_item_detail != 0">
                                    <div class="media-heading">
                                    <h4 class="mb-4">{{ menusdata.menu_name }}</h4>
                                    </div>
                                    <div class="media-itms">
                                    <Product
                                        v-for="item in filteredItemData"
                                        :key="item.item_id"
                                        :item="item"
                                        :right="true"
                                        :menuId="menusdata.restaurant_menu_id"
                                        v-on:openProductDetailModal="openProductDeails"
                                        :restaurantID="item.restaurant_id"
                                        :restaurant_on_off="restaurant_on_off"
                                        :class="item.item_id"
                                        :pagename="pageName"
                                        ></Product>
                                    </div>
                                </section>
                                </div>
                            </div>
                            <!---Category wise Menu item Open--->
                        </div>
                        <ProductDetails ref="childComponent" :restaurantID="restaurantID" :restaurant_on_off="restaurant_on_off" :pagename="pageName"></ProductDetails>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</template>
<script>
import { mapActions } from "vuex";
import NavBar from "@/components/NavBar.vue";
import ViewInfo from "@/components/ViewInfo.vue";
import Rating from "@/components/Rating.vue";
import Product from "@/components/Product.vue";
import ProductDetails from "@/components/ProductDetails.vue";
import VueSkeletonLoader from 'skeleton-loader-vue';
import Footer from '../components/Footer.vue';

export default {
    name: "QR",
    components: { NavBar, Product, ProductDetails, Rating, ViewInfo, Footer, 'skeleton-loader-vue':VueSkeletonLoader },
    data() {
        return {
            menus:[],
            is_menu_skel_loader:true,
            resturantDetail:{},
            is_rating:false,
            is_twoPersonPrice:false,
            is_minimuOrder:false,
            active_el:0,
            menusdata :[],
            search:'',
            restaurant_on_off:1,
            pageName:'qr',
            restaurantID: "",
            itemlayout:'1'
        };
    },
    created() {
        document.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
        document.removeEventListener('scroll', this.handleScroll);
    },
    mounted(){
        this.itemlayout = this.$auth.setting && this.$auth.setting.web_settings && this.$auth.setting.web_settings.web_restaurant_item_layout;
        if(this.itemlayout == null){
            this.itemlayout = '1';
        }
        this.getRestaurantDetail();
        setTimeout(() => this.resturantDetail.rating > 0?this.is_rating = true:'', 2000);
        
    },
    computed:{
        filteredData() {
            return Object.keys(this.menus).reduce((a, cKey) => {
                const data = this.filterValue(this.menus[cKey]);
                if (data != undefined && data.length) {
                let menuName = this.menus[cKey].menu_name;
                a[cKey] = data;
                a[cKey].menu_name = menuName;
                a[cKey].item_counts = this.menus[cKey].item_counts;
                a[cKey].restaurant_menu_id = this.menus[cKey].restaurant_menu_id;
                }
                return a;
            }, {});
        },

        filteredItemData() {
            return Object.keys(this.menusdata).reduce((a, cKey) => {
                const data = this.filterValue(this.menusdata);
                if (data != undefined && data.length) {
                let menuName = this.menusdata.menu_name;
                a = data;
                a.menu_name = menuName;
                a.item_counts = 0; //this.menusdata.item_counts;
                a.restaurant_menu_id = this.menusdata.restaurant_menu_id;
                }
                return a;
            }, {});  
        }
        
    },
    methods: {
        ...mapActions("product", ["getMenuProductList"]),
        ...mapActions("restaurant", ["getRestaurantMenuCategoryList","getMenuWiseItem","getCategoryWiseMenu"]),
        
        //Search Filter
        filterValue(content) {
            let itemProduct = content.menu_item_detail;
            if(itemProduct){
                return itemProduct.filter(item => {
                    let itemUpper = item.item_name.toLowerCase();
                    let searchUpper = this.search.toLowerCase();
                    return itemUpper.indexOf(searchUpper) > -1;
                });
            }
        },

        getRestaurantDetail() {
            let restaurantid = this.base64_decode(this.$route.params.restaurantid);
            if(restaurantid) {
                this.getMenuProductList({
                    date: "",
                    restaurant_id: restaurantid,
                    vendor_id: this.$auth.getVendorId(),
                    skip: 0,
                    starttime: "",
                    is_langauge: "en",
                    total_record: 100,
                    cityname: "",
                    latitude: '',
                    delivery_type_time_slots: 1,
                    menu_category_id: "",
                    longitude: '',
                }).then((data) => {
                if (data.code == 200) {
                    this.is_menu_skel_loader = false;
                    this.menus = data.Result;
                    this.resturantDetail = data.restaurant_details;
                    this.restaurant_on_off = data.restaurant_on_off;         
                    this.restaurantID = data.restaurant_details.restaurant_id;
                    this.is_twoPersonPrice = true;
                    this.is_minimuOrder = true;
                    let findfirst = this.menus.find(el => el.item_counts > 0);
                    if (findfirst) {
                        this.active_el = findfirst.restaurant_menu_id;
                    }
                    if (this.routerItemId > 0) {
                        setTimeout(() => this.activeMenu(this.routerItemId), 1200);
                    }
                } else {
                    this.is_menu_skel_loader = false;
                }
                });
            }
        },
        
        //ProductDetails Popup Modal Open
        openProductDeails(value) {
            window.$("#item-popup").modal("show");
            window.$("#item-popup").on('shown.bs.modal',function(){
                window.$("#prod-details-slider").owlCarousel({
                loop:true,
                items: 1,
                pagination: false,
                navigation: true,
                navigationText: ["<", ">"],
                autoPlay: true,
                });
            });
            window.$("#item-popup").on('hidden.bs.modal',()=>{
                this.$refs.childComponent.productDetail = null
                this.$refs.childComponent.selectedCustomisation = {
                customize_type: {
                }
                }
            });
            this.$refs.childComponent.openProductModel(value.item_id);
        },
         // Active Menu
        activeMenu(itemId){
            let yOffset = 0;
            let screenWidth = window.screen.width;
            this.active_el = itemId;
            let id = 'item'+itemId;
            if(!this.isSearchHide){
                this.is_menu_skel_loader = true;
                this.menusdata = [];
                this.getMenuWiseItemList(itemId);
            }
            if (screenWidth <= 360) {
                yOffset = -180;
            } else if (screenWidth > 360 && screenWidth <= 768) {
                yOffset = -140;
            } else if (screenWidth > 768) {
                yOffset = -150;
            } else {
                yOffset = -150;
            }
            let element = document.getElementById(id);
            if (element) {
                if (this.routerItemId > 0 && this.routerItemIdStatus) {
                this.routerItemIdStatus = false;
                var menuScrollEl = document.getElementById('menuitem'+itemId);
                menuScrollEl.scrollIntoView({behavior: "smooth"});
                setTimeout(function(){
                    let y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({top: y, behavior: 'smooth'});
                }, 1000);
                } else {
                let y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
                }
            }
        },

        elementInViewport(el) {
            let top = el.offsetTop;
            var left = el.offsetLeft;
            var width = el.offsetWidth;
            var height = el.offsetHeight;

            let screenWidth = window.screen.width;
            if (screenWidth <= 360) {
                top = top+425;
            } else if (screenWidth > 360 && screenWidth <= 768) {
                top = top+500;
            } else if (screenWidth > 768) {
                top = top+500;
            }

            while(el.offsetParent) {
                el = el.offsetParent;
                top += el.offsetTop;
                left += el.offsetLeft;
            }

            return (
                top < (window.pageYOffset + window.innerHeight) &&
                left < (window.pageXOffset + window.innerWidth) &&
                (top + height) > window.pageYOffset &&
                (left + width) > window.pageXOffset
            );
        },

        handleScroll() {
            document.querySelectorAll("section[id^=item]").forEach((current) => {
                const el = document.getElementById(current.getAttribute('id'));
                if (this.elementInViewport(el)) {
                let scrollmenuid = current.getAttribute('id').replace('item', '');
                if (scrollmenuid) {
                    this.active_el = scrollmenuid;
                    let menuScrollEl = document.getElementById('menuitem'+scrollmenuid);
                    if (menuScrollEl) {
                    var scrollTo = window.$('#menuitem'+scrollmenuid).position().left;                   
                    document.getElementById('menulist').scrollLeft += scrollTo;
                    }
                }
                }
            });
        },
        
        //Menu Wise item Display pagination.
        getMenuWiseItemList(itemId){
            this.is_menu_category = false;
            this.loading = true;
            this.getMenuWiseItem({
                date: "",
                restaurant_id: this.restaurantID,
                vendor_id: this.vendorID,
                skip: 0,
                starttime: "",
                is_langauge: "en",
                total_record: 25,
                menu_id: itemId,
            }).then((data) => {
                if (data.code == 200) {
                this.loading = false;
                this.is_menu_skel_loader = false;
                this.menusdata = data.Result[0];
                }else{
                this.loading = false;
                this.is_menu_skel_loader = false;
                }
            });
        },
    }
}
</script>
<style>
.menuSkel{
  border-radius: 30px !important;
}
.skel-loader{
  display: flex;
}
</style>