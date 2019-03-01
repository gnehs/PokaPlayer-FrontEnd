<template>
  <div class="poka-parse-multiple">
    <div v-for="(item,index) of data" :key="index">
      <md-divider v-if="index!=0"></md-divider>
      <h1 v-if="item.title">
        {{$t(item.title)}}
        <span class="md-headline">{{item.source}}</span>
      </h1>
      <md-tabs>
        <md-tab :md-label="$t('album')" v-if="item.albums&&item.albums.length>0">
          <poka-parse-albums :data="item.albums"/>
        </md-tab>
        <md-tab :md-label="$t('playlist')" v-if="item.playlists&&item.playlists.length>0">
          <poka-parse-playlists :data="item.playlists"/>
        </md-tab>
        <md-tab :md-label="$t('folder')" v-if="item.folders&&item.folders.length>0">
          <poka-parse-folders :data="item.folders"/>
        </md-tab>
        <md-tab :md-label="$t('composer')" v-if="item.composers&&item.composers.length>0">
          <poka-parse-composers :data="item.composers"/>
        </md-tab>
        <md-tab :md-label="$t('artist')" v-if="item.artists&&item.artists.length>0">
          <poka-parse-artists :data="item.artists"/>
        </md-tab>
      </md-tabs>
    </div>
  </div>
</template>
<style lang="sass" scoped>
.poka-parse-multiple
    --md-theme-default-background-on-background: transparent
.poka-parse-multiple>div
    margin-left: 16px
.poka-parse-multiple>div>h1
    font-size: 2em
    color: #000
</style>
<script>
export default {
  name: "poka-parse-multiple",
  props: ["data"],
  data: () => ({
    server: _setting(`server`)
  })
};
</script>