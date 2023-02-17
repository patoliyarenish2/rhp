<template>
  <div class="menuitems-main">
      <div class="cat-menu-cls" :class="newCateClassAdd" v-if="is_menu_category && cateMenus && cateMenus.length > 0">
        <nav class="category-menu-item-main">
          <menu-category v-for="catmenu in cateMenus" :key=catmenu.id :menu="catmenu" v-on:setCategoryMenuId="openMenuCategoryList" :pagename="pageName"></menu-category>
        </nav>
      </div>
    <div class="menu-class-sticky">
      <div class="side-bar" id="side-bar">
        <nav class="navigation" id="menulist">
          <ul>
            <li class="d-flex align-items-center">
              <button class="btn"><i class="fas fa-bars"></i></button>
              <div v-if="menus.length == 0 && is_menu_skel_loader" class="skel-loader">
                <skeleton-loader-vue type="string" v-for="mn in 6" :key="mn" width="93px" height="29px" class="menuSkel" />
              </div>
              <div v-else v-for="menu in menus" :key="menu.restaurant_menu_id">
                <a href="javascript:void(0);" :id="'menuitem' + menu.restaurant_menu_id" :class="{ active : active_el == menu.restaurant_menu_id }" v-if="menu.item_counts != 0" @click="activeMenu(menu.restaurant_menu_id)">{{ menu.menu_name }}</a>
              </div>
            </li>
          </ul>
        </nav>
        <div class="searchbar-item" v-if="menus && menus.length > 0">
          <input type="search" v-model="search" name="search" class="srch-itm" placeholder="Search">
        </div>
      </div>
    </div>
    <div class="main-content">
      <!-----skeleton Start layout-1---------->
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
      <!-----skeleton End layout-2---------->
      <div v-if="menus && menus.length > 0 && menusdata.length ==  0" class="menulength" id="itemmenumain">
        <div v-for="menu in filteredData" :key="menu.restaurant_menu_id">
          <section :id="'item' + menu.restaurant_menu_id" v-if="menu.item_counts != 0">
            <div class="media-heading">
              <h4 class="mb-4">{{ menu.menu_name }}</h4>
            </div>
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
            <div class="media-itms" :class="'media-itms-theme'+itemlayout">
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
                  :itemlayout="itemlayout"
                ></Product>
            </div>
          </section>
        </div>
      </div>
       <!---Category wise Menu item Open--->
      <div v-else class="home-res-not-found">
        <div class="nostr-img-cls" v-if="!is_menu_skel_loader">
          <div class="no-txt-fnd">No Item Found</div>
        </div>
      </div>
    </div>
    <ProductDetails ref="childComponent" :restaurantID="restaurantID" :restaurant_on_off="restaurant_on_off" :pagename="pageName"></ProductDetails>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Product from "@/components/Product.vue";
import ProductDetails from "@/components/ProductDetails.vue";
import MenuCategory from "@/components/MenuCategory.vue";
import VueSkeletonLoader from 'skeleton-loader-vue';

export default {
  components: { Product, ProductDetails, MenuCategory,'skeleton-loader-vue':VueSkeletonLoader },
  props:["restaurant_on_off","restautantDetails"],
  data() {
    return {
      menus: [],
      restaurantID: "",
      vendorID: "",
      date: "",
      starttime: "",
      productDetails: { type: Object },
      active_el:0,
      loading: true,
      search:'',
      pageName:'itemslist',
      routerItemId:0,
      routerItemIdStatus: true,
      is_menu_category: false,
      cateMenus:[],
      menuCategryId : 0,
      is_menu_skel_loader: true,
      menusdata :[],
      isSearchHide : true,
      itemlayout:'1',
      newCateClassAdd : ''
    };
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
          a.item_counts = 0;//this.menusdata.item_counts;
          a.restaurant_menu_id = this.menusdata.restaurant_menu_id;
        }
        return a;
        }, {});  
    }
    
  },
  mounted() {
    let routerHasValue = this.$route.hash;
    if (routerHasValue) {
      this.routerItemId = routerHasValue.replace('#item', '');
    }
    this.vendorID = this.$auth.getVendorId();
    this.restaurantID = this.restautantDetails && this.restautantDetails.restaurant_id;
    this.itemlayout = this.$auth.setting && this.$auth.setting.restaurant_item_layout;
    if(this.itemlayout == ''){
      this.itemlayout = 1;
    }
    
    //Get All Products and Menu
    if(this.restautantDetails && this.$auth.setting && this.restautantDetails.item_counts > this.$auth.setting.item_counts){
      this.isSearchHide = false;
      this.getCategoryWiseMenuList();
    }else{
      this.isSearchHide = true;
      this.getAllProducts();
    }
  },
  created() {
    document.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    document.removeEventListener('scroll', this.handleScroll);
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

    openMenuCategoryList(id){
      this.menus = [];
      this.menuCategryId = id;
      this.categoryMenuProduct();
    },

    getAllProducts() {
      if(this.restautantDetails && this.restautantDetails.menu_category_count == 0){
        this.is_menu_category = false;
        this.loading = true;
        this.getMenuProductList({
          date: "",
          restaurant_id: this.restaurantID,
          vendor_id: this.vendorID,
          skip: 0,
          starttime: "",
          is_langauge: "en",
          total_record: 25,
          cityname: "",
          latitude: localStorage.getItem("latitude"),
          delivery_type_time_slots: -1,
          menu_category_id: "",
          longitude: localStorage.getItem("longitude"),
        }).then((data) => {
          if (data.code == 200) {
            this.loading = false;
            this.is_menu_skel_loader = false;
            this.menus = data.Result;
            let findfirst = this.menus.find(el => el.item_counts > 0);
            if (findfirst) {
              this.active_el = findfirst.restaurant_menu_id;
            }
            if (this.routerItemId > 0) {
              setTimeout(() => this.activeMenu(this.routerItemId), 1200);
            }
          }else{
            this.is_menu_skel_loader = false;
            this.loading = false;
          }
        });
      }else if(this.restautantDetails && this.restautantDetails.menu_category_count > 0){
        this.is_menu_category = true;
        this.getRestaurantMenuCategoryList({
          restaurant_id: this.restaurantID,
          vendor_id: this.vendorID,
          is_langauge: "en",
          latitude: localStorage.getItem("latitude"),
          longitude: localStorage.getItem("longitude"),
        }).then((data) => {
          if (data.code == 200) {
            this.is_menu_skel_loader = false;
            this.loading = false;
            this.cateMenus = data.Result;
            if(localStorage.getItem("menuCatID") == null || localStorage.getItem("menuCatID") == ''){
              if(this.cateMenus && this.cateMenus[0]){
                this.menuCategryId = this.cateMenus[0].id;
                this.categoryMenuProduct();
              }
            }else{
              this.is_menu_skel_loader = false;
              this.openMenuCategoryList(localStorage.getItem("menuCatID"));
              localStorage.setItem("menuCatID", '');
            }
           }else{
             this.is_menu_skel_loader = false;
            this.loading = false;
           }
        });
      }
    },

    //Category On click to Get Product
    categoryMenuProduct(){
      this.loading = true;
      this.is_menu_skel_loader = true;
      this.getMenuProductList({
        date: "",
        restaurant_id: this.restaurantID,
        vendor_id: this.vendorID,
        skip: 0,
        starttime: "",
        is_langauge: "en",
        total_record: 25,
        cityname: "",
        latitude: localStorage.getItem("latitude"),
        delivery_type_time_slots: -1,
        menu_category_id: this.menuCategryId,
        longitude: localStorage.getItem("longitude"),
      }).then((data) => {
        if (data.code == 200) {
          this.loading = false;
          this.menus = data.Result;
          let findfirst = this.menus.find(el => el.item_counts > 0);
          if (findfirst) {
            this.active_el = findfirst.restaurant_menu_id;
          }
          if (this.routerItemId > 0) {
            setTimeout(() => this.activeMenu(this.routerItemId), 1200);
          }
          let element = document.getElementById('menucateID-'+this.menuCategryId);
          $(".menucate-cls").removeClass("active");
          if(element != null){
            element.className += " active";
          }
          this.is_menu_skel_loader = false;
        }else if(data.code == 101){
          this.menus = [];
          this.is_menu_skel_loader = false;
          this.loading = false;
        }else{
          this.is_menu_skel_loader = false;
          this.loading = false;
        }
      });
      
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
      let screenWidth = window.screen.width;
      let yOffset = this.getWidthScroll(screenWidth);
      this.active_el = itemId;
      let id = 'item'+itemId;
      if(!this.isSearchHide){
        this.is_menu_skel_loader = true;
        this.menusdata = [];
        this.getMenuWiseItemList(itemId);
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

    //Category Wise Menu Display pagination.
    getCategoryWiseMenuList(){
      if(this.restautantDetails && this.restautantDetails.menu_category_count == 0){
        this.is_menu_category = false;
        this.loading = true;
        this.getCategoryWiseMenu({
          date: "",
          restaurant_id: this.restaurantID,
          vendor_id: this.vendorID,
          starttime: "",
          is_langauge: "en",
        }).then((data) => {
          if (data.code == 200) {
            this.loading = false;
            this.is_menu_skel_loader = false;
            this.menus = data.Result;
            let findfirst = this.menus.find(el => el.item_counts > 0);
            if (findfirst) {
              this.active_el = findfirst.restaurant_menu_id;
              this.getMenuWiseItemList(findfirst.id);
            }
          }else{
            this.is_menu_skel_loader = false;
            this.loading = false;
          }
        });
      }else if(this.restautantDetails && this.restautantDetails.menu_category_count > 0){
        this.is_menu_category = true;
        this.getRestaurantMenuCategoryList({
          restaurant_id: this.restaurantID,
          vendor_id: this.vendorID,
          is_langauge: "en",
          latitude: localStorage.getItem("latitude"),
          longitude: localStorage.getItem("longitude"),
        }).then((data) => {
          if (data.code == 200) {
            this.loading = false;
            this.cateMenus = data.Result;
            this.newCateClassAdd = "cateNewClass";
            if(localStorage.getItem("menuCatID") == null || localStorage.getItem("menuCatID") == ''){
              if(this.cateMenus && this.cateMenus[0]){
                this.menuCategryId = this.cateMenus[0].id;
                this.categoryMenuProduct();
              }
            }else{
              this.openMenuCategoryList(localStorage.getItem("menuCatID"));
              localStorage.setItem("menuCatID", '');
            }
           }else{
            this.is_menu_skel_loader = false;
            this.loading = false;
           }
        });
      }
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

    getWidthScroll(screenWidth){
      let yOffset = 0;
      if(this.itemlayout == 1){
        if (screenWidth <= 360) {
          yOffset = -180;
        } else if (screenWidth > 360 && screenWidth <= 768) {
          yOffset = -140;
        } else if (screenWidth > 768) {
          yOffset = -150;
        } else {
          yOffset = -150;
        }  
      }else if(this.itemlayout == 3){
        if (screenWidth <= 360) {
          yOffset = -180;
        } else if (screenWidth > 360 && screenWidth <= 768) {
          yOffset = -140;
        } else if (screenWidth > 768) {
          yOffset = -200;
        } else {
          yOffset = -150;
        }  
      }
      return yOffset;
    }
  },
};
</script>

<style>
.menuSkel{
  border-radius: 30px !important;
}
.skel-loader{
  display: flex;
}
</style>