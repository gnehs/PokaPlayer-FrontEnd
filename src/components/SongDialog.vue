<script setup>
import { computed, ref } from 'vue'

import { storeToRefs } from 'pinia'
import { useFullscreenPlayerStore } from '@/stores/fullscreenPlayer'
const fullscreenPlayerStore = useFullscreenPlayerStore()
const { show } = storeToRefs(fullscreenPlayerStore)

const emit = defineEmits(['update:modelValue'])
const props = defineProps({ modelValue: Boolean, item: Object })
const showDialog = computed({
  get() {
    return props.modelValue
  },
  set() {
    emit('update:modelValue', null)
  }
})
const addToPlaylistDialog = ref(false)
function closeDialog() {
  show.value = false
  showDialog.value = false
}
</script>
<template>
  <Dialog v-model="showDialog" max-width="400px">
    <div class="song-info-dialog-content">
      <img :src="item.cover" class="cover" />
      <div class="info">
        <div class="name">{{ item.name }}</div>
        <div class="artist">{{ item.artist }}</div>
      </div>
      <p-list-items single-row>
        <p-list-item
          @click="addToPlaylistDialog = true"
          tabindex="0">
          <p-list-item-icon-btn>
            <i class='bx bx-list-plus'></i>
          </p-list-item-icon-btn>
          <p-list-item-content
            :title="$t(`songDialog.addToPlaylist`)" />
        </p-list-item>
        <p-list-item
          :to="item.artistId ? `/artist/${item.source}/${item.artistId}` : undefined"
          @click="item.artistId && closeDialog()"
          tabindex="0">
          <p-list-item-icon-btn>
            <i class='bx bx-microphone'></i>
          </p-list-item-icon-btn>
          <p-list-item-content
            :title="item.artist"
            :description="$t(`nav.artists`)" />
          <template #actions>
            <p-list-item-icon-btn v-if="item.artistId">
              <i class='bx bx-right-arrow-alt'></i>
            </p-list-item-icon-btn>
          </template>
        </p-list-item>
        <p-list-item
          :to="item.albumId ? `/album/${item.source}/${item.albumId}` : undefined"
          @click="item.albumId && closeDialog()"
          tabindex="0">
          <p-list-item-icon-btn>
            <i class="nav-item-icon bx bx-album"></i>
          </p-list-item-icon-btn>
          <p-list-item-content
            :title="item.album"
            :description="$t(`nav.albums`)" />
          <template #actions>
            <p-list-item-icon-btn v-if="item.albumId">
              <i class='bx bx-right-arrow-alt'></i>
            </p-list-item-icon-btn>
          </template>
        </p-list-item>
        <p-list-item tabindex="0" v-if="item.codec && item.bitrate">
          <p-list-item-icon-btn>
            <i class='bx bx-file-blank'></i>
          </p-list-item-icon-btn>
          <p-list-item-content
            :title="`${item.codec.toUpperCase()} ${item.bitrate / 1000}k`"
            :description="$t(`songDialog.codec`)" />
        </p-list-item>
        <p-list-item tabindex="0" v-if="item.year">
          <p-list-item-icon-btn>
            <i class='bx bx-time'></i>
          </p-list-item-icon-btn>
          <p-list-item-content
            :title="item.year.toString()"
            :description="$t(`songDialog.year`)" />
        </p-list-item>
        <p-list-item tabindex="0" v-if="item.source">
          <p-list-item-icon-btn>
            <i class='bx bx-data'></i>
          </p-list-item-icon-btn>
          <p-list-item-content
            :title="$t(`source.${item.source}`)"
            :description="$t(`songDialog.source`)" />
        </p-list-item>
        <p-list-item tabindex="0" v-if="item.id">
          <p-list-item-icon-btn>
            <i class='bx bx-tag'></i>
          </p-list-item-icon-btn>
          <p-list-item-content
            :title="item.id"
            :description="$t(`songDialog.id`)" />
        </p-list-item>
      </p-list-items>
      <div style="display: flex;justify-content: flex-end;margin-top: var(--padding);">
        <p-btn
          @click="showDialog = false"
          color="primary">
          {{ $t('close') }}
        </p-btn>
      </div>
    </div>
  </Dialog>
  <playlist-dialog v-model="addToPlaylistDialog" :item="item" />
</template>
<style lang="sass" scoped>
.song-info-dialog-content
  .cover
    width: 100%
    display: block
    max-width: 240px
    margin: 0 auto
    aspect-ratio: 1/1
    object-fit: cover
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