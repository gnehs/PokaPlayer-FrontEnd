<template>
  <div class="p-cards">
    <slot />
  </div>
</template>
<style lang="sass" scoped>
.p-cards
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(var(--min-card-width), 1fr))
  gap: calc(var(--padding) * 2)
</style>