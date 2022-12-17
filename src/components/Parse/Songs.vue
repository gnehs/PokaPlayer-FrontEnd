<script setup>

import { ref, inject } from 'vue'
const player = inject('Player')
const songInfo = ref(null)
const showSongDialog = ref(false)
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  currentIndex: {
    type: Number,
    default: -1
  }
})
function selectSong(index) {
  player.addSongs({ songs: props.items, index })
}

</script>
<template>
  <p-list-items :singleRow="currentIndex != -1" v-if="items.length">
    <p-list-item v-for="(item, i) of items"
      @click="selectSong(i)"
      @keydown.enter="selectSong(i)"
      :active="i == currentIndex"
      :data-index="i"
      :tabindex="0"
      @contextmenu.prevent="songInfo = item; showSongDialog = true">
      <p-list-item-img :src="item.cover" />
      <p-list-item-content
        :title="item.name"
        :description="item.artist" />
      <template #actions>
        <p-list-item-icon-btn @click.stop="player.addSongs({ songs: [item], clear: false })" v-if="currentIndex == -1">
          <i class='bx bx-plus'></i>
        </p-list-item-icon-btn>
      </template>
    </p-list-item>
  </p-list-items>
  <song-dialog v-model="showSongDialog" :item="songInfo" />
</template>