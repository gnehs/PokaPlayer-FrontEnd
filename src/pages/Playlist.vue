<template>
  <div>
    <h1>{{ msg }}</h1>
    <pre>{{ data }}</pre>
  </div>
</template>

<script>
export default {
  name: "Playlist",
  created() {
    this.axios
      .get(localStorage.BASE_URL + "pokaapi/playlists/")
      .then(response => {
        this.data = response.data;
      });
  },
  data: () => ({
    msg: "Playlist",
    data: null
  })
};
</script>