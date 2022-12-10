<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
const $route = useRoute();
const $PokaAPI = getCurrentInstance().appContext.config.globalProperties.$PokaAPI;
const albumData = ref(null);
const yearMeta = ref(null);
onMounted(async () => {
  albumData.value = await $PokaAPI.getAlbum($route.params.source, $route.params.id)
  let years = albumData.value.songs.map(x => x?.year).filter(x => x)
  if (years.length) {
    let startyear = Math.min(...years)
    let endyear = Math.max(...years)
    if (startyear == endyear) {
      yearMeta.value = startyear
    } else {
      yearMeta.value = `${startyear} - ${endyear}`
    }
  }
});
</script>
<template>
  <div v-if="albumData">
    <Teleport to="#header-center">
      <p> {{ albumData.name }} <br /><small style="opacity: 0.5">專輯</small></p>
    </Teleport>
    <div class="header">
      <div class="cover">
        <img :src="albumData.cover" />
      </div>
      <div class="album-info">
        <div class="title">
          {{ albumData.name }}
        </div>
        <div class="artist">
          {{ albumData.artist }}
        </div>
        <div class="meta">
          <span>專輯</span>
          <span v-if="yearMeta">{{ yearMeta }}</span>
          <span>{{ albumData.songs.length }} 首歌曲</span>
        </div>
        <div class="actions">
          <p-btn><i class='bx bx-play'></i> 全部播放</p-btn>
          <p-btn><i class='bx bx-shuffle'></i> 隨機播放</p-btn>
        </div>
      </div>
    </div>
  </div>
  <Loader v-else />
  <pre>
    {{ albumData }}
  </pre>
</template>
<style lang="sass" scoped>
.header
  display: flex
  gap: calc(var(--padding) * 2)
  .cover
    width: 200px
    height: 200px
    img
      width: 100%
      height: 100%
      object-fit: cover
      aspect-ratio: 1/1
      border-radius: var(--border-radius)
      border: 1px solid var(--background-layer-2)
  .album-info
    display: flex
    flex-direction: column
    .title
      font-size: 1.75rem
      font-weight: bold
      margin: calc(var(--padding) / 2) 0
    .artist
      font-size: 1.5rem
      color: var(--text-color)
      opacity: 0.75
    .meta
      display: flex
      margin-top: calc(var(--padding))
      span
        font-size: 0.75rem
        color: var(--text-color)
        opacity: 0.5
        &:not(:last-child)
          &:after
            content: "·"
            margin: 0 calc(var(--padding) / 2)
    .actions
      flex: 1
      display: flex
      align-items: flex-end
      gap: var(--padding)
</style>