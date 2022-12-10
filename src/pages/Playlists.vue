<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
const PokaAPI = inject('PokaAPI')
const $route = useRoute();
const playlists = ref(null);
onMounted(async () => {
  playlists.value = await PokaAPI.getPlaylists()
});
</script>
<template>
  <div v-if="playlists">
    <parse-playlists :items="playlists.playlists" />
  </div>
  <Loader v-else />
  <pre>{{ playlists }}</pre>
</template>