<script setup>
import { ref, onMounted, inject, watch } from 'vue'
import { useRoute } from 'vue-router'

const $route = useRoute();
const PokaAPI = inject('PokaAPI')
const artistData = ref(null);
async function loadData() {
  artistData.value = null
  artistData.value = await PokaAPI[$route.meta.type == 'artists' ? 'getArtists' : 'getComposers']()
}

onMounted(async () => { await loadData() });
watch($route, async () => { await loadData() }, { deep: true })
</script>
<template>
  <Teleport to="#header-center">
    <p>{{ $t(`nav.${$route.meta.type}`) }}</p>
  </Teleport>
  <Loader v-if="!artistData" />
  <parse-artists v-else :items="artistData" :type="$route.meta.type" />
</template>