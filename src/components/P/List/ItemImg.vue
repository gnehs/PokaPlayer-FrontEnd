
<script setup>
const props = defineProps({
  src: String,
  alt: String,
})
</script>
<template>
  <div class="p-list-item__img">
    <img :src="src" :alt="alt" />
  </div>
</template>