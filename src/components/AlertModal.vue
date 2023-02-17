<template>
  <div >
    <div class="modal fade order-placed" id="`AlertModalPlaced`" tabindex="-1" aria-labelledby="AlertModalLabel" aria-hidden="true" ref="AlertModal" style="z-index: 9999;">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" :class="DisplayAlertData.isSetClass && DisplayAlertData.isSetClass">
          <div class="modal-header" v-if="DisplayAlertData.isSetClass && DisplayAlertData.isSetClass == 'prdct-modal-cls'">
            <h5 class="modal-title">Clear Cart?</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-header" v-if="DisplayAlertData.isSetClass && DisplayAlertData.isSetClass == 'addrs-modal-cls'">
            <h5 class="modal-title">Address</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <p class="mt-3 mb-1" v-if="DisplayAlertData.displayMessage">{{DisplayAlertData.displayMessage}}</p>
          </div>
          <div class="modal-footer full-btn d-block">
              <a href="javascript:void(0);" @click="confirm('yes')" data-dismiss="modal" v-if="DisplayAlertData.isSetClass == 'schedule-modal'">Schedule</a>
              <a href="javascript:void(0);" @click="confirm('yes')" data-dismiss="modal" v-else>OK</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props:['DisplayAlertData'],
  data() {
    return {
      isConfirm:''
    };
  },
  mounted() {
    window.$(this.$refs.AlertModal).modal();
    $(this.$refs.AlertModal).on("hidden.bs.modal", this.oncloseModle);
  },
  methods: {
    confirm(val){
        this.isConfirm = val;
    },

    oncloseModle(val) {
        this.$emit("modalClose", this.isConfirm);
    }
  }
};
</script>