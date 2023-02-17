<template>
<div>
  <!------------Business Category 1 Start -------------------->
  <router-link v-if = "businessCategoryLayout == '1'" :to="{name:'category', params:{category_id: base64_encode(item.category_id+'/'+item.category_name)}}">
    <div v-if="!right" class="resturant-item busines-img-box d-flex align-items-start" :style="{ background: 'url(' + item.category_img + ')' }">
      <div class="busines-img">
        <div class="resturant-data ml-3">
            <h4>{{item.category_name}}</h4>
            <span>{{item.category_desc}}</span>
        </div>
      </div>
    </div>
  </router-link>
  <!------------Business Category 1 End -------------------->
  <!------------Business Category 2 Start -------------------->
  <router-link v-if="businessCategoryLayout == '2'" :to="{name:'category', params:{category_id: base64_encode(item.category_id+'/'+item.category_name)}}">
    <div v-if="!right" class="resturant-item busines-img-box" :style="{ background: item.color_code+'!important' }">
      <div class="busines-img">
        <div class="img-box">
          <img :src="item.category_img">          
        </div>
        <div class="resturant-data ml-3">
            <h4 :style="{ color: item.text_color_code+'!important' }">{{item.category_name}}</h4>
        </div>
      </div>
    </div>
  </router-link>
  <!------------Business Category 2 End -------------------->
  <!------------Business Category 3 Start -------------------->
  <router-link v-if = "businessCategoryLayout == '3'" :to="{name:'category', params:{category_id: base64_encode(item.category_id+'/'+item.category_name)}}">
    <div v-if="!right" class="resturant-item busines-img-box">
      <div class="busines-img">
        <div class="img-box">
          <img :src="item.category_img">          
        </div>
        <div class="resturant-data ml-3">
            <h4 :style="{ color: item.text_color_code+'!important' }">{{item.category_name}}</h4>
        </div>
      </div>
    </div>
  </router-link>
  <!------------Business Category 3 End -------------------->
  <!------------Business Category 4 Start -------------------->
  <router-link v-if = "businessCategoryLayout == '4'" :to="{name:'category', params:{category_id: base64_encode(item.category_id+'/'+item.category_name)}}">
    <div v-if="!right" class="resturant-item busines-img-box" :style="{ background: item.color_code+'!important' }">
      <div class="busines-img">
        <div class="resturant-data ml-3">
            <h4 :style="{ color: item.text_color_code+'!important' }">{{item.category_name}}</h4>
        </div>
        <div class="img-box">
          <img :src="item.category_img">          
        </div>
      </div>
    </div>
  </router-link>
  <!------------Business Category 4 End -------------------->
  <!------------Business Category 5 Start -------------------->
  <router-link v-if = "businessCategoryLayout == '5'" :to="{name:'category', params:{category_id: base64_encode(item.category_id+'/'+item.category_name)}}">
    <div v-if="!right" class="resturant-item busines-img-box">
      <div class="busines-img">
        <div class="img-box">
          <img :src="item.category_img">          
        </div>
        <div class="resturant-data ml-3">
            <h4 :style="{ color: item.text_color_code+'!important' }">{{item.category_name}}</h4>
        </div>
      </div>
    </div>
  </router-link>
  <!------------Business Category 5 End -------------------->
  <!------------Business Category 6 Start -------------------->
  <router-link v-if = "businessCategoryLayout == '6'" :to="{name:'category', params:{category_id: base64_encode(item.category_id+'/'+item.category_name)}}">
    <div v-if="!right" class="resturant-item busines-img-box" :style="{ background: item.color_code+'!important' }">
      <div class="busines-img">
        <div class="resturant-data ml-3">
            <h4 :style="{ color: item.text_color_code+'!important' }">{{item.category_name}}</h4>
            <span>{{item.category_desc}}</span>
        </div>
        <div class="img-box">
          <img :src="item.category_img">          
        </div>
      </div>
    </div>
  </router-link>
  <!------------Business Category 6 End -------------------->
</div>
</template>

<script>
import VueSkeletonLoader from 'skeleton-loader-vue';
export default {
  components: {
    'skeleton-loader-vue':VueSkeletonLoader
  },
  props: ['item','right','businessCategoryLayout'],
  mounted() {
    this.businessSlider();
  },
  methods: {
   businessSlider(){
    if(this.businessCategoryLayout == '6' || this.businessCategoryLayout == '4'){
      window.$("#businesscategory-slider").owlCarousel({
      items : 3,
      itemsDesktop: [1199,3],
      itemsDesktopSmall: [979,2],
      itemsTablet: [768,2],
      itemsMobile:[479,1],
      pagination: true,
      navigation: true,
      navigationText: ["<", ">"],
      autoPlay: false,
      pagination: false,
    });
    }else if(this.businessCategoryLayout == '1' || this.businessCategoryLayout == '2' || this.businessCategoryLayout == '3' || this.businessCategoryLayout == '5'){
      window.$("#businesscategory-slider").owlCarousel({
      items : 6,
      itemsDesktop: [1199,6],
      itemsDesktopSmall: [979,4],
      itemsTablet: [768,3],
      itemsMobile:[479,2],
      pagination: true,
      navigation: true,
      navigationText: ["<", ">"],
      autoPlay: false,
      pagination: false,
      });
    }
   }
    
}

};
</script>