<template>
  <md-list class="md-double-line">
    <md-list-item v-for="(song,index) of data" :key="index" @click="addSongs(data,index)">
      <md-avatar>
        <img :src="server+song.cover" alt="cover">
      </md-avatar>
      <div class="md-list-item-text">
        <span>{{song.name}}</span>
        <span>{{song.artist}}</span>
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
  }),
  methods: {
    addSongs(songlist, index) {
      let playlist = [];
      for (let nowsong of songlist) {
        let src =
            this.server +
            nowsong.url +
            "&songRes=" +
            _setting(`audioQuality`).toLowerCase(),
          name = nowsong.name,
          artist = nowsong.artist,
          album = nowsong.album,
          cover = this.server + nowsong.cover,
          source = nowsong.source;
        playlist.push({
          url: src,
          cover: cover,
          name: name,
          artist: artist,
          album: album,
          id: nowsong.id,
          source: source
        });
      }
      _player.list.clear();
      _player.list.add(playlist);
      if (index) _player.list.switch(index);
      _player.play();
    }
  }
};
</script>
