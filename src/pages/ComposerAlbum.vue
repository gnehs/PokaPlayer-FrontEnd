<template>
  <div>
    <poka-header
      :title="$route.params.id"
      :subtitle="$t('composer')"
      :blurbg="true"
      :bg="server+cover||null"
    />
    <poka-parse-albums v-if="data" :data="data.albums"/>
    <poka-loader v-else/>
  </div>
</template>

<script>
export default {
  name: "ComposerAlbum",
  created() {
    let ComposerId =
      this.$route.params.id == "unknown" ? "" : this.$route.params.id;
    if (this.$route.params.source == "DSM")
      this.cover = `/pokaapi/cover/?moduleName=${encodeURIComponent(
        this.$route.params.source
      )}&data=${encodeURIComponent(
        JSON.stringify({
          type: "composer",
          info: ComposerId
        })
      )}`;
    let url = `${
      this.server
    }/pokaapi/composerAlbums/?moduleName=${encodeURIComponent(
      this.$route.params.source
    )}&id=${encodeURIComponent(ComposerId)}`;
    this.axios.get(url).then(response => {
      this.data = response.data;
    });
  },
  data: () => ({
    data: null,
    cover: false,
    server: _setting(`server`)
  })
};
</script>