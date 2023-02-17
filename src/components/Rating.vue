<template>
  <div class="d-flex rating-star mt-2">
    <div v-for="(n, index) in Math.floor(rating)"  :key="index">
      <i class="fas fa-star mr-2"><span></span></i>
    </div>
    <span>({{rating}})</span>
</div>
</template>
<script>
export default {
  props: ['rating']
}
</script>