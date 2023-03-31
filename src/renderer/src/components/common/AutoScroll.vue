<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  isAuto?: boolean
}>()

const scrollRef = ref<HTMLDivElement>()
const isMouseEnter = ref(false);  // 鼠标是否在内


onMounted(() => {
  listenNodesChange();
})

function listenNodesChange() {
  props.isAuto && scrollToBottom();

  // 监听子元素变化
  const config = { childList: true };
  const resizeObserver = new MutationObserver(() => {
    if (!isMouseEnter.value && props.isAuto) {
      scrollToBottom()
    }
  });
  scrollRef.value && resizeObserver.observe(scrollRef.value, config)
}

// 滚动到底部
function scrollToBottom() {
  const scroll = scrollRef.value?.scrollHeight;
  scrollRef.value?.scrollBy({ top: scroll }); // 滚动到最下方
}

function handleMouseEnter() {
  scrollRef.value && (scrollRef.value.style.overflow = "auto")
  isMouseEnter.value = true;
}

function handleMouseLeave() {
  isMouseEnter.value = false;
  scrollRef.value && (scrollRef.value.style.overflow = "hidden")
}
</script>

<template>
  <div class="auto-c" ref="scrollRef" @mouseenter.self="handleMouseEnter" @mouseleave="handleMouseLeave">
    <slot></slot>
  </div>
</template>

<style scoped>
.auto-c {
  width: 100%;
  height: 100px;
  overflow: hidden;
}
</style>
