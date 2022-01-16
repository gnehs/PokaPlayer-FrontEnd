<template>
  <div class="config-cards">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'config-cards'
}
</script>
<style lang="sass">

.config-cards
  display: grid
  grid-template-columns: repeat(4,1fr)
  grid-gap: 16px
  margin-top: 16px
  margin-bottom: 16px
  @media (max-width: 768px)
    grid-template-columns: repeat(2,1fr)
</style>