<template>
  <div>
    <poka-header :title="name" :subtitle="$t('artist')" :blurbg="true" :bg="server+cover||null"/>
    <poka-parse-albums v-if="data" :data="data.albums"/>
    <poka-loader v-else/>
  </div>
</template>

<script>
export default {
  name: "ArtistAlbum",
  created() {
    let ArtistId =
      this.$route.params.id == "unknown" ? "" : this.$route.params.id;
    let ArtistSource = this.$route.params.source;
    //取得專輯資料
    let url = `${
      this.server
    }/pokaapi/artistAlbums/?moduleName=${encodeURIComponent(
      ArtistSource
    )}&id=${encodeURIComponent(ArtistId)}`;
    this.axios.get(url).then(response => {
      this.data = response.data;
    });
    //取得封面與名字
    this.axios
      .get(
        `/pokaapi/artist/?moduleName=${encodeURIComponent(
          ArtistSource
        )}&id=${encodeURIComponent(ArtistId)}`
      )
      .then(response => {
        this.cover = response.data.cover;
        this.name = response.data.name;
      });
  },
  data: () => ({
    data: null,
    cover: false,
    name: "",
    server: _setting(`server`)
  })
};
</script>