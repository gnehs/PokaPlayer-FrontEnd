
<script setup>
import { ref, onMounted, inject, watch } from 'vue'
import { useRoute } from 'vue-router'
const $route = useRoute();
const PokaAPI = inject('PokaAPI')
const data = ref(null)

onMounted(async () => {
  await getData()
})
watch(() => $route.path, async () => {
  await getData()
})
async function getData() {
  let source = $route.params?.source
  let id = $route.params?.id
  data.value = null
  data.value = await PokaAPI.getFolders(source, id)
}
</script>
<template>
  <Teleport to="#header-center">
    <p>{{ $t(`nav.folders`) }}</p>
  </Teleport>
  <div v-if="data">
    <div v-if="data.songs.length">
      <h4>{{ $t(`nav.songs`) }}</h4>
      <parse-songs :items="data.songs" />
    </div>
    <div v-if="data.folders.length">
      <h4>{{ $t(`nav.folders`) }}</h4>
      <p-list-items>
        <p-list-item v-for="item of data.folders" :to="`/folder/${item.source}/${item.id}`">
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