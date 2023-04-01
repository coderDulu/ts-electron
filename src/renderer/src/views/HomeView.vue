<script setup lang="ts">
</script>

<template>
  <div class="main-c">
    <div class="main-c-content">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <div class="main-msg">
        <h2>Vue3 + Antd-vue + Pinia + Vue-router</h2>
        <a-button type="primary">欢迎使用Antd</a-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-c {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  perspective: 40px;
}

.main-c-content {
  position: absolute;
  display: flex;
  margin-right: 50px;
  animation: show 2s linear;
}

.logo {
  margin-right: 20px;
}



@keyframes show {
  0% {
    transform: translateZ(-40px);
  }

  80% {
    transform: translateZ(-5px);
  }

  90% {
    transform: translateZ(-10px);
  }

  100% {
    transform: translateZ(0px);
  }
}
</style>
