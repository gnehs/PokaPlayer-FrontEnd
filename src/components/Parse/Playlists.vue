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
      :imgSrc="item.image"
      :title="item.name"
      :source="$t(`source.${item.source}`)"
      :to="`/playlist/${item.source}/${item.id}`" />
  </p-cards>
</template>