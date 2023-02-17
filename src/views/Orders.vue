<template>
  <div class="login-main">
    <nav-bar></nav-bar>
    <section class="orders-status-start">
      <div class="review-container review-main text-capitalize position-relative">
        <div class="row">
          <div class="col-md-12 p-0">
            <div class="resturant-details plr15">
              <h4 class="text-left">Orders</h4>
            </div>
            <div class="orders-tab-main plr15 mt-4">
                <b-tabs content-class="mt-3" lazy>
                  <b-tab title="Ongoing" active>
                    <on-going />
                  </b-tab>
                  <b-tab title="Past">
                    <past />
                  </b-tab>
                </b-tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </section>
    
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import OnGoing from '../components/orders/OnGoing.vue';
import Past from '../components/orders/Past.vue';
import Footer from '../components/Footer.vue';
export default {
  components: {
    NavBar,
    OnGoing,
    Past,
    Footer
  },
  mounted() {
  if(!this.$auth.user){
    this.$router.push({ name: "sign-in" });
  }
  }
};
</script>