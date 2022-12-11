<script setup>
const props = defineProps({
  items: Array
})
</script>
<template>
  <template v-for="item of items">
    <template v-for="[type, data] of Object.entries(item).filter(([t, d]) => !['title', 'source', 'icon'].includes(t) && d.length)">
      <div class="home-item">
        <div class="home-item__header">
          <h3 class="home-item__title">{{ $t(`home.${item.title}`) }}</h3>
          <p class="home-item__type">{{ $t(`nav.${type}`) }}</p>
        </div>
        <parse-albums :items="data" v-if="type == 'albums'" />
        <parse-playlists :items="data" v-if="type == 'playlists'" />
        <parse-artists :items="data" :type="type" v-if="['composers', 'artists'].includes(type)" />
      </div>
    </template>
  </template>
</template>
<style lang="sass" scoped>
.home-item
  margin-bottom: calc(var(--padding) * 4)
  .home-item__header
    margin-bottom: calc(var(--padding) * 1)
</style>