<template>
  <div class="login-main wallet-main">
    <nav-bar></nav-bar>
    <section class="signup-start-main header-top pb-4">
      <div class="review-container login-container review-main text-capitalize position-relative">
        <div class="row">
          <div class="col-md-12">
            <div class="sign-main wallet_main">
              <div class="wallet-top">
                <h4 class="mb-4">My Wallet</h4>
              </div>
              <p class="mybal">My Balance</p>
              <p class="amount"><span v-html="$auth.setting.currency"></span>{{walletAmount}}</p>
              <div class="btn full-btn" v-if="$auth.setting.wallet_status == 'active' && $auth.user.wallet_status == 'active' && $auth.setting.customer_wallet_recharge == 'active' ">
                <router-link :to="{name:'wallet-payment'}" class="back-btn btn">Add Money</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-12 mt-4 plr15 trans-sec">
            <span class="trans-heading">Transactions</span>
            <div class="wlt-ordr-list mt-5" v-if="isSkeletonLoader">
              <div class="wallet-detail w-100">
                <p><skeleton-loader-vue type="string" width="24%" height="20px"/></p>
                <p><skeleton-loader-vue type="string" width="30%" height="20px"/></p>
                <p class="wlt-date"><skeleton-loader-vue type="string" width="24%" height="20px"/></p>
              </div>
              <div class="waltet-deduct">
                <skeleton-loader-vue type="string" width="15%" height="20px"/>
              </div>
            </div>

            <div class="wlt-ordr-list mt-5" v-for="(history,key) in historys" :key="key">
              <div class="wallet-detail w-100">
                <p>Transaction ID #<span>{{history.order_id}}</span></p>
                <p v-if="history.type == 'refund' || history.type == 'spent'|| history.type == 'cashback'">{{history.type}} (Order #{{history.user_order_id}})</p>
                <p v-else >{{history.type}}</p>
                <p class="wlt-date">{{moment(history.order_date).format('MMM-D-YYYY, HH:mm:ss')}}</p>
              </div>
              <div class="waltet-deduct">
                <p class="deduct-prc clr-red" v-if="['spent'].includes(history.type)" :class="history.type">-<span v-html="$auth.setting.currency"></span>{{history.amount}}</p>
                <p class="deduct-prc clr-grn" v-else>+<span v-html="$auth.setting.currency"></span>{{history.amount}}</p>
              </div>
            </div>
            <div v-if="historys.length == 0" class="no-tranc">
              <p>No Transactions Found</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import NavBar from "@/components/NavBar.vue";
import Footer from '../components/Footer.vue';
import Wallet from '../apis/wallet';
import moment from "moment";
import VueSkeletonLoader from 'skeleton-loader-vue';

export default {
  components: {
    NavBar,
    Footer,
    'skeleton-loader-vue':VueSkeletonLoader
  },
  
  data() {
    return {
      historys:[],
      moment: moment,
      walletAmount:0,
      isSkeletonLoader:true
    };
  },
  mounted() {
   this.getWalletHistory();
  },
  methods: {
    ...mapActions("wallet",["getUserWalletHistoryData"]),
    getWalletHistory(){
      Wallet.gerUserWalletHistory({
        'user_id':this.$auth.user.user_id,
        'is_langauge':'en',
        'vendor_id':this.$auth.getVendorId()
      }).then((response)=>{
        if (response.data.code == 200) {
          this.isSkeletonLoader = false;
          this.historys = response.data.Result;
          this.walletAmount = response.data.wallet_amount;
        }else{
          this.isSkeletonLoader = false;
          this.historys=[];
        }
      });
    }
  },
};
</script>