<template>
  <div class="login-main">
    <nav-bar></nav-bar>
    <section class="profile-main-start">
      <div
        class="review-container review-main text-capitalize position-relative"
      >
        <div class="row">
          <div class="col-md-12 p-0">
            <div class="orders-tab-main plr15 mt-2">
              <div class="flexone">
                <b-tabs content-class="mt-3" lazy>
                  <b-tab title="My Profile" active>
                    <update-profile />
                  </b-tab>
                  <b-tab title="Change Password">
                    <change-password />
                  </b-tab>
                </b-tabs>
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
import ChangePassword from '../components/profile/ChangePassword.vue';
import UpdateProfile from '../components/profile/UpdateProfile.vue';
export default {
  components: { NavBar, ChangePassword, UpdateProfile },
};
</script>