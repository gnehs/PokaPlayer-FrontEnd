<script setup>
const props = defineProps({
  items: Array,
  type: {
    type: String,
    default: 'artists'
  }
})
</script>
<template>
  <p-cards>
    <p-card
      v-for="item of items"
      :key="item.id"
      :imgSrc="item.cover"
      :title="item.name"
      :source="$t(`source.${item.source}`)"
      :to="`/${type.slice(0, -1)}/${item.source}/${item.id}`" />
  </p-cards>
</template>