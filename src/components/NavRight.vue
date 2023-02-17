<template>
  <form class="form-inline menu-links my-2 my-lg-0">
    <div class="search-cart d-flex align-items-center">
      <div class="form-group has-search mb-0 mr-4" v-for="link in links" :key="link.title">
        <router-link :to="{ name: link.url }" class="nav-lnk d-flex align-items-center">
          <span :class="link.icon"></span>
          <span class="mbl-crt-cart cartCount" v-if="link.cartItemCount">{{cart.reduce((a, c) => (a + c.quantity),0)}}</span>
          <span class="lnk-text">{{link.title}}<span class="cartCount" v-if="link.cartItemCount">{{cart.reduce((a, c) => (a + c.quantity),0)}}</span></span>
        </router-link>
      </div>
    </div>
  </form>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      links: [
        {
          title: "Search",
          icon: "fas fa-search",
          url:'search',
        },
        {
          title: "Cart",
          icon: "fas fa-shopping-cart",
          cartItemCount : '0',
          url:'review-cart',
        },
      ],
      
    };
  },
  computed:{
    ...mapGetters("product", ["cart"]),
  }
};
</script>