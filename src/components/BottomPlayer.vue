<script setup>
import { ref, inject, watch } from 'vue'
const player = inject('Player')

const playerMode = ref(player.audioOrder)
watch(playerMode, val => player.audioOrder = val)

const playerPaused = ref(player.paused)
const currentTime = ref('0:00')
const duration = ref('0:00')
const trackInfo = ref(null)
setInterval(() => {
  playerPaused.value = player.paused
  currentTime.value = player.currentTime
  duration.value = player.duration
  trackInfo.value = player.trackInfo
}, 100)
</script>
<template>
  <div class="bottom-player">
    <div class="track-info" v-if="trackInfo">
      <div class="cover">
        <img :src="trackInfo.cover" alt="cover" />
      </div>
      <div class="track-info-text">
        <div class="track-name">{{ trackInfo.name }}</div>
        <div class="track-artist">{{ trackInfo.artist }}</div>
      </div>
    </div>
    <div class="track-info" v-else>
      <div class="cover">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath d='M0 0h1v1H0' fill='%23fff'/%3E%3C/svg%3E"
          alt="cover" />
      </div>
      <div class="track-info-text">
        <div class="track-name">PokaPlayer</div>
        <div class="track-artist">PokaPlayer</div>
      </div>
    </div>
    <div class="track-control">
      <div class="time">{{ currentTime }}</div>
      <p-btn icon text @click="player.previous()"><i class='bx bx-skip-previous'></i></p-btn>
      <p-btn icon color="primary" @click="player.toggle()">
        <i class='bx bx-play' v-if="playerPaused"></i>
        <i class='bx bx-pause' v-else></i>
      </p-btn>
      <p-btn icon text @click="player.next()"><i class='bx bx-skip-next'></i></p-btn>
      <div class="time">{{ duration }}</div>
    </div>
    <div class="player-control">
      <p-btn icon :text="playerMode != 'random'" @click="playerMode = 'random'"><i class='bx bx-shuffle'></i></p-btn>
      <p-btn icon :text="playerMode != 'list'" @click="playerMode = 'list'"><i class='bx bx-repeat'></i></p-btn>
    </div>
  </div>
</template>
<style lang="sass" scoped>
.bottom-player
  padding: calc(var(--padding) / 2) var(--padding)
  display: grid
  grid-template-columns: 1fr 250px 1fr
  @media screen and (max-width: 768px)
    grid-template-columns: 1fr auto
    .player-control
      display: none
  .track-info
    display: flex
    .cover
      display: flex
      align-items: center
      justify-content: center

      --cover-size: calc(var(--padding) * 5 + 24px)
      width: var(--cover-size)
      height: var(--cover-size)
      display: flex
      flex-direction: column
      justify-content: center

      @media (max-width: 768px)
        --cover-size: calc(var(--padding) * 3.5 + 24px)
      img
        width: var(--cover-size)
        height: var(--cover-size)
        border-radius: var(--border-radius)
        object-fit: cover
    .track-info-text
      margin-left: var(--padding)
      display: flex
      flex-direction: column
      justify-content: center
      font-size: 18px
      @media (max-width: 768px)
        font-size: 16px
      .track-name
        font-weight: 700
      .track-artist
        color: var(--text-color)
        opacity: .75
  .track-control
    display: flex
    align-items: center
    justify-content: center
    gap: calc(var(--padding) / 2)
    .time
      @media (max-width: 768px)
        display: none
  .player-control
    display: flex
    align-items: center
    justify-content: flex-end
    gap: calc(var(--padding) / 2)
    @media (max-width: 768px)
      display: none
</style>