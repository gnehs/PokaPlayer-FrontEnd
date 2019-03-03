<template>
  <div>
    <poka-header
      :title="title||$t('loading')"
      :subtitle="$t('playlist')"
      :blurbg="true"
      :bg="server+cover||null"
    />
    <poka-parse-songs v-if="data" :data="data.songs"/>
    <poka-loader v-else/>
  </div>
</template>

<script>
export default {
  name: "PlaylistSongs",
  created() {
    let source = encodeURIComponent(this.$route.params.source);
    let playlistId = encodeURIComponent(this.$route.params.id);
    let server = this.server;
    this.axios
      .get(
        `${server}/pokaapi/playlistSongs/?moduleName=${source}&id=${playlistId}`
      )
      .then(response => {
        this.data = response.data;
        this.title = this.data.playlists[0].name;
        this.cover = this.data.playlists[0].image;
      });
  },
  data: () => ({
    data: null,
    title: null,
    cover: _setting(`randomImgSource`),
    server: _setting(`server`)
  })
};
</script>