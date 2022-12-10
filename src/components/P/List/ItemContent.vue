
<script setup>
const props = defineProps({
  title: String,
  description: String,
})
</script>
<template>
  <div class="p-list-item__content-content">
    <div class="p-list-item__content-title">
      {{ title }}
    </div>
    <div class="p-list-item__content-description">
      {{ description }}
    </div>
  </div>
</template>