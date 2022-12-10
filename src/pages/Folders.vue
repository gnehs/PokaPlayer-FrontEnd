
<script setup>
import { ref, onMounted, getCurrentInstance, watch } from 'vue'
import { useRoute } from 'vue-router'
const $route = useRoute();
const $PokaAPI = getCurrentInstance().appContext.config.globalProperties.$PokaAPI
const data = ref(null)

onMounted(async () => {
  await getData()
})
watch(() => $route.path, async () => {
  await getData()
}, { deep: true })
async function getData() {
  let source = $route.params?.source
  let id = $route.params?.id
  data.value = null
  data.value = await $PokaAPI.getFolders(source, id)
}
</script>
<template>
  <div v-if="data">
    <div v-if="data.songs.length">
      <h4>Songs</h4>
      <parse-songs :items="data.songs" />
    </div>
    <div v-if="data.folders.length">
      <h4>Folders</h4>
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