<template>
  <div>
  <header class="index-header header-start">
    <div class="fixed-top header-main">
      <nav class="navbar navbar-light bg-white">
        <div class="d-flex align-items-center">
          <div class="delivery-pickup-main d-flex align-items-center">
            <div class="delivery-pickup-lnk" v-if="this.$route.name == 'Home' && $auth.setting && $auth.setting.is_pickup_enable">
              <div class="switch" id="switch">
                <input name="radio" @click="getDelivery('1')" type="radio" value="1" id="delivery" :checked="isPickupDelivery == 1">
                <label for="delivery">Delivery</label>
                <input name="radio" @click="getDelivery('0')" type="radio" value="0" id="pickup" :checked="isPickupDelivery == 0">
                <label for="pickup" class="right">Takeaway</label>
                <span class="swtact" :class="this.rightClass || {right:['0'].includes(isPickupDelivery)}"  aria-hidden="true"></span>
              </div>
            </div>
            <a href="javascript:void(0)" @click="deliveryModalAddress" class="delivery-link map-location set-address-link" v-if="this.$route.name == 'Home'" >
              <span class="delivery-image">
                <svg width="20" height="25" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><g><path fill="#000000" d="M-293.039-548.582c-3.294,0-5.962-2.669-5.962-5.962v-2.003c0-7.554-6.146-14.699-13.699-14.699h-17.206   c-7.554,0-13.699,6.145-13.699,13.699v12.003c0,3.293-2.669,5.962-5.962,5.962c-3.292,0-5.962-2.669-5.962-5.962v-12.003   c0-14.129,11.495-25.623,25.623-25.623h17.206c14.128,0,25.623,12.494,25.623,26.623v2.003   C-287.077-551.251-289.747-548.582-293.039-548.582z"/></g><path fill="#000000" stroke="#231F20" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="  M-669.54-508.264v-20.134c0-18.213,14.765-32.978,32.978-32.978h28.859c18.213,0,32.978,14.765,32.978,32.978v20.134"/><path fill="#000000" d="M52.768,0C33.749,0,18.333,15.417,18.333,34.434c0,5.977,1.524,11.595,4.203,16.494  C22.618,51.3,49.483,97.97,49.483,97.97c0.677,1.171,1.929,1.896,3.284,1.896c1.354-0.002,2.604-0.725,3.283-1.896  c0,0,26.863-46.669,26.946-47.041c2.68-4.898,4.203-10.518,4.203-16.495C87.2,15.417,71.784,0,52.768,0z M52.768,52.776  c-8.55,0-15.48-6.932-15.48-15.48c0-8.549,6.93-15.479,15.48-15.479c8.548,0,15.478,6.93,15.478,15.479  C68.245,45.845,61.315,52.776,52.768,52.776z"/></svg>
              </span>
              <span v-if="this.address == ''" > Set Location </span>
              <span v-else class="text-truncate d-inline-block" v-bind:title="address">
                {{ this.address }}
              </span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <!-------New MOdal------->
    <div class="modal fade" id="deliveryModal" tabindex="-1" aria-labelledby="deliveryModallabel" aria-hidden="true" v-if="$auth.setting && $auth.setting.is_system_available == '1'">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="filterLabel">Select Location</h4>
            <a data-dismiss="modal" class="lnk">Close</a>
          </div>
          <div class="modal-body text-center">
            <div classs="hom-mbl-nav" v-if="checkpage != 'review_page'">
              <div class="col-md-12 p-0">
                <div class="position-relative">
                  <div class="search-box d-flex">
                    <div class="position-relative w-100">
                      <vue-google-autocomplete
                        v-if="$auth.google_map_key"
                        id="map"
                        class="form-control"
                        type="text"
                        v-model="addresses"
                        v-on:placechanged="getAddressData"
                        placeholder="Search for an area or Location name"
                      ></vue-google-autocomplete>
                      <i class="fas fa-search search-icon"></i>
                    </div>
                    <!-- <a data-dismiss="modal" class="lnk">Cancel</a> -->
                  </div>
                </div>
                <div class="resturant-details pt-3 current-address">
                  <span @click="locatorButtonPressed">
                    <!-- <img src="@/assets/images/gps.svg" />  -->
                  <svg width="25" height="25" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M255.863 168.699C207.816 168.699 168.723 207.793 168.723 255.844C168.723 303.891 207.816 342.984 255.863 342.984C303.914 342.984 343.008 303.891 343.008 255.844C343.008 207.793 303.914 168.699 255.863 168.699Z" fill="#FF8300"/>
                  <path d="M497.003 240.843H441.948C434.679 149.84 361.866 77.0233 270.859 69.7577V14.9961C270.859 6.71483 264.144 0 255.863 0C247.582 0 240.867 6.71483 240.867 14.9961V69.7577C149.859 77.0233 77.0467 149.84 69.7772 240.843H14.9961C6.71483 240.843 0 247.558 0 255.843C0 264.124 6.71483 270.839 14.9961 270.839H69.7772C77.0467 361.843 149.859 434.659 240.867 441.929V496.687C240.867 504.968 247.582 511.683 255.863 511.683C264.148 511.683 270.859 504.968 270.859 496.687V441.929C361.866 434.659 434.683 361.843 441.948 270.839H497.003C505.284 270.839 511.999 264.124 511.999 255.843C511.999 247.558 505.284 240.843 497.003 240.843V240.843ZM255.863 412.538C169.461 412.538 99.1678 342.242 99.1678 255.843C99.1678 169.441 169.461 99.1443 255.863 99.1443C342.265 99.1443 412.558 169.441 412.558 255.843C412.558 342.242 342.265 412.538 255.863 412.538Z" fill="#FF8300"/>
                  </svg>
                    Use current location
                  </span>
                </div>
              </div>
            </div>
            <div class="col-md-12 p-0" v-if="$auth.user && $auth.user.token">
              <div class="resturant-details pt-3 saved-addres">
                <h4 class="text-left">Saved Address</h4>
              </div>
              <div class="orders-inner-main plr15 mt-3" v-if="getAddresses.length > 0">
                <div class="orders-lst">
                  <div class="inner-data">
                    <div class="saved-address-main">
                      <div class="d-flex justify-content-between" v-for="(addres, index) in getAddresses" :key="index"
                        @click="selectDefaultAddress(addres)"
                      >
                        <div
                          class="saved-address w-100 nav-saved-address"
                          @click="OnAddressList($event,addres.adress_clarification,addres.flat_no,addres.house_name,addres.Shiping_address,addres.latitude,addres.longitude,addres.city,addres.state)">
                          <p class="text-capitalize mb-1">{{ addres.adress_clarification }}</p>
                          <span v-if="addres.flat_no == null || addres.flat_no == ''">
                            {{addres.house_name +" " +addres.Shiping_address}}</span>
                          <span v-else>{{addres.flat_no +" " +addres.house_name +", " +addres.Shiping_address}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="order-offers">
                <div class="text-center my-2" v-if="loading">
                  <b-spinner class="align-middle"></b-spinner>
                </div>
                <p v-else>No Address Found</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!------End MOdal-------->
  </div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { mapActions, mapGetters, mapState,mapMutations } from "vuex";
import config from "../config/index";
export default {
  components: {
    VueGoogleAutocomplete,
  },
  props:['page',"checkpage","settingData"],
  data() {
    return {
      googleLoaded: false,
      geoaddress: "",
      getAddresses: [],
      loading: true,
      marker: { position: { lat: 10, lng: 10 } },
      center: { lat: 10, lng: 10 },
      mapOptions: {
        disableDefaultUI: true,
      },
      //deliveryModal: true,
      address: "",
      locality: "",
      city: "",
      state: "",
      latitude: "",
      longitude: "",
      addresses: "",
      token: "",
      new_address: "",
      config: config,
      latlng: "",
      userId:"",
      rightClass:'',
      defaultAddress:'',
      show:true,
      //is_pick_up:true,
      //is_scrren_hide_mobile:(window.screen.width < 1024 ? true:false),
    };
  },
  computed: {
    ...mapGetters("order",["isPickupDelivery"]),
  },
  watch:{
    // settingData:function(){
    //   this.is_pick_up = this.settingData.is_pickup_enable
    // }
  },
  mounted() {
    if(localStorage.getItem("latitude")){
      this.geolocate();
    }
    if(this.$route.name == 'Home' || this.$route.name == 'review-cart' ){
      setTimeout(() => {
        if(this.$auth.setting && this.$auth.setting.is_system_available == '1') {
          if(!localStorage.getItem("latitude")){
            $('#deliveryModal').modal('show');
          }else{
            this.address = localStorage.getItem("address");
          }
        }

        if (this.$auth.user) {
          this.token = this.$auth.user.token;
          this.userId = this.$auth.user.user_id;
          if(this.userId){
            this.getPrimaryAddrs();
          }
          this.AddressesList();
        }
      }, 1200);
    }
    
    
  },
  methods: {
    ...mapActions("address", ["getAddress", "removeAddress","setPrimaryAddress","getPrimaryAddress"]),
    ...mapMutations("order",["pickupdelivery"]),
    
    deliveryModalAddress(){
      $('#deliveryModal').modal('show');
    },

    locatorButtonPressed() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        localStorage.setItem("latitude", position.coords.latitude);
        localStorage.setItem("longitude", position.coords.longitude);
        $('#deliveryModal').modal('hide');
        this.locateAddress(position.coords.latitude, position.coords.longitude);
      });
    },

    OnAddressList(e,
      adress_clarification,
      flat_no,
      house_name,
      Shiping_address,
      latitude,
      longitude,
      city,
      state
    ) {
        var getLocatinData = {
        city: city,
        state: state,
        lat: latitude,
        lng: longitude,
      };
      this.address =
        adress_clarification +
        "," +
        flat_no +
        "," +
        house_name +
        "," +
        Shiping_address;
      localStorage.setItem("address", this.address);
      localStorage.setItem("city", city);
      localStorage.setItem("state", state);
      localStorage.setItem("latitude", latitude);
      localStorage.setItem("longitude", longitude);
      this.$emit("getLatLong", getLocatinData);
      $('#deliveryModal').modal('hide');
    },

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
          this.getAddresses = data.Result;
        } else if (data.code == 101) {
          this.loading = false;
        }
      });
    },
    
    geolocate() {
      if (!localStorage.getItem("address")) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.marker.position = {
            lat: parseFloat(position.coords.latitude),
            lng: parseFloat(position.coords.longitude),
          };
          this.locateAddress(
            position.coords.latitude,
            position.coords.longitude
          );
        });
      }else {
        this.address = localStorage.getItem("address");
        this.locateAddress(
            localStorage.getItem("latitude"),
            localStorage.getItem("longitude")
          );
      }
    },

    locateAddress(lat, lng) {
      var getLocatinData = { city: this.city, state: this.state, lat: lat, lng: lng,};
      $('#deliveryModal').modal('hide');
      this.$emit("getLatLong", getLocatinData);
      //var latlng = new google.maps.LatLng(lat, lng);
      //const geocoder = new window.google.maps.Geocoder();
      if(!this.$auth.google_map_key){
        return false;
      }
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK") {
          this.address = results[0].formatted_address;
          var value = this.address.split(", ");
          var value1 = this.address.split(" ");
          var count = value.length;
          var count1 = value1.length;
          this.locality = value[count - 4];
          this.state = value1[count1 - 3];
          this.city = value[count - 3];
          this.zip_code = value1[count1 - 2];
          this.latitude = this.marker.position.lat;
          this.longitude = this.marker.position.lng;
          localStorage.setItem("address", this.address);
          localStorage.setItem("latitude", this.latitude);
          localStorage.setItem("longitude", this.longitude);
        }
      });
      this.address = localStorage.getItem("address");
    },

    getAddressData: function(addressData, placeResultData) {
      var latlongs = {
        city: this.city,
        state: this.state,
        lat: addressData.latitude,
        lng: addressData.longitude,
      };
      
      this.addresses = placeResultData.formatted_address;
      this.address = placeResultData.formatted_address;
      this.latitude = addressData.latitude;
      this.longitude = addressData.longitude;
      this.marker.position = {
        lat: addressData.latitude,
        lng: addressData.longitude,
      };
      localStorage.setItem("address", this.addresses);
      localStorage.setItem("latitude", this.latitude);
      localStorage.setItem("longitude", this.longitude);
      localStorage.setItem("city", this.city);
      localStorage.setItem("state", this.state);
      this.$emit("getLatLong", latlongs);
      $('#deliveryModal').modal('hide');
      this.addresses = "";
    },

    //Set Default Location
    selectDefaultAddress(address){
      this.setPrimaryAddress({
        user_id: this.userId,
        address_id: address.shiping_id,
        vendor_id: this.$auth.getVendorId(),
        is_langauge: "en",
      }).then((data) => {
        if (data.code == 200) {
          this.address = address.adress_clarification +" " +
          address.flat_no +
          " " +
          address.house_name +
          " " + address.Shiping_address;
        localStorage.setItem("address", this.address);
        localStorage.setItem("latitude", address.latitude);
        localStorage.setItem("longitude", address.longitude);
        this.$emit("sendDefaultAddress");
        } 
      });
      
    },

    //Get check delivery
    getDelivery(value){
      this.$emit("isDelivery", value);
      this.$store.commit("order/pickupdelivery",value);
      if(value == '1'){
        this.rightClass='';
      }else{
        this.rightClass='right';
      }
    },
    
    //Get address for API call
    getPrimaryAddrs(){
      this.getPrimaryAddress({
      }).then((data) => {
        if (data.code == 200) {
          this.address = data.Result.adress_clarification + " " + data.Result.flat_no + " " + data.Result.house_name + " " + data.Result.Shiping_address;
          this.shiping_id = data.Result.shiping_id;
          localStorage.setItem("latitude", data.Result.latitude);
          localStorage.setItem("longitude", data.Result.longitude);
          var latlongs = {
            city: data.Result.city,
            state: data.Result.state,
            lat: data.Result.latitude,
            lng: data.Result.longitude,
          };
          this.$emit("getLatLong", latlongs);
        }
      });
    },

  },
};
</script>
