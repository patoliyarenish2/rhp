<template>
  <div class="filter-title d-flex justify-content-between align-items-center mb-4">
    <div>
      <h4 v-if="!title"><skeleton-loader-vue :height="23" :width="308"  type="string" /></h4>
      <h4 v-else>{{title}}</h4>
      <p class="mb-0">{{subtitle}}</p>
    </div>
    <slot/>
  </div>
</template>
<script>
import VueSkeletonLoader from 'skeleton-loader-vue';
export default {
  components: {
    'skeleton-loader-vue':VueSkeletonLoader
  },
  props: ['title','subtitle']
}
</script>