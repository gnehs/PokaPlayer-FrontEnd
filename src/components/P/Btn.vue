<template>
  <button class="p-btn" :type="type" :class="{outline,text,icon,block}" :color="color" v-bind="$attrs">
    <slot />
  </button>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button'
    },
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
  background-color: rgba(var(--text-color-value), .075)
  border: 1px solid transparent
  padding: var(--padding) calc(var(--padding) * 2)
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
  box-shadow: inset 0 0 0 100px transparent
  &:hover
    box-shadow: inset 0 0 0 100px rgba(var(--text-color-value), .1)
    border: 1px solid rgba(var(--text-color-value), .1)
  &:active
    box-shadow: inset 0 0 0 100px rgba(var(--text-color-value), .2)
    border: 1px solid rgba(var(--text-color-value), .2)
    transform: scale(.95)
  &[color="primary"]
    background-color: var(--primary-color)
    color: #FFF
  &.outline
    background-color: transparent
    border-color: rgba(var(--text-color-value), .05)
    &:hover
      border-color: rgba(var(--text-color-value), .15)
    &:active
      border-color: rgba(var(--text-color-value), .25)
  &.text
    background-color: transparent
  &.icon
    padding: var(--padding)
    font-size: 24px
  &.block
    width: 100%
    display: block
</style>