<template>
  <poka-cards>
    <poka-card
      v-for="{name,artist, cover, id, source} in data"
      :key="id"
      :to="`/album/songs/${encodeURIComponent(source)}/${encodeURIComponent(id||'unknown')}`"
      :poka-bg="cover?server+cover:false"
      :poka-title="name"
      :poka-subtitle="artist"
      :source="source"
    />
  </poka-cards>
</template>

<script>
export default {
  name: "poka-parse-albums",
  props: ["data"],
  data: () => ({
    server: _setting(`server`)
  })
};
</script>
