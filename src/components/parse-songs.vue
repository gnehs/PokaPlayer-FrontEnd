<template>
  <md-list class="md-double-line">
    <md-list-item v-for="{name, cover, id, source, artist} in data" :key="id">
      <md-avatar>
        <img :src="server+cover" alt="cover">
      </md-avatar>
      <div class="md-list-item-text">
        <span>{{name}}</span>
        <span>{{artist}}</span>
      </div>
      <md-button class="md-icon-button md-list-action">
        <md-icon>play_arrow</md-icon>
      </md-button>
    </md-list-item>
  </md-list>
</template>

<style lang="sass" scoped>
.md-list
    display: flex
    flex-wrap: wrap
    width: 100%
    flex-direction: row
    .md-list-item
        width: 50%
@media screen and (max-width: 600px) 
    .md-list
        .md-list-item
            width: 100%
</style>
<script>
export default {
  name: "poka-parse-songs",
  props: ["data"],
  data: () => ({
    server: _setting(`server`)
  })
};
</script>
