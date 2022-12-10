<script setup>
const props = defineProps({
  singleRow: Boolean
})
</script>
<template>
  <div class="p-list-items" :class="{ 'single-row':  singleRow }">
    <slot />
  </div>
</template>
<style lang="sass" scoped>
.p-list-items
  display: grid
  grid-template-columns: repeat(2, 1fr)
  &.single-row
    grid-template-columns: 1fr
  @media screen and (max-width: 768px)
    grid-template-columns: 1fr
</style>