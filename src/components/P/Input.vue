<template>
  <div class="poka-text-input" :class="{ value: value.length }">
    <label class="poka-text-input__label" :for="randomInputId">
      <span class="poka-text-input__label-text">{{ label }}</span>
    </label>
    <input class="poka-text-input__input" :id="randomInputId" v-model="value" :type="type" v-bind="$attrs" placeholder="" />
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
.poka-text-input
  display: flex
  flex-direction: column
  width: 100%
  &+.poka-text-input
    margin-top: calc(var(--padding) * 2)
  .poka-text-input__label
    display: flex
    align-items: center
    .poka-text-input__label-text
      font-size: 14px
      color: var(--text-color)
      transition: all var(--transition)
  &:not(.value):not(:has(input:focus))
    .poka-text-input__label
      cursor: text
      .poka-text-input__label-text
        transform: translateY(calc(var(--padding) * 2 + 16px)) translateX(var(--padding)) scale(1.1429)
        opacity: .5

  &:has(input:focus)
    .poka-text-input__label
      .poka-text-input__label-text
        color: var(--primary-color)
        font-weight: bold
  .poka-text-input__input
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