<template>
  <md-list class="md-double-line">
    <md-list-item
      v-for="{name, image, id, source} in data"
      :key="id"
      :to="`/folder/${encodeURIComponent(source)}/${encodeURIComponent(id||'unknown')}`"
    >
      <md-icon class="md-primary">folder</md-icon>
      <div class="md-list-item-text">
        <span>{{name}}</span>
        <span>{{source}}</span>
      </div>
    </md-list-item>
  </md-list>
</template>

<style lang="sass" scoped>
.md-list
    background-color: transparent
    .md-list-item
        border-radius: 8px
        overflow: hidden
</style>
<script>
export default {
  name: "poka-parse-folders",
  props: ["data"],
  data: () => ({
    server: _setting(`server`)
  })
};
</script>
