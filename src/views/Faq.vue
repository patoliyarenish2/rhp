<template>
   <div class="login-main">
   <nav-bar></nav-bar>
   <section class="fixed-box faqs-start-main">
      <div class="review-container review-main text-capitalize position-relative faq-main">
         <div class="row">
            <div class="col-md-12 p-0">
               <div class="resturant-details plr15">
                  <h4 class="text-left">FAQs</h4>
               </div>
               <div class="accordion plr15 mt-4" id="accordionExample" v-if="Faqs.length > 0">
                  <div class="card" v-for="(faq,index) in Faqs" :key="index">
                     <div class="card-header" :id="`headingOne-${index}`">
                        <h2 class="mb-0">
                           <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" :data-target="`#collapseOne-${index}`" aria-expanded="true" :aria-controls="`collapseOne-${index}`">
                           {{faq.question}}
                           </button>
                        </h2>
                     </div>
                     <div  :id="`collapseOne-${index}`" :class="index == 0 ? 'collapse show' : 'collapse'" :aria-labelledby="`headingOne-${index}`" data-parent="#accordionExample">
                        <div class="card-body">
                           {{faq.answer}}
                        </div>
                     </div>
                  </div>
               </div>
                  <div v-else class="offers order-offers">
                     <div class="text-center my-2" v-if="loading">
                        <b-spinner class="align-middle"></b-spinner>
                  </div>
                  <p v-else>No Faq Found.</p>
               </div>
            </div>
         </div>
      </div>
   </section>
   <Footer></Footer>
   </div>
</template>


<script>
import NavBar from '../components/NavBar.vue'
import { mapActions, mapGetters } from "vuex";
import Footer from '../components/Footer.vue';

export default {
  components: { NavBar,Footer },
  data() {
     return{
        loading: true,
        Faqs: [],
     }
  },
  mounted(){
     this.getFaq();
  },
  computed: {
     ...mapGetters("faq",[
        "faqs"
     ])
  },
  methods: {
     ...mapActions("faq",["updateFaq"]),
     getFaq() {
         this.loading = true;
         this.updateFaq({
            type : 'customer',
            vendor_id : this.$auth.getVendorId(),
            is_langauge : "en"
         }).then(data => {
            if(data.code == 200) {
               this.loading = false;
               this.Faqs = data.Result;
            }else{
               this.loading = false;
               this.Faqs = [];
            }
         })
     }
  }
}
</script>