<template>
  <div class="login-main">
    <nav-bar></nav-bar>
    <section class="review-order-start rating-main">
      <div class="review-container review-main text-capitalize position-relative">
        <div class="row">
          <div class="col-md-12 p-0">
            <div class="resturant-details text-center plr15">
              <div class="rating-con">
                <h4>Rate This Order</h4>
              </div>
            </div>
            <div class="rate-box">
              <h4>{{restaurantName}}</h4>
              <div
                class="rate-status-main d-flex align-items-center justify-content-between mb-3"
              >
                <div class="rate-stars">
                  <i class="fas active fa-star mr-2" :class="{ active: orderRating >= 1 }" @click="addOrderStar(1)"></i>
                  <i class="fas fa-star mr-2" :class="{ active: orderRating >= 2 }" @click="addOrderStar(2)"></i>
                  <i class="fas  fa-star mr-2" :class="{ active: orderRating >= 3 }" @click="addOrderStar(3)" ></i>
                  <i class="fas fa-star mr-2" :class="{ active: orderRating >= 4 }" @click="addOrderStar(4)"></i>
                  <i
                    class="fas fa-star mr-2"
                    :class="{ active: orderRating >= 5 }"
                    @click="addOrderStar(5)"
                  ></i>
                </div>

                <p class="rate-status" v-if="orderRating == 1">Poor</p>
                <p class="rate-status" v-else-if="orderRating == 2">Fair</p>
                <p class="rate-status" v-else-if="orderRating == 3">Good</p>
                <p class="rate-status" v-else-if="orderRating == 4">
                  Very Good
                </p>
                <p class="rate-status" v-else-if="orderRating == 5">
                  Excellent
                </p>
              </div>
              <input
                class="form-control mb-0 h50"
                type="text"
                v-model="oderrateingtext"
                placeholder="Write Your Review"
                aria-label="Write Your Review"
              />
            </div>
            <div class="rate-box">
              <h4>Rate Driver</h4>
              <div
                class="rate-status-main d-flex align-items-center justify-content-between mb-3"
              >
                <div class="rate-stars">
                  <i
                    class="fas fa-star mr-2"
                    :class="{ active: driveRating >= 1 }"
                    @click="addDriveStar(1)"
                  ></i>
                  <i
                    class="fas fa-star mr-2"
                    :class="{ active: driveRating >= 2 }"
                    @click="addDriveStar(2)"
                  ></i>
                  <i
                    class="fas fa-star mr-2"
                    :class="{ active: driveRating >= 3 }"
                    @click="addDriveStar(3)"
                  ></i>
                  <i
                    class="fas fa-star mr-2"
                    :class="{ active: driveRating >= 4 }"
                    @click="addDriveStar(4)"
                  ></i>
                  <i
                    class="fas fa-star mr-2"
                    :class="{ active: driveRating >= 5 }"
                    @click="addDriveStar(5)"
                  ></i>
                </div>
                <p class="rate-status" v-if="driveRating == 1">Poor</p>
                <p class="rate-status" v-else-if="driveRating == 2">Fair</p>
                <p class="rate-status" v-else-if="driveRating == 3">Good</p>
                <p class="rate-status" v-else-if="driveRating == 4">
                  Very Good
                </p>
                <p class="rate-status" v-else-if="driveRating == 5">
                  Excellent
                </p>
              </div>
              <input
                class="form-control mb-0 h50"
                type="text"
                v-model="driverratingtext"
                placeholder="Write Your Review"
                aria-label="Write Your Review"
              />
            </div>
            <div class="delivery-address border-0 rate-btn">
              <div class="full-btn">
                <a href="javascript:void(0)" @click="submitRating()">Submit</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar.vue";
import { mapActions } from "vuex";
export default {
  components: { NavBar },
  data() {
    return {
      orderRating: 3,
      driveRating: 3,
      oderrateingtext: "",
      driverratingtext: "",
      restaurantName :'',
    };
  },
  
  mounted(){
    if(this.$auth.user){
      this.orderDetails();
    }else{
      this.$router.push({ name: "sign-in" });
    }
  },
  methods: {
    ...mapActions("order", ["orderRatingData","viewOrderDetail"]),
    addOrderStar(rate) {
      this.orderRating = rate;
    },
    addDriveStar(rate) {
      this.driveRating = rate;
    },
    submitRating() {
      this.orderRatingData({
        vendor_id: this.$auth.getVendorId(),
        order_id: this.$route.params.order_id,
        rating: this.driveRating,
        description: this.oderrateingtext,
        rating_driver: this.orderRating,
        description_driver: this.driverratingtext,
        is_langauge: "en",
      }).then((data) => {
        if (data.code == 200) {
          this.$router.push({name: "order-status",params: this.$route.params.order_id,});
        }
      });
    },
  
    orderDetails(){
      this.viewOrderDetail({
          vendor_id: this.$auth.getVendorId(),
          order_id: this.$route.params.order_id,
          is_langauge : "en"
      }).then(data => {
        if (data.code == 200) {
          this.restaurantName = data.Result[0].restaurant_name;
        }
      })
    }
  
  },
};
</script>
