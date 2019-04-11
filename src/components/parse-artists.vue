<template>
  <poka-cards>
    <poka-card
      v-for="{name, cover, id, source} in data"
      :key="id"
      :to="`/artist/${encodeURIComponent(source)}/${encodeURIComponent(id||'unknown')}`"
      :poka-bg="cover||false"
      :poka-title="name||'未知'"
      :poka-subtitle="source"
    />
  </poka-cards>
</template>

<script>
export default {
  name: "poka-parse-artists",
  props: ["data"],
  data: () => ({
    server: _setting(`server`)
  })
};
</script>
