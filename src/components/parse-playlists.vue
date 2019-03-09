<template>
  <poka-cards>
    <poka-card
      v-for="{name, image, id, source} in data"
      :key="id"
      :to="`/playlist/${encodeURIComponent(source)}/${encodeURIComponent(id||'unknown')}`"
      :poka-bg="image?server+image:false"
      :poka-title="name"
      :poka-subtitle="source"
      :source="source"
    />
  </poka-cards>
</template>

<script>
export default {
  name: "poka-parse-playlists",
  props: ["data"],
  data: () => ({
    server: _setting(`server`)
  })
};
</script>
