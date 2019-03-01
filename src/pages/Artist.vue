<template>
  <div>
    <poka-header :title="$t('artist')"/>
    <poka-parse-artists v-if="data" :data="data.artists"/>
    <poka-loader v-else/>
  </div>
</template>

<script>
export default {
  name: "Artist",
  created() {
    this.axios.get(_setting(`server`) + "/pokaapi/artists/").then(response => {
      this.data = response.data;
    });
  },
  data: () => ({
    data: null,
    server: _setting(`server`)
  })
};
</script>