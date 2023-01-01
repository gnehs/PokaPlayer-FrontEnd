<template>
  <div class="p-select">
    <select v-model="value" v-bind="$attrs">
      <slot />
    </select>
  </div>
</template>
<script>
export default {
  name: 'PokaTextInput',
  props: ['modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.p-select
  width: 100%
  position: relative
  &::before
    content: "\ea4a"
    font-family: boxicons!important
    position: absolute
    right: var(--padding)
    top: 50%
    transform: translateY(-50%)
    pointer-events: none
    font-size: 1.5em
    color: rgba(var(--text-color-value),.5)
  select
    width: 100%
    height: 100%
    border: none
    background: transparent
    font-size: 1rem
    color: var(--text-color)
    appearance: none
    color: rgba(var(--text-color-value), 1)
    padding: var(--padding) calc(var(--padding) * 2)
    padding-right: calc(var(--padding) * 2 + 1.5em)
    border: 1px solid rgba(var(--text-color-value),.1)
    border-radius: var(--border-radius)
    &:focus
      outline: none
</style>