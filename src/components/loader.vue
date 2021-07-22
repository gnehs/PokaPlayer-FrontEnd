<template>
  <div class="poka-loader">
    <v-progress-circular indeterminate :color="color" />
  </div>
</template>

<script>
export default {
  name: 'poka-loader',
  props: {
    color: {
      type: String,
      default: 'primary'
    }
  }
}
</script>
<style lang="sass" scoped>
.poka-loader
  text-align: center
  margin-top: 8px
  display: grid
  place-content: center
</style>
