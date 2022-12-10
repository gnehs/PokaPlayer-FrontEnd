<template>
  <button class="p-btn" :class="{outline,text,icon,block}" :color="color" v-bind="$attrs">
    <slot />
  </button>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
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
    },
    block: {
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
  padding: var(--padding) calc(var(--padding) * 2)
  border: none
  border-radius: var(--border-radius)
  cursor: pointer
  transition: all var(--transition)
  font-size: 14px
  line-height: 1.5
  font-weight: bold
  display: flex
  align-items: center
  justify-content: center
  gap: var(--padding)
  &:hover
    background-color: var(--background-layer-3)
  &:active
    background-color: var(--background-layer-4)
  &[color="primary"]
    background-color: var(--primary-color)
    color: #FFF
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
  &.block
    width: 100%
    display: block
</style>