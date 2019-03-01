<template>
  <div>
    <poka-header
      :title="$t('header_welcome')"
      :subtitle="$t('header_version',{version:poka_version})"
    />
    <poka-parse-multiple :data="data"/>
  </div>
</template>

<script>
export default {
  name: "Home",
  created() {
    this.axios.get(_setting(`server`) + "/pokaapi/home/").then(response => {
      this.data = response.data;
    });
    this.axios.get(_setting(`server`) + "/info/").then(response => {
      this.poka_version = response.data.version;
    });
  },
  data() {
    return {
      data: null,
      poka_version: null
    };
  }
};
</script>
