<template>
  <div class="login-main">
    <nav-bar></nav-bar>
    <section class="add-address-main">
      <div class="review-container review-main text-capitalize position-relative">
        <div class="row">
          <div class="col-md-12 p-0">
            <div class="resturant-details d-flex align-items-center justify-content-between plr15">
              <div class="del-address">
                <h4 class>Add Delivery Address</h4>
                <input class="mb-0" type="hidden" v-model="typeform.address" />
                {{ this.address }}
              </div>
              <a href="javascript:void(0);" class="lnk change-address" @click="scaleModalModalAddress">Change</a>
            </div>
            <div class="responsive-map mt-3">
              <GmapMap
                :center="center"
                :zoom="18"
                map-style-id="roadmap"
                :options="mapOptions"
                style="width: 100%; height: 300px"
                ref="mapRef"
                @click="handleMapClick"
              >
                <GmapMarker
                  :position="marker.position"
                  :clickable="true"
                  :draggable="true"
                  @drag="handleMarkerDrag"
                  @click="panToMarker"
                />
              </GmapMap>
            </div>
            <div class="plr15">
              <div class="review-boxs mt-4">
                <div class="mt-4 position-relative">
                  <h6 class="mb-2">House/Building Name</h6>
                  <input
                    class="form-control mb-0 h50"
                    type="text"
                    v-model="$v.typeform.house_name.$model"
                    placeholder="Enter House/Building Name"
                    aria-label="House/Building Name"
                    :class="{ 'is-invalid':  $v.typeform.house_name.$error  }"
                  />
                  <div v-if="$v.typeform.house_name.$error" class="invalid-feedback">
                    <span v-if="!$v.typeform.house_name.required">Enter House/Building Name.</span>
                  </div>
                </div>
                <div class="mt-4 position-relative">
                  <h6 class="mb-2">Flat Number/Floor</h6>
                  <input
                    class="form-control mb-0 h50"
                    type="text"
                    v-model="$v.typeform.flat_no.$model"
                    placeholder="Enter Flat/ Floor Number"
                    aria-label="Flat Number/ Floor"
                    :class="{ 'is-invalid':  $v.typeform.flat_no.$error  }"
                  />
                  <div v-if="$v.typeform.flat_no.$error" class="invalid-feedback">
                    <span v-if="!$v.typeform.flat_no.required">Enter Flat/ Floor Number</span>
                    <span v-else-if="!$v.typeform.flat_no.numeric">This value should be a number</span>
                  </div>
                </div>
                <div class="mt-4 position-relative">
                  <h6 class="mb-2">Landmark</h6>
                  <input
                    class="form-control mb-0 h50"
                    type="text"
                    v-model="typeform.landmark"
                    placeholder="Enter Landmark"
                    aria-label="Landmark"
                  />
                </div>
              </div>
              <div class="mt-4 mb-4">
                <h6 class="mb-3">Set tag for Address</h6>
                <form class="boxed d-flex">
                  <input
                    type="radio"
                    id="home"
                    name="Home"
                    value="Home"
                    v-model="typeform.address_clarification"
                  />
                  <label for="home">Home</label>

                  <input
                    type="radio"
                    id="office"
                    name="office"
                    value="Office"
                    v-model="typeform.address_clarification"
                  />
                  <label for="office">Office</label>

                  <input
                    type="radio"
                    id="other"
                    name="other"
                    value="Other"
                    v-model="typeform.address_clarification"
                  />
                  <label for="other">Other</label>
                </form>
              </div>
            </div>
            <div class="delivery-address border-0">
              <div class="full-btn">
                <button @click="geoAddress">Add New Address</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-------New MOdal------->
    <div class="modal fade" id="scaleModal" tabindex="-1" aria-labelledby="scaleModallabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="filterLabel">Select Location</h4>
            <a data-dismiss="modal" class="lnk">Close</a>
          </div>
          <div class="modal-body text-center">
            <div class="col-md-12 p-0">
              <div class="position-relative">
                <div class="search-box d-flex">
                  <div class="position-relative w-100">
                      <vue-google-autocomplete
                      v-if="$auth.google_map_key"
                      id="mapnew"
                      class="form-control"
                      type="text"
                      v-model="typeform.address"
                      v-on:placechanged="getAddressData"
                      placeholder="Search for an area or Location name"
                    ></vue-google-autocomplete>
                    <i class="fas fa-search search-icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!------End MOdal-------->
    <Footer></Footer>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import NavBar from "../components/NavBar.vue";
import { required, numeric } from "vuelidate/lib/validators";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import Footer from '../components/Footer.vue';

export default {
  name: "GoogleMap",
  components: {
    NavBar,
    VueGoogleAutocomplete,
    Footer
  },
  data() {
    return {
      marker: { position: { lat: 10, lng: 10 } },
      center: { lat: 10, lng: 10 },
      scaleModal: false,
      mapOptions: {
        disableDefaultUI: true,
      },
      address: "",
      typeform: {
        city: "",
        address_clarification: "Home",
        landmark: "",
        address: "",
        is_langauge: "",
        state: "",
        vendor_id: this.$auth.getVendorId(),
        flat_no: "",
        house_name: "",
        latitude: "",
        zip_code: "",
        longitude: "",
      },
    };
  },
  validations: {
    typeform: {
      address: {required},
      house_name: {},
      flat_no: {numeric},
    },
  },

  mounted() {
    if(this.$auth.user){
      this.geolocate();
    } else {
      this.$router.push({ name: "sign-in" });
    }
    
  },
  methods: {
    ...mapActions("address",["newAddress"]),
    
    scaleModalModalAddress(){
      $('#scaleModal').modal('show');
    },

    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.marker.position = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.panToMarker();
        this.locateAddress(position.coords.latitude, position.coords.longitude);
      });
    },

    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      this.locateAddress(e.latLng.lat(), e.latLng.lng());
    },
    locateAddress(lat, lng) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK") {
          this.typeform.address = results[0].formatted_address;
          this.address = results[0].formatted_address;
          var value = this.address.split(", ");
          var value1 = this.address.split(" ");
          var count = value.length;
          var count1 = value1.length;
          this.typeform.state = value1[count1 - 3];
          this.typeform.city = value[count - 3];
          this.typeform.zip_code = value1[count1 - 2];
          this.typeform.latitude = this.marker.position.lat;
          this.typeform.longitude = this.marker.position.lng;
        }
      });
      $('#scaleModal').modal('hide');
    },

    //Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
      // this.$refs.mapRef.setZoom(18);
    },

    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      this.locateAddress(e.latLng.lat(), e.latLng.lng());
    },

    getAddressData: function (addressData, placeResultData) {
      this.address = placeResultData.formatted_address;
      this.typeform.address = placeResultData.formatted_address;
      this.typeform.latitude = addressData.latitude;
      this.typeform.longitude = addressData.longitude;
      var value = this.address.split(", ");
      var value1 = this.address.split(" ");
      var count = value.length;
      var count1 = value1.length;
      this.typeform.locality = value[count - 4];
      this.typeform.state = value1[count1 - 3];
      this.typeform.city = value[count - 3];
      this.typeform.zip_code = value1[count1 - 2];
      this.latitude = addressData.latitude;
      this.longitude = addressData.longitude;
      this.center.lat = parseFloat(addressData.latitude);
      this.center.lng = parseFloat(addressData.longitude);
      this.marker.position.lat = parseFloat(addressData.latitude);
      this.marker.position.lng = parseFloat(addressData.longitude);
      this.$refs.mapRef.panTo(this.marker.position);
      $('#scaleModal').modal('hide');
    },

    geoAddress() {
      this.$v.$touch();
      if (this.$v.typeform.$invalid) {
        return;
      } else {
        const fd = new FormData();
        fd.append("city", this.typeform.city);
        fd.append("address_clarification", this.typeform.address_clarification);
        fd.append("landmark", this.typeform.landmark);
        fd.append("address", this.typeform.address);
        fd.append("is_langauge", this.typeform.is_langauge);
        fd.append("state", this.typeform.state);
        fd.append("vendor_id", this.typeform.vendor_id);
        fd.append("flat_no", this.typeform.flat_no);
        fd.append("house_name", this.typeform.house_name);
        fd.append("latitude", this.typeform.latitude);
        fd.append("zip_code", this.typeform.zip_code);
        fd.append("longitude", this.typeform.longitude);
        this.newAddress(fd).then((data) => {
          if (data.code == 200) {
            this.$toasted.success("Address added successfully", {
              duration: 5000,
            });
            this.$router.go(-1);
          }
        });
      }
    },
  },
};
</script>