<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
const props = defineProps({
  src: String,
  alt: String,
})
const imgContainer = ref(null)
const imgContainerIsVisible = ref(false)
const { stop } = useIntersectionObserver(
  imgContainer,
  ([{ isIntersecting }], observerElement) => {
    imgContainerIsVisible.value = imgContainerIsVisible.value || isIntersecting
  },
)
</script>
<template>
  <div class="p-list-item__img" ref="imgContainer">
    <transition name="fade" mode="out-in">
      <img v-if="imgContainerIsVisible" :src="src" :alt="alt" />
      <img v-else />
    </transition>
  </div>
</template>