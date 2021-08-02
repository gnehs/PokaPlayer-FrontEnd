<template>
  <div class="poka-loader">
    <i class="bx bx-loader bx-spin bx-md"></i>
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
