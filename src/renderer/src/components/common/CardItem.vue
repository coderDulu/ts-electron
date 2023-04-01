<script setup lang="ts">
import AutoScroll from './AutoScroll.vue';

</script>

<template>
  <AutoScroll class="card-item">
    <slot></slot>
  </AutoScroll>
</template>

<style scoped>
.card-item {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, .5);
  display: flex;
  padding: 24px;
  align-items: center;
  justify-content: center;
}
</style>
