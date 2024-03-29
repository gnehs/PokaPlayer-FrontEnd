<script setup>
import { useWindowSize } from '@vueuse/core'
import { ref, inject, watch, onUnmounted, nextTick } from 'vue'
const player = inject('Player')
const PokaAPI = inject('PokaAPI')

const addToPlaylistDialog = ref(false)

const playerMode = ref(player.audioOrder)
watch(playerMode, val => player.audioOrder = val)

const playerPaused = ref(player.paused)
const currentTime = ref('0:00')
const rawCurrentTime = ref(0)
const duration = ref('0:00')
const rawDuration = ref(0)
const trackInfo = ref(null)
const audioRecorded = ref(false)

const { width, height } = useWindowSize()
const maxCoverSize = ref(400)

let playerInterval = setInterval(() => {
  updatePlayerInfo()
}, 100)
let playerTimeInterval = setInterval(() => {
  rawCurrentTime.value = player.rawCurrentTime
  rawDuration.value = player.rawDuration
}, 1000 / 60)// 60fps
async function updatePlayerInfo() {
  playerMode.value = player.audioOrder
  playerPaused.value = player.paused
  currentTime.value = player.currentTime
  duration.value = player.duration
  trackInfo.value = player.trackInfo
  rawCurrentTime.value = player.rawCurrentTime
  rawDuration.value = player.rawDuration
  if (!audioRecorded.value) {
    if (rawCurrentTime.value + 10 > rawDuration.value && rawDuration.value > 0) {
      await PokaAPI.addSongRecord(trackInfo.value.originalObject)
      audioRecorded.value = true
    }
  }
}
function calcMaxCoverSize() {
  let height = window.innerHeight
  try {

    let headerHeight = document.querySelector('.header').offsetHeight
    let footerHeight = document.querySelector('.fullscreen-player__container .footer').offsetHeight
    let padding = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--padding'))
    let trackInfoHeight = document.querySelector('.fullscreen-player__player .track-info-text').offsetHeight
    let seekControlHeight = document.querySelector('.fullscreen-player__player .seek-control').offsetHeight
    let trackControlHeight = document.querySelector('.fullscreen-player__player .track-control').offsetHeight
    height -= headerHeight + footerHeight + trackInfoHeight + seekControlHeight + trackControlHeight + padding * 5
    maxCoverSize.value = Math.min(height, 400)
  } catch (e) {
    console.log(e)
  }
}
watch(() => height.value, () => {
  calcMaxCoverSize()
})
updatePlayerInfo()
nextTick(() => {
  calcMaxCoverSize()
})
onUnmounted(() => {
  clearInterval(playerTimeInterval)
  clearInterval(playerInterval)
})
function playerSeek(e) {
  player.seek(e.target.value)
}
</script>
<template>
  <div class="fullscreen-player__player">
    <div class="cover" :style="`--maxCoverSize: ${maxCoverSize}px;`">
      <img :src="trackInfo.cover" alt="cover" v-if="trackInfo" />
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath d='M0 0h1v1H0' fill='%23fff'/%3E%3C/svg%3E"
        alt="cover" v-else />
    </div>
    <div class="track-info-text">
      <div class="track-name">{{ trackInfo?.name || `PokaPlayer` }}</div>
      <div class="track-artist">{{ trackInfo?.artist || $t(`waitForPlay`) }} </div>
    </div>
    <div class="seek-control">
      <p-slider
        :value="rawCurrentTime"
        :max="rawDuration"
        step="0.000001"
        @input="playerSeek"
        @change="playerSeek" />
      <div class="time-items">
        <div class="time">{{ currentTime }}</div>
        <div class="time">{{ duration }}</div>
      </div>
    </div>
    <div class="track-control">
      <p-btn icon text @click="playerMode = playerMode == 'random' ? 'list' : 'random'">
        <i v-if="playerMode == 'random'" class='bx bx-shuffle'></i>
        <i v-if="playerMode == 'list'" class='bx bx-repeat'></i>
      </p-btn>
      <p-btn icon text @click="player.previous()"><i class='bx bx-skip-previous'></i></p-btn>
      <p-btn icon color="primary" @click="player.toggle()">
        <i class='bx bx-play' v-if="playerPaused"></i>
        <i class='bx bx-pause' v-else></i>
      </p-btn>
      <p-btn icon text @click="player.next()"><i class='bx bx-skip-next'></i></p-btn>
      <p-btn icon text @click="addToPlaylistDialog = true"><i class='bx bx-list-plus'></i></p-btn>
    </div>
  </div>
  <playlist-dialog v-model="addToPlaylistDialog" :item="trackInfo" />
</template>
<style lang="sass" scoped>
.fullscreen-player__player
  display: flex
  flex-direction: column
  gap: var(--padding)
  .cover
    display: flex
    justify-content: center
    img
      width: 100%
      height: 100%
      object-fit: cover
      aspect-ratio: 1 / 1
      border-radius: var(--border-radius)
      border: 1px solid var(--background-layer-2)
      max-width: var(--maxCoverSize)
      max-height: var(--maxCoverSize)
      background-color: #fff
  .track-info-text
    .track-name,
    .track-artist
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      width: 100%
    .track-name
      font-size: 1.5rem
      font-weight: bold
    .track-artist
      font-size: 1.25rem
      opacity: .75
  .time-items
    display: flex
    justify-content: space-between
    .time
      opacity: .75
  .track-control
    display: flex
    align-items: center
    justify-content: center
    gap: calc(var(--padding) / 2)
</style>