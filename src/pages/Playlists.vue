<script setup>
import { ref, onMounted, inject, watch } from 'vue'
import { useRoute } from 'vue-router'
const PokaAPI = inject('PokaAPI')
const $route = useRoute();
const playlists = ref(null);
onMounted(async () => {
  await getData()
});
watch(() => $route.path, async () => {
  await getData()
})
async function getData() {
  playlists.value = null
  let res = await PokaAPI.getPlaylists()
  if ($route.params?.id) res = res.playlistFolders.filter(p => p.id == $route.params.id)[0]
  playlists.value = res
}
</script>
<template>
  <Teleport to="#header-center">
    <p>{{ playlists?.name || $t(`nav.playlists`) }}</p>
  </Teleport>
  <div v-if="playlists">
    <div v-if="playlists.playlists?.length">
      <h4 style="margin-bottom: calc(var(--padding) * 2)">{{ playlists.name || $t(`nav.playlists`) }}</h4>
      <parse-playlists :items="playlists.playlists" />
    </div>
    <div v-if="playlists.playlistFolders?.length">
      <h4 style="margin: calc(var(--padding) * 2) 0">{{ $t(`nav.folders`) }}</h4>
      <p-list-items>
        <p-list-item v-for="item of playlists.playlistFolders" :to="`/playlists/folder/${item.id}`">
          <p-list-item-icon-btn>
            <i class='bx bx-folder'></i>
          </p-list-item-icon-btn>
          <p-list-item-content
            :title="item.name"
            :description="item.source" />
        </p-list-item>
      </p-list-items>
    </div>
  </div>
  <Loader v-else />
</template>