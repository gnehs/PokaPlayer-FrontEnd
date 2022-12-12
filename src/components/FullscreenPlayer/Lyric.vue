<script setup>

import { ref, inject, watch, onUnmounted, onMounted, nextTick } from 'vue'
const player = inject('Player')
const PokaAPI = inject('PokaAPI')

const trackInfo = ref(null)
const currentIndex = ref(-1)
const rawCurrentTime = ref(-1)
const currentLyricIndex = ref(-1)
const isLyricTranslated = ref(false)
const lyric = ref([])
const lyricRegex = /\[[0-9]{1,}\:[0-9]{1,2}(\.[0-9]{1,})?\]/g
let playerInterval = setInterval(() => {
  trackInfo.value = player.trackInfo
  currentIndex.value = player.currentIndex
  rawCurrentTime.value = player.rawCurrentTime
  // update currentLyricIndex
  if (lyric.value != []) {
    for (let i = 0; i < lyric.value.length; i++) {
      if (rawCurrentTime.value + 0.3 >= lyric.value[i].time) {
        currentLyricIndex.value = i
        if (currentLyricIndex.value == lyric.value.length - 1 && isLyricTranslated.value) {
          currentLyricIndex.value = i - 1
        }
      }
    }
  }
}, 100)
watch(currentLyricIndex, val => {
  if (val && val != -1) {
    // lyric changed
    nextTick(() => {
      document.querySelector(`.fullscreen-player__lyric .lyric-item.active`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    })
  }
})
watch(currentIndex, val => {
  if (val && val != -1) {
    // song changed
    getLyric()
  }
})
onMounted(() => {
  trackInfo.value = player.trackInfo
  currentIndex.value = player.currentIndex
  rawCurrentTime.value = player.rawCurrentTime

  getLyric()
})
async function getLyric() {
  let { id, source } = trackInfo.value
  lyric.value = []
  isLyricTranslated.value = false
  currentLyricIndex.value = -1
  if (id) {
    let { lyrics } = await PokaAPI.getLyric(source, id)
    if (lyrics.length && lyrics[0].lyric.match(lyricRegex)) {
      loadLyric(lyrics[0].lyric)
    }
  }
}
function timeStampToSeconds(timeStamp) {
  let time = timeStamp.replace(/\[|\]/g, '').split(':')
  return parseInt(time[0]) * 60 + parseFloat(time[1])
}
async function loadLyric(lrcString) {
  lrcString = lrcString.replaceAll(`\r`, ``)
  let matches = lrcString.match(lyricRegex)
  let result = []
  if (matches?.length > 0) {
    let lines = lrcString.split(`\n`)
    for (let i = 0; i < matches.length; i++) {
      let time = timeStampToSeconds(matches[i])
      let lyric = lines[i].replace(/\[(.+?)\]/, '')
      result.push({ time, lyric })
    }
    lyric.value = result
    isLyricTranslated.value = result.at(-1).time == result.at(-2).time
  }
}
onUnmounted(() => {
  clearInterval(playerInterval)
})
</script>
<template>
  <div class="fullscreen-player__lyric" :class="{ 'with-translated': isLyricTranslated }">
    <div class="lyric-item"
      v-for="(item, i) of lyric"
      :data-lyric-set="isLyricTranslated ? Math.floor((i - currentLyricIndex) / 2) : i - currentLyricIndex"
      :class="{
        active: i == currentLyricIndex,
        translated: isLyricTranslated && currentLyricIndex % 2 != i % 2
      }">
      {{ item.lyric }}
    </div>
  </div>
</template>
<style lang="sass" scoped>
.fullscreen-player__lyric
  padding-bottom: 25vh
  .lyric-item
    line-height: 2
    font-size: 24px
    opacity: .2
    margin: var(--padding)
    transition: all .3s ease
    &[data-lyric-set="0"]
      opacity: 1
    &[data-lyric-set="-1"],&[data-lyric-set="1"]
      opacity: .5
    &[data-lyric-set="-2"],&[data-lyric-set="2"]
      opacity: .4875
    &[data-lyric-set="-3"],&[data-lyric-set="3"]
      opacity: .325
    &[data-lyric-set="-4"],&[data-lyric-set="4"]
      opacity: .2
  &.with-translated
    .lyric-item
      margin-bottom: 0
      &.translated
        margin-top: 0
        margin-bottom: var(--padding)
        font-size: 18px
</style>