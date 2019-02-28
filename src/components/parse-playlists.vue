<template>
  <poka-cards>
    <poka-card
      v-for="{name, image, id, source} in playlist"
      :key="id"
      :poka-bg="image?server+image:false"
      :poka-title="name"
      :poka-subtitle="source"
    />
  </poka-cards>
</template>

<script>
export default {
  name: "poka-parse-playlists",
  props: ["playlist"],
  data: () => ({
    server: _setting(`server`).replace(/\/$/, "") // remove last "/"
  })
};
</script>
