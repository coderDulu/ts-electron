<script setup lang="ts">
import ErrorView from './views/ErrorView.vue';
import { keyDownListener, addWindowListener } from '@/utils/common/addResizeListener';
import { onMounted, onUnmounted } from 'vue';
import HomeView from '@/views/HomeView.vue';

onMounted(() => {
  keyDownListener()
})

onUnmounted(() => {
  addWindowListener.remove("keydown")
})
</script>

<template>
  <ErrorView>
    <HomeView />
  </ErrorView>
</template>

