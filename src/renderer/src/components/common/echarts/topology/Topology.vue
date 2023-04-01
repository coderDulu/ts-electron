<script setup lang="ts">
import { initOption } from './option'
import createEcharts from '@/utils/echarts/create'
import { onUnmounted, ref, onMounted } from 'vue';

const instance = ref<any>(null);

onMounted(() => {
  instance.value = createEcharts('topology', initOption);
})

onUnmounted(() => {
  instance.value?.dispose()
  instance.value = null;
})

</script>

<template>
  <div id="topology"></div>
</template>

<style scoped>
#topology {
  width: 100%;
  height: 100%;
}
</style>
