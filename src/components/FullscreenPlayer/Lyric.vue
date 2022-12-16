<script setup>

import { ref, inject, watch, onUnmounted, onMounted, nextTick } from 'vue'
const player = inject('Player')
const PokaAPI = inject('PokaAPI')

const trackInfo = ref(null)
const currentIndex = ref(-1)
const rawCurrentTime = ref(-1)
const currentLyricIndex = ref(-1)
const isLyricTranslated = ref(false)
const showIsLyricCorrect = ref(false)

const searchDialog = ref(false)
const searchResult = ref(null)
const searchKeyword = ref('')

const currentLyricSource = ref(null) // saved, search, or null
const loading = ref(false)

const lyric = ref([])
const rawLyric = ref(null)
const lyricRegex = /\[[0-9]{1,}\:[0-9]{1,2}(\.[0-9]{1,})?\]/g
let playerInterval = setInterval(() => {
  let temp = trackInfo.value?.uuid
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
  // getLyric when track changed
  if (temp != trackInfo.value?.uuid) {
    getLyric()
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
onMounted(() => {
  trackInfo.value = player.trackInfo
  currentIndex.value = player.currentIndex
  rawCurrentTime.value = player.rawCurrentTime

  getLyric()
})
async function getLyric() {
  let { id, source, name, artist } = trackInfo.value
  lyric.value = []
  rawLyric.value = null
  isLyricTranslated.value = false
  showIsLyricCorrect.value = false
  currentLyricIndex.value = 0
  currentLyricSource.value = null
  searchKeyword.value = `${name} ${artist}`
  searchResult.value = null
  if (id) {
    loading.value = true
    let { lyrics } = await PokaAPI.getLyric(source, id)
    loading.value = false
    if (lyrics.length && lyrics[0].lyric.match(lyricRegex)) {
      currentLyricSource.value = 'saved'
      loadLyric(lyrics[0].lyric)
    } else {
      searchLyric(`${name} ${artist}`)
    }
  }
}
async function searchLyric(keyword, set = true) {
  searchResult.value = null

  loading.value = true
  let { lyrics } = await PokaAPI.getLyricByKeyword(keyword)
  loading.value = false

  searchResult.value = lyrics
  searchKeyword.value = keyword
  if (set && lyrics[0]) {
    currentLyricSource.value = 'search'
    showIsLyricCorrect.value = true
    loadLyric(lyrics[0].lyric)
  }
}
function timeStampToSeconds(timeStamp) {
  let time = timeStamp.replace(/\[|\]/g, '').split(':')
  return parseInt(time[0]) * 60 + parseFloat(time[1])
}
async function loadLyric(lrcString) {
  rawLyric.value = lrcString
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
async function saveCurrentLyric() {
  // close isLyricCorrect
  showIsLyricCorrect.value = false
  // save lyric
  let { id, source, name, artist } = trackInfo.value
  await PokaAPI.saveLyric({
    title: name,
    artist,
    source,
    songId: id,
    lyric: rawLyric.value
  })
}
onUnmounted(() => {
  clearInterval(playerInterval)
})
</script>
<template>
  <div class="fullscreen-player__lyric" :class="{ 'with-translated': isLyricTranslated }" v-on:dblclick="searchDialog = true">
    <div class="is-lyric-correct" :class="{ show: showIsLyricCorrect }">
      <div class="icon">
        <i class='bx bx-question-mark'></i>
      </div>
      <div class="content">
        <div class="title">目前的歌詞正確嗎？</div>
        <div class="description">點選「正確」後，會將目前歌詞儲存到資料庫，下次聽這首歌時便會載入目前的歌詞。</div>
        <div class="actions">
          <!-- <p-btn outline><i class='bx bx-data'></i>將歌詞設為「無」</p-btn> -->
          <p-btn outline @click="searchDialog = true"><i class='bx bx-search'></i>搜尋其他歌詞</p-btn>
          <p-btn color="primary" @click="saveCurrentLyric"><i class='bx bx-check'></i>正確</p-btn>
        </div>
      </div>
    </div>
    <div class="lyric-item"
      v-for="(item, i) of lyric"
      :data-lyric-set="isLyricTranslated ? Math.floor((i - currentLyricIndex) / 2) : i - currentLyricIndex"
      :class="{
        active: i == currentLyricIndex,
        translated: isLyricTranslated && currentLyricIndex % 2 != i % 2
      }">
      {{ item.lyric }}
    </div>
    <Loader v-if="loading" />
  </div>
  <Dialog v-model="searchDialog">
    <div class="lyric-search__header">
      <p-input
        v-model="searchKeyword"
        @keydown.enter.prevent="searchLyric(searchKeyword)" />
      <p-btn icon @click="searchLyric(searchKeyword)">
        <i class="bx bx-search" />
      </p-btn>
    </div>
    <div class="lyric-search__content">
      <empty-state
        style="margin-top: 80px"
        v-if="!searchResult && currentLyricSource == 'saved' && !loading"
        :title="`目前歌詞來自已儲存的歌詞`"
        :description="`若要搜尋歌詞，請在上方輸入關鍵字，並按下搜尋按鈕`">
        <i class='bx bx-save'></i>
      </empty-state>
      <Loader v-if="loading" style="margin-top: 80px" />
      <p-list-items single-row>
        <p-list-item v-for="item of searchResult" @click="loadLyric(item.lyric); searchDialog = false">
          <p-list-item-content
            :title="`${item.name}`"
            :description="`[${$t(`source.${item.source}`)}] ${item.artist}`" />
        </p-list-item>
      </p-list-items>
    </div>
  </Dialog>
</template>
<style lang="sass" scoped>
.fullscreen-player__lyric
  padding-bottom: 25vh
  .is-lyric-correct
    position: sticky
    top: 0
    z-index: 1
    border-radius: var(--border-radius)
    border: 1px solid rgba(var(--text-color-value), .1)
    background-color: var(--background-layer-1)
    display: flex
    // align-items: center
    gap: var(--padding)
    box-shadow: var(--box-shadow)
    transition: transform .2s ease, opacity .2s ease
    max-width: 512px
    margin: 0 auto
    &:not(.show)
      transform: translateY(-100%) scale(.95)
      transform-origin: top center
      opacity: 0
      pointer-events: none
    .icon
      font-size: 36px
      display: inline-flex
      align-items: center
      justify-content: center
      padding: var(--padding) calc(var(--padding) * 2)
      border-radius: var(--border-radius) 0 0 var(--border-radius)
      background-color: var(--background-layer-2)
    .content
      flex: 1
      line-height: 1.5
      padding: var(--padding)
      .title
        font-size: 18px
        font-weight: bold
      .description
        font-size: 14px
        color: rgba(var(--text-color-value), .5)
      .actions
        margin-top: var(--padding)
        display: flex
        justify-content: flex-end
        gap: calc(var(--padding) / 2)
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
.lyric-search__header
  display: flex
  align-items: center
  gap: var(--padding)
.lyric-search__content
  height: 400px
  overflow-y: auto
</style>