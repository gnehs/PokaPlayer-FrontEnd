<template>
  <poka-cards>
    <poka-card
      v-for="({name, image, id, source, type},index) in data"
      v-if="!type||type!='folder'"
      :key="index"
      :to="`/playlist/${encodeURIComponent(source)}/${encodeURIComponent(id||'unknown')}`"
      :poka-bg="image||false"
      :poka-title="name"
      :poka-subtitle="$t(`source.${source}`)"
      :source="$t(`source.${source}`)"
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
