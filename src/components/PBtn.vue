<template>
  <button class="p-btn" :class="{outline,text,icon}" :color="color" v-bind="$attrs">
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
<style lang="sass" scoped>
.p-btn
  color: var(--text-color)
  background-color: var(--background-layer-2)
  padding: var(--padding)
  border: none
  border-radius: var(--border-radius)
  cursor: pointer
  transition: all var(--transition)
  &:hover
    background-color: var(--background-layer-3)
  &.outline
    background-color: transparent
    border: 1px solid var(--background-layer-2)
    &:hover
      background-color: var(--background-layer-3)
      border: 1px solid var(--background-layer-3)
  &.text
    background-color: transparent
    &:hover
      background-color: var(--background-layer-3)
  &.icon
    padding: 0
    background-color: transparent
    &:hover
      background-color: var(--background-layer-3)
</style>