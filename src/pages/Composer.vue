<template>
  <div>
    <poka-header :title="$t('composer')" />
    <library-menu />
    <v-slide-y-reverse-transition>
      <poka-parse-composers v-if="data" :data="data.composers" />
    </v-slide-y-reverse-transition>
    <poka-loader v-if="!data" />
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