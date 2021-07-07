<template>
  <div>
    <poka-header :title="$t('folder')" />
    <v-slide-y-reverse-transition>
      <v-btn @click="goBack" v-show="!$route.meta.root" style="margin-bottom: 16px">
        <v-icon>arrow_back</v-icon>
        {{$t('back')}}
      </v-btn>
    </v-slide-y-reverse-transition>
    <v-slide-y-reverse-transition>
      <poka-parse-folders v-if="data" :data="data.folders" />
    </v-slide-y-reverse-transition>
    <v-slide-y-reverse-transition>
      <poka-parse-songs v-if="data" :data="data.songs" />
    </v-slide-y-reverse-transition>
    <poka-loader v-if="!data" />
  </div>
</template>

<script>
export default {
  name: "Folder",
  created() {
    this.fetchData();
  },
  data: () => ({
    data: null,
    server: _setting(`server`)
  }),
  watch: {
    "$route.path": function(val, oldVal) {
      this.fetchData();
    }
  },
  methods: {
    async fetchData() {
      this.data = null;
      let url = this.server + "/pokaapi/";
      if (this.$route.meta.root) {
        url += "folders/";
      } else {
        let source = encodeURIComponent(this.$route.params.source);
        let foldertId = encodeURIComponent(this.$route.params.id);
        url += `folderFiles/?moduleName=${source}&id=${foldertId}`;
      }
      this.axios.get(url).then(response => {
        this.data = response.data;
      });
    },
    goBack() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push("/folder");
    }
  }
};
</script>