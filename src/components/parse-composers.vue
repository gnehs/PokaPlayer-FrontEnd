<template>
  <poka-cards>
    <poka-card
      v-for="{name, cover, id, source} in data"
      :key="id"
      :to="`/composer/${encodeURIComponent(source)}/${encodeURIComponent(id||'unknown')}`"
      :poka-bg="cover||false"
      :poka-title="name||'未知'"
      :poka-subtitle="source"
    />
  </poka-cards>
</template>

<script>
export default {
  name: "poka-parse-composers",
  props: ["data"],
  data: () => ({
    server: _setting(`server`)
  })
};
</script>
