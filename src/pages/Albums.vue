<template>
  <div>
    <poka-header
      :title="name||$t('album')"
      :subtitle="name&&type!='album'?$t(type):null"
      :blurbg="type!='album'"
      :bg="cover"
    />
    <library-menu />
    <v-slide-y-reverse-transition>
      <poka-parse-albums v-if="data" :data="data.albums" />
    </v-slide-y-reverse-transition>
    <poka-loader v-if="!data" />
  </div>
</template>

<script>
export default {
  name: "Album",
  created() {
    this.fetchData();
  },
  watch: {
    "$route.path": function() {
      this.fetchData();
    }
  },
  data: () => ({
    data: null,
    cover: null,
    name: null,
    type: null,
    server: _setting(`server`)
  }),
  methods: {
    async fetchData() {
      this.type = this.$route.meta.type;
      this.data = null;
      this.cover = _setting(`headerBgSource`);

      let url,
        type = this.$route.meta.type;
      let { source, id } = this.$route.params;
      if (id == "unknown") id = "";

      if (type == "album") {
        url = _setting(`server`) + "/pokaapi/albums/";
      } else {
        this.name = "Loading...";
        url = `${
          this.server
        }/pokaapi/${type}Albums/?moduleName=${encodeURIComponent(
          source
        )}&id=${encodeURIComponent(id)}`;
      }
      this.data = (await this.axios.get(url)).data;

      this.name = "";
      //get name & cover
      this.axios
        .get(
          `/pokaapi/${type}/?moduleName=${encodeURIComponent(
            source
          )}&id=${encodeURIComponent(id)}`
        )
        .then(response => {
          this.cover = _setting(`server`) + response.data.cover;
          this.name = response.data.name;
        });
    }
  }
};
</script>