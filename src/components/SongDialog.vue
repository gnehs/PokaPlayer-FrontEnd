<script setup>
import { computed } from 'vue'

import { storeToRefs } from 'pinia'
import { useFullscreenPlayerStore } from '@/stores/fullscreenPlayer'
const fullscreenPlayerStore = useFullscreenPlayerStore()
const { show } = storeToRefs(fullscreenPlayerStore)

const emit = defineEmits(['update:modelValue'])
const props = defineProps({ modelValue: Object })
const showDialog = computed({
  get() {
    return !!props.modelValue
  },
  set() {
    emit('update:modelValue', null)
  }
})

function closeDialog() {
  show.value = false
  showDialog.value = false
}
</script>
<template>
  <Dialog v-model="showDialog" max-width="400px">
    <div class="song-info-dialog-content">
      <img :src="modelValue.cover" class="cover" />
      <div class="info">
        <div class="name">{{ modelValue.name }}</div>
        <div class="artist">{{ modelValue.artist }}</div>
      </div>
      <p-list-items single-row>
        <p-list-item
          :to="`/artist/${modelValue.source}/${modelValue.artistId}`"
          @click="closeDialog()"
          tabindex="0">
          <p-list-item-icon-btn>
            <i class='bx bx-microphone'></i>
          </p-list-item-icon-btn>
          <p-list-item-content
            :title="modelValue.artist"
            :description="$t(`nav.artists`)" />
          <template #actions>
            <p-list-item-icon-btn>
              <i class='bx bx-right-arrow-alt'></i>
            </p-list-item-icon-btn>
          </template>
        </p-list-item>
        <p-list-item
          :to="`/album/${modelValue.source}/${modelValue.albumId}`"
          @click="closeDialog()"
          tabindex="0">
          <p-list-item-icon-btn>
            <i class="nav-item-icon bx bx-album"></i>
          </p-list-item-icon-btn>
          <p-list-item-content
            :title="modelValue.album"
            :description="$t(`nav.albums`)" />
          <template #actions>
            <p-list-item-icon-btn>
              <i class='bx bx-right-arrow-alt'></i>
            </p-list-item-icon-btn>
          </template>
        </p-list-item>
        <p-list-item tabindex="0" v-if="modelValue.codec && modelValue.bitrate">
          <p-list-item-icon-btn>
            <i class='bx bx-file-blank'></i>
          </p-list-item-icon-btn>
          <p-list-item-content
            :title="`${modelValue.codec.toUpperCase()} ${modelValue.bitrate / 1000}k`"
            :description="$t(`songDialog.codec`)" />
        </p-list-item>
        <p-list-item tabindex="0" v-if="modelValue.year">
          <p-list-item-icon-btn>
            <i class='bx bx-time'></i>
          </p-list-item-icon-btn>
          <p-list-item-content
            :title="modelValue.year.toString()"
            :description="$t(`songDialog.year`)" />
        </p-list-item>
        <p-list-item tabindex="0" v-if="modelValue.source">
          <p-list-item-icon-btn>
            <i class='bx bx-data'></i>
          </p-list-item-icon-btn>
          <p-list-item-content
            :title="$t(`source.${modelValue.source}`)"
            :description="$t(`songDialog.source`)" />
        </p-list-item>
        <p-list-item tabindex="0" v-if="modelValue.id">
          <p-list-item-icon-btn>
            <i class='bx bx-tag'></i>
          </p-list-item-icon-btn>
          <p-list-item-content
            :title="modelValue.id"
            :description="$t(`songDialog.id`)" />
        </p-list-item>
      </p-list-items>
    </div>
  </Dialog>
</template>
<style lang="sass" scoped>
.song-info-dialog-content
  .cover
    width: 100%
    display: block
    max-width: 240px
    margin: 0 auto
    aspect-ratio: 1/1
    border-radius: var(--border-radius)
    border: 1px solid var(--background-layer-2)
  .info
    text-align: center
    font-size: 16px
    margin: var(--padding) 0
    .name
      font-weight: bold
    .artist
      opacity: .5

</style>