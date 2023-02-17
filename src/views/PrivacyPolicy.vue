<template>
    <div class="login-main">
     <nav-bar></nav-bar>
        <section class="fixed-box faqs-start-main">
            <div class="review-container review-main text-capitalize position-relative faq-main">
                <div class="row">
                    <div class="col-md-12" v-if="is_load_skeleton">
                        <h1><skeleton-loader-vue type="string" width="24%" height="20px" style="top: 20px" /></h1>
                        <skeleton-loader-vue type="string" width="100%" height="100px" style="top: 60px" />
                    </div>
                    <div v-else class="col-md-12">
                        <div v-if="privacypolicy_url && !is_load_skeleton" class="d-flex align-items-start plr15">
                            <iframe 
                            class="embed-responsive-item"
                            :src="privacypolicy_url"
                            style="width: 100%; border: none;min-height: 100px;max-height: 750px;height: 100vh;"
                            allowfullscreen />
                        </div>
                        <div v-else class="centertext">
                            No privacy policy found.
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
import VueSkeletonLoader from 'skeleton-loader-vue';
import Footer from '../components/Footer.vue';

export default {
    components: { NavBar,Footer,'skeleton-loader-vue':VueSkeletonLoader },
    data() {
        return {
            setting: null,
            privacypolicy_url: null,
            is_load_skeleton : true,
        }
    },
    mounted() {
    setTimeout(()=>{
        this.setting = this.$auth.setting;
        this.setStaticPages();
        this.is_load_skeleton = false;
    },1200);
    },
    methods:{
        setStaticPages() {
            if (this.setting) {
                if (this.setting.pages && this.setting.pages.length > 0) {
                    for (let index = 0; index < this.setting.pages.length; index++) {
                        if (this.setting.pages[index].privacypolicy_url) {
                            this.privacypolicy_url = this.setting.pages[index].privacypolicy_url;
                        }
                    }
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