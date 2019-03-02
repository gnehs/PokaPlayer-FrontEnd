<template>
  <div>
    <poka-header
      :title="$route.params.id"
      :subtitle="$t('artist')"
      :blurbg="true"
      :bg="server+cover||null"
    />
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
    //取得封面
    if (ArtistSource == "DSM") {
      this.cover = `/pokaapi/cover/?moduleName=${encodeURIComponent(
        ArtistSource
      )}&data=${encodeURIComponent(
        JSON.stringify({
          type: "artist",
          info: ArtistId
        })
      )}`;
    } else {
      this.axios
        .get(
          `/pokaapi/artist/?moduleName=${encodeURIComponent(
            ArtistSource
          )}&id=${encodeURIComponent(ArtistId)}`
        )
        .then(response => {
          this.cover = response.data.cover;
        });
    }
  },
  data: () => ({
    data: null,
    cover: false,
    server: _setting(`server`)
  })
};
</script>