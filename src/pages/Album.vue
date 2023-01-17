<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
const PokaAPI = inject('PokaAPI')
const player = inject('Player')
const $route = useRoute();
const albumData = ref(null);
onMounted(async () => {
  if ($route.meta.type == 'album') {
    albumData.value = await PokaAPI.getAlbum($route.params.source, $route.params.id)
  }
  if ($route.meta.type == 'playlist') {
    albumData.value = await PokaAPI.getPlaylist($route.params.source, $route.params.id)
  }
});
function playAll(shuffle = false) {
  player.audioOrder = shuffle ? 'random' : 'list'
  let index = shuffle ? Math.floor(Math.random() * albumData.value.songs.length) : 0
  player.addSongs({ songs: albumData.value.songs, index })
}

</script>
<template>
  <div v-if="albumData">
    <Teleport to="#header-center">
      <p> {{ albumData.name ?? albumData.playlists[0].name }} <br /><small style="opacity: 0.5">{{ $t(`nav.${$route.meta.type}s`) }}</small></p>
    </Teleport>
    <div class="header">
      <div class="cover">
        <img :src="(albumData.cover ?? albumData.playlists[0].cover)" />
      </div>
      <div class="album-info">
        <div class="title">
          {{ albumData.name ?? albumData.playlists[0].name }}
        </div>
        <router-link class="artist" :to="`/artist/${$route.params.source}/${albumData.artistId}`">
          {{ albumData.artist }}
        </router-link>
        <div class="meta">
          <span>{{ $t(`nav.${$route.meta.type}s`) }}</span>
          <span>{{ $t(`songs`, albumData.songs.length, { count: albumData.songs.length }) }}</span>
          <span>{{ $t(`source.${$route.params.source}`) }}</span>
        </div>
        <div class="actions">
          <p-btn @click="playAll()"><i class='bx bx-play'></i> {{ $t('album.playAll') }}</p-btn>
          <p-btn outline @click="playAll(true)"> <i class='bx bx-shuffle'></i> {{ $t('album.playAllShuffle') }}</p-btn>
          <div class="spacer" />
          <pin-btn
            :name="albumData.name ?? albumData.playlists[0].name"
            :cover="albumData.cover ?? albumData.playlists[0].cover"
            :artist="albumData.artist"
            :id="$route.params.id"
            :source="$route.params.source"
            :type="$route.meta.type" />
        </div>
      </div>
    </div>
    <parse-songs :items="albumData.songs" />
  </div>
  <Loader v-else />
</template>
<style lang="sass" scoped>
.header
  display: flex
  gap: calc(var(--padding) * 2)
  padding-bottom: calc(var(--padding) * 2)
  margin-bottom: calc(var(--padding) * 2)
  border-bottom: 1px solid var(--background-layer-2)
  @media (max-width: 768px)
    flex-direction: column
    gap: calc(var(--padding))
    align-items: center
    text-align: center
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
    flex: 1
    width: 100%
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
      @media (max-width: 768px)
        justify-content: center
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
      margin-top: calc(var(--padding))
      @media (max-width: 768px)
        justify-content: flex-end
        flex-wrap: wrap
        flex-direction: row
      .spacer
        flex: 1
.p-list-items
  margin: 0 calc(var(--padding) * -1)
  margin-top: calc(var(--padding) * 2)
</style>