<script setup lang="ts">
import { SendOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';

const inputRef = ref<HTMLInputElement>();
const value = ref('')

const props = defineProps<{
  autoFocus: boolean;
  onSend: (value: string) => void;
}>()

onMounted(() => {
  props.autoFocus && inputRef.value?.focus();
})

function send() {
  props.onSend(value.value);
  value.value = ""
}


defineExpose({
  focus: inputRef.value?.focus
})
</script>

<template>
  <div class="input">
    <a-input v-model:value="value" ref="inputRef" :bordered="false" @pressEnter="send"/>
    <slot name="suffix" class="icon-send" @click="send">
      <send-outlined class="icon-send" @click="send" />
    </slot>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
  /* height: 100%; */
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding-right: 8px;
}


.icon-send {
  cursor: pointer;
}
</style>
