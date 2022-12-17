<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
  value: {
    type: Number,
  },
})
const valueInPercent = computed(() => {
  return props.value / props.max * 100 || 0
})
</script>
<template>
  <input type="range" :min="min" :max="max" :value="value" :style="`--value-in-percent: ${valueInPercent}%`" v-bind="$attrs" />
</template>
<style lang="sass" scoped>
input
  -webkit-appearance: none
  cursor: pointer
  width: 100%
  height: 4px
  border-radius: 2px
  background: linear-gradient(to right, var(--primary-color) var(--value-in-percent), rgba(var(--text-color-value),.1) var(--value-in-percent)) no-repeat
  outline: none
  border: none
  // transition: all var(--transition)
  --thumb-outline-size: 5px
  &::-webkit-slider-thumb
    -webkit-appearance: none
    appearance: none
    width: 12px
    height: 12px
    border-radius: 100em
    background: var(--primary-color)
    cursor: pointer
    transition: all var(--transition)
    outline: var(--thumb-outline-size) solid transparent
    box-shadow: none
  &::-webkit-slider-runnable-track
    -webkit-appearance: none
    box-shadow: none
    border: none
    background: transparent
  &::-moz-range-thumb
    width: 12px
    height: 12px
    border-radius: 100em
    background: var(--primary-color)
    cursor: pointer
    transition: all var(--transition)
    outline: var(--thumb-outline-size) solid transparent
  &:hover
    &::-webkit-slider-thumb
      outline: var(--thumb-outline-size) solid rgba(var(--text-color-value),.1)
    &::-moz-range-thumb
      outline: var(--thumb-outline-size) solid rgba(var(--text-color-value),.1)
  &:active
    --thumb-outline-size: 10px
    &::-webkit-slider-thumb
      outline: var(--thumb-outline-size) solid rgba(var(--text-color-value),.2)
    &::-moz-range-thumb
      outline: var(--thumb-outline-size) solid rgba(var(--text-color-value),.2)
</style>