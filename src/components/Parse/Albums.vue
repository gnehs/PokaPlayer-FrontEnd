<script setup>
const props = defineProps({
  items: Array
})
</script>
<template>
  <p-cards>
    <p-card
      v-for="item of items"
      :key="item.id"
      :imgSrc="item.cover"
      :title="item.name"
      :description="item.artist"
      :source="$t(`source.${item.source}`)"
      :to="`/album/${item.source}/${item.id}`" />
  </p-cards>
</template>
