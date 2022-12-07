<template>
  <button class="p-btn">
    <slot />
  </button>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    outline: {
      type: Boolean,
      default: false
    },
    text: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Boolean,
      default: false
    }
  }
}
</script>