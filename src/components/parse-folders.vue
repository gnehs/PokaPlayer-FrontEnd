<template>
  <poka-cards>
    <poka-card
      v-for="{name, cover, id, source} in data"
      :key="id"
      :poka-bg="cover?server+cover:false"
      :poka-title="name"
      :poka-subtitle="source"
    />
  </poka-cards>
</template>

<script>
export default {
  name: "poka-parse-folders",
  props: ["data"],
  data: () => ({
    server: _setting(`server`)
  })
};
</script>
