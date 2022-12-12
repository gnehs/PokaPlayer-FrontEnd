
<script setup>
import { RouterLink } from 'vue-router'
const props = defineProps({
  to: String,
  active: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <component class="p-list-item" :is="to ? RouterLink : 'div'" :to="to" :class="{ active }">
    <div class="p-list-item__content">
      <slot />
    </div>
    <div class="p-list-item__actions">
      <slot name="actions" />
    </div>
  </component>
</template>
<style lang="sass">
.p-list-item
  padding: calc(var(--padding) * 1.5) var(--padding)
  border-radius: var(--border-radius)
  display: flex
  transition: all var(--transition)
  width: 100%
  cursor: pointer
  color: var(--text-color)
  text-decoration: none
  &:hover
    background-color: rgba(var(--text-color-value), .05)
  &:active,&.active
    background-color: rgba(var(--text-color-value), .1)
  .p-list-item__content,.p-list-item__actions
    display: flex
    gap: var(--padding)
    align-items: center
  .p-list-item__content
    flex: 1
  .p-list-item__img
    --size: 42px
    width: var(--size)
    height: var(--size)
    img
      width: 100%
      height: 100%
      object-fit: cover
      aspect-ratio: 1/1
      border-radius: var(--border-radius)
      border: 1px solid var(--background-layer-2)
  .p-list-item__content-content
    .p-list-item__content-title
      font-size: 1rem
      font-weight: bold
    .p-list-item__content-description
      opacity: .5
  .p-list-item__icon-btn
    display: flex
    align-items: center
    justify-content: center
    width: 36px
    height: 36px
    border-radius: var(--border-radius)
    cursor: pointer
    transition: all var(--transition)
    background-color: transparent
    border: 1px solid transparent
    &:hover
      background-color: rgba(var(--text-color-value), .05)
    &:active
      background-color: rgba(var(--text-color-value), .1)
    i
      font-size: 24px
      color: var(--text-color)
</style>