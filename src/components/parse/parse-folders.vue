<template>
  <div class="poka two list">
    <router-link
      class="item"
      v-for="{ name, id, source } in data"
      :key="id"
      :to="`/folder/${encodeURIComponent(source)}/${encodeURIComponent(id || 'unknown')}`"
      v-ripple
    >
      <div class="content">
        <v-icon class="bx" :color="$vuetify.theme.isDark ? '#FFF' : 'primary'">bx-folder</v-icon>
        <div class="header">
          <div class="head t-ellipsis">{{ name }}</div>
          <div class="t-ellipsis">{{ $t(`source.${source}`) }}</div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="sass" scoped>
.poka.list
  .item
    overflow: hidden
</style>
<script>
export default {
  name: 'poka-parse-folders',
  props: ['data'],
  data: () => ({
    server: _setting(`server`)
  })
}
</script>
