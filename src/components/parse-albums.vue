<template>
  <poka-cards>
    <poka-card
      v-for="{name, artist, cover, id, source} in data"
      :key="id"
      :to="`/album/songs/${encodeURIComponent(source)}/${encodeURIComponent(id||'unknown')}?cover=${encodeURIComponent(cover||false)}&name=${encodeURIComponent(name)}&artist=${encodeURIComponent(artist)}`"
      :poka-bg="cover||false"
      :poka-title="name"
      :poka-subtitle="artist"
      poka-icon="album"
      :source="$t(`source.${source}`)"
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
