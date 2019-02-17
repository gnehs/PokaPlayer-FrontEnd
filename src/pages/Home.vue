<template>
  <div>
    <headerWrapper
      :title="$t('header_welcome')"
      :subtitle="$t('header_version',{version:poka_version})"
    />
    <h1>{{ msg }}</h1>
    <pre>{{ data }}</pre>
  </div>
</template>

<script>
import headerWrapper from "@/components/header-wrapper";
export default {
  name: "Home",
  created() {
    this.axios.get(localStorage.BASE_URL + "pokaapi/home/").then(response => {
      this.data = response.data;
    });
    this.axios.get(localStorage.BASE_URL + "info/").then(response => {
      this.poka_version = response.data.version;
    });
  },
  components: {
    headerWrapper
  },
  data() {
    return {
      msg: "首頁",
      data: null,
      poka_version: null
    };
  }
};
</script>
