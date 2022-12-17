<script setup>
import { computed, inject, watch, onMounted, ref } from 'vue'
const PokaAPI = inject('PokaAPI')
const emit = defineEmits(['update:modelValue'])
const props = defineProps({ modelValue: Boolean, item: Object })
const parsedItem = computed(() => props.item?.originalObject || props.item)
const showDialog = computed({
  get() {
    return !!props.modelValue
  },
  set() {
    emit('update:modelValue', null)
  }
})
const playlists = ref(null)
const loading = ref(false)
async function getPlaylist() {
  loading.value = true
  playlists.value = await PokaAPI.checkSongExistInPlaylist(parsedItem.value)
  loading.value = false
}
async function toggleSong(playlistId) {
  if (parsedItem.value) {
    loading.value = true
    playlists.value = playlists.value.map(item => {
      if (item.id === playlistId) {
        item.exist = !item.exist
      }
      return item
    })
    await PokaAPI.toggleSongInPlaylist(parsedItem.value, playlistId)
    await getPlaylist()
  }
}
onMounted(() => {
  if (!parsedItem.value) return
  getPlaylist()
})
watch(parsedItem, () => {
  getPlaylist()
})
</script>
<template>
  <Dialog v-model="showDialog" max-width="400px">
    <h3 style="margin-bottom: calc(var(--padding) * 2)">{{ $t(`songDialog.addToPlaylist`) }}</h3>
    <Loader v-if="playlists === null" style="margin-top: calc(var(--padding) * 2)" />
    <p-list-items single-row>
      <p-list-item tabindex="0" v-for="item of playlists" @click="toggleSong(item.id)">
        <p-list-item-icon-btn>
          <i class='bx bxs-checkbox-checked' v-if="item.exist"></i>
          <i class='bx bx-checkbox' v-else></i>
        </p-list-item-icon-btn>
        <p-list-item-content :title="item.name" />
      </p-list-item>
    </p-list-items>
    <div style="display: flex;justify-content: flex-end;margin-top: var(--padding);">
      <p-btn
        @click="showDialog = false"
        color="primary">
        {{ $t('close') }}
      </p-btn>
    </div>
  </Dialog>
</template>