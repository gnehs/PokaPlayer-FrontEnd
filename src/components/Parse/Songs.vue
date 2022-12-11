<script setup>

import { inject } from 'vue'
const player = inject('Player')
const props = defineProps({
  items: Array
})

</script>
<template>
  <p-list-items>
    <p-list-item v-for="(item, i) of items" @click="player.addSongs(items, { index: i })">
      <p-list-item-img :src="item.cover" />
      <p-list-item-content
        :title="item.name"
        :description="item.artist" />
      <template #actions>
        <p-list-item-icon-btn>
          <i class='bx bx-plus'></i>
        </p-list-item-icon-btn>
      </template>
    </p-list-item>
  </p-list-items>
</template>