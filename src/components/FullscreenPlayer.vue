<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const currentPage = ref(`playlist`)
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
let widthChangeListener = () => {
  if (window.innerWidth > 768 && currentPage.value == 'player') {
    currentPage.value = `playlist`
  }
}
onMounted(() => {
  window.addEventListener('resize', widthChangeListener)
})
onUnmounted(() => {
  window.removeEventListener('resize', widthChangeListener)
})
</script>
<template>

  <div class="fullscreen-player" :class="{ show }">
    <div class="fullscreen-player__container">
      <div class="header">
        <div class="left">
          <div class="logo">
            PokaPlayer
          </div>
        </div>
        <div class="right">
          <p-btn icon @click="$emit('close');">
            <i class='bx bx-chevron-down'></i>
          </p-btn>
        </div>
      </div>
      <div class="content">
        <div class="left">
          <fullscreen-Player-Player />
        </div>
        <div class="right" :class="[`current-page-${currentPage}`]">
          <fullscreen-Player-Player v-if="currentPage == 'player'" />
          <fullscreen-Player-List v-if="currentPage == 'playlist'" />
          <fullscreen-Player-Lyric v-if="currentPage == 'lyric'" />
        </div>
      </div>

      <div class="footer">
        <p-btn icon :text="currentPage != 'player'" @click="currentPage = 'player'">
          <i class='bx bx-play'></i>
        </p-btn>
        <p-btn icon :text="currentPage != 'playlist'" @click="currentPage = 'playlist'">
          <i class='bx bxs-playlist'></i>
        </p-btn>
        <p-btn icon :text="currentPage != 'lyric'" @click="currentPage = 'lyric'">
          <i class='bx bx-captions'></i>
        </p-btn>
      </div>
    </div>
  </div>
</template>
<style lang="sass" scoped>
.fullscreen-player
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  height: 100svh
  background-color: var(--background-layer-2)
  z-index: 1
  transition: transform var(--transition), border-radius var(--transition)
  overflow: hidden
  &:not(.show)
    transform: translateY(100vh)
    border-radius: var(--border-radius)
  .fullscreen-player__container
    width: min(1200px, calc(100vw - var(--padding) * 2))
    padding: var(--padding) calc(var(--padding))
    height: 100vh
    margin: 0 auto

    .header
      display: flex
      align-items: center
      .left
        flex: 1
        .logo
          font-family: 'Product Sans', sans-serif
          font-weight: bold
          font-size: 24px
    .content
      display: grid
      grid-template-columns: 400px 1fr
      align-items: center
      gap: calc(var(--padding) * 4)
      margin: calc(var(--padding) * 1) 0
      height: calc(100svh - var(--padding) * 4 - 42px * 2)
      @media screen and (max-width: 768px)
        grid-template-columns: 1fr
      .left,.right
        overflow: hidden
        overflow-y: auto
        &::-webkit-scrollbar
          width: 4px
        &::-webkit-scrollbar-track
          background: transparent
        &::-webkit-scrollbar-thumb
          background: #888
          border-radius: 2px
        &::-webkit-scrollbar-thumb:hover
          background: #777
        &::-webkit-scrollbar-thumb:active
          background: #666
        &::-webkit-scrollbar-button
          display: none
      .left
        max-height: 100%
        @media screen and (max-width: 768px)
          display: none
      .right
        padding: calc(var(--padding) * 2)
        background-color: var(--background-layer-1)
        border-radius: var(--border-radius)
        height: 100%
        &.current-page-player
          background-color: var(--background-layer-2)
          display: flex
          align-items: center
          justify-content: center
    .footer
      display: flex
      gap: calc(var(--padding) / 2)
      justify-content: flex-end
      @media screen and (max-width: 768px)
        justify-content: center
      .p-btn:first-child
        @media screen and (min-width: 768.1px)
          display: none

</style>