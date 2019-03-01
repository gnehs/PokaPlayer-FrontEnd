<template>
  <div>
    <poka-header :title="$t('folder')"/>
    <poka-parse-folders v-if="data" :data="data.folders"/>
    <poka-loader v-else/>
  </div>
</template>

<script>
export default {
  name: "Folder",
  created() {
    this.axios.get(_setting(`server`) + "/pokaapi/folders/").then(response => {
      this.data = response.data;
    });
  },
  data: () => ({
    data: null,
    server: _setting(`server`)
  })
};
</script>