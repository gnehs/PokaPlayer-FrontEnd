<template>
  <div>
    <headerWrapper :title="$t('playlist')"/>
    <pre>{{ data }}</pre>
  </div>
</template>

<script>
import headerWrapper from "@/components/header-wrapper";
export default {
  name: "Playlist",
  created() {
    this.axios
      .get(localStorage.BASE_URL + "pokaapi/playlists/")
      .then(response => {
        this.data = response.data;
      });
  },
  components: {
    headerWrapper
  },
  data: () => ({
    data: null
  })
};
</script>