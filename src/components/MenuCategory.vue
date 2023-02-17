<template>
<div class="menucate-cls">
  <div class="rmvecls" :id="'menucateID-'+menu.id" @click="getActiveMenuId(menu.id)" v-if="this.$route.name == 'vendor'">
    <img :src="menu.image" class="menu-cat-img">
    <h4>{{menu.name}}</h4>
  </div>
    <!------------Menu Category 1 Start -------------------->
    <div v-if="cateMenuLayout == '1' && pagename == 'home'"  class="resturant-item busines-img-box d-flex align-items-start" :style="{ background: 'url(' + menu.image + ')!important' }">
      <div class="busines-img">
        <div class="resturant-data ml-3">
            <h4 :style="{ color: menu.text_color_code+'!important' }">{{menu.name}}</h4>
        </div>
      </div>
    </div>
    <!------------Menu Category 1 Start -------------------->
  <!------------Menu Category 2 Start -------------------->
  <div v-if="cateMenuLayout == '2' && pagename == 'home'"  class="resturant-item busines-img-box" :style="{ background: menu.color_code+'!important' }">
    <div class="busines-img">
      <div class="img-box">
        <img :src="menu.image">          
      </div>
      <div class="resturant-data ml-3">
          <h4 :style="{ color: menu.text_color_code+'!important' }">{{menu.name}}</h4>
      </div>
    </div>
  </div>
  <!------------Menu Category 2 end -------------------->

  <!------------Menu Category 3 Start -------------------->
  <div v-if="cateMenuLayout == '3' && pagename == 'home'" class="resturant-item busines-img-box">
    <div class="busines-img">
      <div class="img-box">
        <img :src="menu.image">
      </div>
      <div class="resturant-data ml-3">
          <h4 :style="{ color: menu.text_color_code+'!important' }">{{menu.name}}</h4>
      </div>
    </div>
  </div>
  <!------------Menu Category 3 end -------------------->

  <!------------Menu Category 4 Start -------------------->
  <div v-if="cateMenuLayout == '4' && pagename == 'home'" class="resturant-item busines-img-box" :style="{ background: menu.color_code+'!important' }">
      <div class="busines-img">
        <div class="resturant-data ml-3">
            <h4 :style="{ color: menu.text_color_code+'!important' }">{{menu.name}}</h4>
        </div>
        <div class="img-box">
          <img :src="menu.image">    
        </div>
      </div>
  </div>
  <!------------Menu Category 4 end -------------------->
  <!------------Menu Category 5 Start -------------------->
  <div v-if="cateMenuLayout == '5' && pagename == 'home'" class="resturant-item busines-img-box" :style="{ background: menu.color_code+'!important' }">
    <div class="busines-img">
      <div class="img-box">
        <img :src="menu.image">   
      </div>
      <div class="resturant-data ml-3">
        <h4>{{menu.name}}</h4>
      </div>
    </div>
  </div>
  <!------------Menu Category 5 end -------------------->
  <!------------Menu Category 6 Start -------------------->
  <div v-if="cateMenuLayout == '6' && pagename == 'home'" class="resturant-item busines-img-box" :style="{ background: menu.color_code+'!important' }">
    <div class="busines-img">
      <div class="resturant-data ml-3">
        <h4 :style="{ color: menu.text_color_code+'!important' }">{{menu.name}}</h4>
      </div>
      <div class="img-box">
        <img :src="menu.image">
      </div>
    </div>
  </div>
  <!------------Menu Category 6 end -------------------->
</div>
</template>
<script>

export default {
  props : ["menu","cateMenuLayout","pagename"],
  data() {
    return {
      loading: true,
    };
  },
  methods: {
    getActiveMenuId(id){
      let element = document.getElementById('menucateID-'+id);
      $(".rmvecls").removeClass("active");
      element.className += " active";
      this.$emit("setCategoryMenuId",id);
    }
  }
}
</script>