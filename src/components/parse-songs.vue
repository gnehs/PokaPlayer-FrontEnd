<template>
  <poka-cards>
    <poka-card
      v-for="{name, cover, id, source, artist} in data"
      :key="id"
      :poka-bg="cover?server+cover:false"
      :poka-title="name||'未知'"
      :poka-subtitle="artist"
    />
  </poka-cards>
</template>

<script>
export default {
  name: "poka-parse-songs",
  props: ["data"],
  data: () => ({
    server: _setting(`server`)
  })
};
</script>
