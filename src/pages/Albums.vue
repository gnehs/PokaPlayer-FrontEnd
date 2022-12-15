<script setup>
import { ref, onMounted, inject, watch } from 'vue'
import { useRoute } from 'vue-router'
const PokaAPI = inject('PokaAPI')
const $route = useRoute();
const albums = ref(null)
const artistInfo = ref(null)

onMounted(async () => {
  await getData()
})
watch(() => $route.path, async () => {
  await getData()
})
async function getData() {
  let data
  albums.value = null
  switch ($route.meta.type) {
    case 'artists':
      data = await PokaAPI.getArtistAlbums($route.params.source, $route.meta.type, $route.params.id)
      artistInfo.value = await PokaAPI.getArtistInfo($route.params.source, `artist`, $route.params.id)
      break
    case 'composers':
      data = await PokaAPI.getArtistAlbums($route.params.source, $route.meta.type, $route.params.id)
      artistInfo.value = await PokaAPI.getArtistInfo($route.params.source, `composer`, $route.params.id)
      break
    case 'albums':
      data = await PokaAPI.getAlbums()
      break
  }
  albums.value = data?.albums
}
</script>

<template>
  <div>
    <Teleport to="#header-center">
      <p v-if="artistInfo"> {{ artistInfo.name }} <br /><small style="opacity: 0.5">{{ $t(`nav.${$route.meta.type}`) }}</small></p>
      <p v-else>{{ $t(`nav.${$route.meta.type}`) }}</p>
    </Teleport>
    <Loader v-if="!albums" />
    <parse-albums v-else :items="albums" />
  </div>
</template>