<script setup>

import { ref, inject, watch, onUnmounted, onMounted, nextTick } from 'vue'
const player = inject('Player')

const songList = ref([])
const currentIndex = ref(-1)
let playerInterval = setInterval(() => {
  songList.value = player.songList
  currentIndex.value = player.currentIndex
}, 100)
watch(currentIndex, val => {
  if (val && val != -1) {
    document.querySelector(`.fullscreen-player__list .p-list-item[data-index="${val}"]`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }
})
onMounted(() => {
  songList.value = player.songList
  currentIndex.value = player.currentIndex
  nextTick(() => {
    if (currentIndex.value != -1) {
      document.querySelector(`.fullscreen-player__list .p-list-item[data-index="${currentIndex.value}"]`)?.scrollIntoView({
        block: 'center'
      })
    }
  })
})
onUnmounted(() => {
  clearInterval(playerInterval)
})
</script>
<template>
  <div class="fullscreen-player__list">
    <parse-songs :items="songList" :currentIndex="currentIndex" />
  </div>
</template>
<style lang="sass" scoped>
.fullscreen-player__list
  height: 100%
  overflow-y: auto
</style>