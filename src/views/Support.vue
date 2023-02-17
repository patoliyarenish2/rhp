<template>
    <div class="login-main">
     <nav-bar></nav-bar>
        <section class="fixed-box faqs-start-main">
            <div class="review-container review-main text-capitalize position-relative faq-main">
                <div class="spprt">
                    <div class="resturant-details plr15">
                     <h4 class="text-left">Choose Support Channel</h4>
                  </div>
                   <div class="plr15 mt-4">
                    <div class="col-md-12" v-if="phone">
                        <p><label><i class="fas fa-phone-square-alt"></i> Call:</label> <a :href="'tel:'+phone" target="_blank">{{phone}}</a></p>
                    </div>
                    <div class="col-md-12" v-if="email">
                        <p><label><i class="fas fa-envelope-square"></i> E-Mail:</label> <a :href="'mailto:'+email" >{{email}}</a></p>
                    </div>
                    <div class="col-md-12" v-if="whatsapp">
                        <p><label><i class="fab fa-whatsapp-square"></i> Whatsapp:</label> <a target="_blank" :href="'https://wa.me/'+this.$auth.setting.country_code+whatsapp+'?text=Order Deonde'">{{whatsapp}}</a></p>
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
import Settings from '../apis/setting';
import Footer from '../components/Footer.vue';

export default {
    components: { NavBar, Footer },
    data() {
        return {
            setting: null,
            email: null,
            phone: null,
            whatsapp: null,
            
        }
    },
    mounted() {
        setTimeout(()=>{
            this.setting = this.$auth.setting;
            this.setSupportField();
        },1200);
    },
    methods:{
        setSupportField() {
            if (this.setting) {
                if (this.setting.support_field && this.setting.support_field.length > 0) {
                    this.email = (this.setting.support_field[0].email) ? this.setting.support_field[0].email : null;
                    this.phone = (this.setting.support_field[0].phone)? this.setting.support_field[0].phone: null;
                    this.whatsapp = (this.setting.support_field[0].whatsapp)? this.setting.support_field[0].whatsapp: null;
                }
            }
        }
    }
}
</script>

<style scoped>
.centertext {
    text-align: center;
    padding: 70px 0;
}
</style>