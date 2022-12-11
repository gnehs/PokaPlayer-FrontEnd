<script setup>
import { reactive, computed } from 'vue'
const borderRadius = computed({
  get() {
    return parseInt(document.documentElement.style.getPropertyValue('--border-radius') || 12)
  },
  set(value) {
    document.documentElement.style.setProperty('--border-radius', value + 'px')
  }
})
const padding = reactive(parseInt(document.documentElement.style.getPropertyValue('--padding')) || 8)
function updateCSSVariables(e) {
  document.documentElement.style.setProperty('--padding', e.target.value + 'px')
}
</script>
<template>
  <Teleport to="#header-center">
    <p>設定</p>
  </Teleport>
  <h1>實驗室</h1>
  <p>邊框半徑 </p>
  <input type="range" v-model="borderRadius" min="0" max="100" style="width: 256px" />
  <p>間距 </p>
  <input type="range" v-model="padding" min="0" max="24" style="width: 256px" @change="updateCSSVariables" />
</template>