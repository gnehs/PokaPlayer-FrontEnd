<script setup>
const props = defineProps({
  title: String,
  description: String
})
</script>
<template>
  <div class="empty-state">
    <div class="empty-state__icon">
      <slot />
    </div>
    <div class="empty-state__title">
      {{ title }}
    </div>
    <div class="empty-state__description">
      {{ description }}
    </div>
  </div>
</template>
<style lang="sass" scoped>
.empty-state
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  text-align: center
  color: var(--text-color)
  .empty-state__icon
    font-size: 3rem
    margin-bottom: var(--padding)
  .empty-state__title
    font-size: 1.5rem
    margin-bottom: var(--padding)
  .empty-state__description
    font-size: 1rem
    color: var(--text-color)
    opacity: 0.75
</style>