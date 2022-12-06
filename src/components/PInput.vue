<template>
  <div class="poka-text-input-container" :class="{   value: value.length   }">
    <label class="poka-text-input-label" :for="randomInputId">
      <span class="poka-text-input-label-text">{{ label }}</span>
    </label>
    <input class="poka-text-input" :id="randomInputId" v-model="value" :type="type" v-bind="$attrs" placeholder="" />
  </div>
</template>
<script>
export default {
  name: 'PokaTextInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      randomInputId: `input_${Math.random().toString(36).substr(2, 9)}`
    }
  },
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
.poka-text-input-container
  display: flex
  flex-direction: column
  &+.poka-text-input-container
    margin-top: calc(var(--padding) * 2)
  .poka-text-input-label
    display: flex
    align-items: center
    .poka-text-input-label-text
      font-size: 14px
      color: var(--text-color)
      transition: all var(--transition)
  &:not(.value):not(:has(input:focus))
    .poka-text-input-label
      .poka-text-input-label-text
        transform: translateY(calc(var(--padding) * 2 + 16px)) translateX(var(--padding)) scale(1.1429)
        opacity: .5

  &:has(input:focus)
    .poka-text-input-label
      .poka-text-input-label-text
        color: var(--primary-color)
        font-weight: bold
  .poka-text-input
    border: none
    outline: none
    background: none
    width: 100%
    height: 100%
    padding: calc(var(--padding) * 1.5) var(--padding)
    font-size: 16px
    border-bottom: var(--border-width) solid var(--border-color)
    transition: border-bottom var(--transition), box-shadow var(--transition)
    box-shadow: 0px 1px transparent
    &:focus
      border-color: var(--primary-color)
      box-shadow: 0px 1px var(--primary-color)
</style>