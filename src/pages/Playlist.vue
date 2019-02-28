<template>
  <div>
    <poka-header :title="$t('playlist')"/>
    <poka-parse-playlists v-if="data" :playlist="data.playlists"/>
    <poka-loader v-else/>
  </div>
</template>

<script>
export default {
  name: "Playlist",
  created() {
    this.axios.get(_setting(`server`) + "pokaapi/playlists/").then(response => {
      this.data = response.data;
    });
  },
  data: () => ({
    data: null,
    server: _setting(`server`).replace(/\/$/, "") // remove last "/"
  })
};
</script>