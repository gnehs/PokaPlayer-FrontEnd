<template>
  <div>
    <poka-header :title="$t('composer')"/>
    <poka-parse-composers v-if="data" :data="data.composers"/>
    <poka-loader v-else/>
  </div>
</template>

<script>
export default {
  name: "Composer",
  created() {
    this.axios
      .get(_setting(`server`) + "/pokaapi/composers/")
      .then(response => {
        this.data = response.data;
      });
  },
  data: () => ({
    data: null,
    server: _setting(`server`)
  })
};
</script>