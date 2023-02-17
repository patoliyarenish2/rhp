<template>
    <div>
        <div class="modal fade order-placed" id="orderfail" tabindex="-1" aria-labelledby="orderfailLabel" aria-hidden="true" ref="FailOrderModal" style="z-index: 9999;">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center">
                        <img src="@/assets/images/confirmed-icn.svg" />
                        <p class="mt-3 mb-1">
                            Your order has been fail.
                            <br />Please try again...!!!
                        </p>
                    </div>
                    <div class="modal-footer full-btn d-block">
                        <a href="javascript:void(0);" data-dismiss="modal">Try Again</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        window.$(this.$refs.FailOrderModal).modal();
    }
};
</script>