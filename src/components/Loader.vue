<template>
  <div class="loader" aria-label="Loading">
    <div class="loader__spinner" />
  </div>
</template>
<style lang="sass" scoped>
.loader
  display: flex
  align-items: center
  justify-content: center
  margin-top: 30vh
  .loader__spinner
    width: 40px
    height: 40px
    border: 4px solid transparent
    border-top-color: var(--primary-color)
    border-radius: 50%
    animation: spin .5s linear infinite
    @keyframes spin
      to
        transform: rotate(360deg)
</style>