<template>
  <div class="login-main">
    <nav-bar></nav-bar>
    <section class="saved-address-main">
      <div class="review-container review-main text-capitalize position-relative">
        <div class="row">
          <div class="col-md-12 p-0">
            <div class="resturant-details plr15">
              <h4 class="text-left">Saved Address</h4>
              <div class="form-group has-search mb-0 mt-4">
                <span class="fas fa-search"></span>
                <input
                  class="form-control mr-sm-2 mb-0"
                  type="search"
                  placeholder="Search Delivery Location"
                  aria-label="Search"
                />
              </div>
            </div>
            <div class="orders-inner-main plr15 mt-3" v-if="address.length > 0">
              <div class="orders-lst">
                <div class="inner-data">
                  <div class="saved-address-main">
                    <div class="d-flex justify-content-between" v-for="(addresses, index) in address" :key="index">
                      <div class="saved-address w-100" @click="onRowClicked(addresses.shiping_id)">
                        <p class="text-capitalize mb-1">{{ addresses.adress_clarification }}</p>
                        <span v-if="addresses.flat_no == null || addresses.flat_no == ''">{{ addresses.house_name + ' ' + addresses.Shiping_address }}</span>
                        <span v-else>{{ addresses.flat_no + ', ' + addresses.house_name + ' ' + addresses.Shiping_address }}</span>
                      </div>
                     <button
                          type="submit"
                          class="btn float-right delivery-link"
                          @click="DeleteAddressById(addresses.shiping_id)"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
             <div v-else class="order-offers">
              <div class="text-center my-2" v-if="loading">
                <b-spinner class="align-middle"></b-spinner>
              </div>
              <div v-else class="noadd-cls">
                <p>No Address</p>
                <p>Tap to Add New Address button to add new address</p>
              </div>
            </div>
            <div class="delivery-address border-0">
              <div class="full-btn">
                <router-link :to="{ name: 'add-address' }">Add New Address</router-link>
              </div>
            </div>
            <div id="past" class="tab-pane tab-box"></div>
          </div>
        </div>
      </div>
    </section>
    <AlertModal v-if="isAlert" :DisplayAlertData="AlertData" v-on:modalClose="onModalCloseFun"></AlertModal>
    <Footer></Footer>
  </div>
</template>


<script>
import { mapActions} from "vuex";
import NavBar from "../components/NavBar.vue";
import Footer from '../components/Footer.vue';
import AlertModal from '../components/AlertModal.vue';

export default {
  components: { NavBar, Footer, AlertModal},
  data() {
    return {
      address: [],
      loading: true,
      isAlert : false,
      AlertData: {},
      shiping_id:0,
    };
  },
  
  mounted() {
    this.AddressesList();
  },
  methods: {
    ...mapActions("address",["getAddress", "removeAddress"]),
    AddressesList() {
      this.loading = true;
      this.getAddress({
        devicetoken: "",
        devicetype: "",
        uniqueid: "",
        type: "",
      }).then((data) => {
        if (data.code == 200) {
          this.loading = false;
          this.address = data.Result;
        }
        if (data.code == 101) {
          this.loading = false;
          this.address = data.Result;
        }
      });
    },
    
    DeleteAddressById(shiping_id) {
      this.shiping_id = shiping_id;
      this.AlertData = { displayMessage : 'Are you sure delete?', isSetClass : 'addrs-modal-cls'};
      this.isAlert = true;
      window.$(this.$refs.AlertModal).modal();
    },

    DeleteAddress(){
      this.removeAddress({
        shiping_id: this.shiping_id,
        vendor_id: "",
        is_langauge : "en",
      }).then((data) => {
        if (data.code == 200) {
          this.AddressesList();
        }
        if (data.code == 101) {
          this.$toasted.error(data.msg, { duration: 2000 });
        }
      });
    },

    onRowClicked(shiping_id) {
      this.$router.push({name: 'update-address',params: { shiping_id: shiping_id}})
    },
    
    //Modal Closed
    onModalCloseFun(value){
      this.isAlert = false;
      if(value == 'yes'){
        this.DeleteAddress();
      }
    },
  },
};
</script>