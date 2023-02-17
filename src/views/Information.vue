<template>
<div class="login-main">
    <nav-bar></nav-bar>
    <section class="fixed-box faqs-start-main">
        <div class="orders-tab-main review-container review-main text-capitalize position-relative">
            <div class="row">
                <div class="col-md-12">
                    <div class="modal-body">
                        <ul class="nav nav-tabs border-0 mb-3">
                            <li class="nav-item">
                                <a href="#info" class="nav-link navbar-default active" data-toggle="tab">More Info</a>
                            </li>
                            <li class="nav-item">
                                <a href="#review" class="nav-link navbar-default" data-toggle="tab">Review</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div id="info" class="tab-pane active tab-box">
                                <div class="responsive-map mt-3">
                                <GmapMap v-if="is_displayMap" :center="center" :zoom="15" map-style-id="roadmapinfo" :options="mapOptions" style="width: 100%; height: 300px" ref="mapRef">
                                    <GmapMarker :position="marker.position" :clickable="false" :draggable="false" />
                                </GmapMap>
                                </div>
                                <div class="customize-type mb-4">
                                    <h6>Address</h6>
                                    <p>{{ restaurantTimingList.address }}</p>
                                </div>
                                <div class="bsness-nmbr">
                                    <h6>Business Licence Number</h6>
                                    <p>{{ restaurantTimingList.business_licence_number }}</p>
                                </div>
                                <div class="dlivry-time" v-if="ispickupDateTimes">
                                    <h6>Delivery Timing</h6>
                                    <ul class="dlvry-cls">
                                        <li class="dltime" v-for="(deliverytimming,index) in deliveryDateTimes" :key="index">
                                        {{deliverytimming.days}}
                                        <div v-if="deliverytimming.time.length > 0 && deliverytimming.status == '1'" >
                                            <div class="dstime" v-for="(octime,i) in deliverytimming.time" :key="i">
                                            {{moment(octime.open_time, ["h:mm A"]).format("hh:mm A")}} - {{moment(octime.close_time, ["h:mm A"]).format("hh:mm A")}}
                                            </div>
                                        </div>
                                        <div v-else class="dstime" >Closed</div>
                                        </li>
                                    </ul>
                                    </div>
                                <div class="pckup-time" v-if="$auth.setting && $auth.setting.is_pickup_enable">
                                    <h6>Pickup Timing</h6>
                                    <ul class="pckup-cls">
                                        <li class="pktime" v-for="(picktimming,index) in pickupDateTimes" :key="index">
                                        {{picktimming.days}}
                                        <div v-if="picktimming.time.length > 0 && picktimming.status == '1'" >
                                            <div class="dstime" v-for="(octime,i) in picktimming.time" :key="i">
                                            {{moment(octime.open_time, ["h:mm A"]).format("hh:mm A")}} - {{moment(octime.close_time, ["h:mm A"]).format("hh:mm A")}}
                                            </div>
                                        </div>
                                        <div v-else class="dstime" >Closed</div>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                            <div id="review" class="tab-pane tab-box">
                                <div class="customize-type custom-checkbox" v-if="restaurantRatingList.length > 0">
                                    <ul class="rating-cls">
                                        <li v-for="(rating, index) in restaurantRatingList"
                                        :key="index">
                                        <div class="d-flex rating-star mt-2">
                                            <div class="cls-strrate">
                                            <i class="fas fa-star mr-2"></i
                                            ><span>{{ rating.rating }}.0</span>
                                            <p class="uname">By {{ rating.user_name }}</p>
                                            </div>
                                            <p class="rate-time">{{ rating.created_at }}</p>
                                        </div>
                                        <p class="ratdesc-cls">{{ rating.description }}</p>
                                        </li>
                                    </ul>
                                </div>
                                <div v-else class="rating-no">
                                    <p>No ratting found</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer></Footer>
</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NavBar from '../components/NavBar.vue'
import VueGoogleAutocomplete from "vue-google-autocomplete";
import Footer from '../components/Footer.vue';
import moment from "moment";

export default {
    name:'Details',
    components: { NavBar,VueGoogleAutocomplete,Footer},
    data() {
        return {
            moment: moment,
            timing:[],
            ratings:[],
            address:'',
            marker: { position: { lat:0, lng:0 } },
            center: { lat:0, lng: 0 },
            mapOptions: { disableDefaultUI: true},
            is_displayMap:false,
            is_rating:false,
            is_twoPersonPrice:false,
            is_minimuOrder:false,
            pickupDateTimes: [
            {
                days : 'Monday',
                time : [],
                status : 1,
            },
            {
                days : 'Tuesday',
                time : [],
                status : 1
            },
            {
                days : 'Wednesday',
                time : [],
                status : 1
            },
            {
                days : 'Thursday',
                time : [],
                status : 1
            },
            {
                days : 'Friday',
                time : [],
                status : 1
            },
            {
                days : 'Saturday',
                time : [],
                status : 1
            },
            {
                days : 'Sunday',
                time : [],
                status : 1
            }
        ],
        ispickupDateTimes : false,
        deliveryDateTimes: [
            {
                days : 'Monday',
                time : [],
                status : 1,
            },
            {
                days : 'Tuesday',
                time : [],
                status : 1
            },
            {
                days : 'Wednesday',
                time : [],
                status : 1
            },
            {
                days : 'Thursday',
                time : [],
                status : 1
            },
            {
                days : 'Friday',
                time : [],
                status : 1
            },
            {
                days : 'Saturday',
                time : [],
                status : 1
            },
            {
                days : 'Sunday',
                time : [],
                status : 1
            }
        ]
        }
    },
    mounted(){
        setTimeout(() => {
            if(this.$auth.setting && this.$auth.setting.is_single_restaurant == 'Yes'){
             if(this.$auth.setting){
                if(this.restaurantDetails && this.restaurantDetails.restaurant_id){
                    this.getRestaurantTiming(this.restaurantDetails.restaurant_id);
                    this.getRestaurantRatingData(this.restaurantDetails.restaurant_id);
                    this.is_displayMap = true;
                } else {
                    this.getRestaurantTiming(this.$auth.setting.restaurant_id);
                    this.getRestaurantRatingData(this.$auth.setting.restaurant_id);
                    this.is_displayMap = true;
                }
            }
            if(this.restaurantTimingList.latitude){
                this.center.lat = parseFloat(this.restaurantTimingList.latitude);
                this.center.lng = parseFloat(this.restaurantTimingList.longitude);
                this.marker.position.lat = parseFloat(this.restaurantTimingList.latitude);;
                this.marker.position.lng = parseFloat(this.restaurantTimingList.longitude);
                this.is_displayMap = true;
            }
        }    
        }, 1200);
        
    },

    computed: {
    ...mapGetters("restaurant", ["restaurantTimingList","restaurantRatingList","restaurantDetails"]),
  },
    methods:{
        ...mapActions("restaurant", [ "getRestaurantTimingData", "getRestaurantRating"]),

        panToMarker() {
          this.$refs.mapRef.panTo(this.marker.position);
        },

        getRestaurantTiming(restID) {
            this.getRestaurantTimingData({
                vendor_id: this.$auth.getVendorId(),
                restaurant_id: restID,
                is_langauge: "en",
            }).then((data) => {
                if (data.code == 200) {
                    this.timing = data.Result;
                    this.is_minimuOrder = true;
                    if(this.timing.pickup_timing.length > 0){
                        this.timing.pickup_timing.forEach(element => {
                        let findIndex = this.pickupDateTimes.findIndex(r => r.days === element.day);
                        if (this.pickupDateTimes[findIndex]) {
                            this.pickupDateTimes[findIndex].time.push({'open_time': element.open_time, 'close_time' : element.close_time});
                            this.pickupDateTimes[findIndex].status = element.status;
                        }
                        });
                    }
                    if(this.timing.delivery_timing.length > 0) {
                        this.ispickupDateTimes = true;
                        this.timing.delivery_timing.forEach(element => {
                        let findIndex = this.deliveryDateTimes.findIndex(r => r.days === element.day);
                        if (this.deliveryDateTimes[findIndex]) {
                            this.deliveryDateTimes[findIndex].time.push({'open_time': element.open_time, 'close_time' : element.close_time});
                            this.deliveryDateTimes[findIndex].status = element.status;
                        }
                        });
                    }
                    this.center.lat = parseFloat(this.timing.latitude);
                    this.center.lng = parseFloat(this.timing.longitude);
                    this.marker.position.lat = parseFloat(this.timing.latitude);
                    this.marker.position.lng = parseFloat(this.timing.longitude);
                    this.is_displayMap = true;
                }else{
                    this.timing = [];
                    this.is_minimuOrder = false;
                }
            });
        },

        getRestaurantRatingData(restID) {
            this.getRestaurantRating({
                vendor_id: this.$auth.getVendorId(),
                restaurant_id: restID,
                is_langauge: "en",
            }).then((data) => {
                if (data.code == 200) {
                this.ratings = data.Result;
                this.is_displayMap = true;
                }else{
                 this.ratings = data.Result;
                }
            }).catch(function () {
                alert('Something went wrong, Please try again');
            });
        },
    }
}
</script>