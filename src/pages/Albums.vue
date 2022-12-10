<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
const PokaAPI = inject('PokaAPI')
const $route = useRoute();
const albums = ref(null)

onMounted(async () => {
  let data
  switch ($route.meta.type) {
    case 'artists':
      data = await PokaAPI.getArtistAlbums($route.params.source, $route.meta.type, $route.params.id)
      break
    case 'composers':
      data = await PokaAPI.getArtistAlbums($route.params.source, $route.meta.type, $route.params.id)
      break
    case 'albums':
      data = await PokaAPI.getAlbums()
      break
  }
  albums.value = data.albums
})
</script>

<template>
  <div>
    <Teleport to="#header-center">
      <p>{{ $route.meta.type }}</p>
    </Teleport>
    <Loader v-if="!albums" />
    <parse-albums v-else :items="albums" />
  </div>
</template>