<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue'
const isPinned = ref(false)
const loading = ref(true)
const props = defineProps({
  source: String,
  id: String,
  name: String,
  cover: String,
  artist: String,
  type: String,
})
const PokaAPI = inject('PokaAPI')
async function getPinStatus() {
  if (props.name) {
    let data = await PokaAPI.getPinStatus({
      source: props.source,
      id: props.id,
      name: props.name,
      type: props.type,
    })
    isPinned.value = data
  }
  loading.value = false
}
async function pin() {
  isPinned.value = true
  if (props.name) {
    await PokaAPI.pin({
      source: props.source,
      id: props.id,
      name: props.name,
      cover: props.cover,
      artist: props.artist,
      type: props.type,
    })
    await getPinStatus()
  }
}
async function unpin() {
  isPinned.value = false
  if (props.name) {
    await PokaAPI.unpin({
      source: props.source,
      id: props.id,
      name: props.name,
      cover: props.cover,
      artist: props.artist,
      type: props.type,
    })
    await getPinStatus()
  }
}
onMounted(async () => {
  await getPinStatus()
})
</script>
<template>
  <p-btn v-if="loading" outline> <i class='bx bx-loader bx-spin'></i>讀取中⋯</p-btn>
  <p-btn v-else-if="isPinned" outline @click="unpin"> <i class='bx bxs-pin'></i>取消釘選</p-btn>
  <p-btn v-else @click="pin"> <i class='bx bxs-pin'></i>釘選</p-btn>
</template>