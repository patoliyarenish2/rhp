<template>
  <div class="login-main">
    <nav-bar></nav-bar>
    <section class="add-address-main">
      <div class="review-container review-main text-capitalize position-relative">
        <div class="row">
          <div class="col-md-12 p-0">
            <div class="resturant-details d-flex align-items-center justify-content-between plr15">
              <div class="del-address">
                <h4 class>Update Address</h4>
                <input class="mb-0" type="hidden" v-model="typeform.address" />
                {{ this.typeform.address }}
              </div>
              <a v-b-modal.scaleModal class="lnk change-address" @click="scaleModal = true">Change</a>
              <b-modal id="scaleModal" tabindex="-1" hide-header hide-footer>
                <div class="position-relative">
                  <div class="search-box d-inline-block">
                    <div class="position-relative">
                        <!-- v-if="googleLoaded && " -->
                      <vue-google-autocomplete
                        v-if="$auth.google_map_key"
                        id="map"
                        class="form-control"
                        type="text"
                        v-model="typeform.address"
                        v-on:placechanged="getAddressData"
                        placeholder="Search Location"
                      ></vue-google-autocomplete>
                      <i class="fas fa-search search-icon"></i>
                    </div>
                  </div>
                  <b-button class="close" @click="$bvModal.hide('scaleModal')">Cancel</b-button>
                </div>
              </b-modal>
            </div>
            <div class="responsive-map mt-3">
              <GmapMap
                v-if="$auth.google_map_key"
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
                <button @click="geoAddress">Update Address</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import NavBar from "../components/NavBar.vue";
import { required, numeric } from "vuelidate/lib/validators";
import VueGoogleAutocomplete from "vue-google-autocomplete";
export default {
  name: "GoogleMap",
  components: {
    NavBar,
    VueGoogleAutocomplete
  },
  data() {
    return {
      googleLoaded: false,
      marker: { position: { lat: 10, lng: 10 } },
      center: { lat: 10, lng: 10 },
      scaleModal: false,
      mapOptions: {
        disableDefaultUI: true,
      },
      select_address: "",
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
        shiping_id: this.$route.params.shiping_id
      },
    };
  },
  validations: {
    typeform: {
      address: {
        required,
      },
      house_name: {},
      flat_no: {
         numeric
      }
    },
  },
  computed: {
    ...mapGetters("address",["addressList"]),
  },
  mounted() {
    this.geolocate();
    this.select_address = this.addressList.filter(x => x.shiping_id == this.$route.params.shiping_id);
    this.typeform = {
        city: this.select_address[0].city,
        address_clarification: this.select_address[0].adress_clarification,
        landmark: this.select_address[0].landmark,
        address: this.select_address[0].Shiping_address,
        is_langauge: "",
        state: this.select_address[0].state,
        vendor_id: this.$auth.getVendorId(),
        flat_no: this.select_address[0].flat_no,
        house_name: this.select_address[0].house_name,
        latitude: this.select_address[0].latitude,
        zip_code: this.select_address[0].zip_code,
        longitude: this.select_address[0].longitude,
        shiping_id: this.select_address[0].shiping_id
    }
    // this.$gmapApiPromiseLazy().then(() => {
    //   this.googleLoaded = true;
    // });
  },
  methods: {
    ...mapActions("address",["newAddress","updateNewAddress"]),
     geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        if(this.typeform.latitude == '' && this.typeform.longitude == '')
        {
            this.marker.position = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
        } else {
          this.marker.position = {
            lat: parseFloat(this.typeform.latitude),
            lng:parseFloat(this.typeform.longitude),
          };
        }
        this.panToMarker();
        if(this.typeform.latitude == '' && this.typeform.longitude == '') {
          this.locateAddress(position.coords.latitude, position.coords.longitude);
        } else {
          this.locateAddress(this.typeform.latitude, this.typeform.longitude);
        }
      });
    },

    //sets the position of marker when dragged
    handleMarkerDrag(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      this.locateAddress(e.latLng.lat(), e.latLng.lng());
    },

    locateAddress(lat, lng) {
      if(!this.$auth.google_map_key){
        return false;
      }
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK") {
          this.typeform.address = results[0].formatted_address;
          var value = this.typeform.address.split(", ");
          var value1 = this.typeform.address.split(" ");
          var count = value.length;
          var count1 = value1.length;
          this.typeform.state = value1[count1 - 3];
          this.typeform.city = value[count - 3];
          this.typeform.zip_code = value1[count1 - 2];
          this.typeform.latitude = this.marker.position.lat;
          this.typeform.longitude = this.marker.position.lng;
        }
      });
    },

     //Moves the map view port to marker
    panToMarker() {
      this.$refs.mapRef.panTo(this.marker.position);
    },

    //Moves the marker to click position on the map
    handleMapClick(e) {
      this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      this.locateAddress(e.latLng.lat(), e.latLng.lng());
    },

    getAddressData: function (addressData, placeResultData) {
      this.typeform.address = placeResultData.formatted_address;
      this.typeform.latitude = addressData.latitude;
      this.typeform.longitude = addressData.longitude;
      this.marker.position = {
        lat: addressData.latitude,
        lng: addressData.longitude,
      };
      this.$refs.mapRef.panTo(this.marker.position);
      this.$bvModal.hide('scaleModal');
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
        fd.append("shiping_id",this.typeform.shiping_id);
        this.updateNewAddress(fd).then((data) => {
          if (data.code == 200) {
            this.$toasted.success("Address updated successfully", {
              duration: 5000,
            });
            this.$router.push({ name: "address" });
          }
        });
      }
    },
  },
};
</script>