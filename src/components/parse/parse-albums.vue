<template>
  <div>
    <poka-cards>
      <poka-card
        v-for="{ name, artist, cover, id, source } in $pagination(data, page)"
        :key="id"
        :to="`/album/songs/${encodeURIComponent(source)}/${encodeURIComponent(id || 'unknown')}?cover=${encodeURIComponent(
          cover || false
        )}&name=${encodeURIComponent(name)}&artist=${encodeURIComponent(artist)}`"
        :poka-bg="cover || false"
        :poka-title="name"
        :poka-subtitle="artist"
        poka-icon="album"
        :source="$t(`source.${source}`)"
      />
    </poka-cards>
    <poka-pagination :length="$getPages(data)" v-model="page" />
  </div>
</template>

<script>
export default {
  name: 'poka-parse-albums',
  props: ['data'],
  data: () => ({
    server: _setting(`server`),
    page: 1
  })
}
</script>
