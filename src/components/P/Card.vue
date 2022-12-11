
<script setup>
import { toRefs } from 'vue'
import { RouterLink } from 'vue-router'
const props = defineProps({
  imgSrc: String,
  title: String,
  description: String,
  source: String,
  to: String,
  icon: String
})
</script>
<template>
  <component class="p-card" :is="to ? `RouterLink` : `div`" :to="to">
    <div class="p-card__img-container">
      <img class="p-card__img" :src="imgSrc" v-if="imgSrc" loading="lazy" />
      <div class="p-card__icon" v-if="icon">
        <i :class="icon"></i>
      </div>
      <div class="p-card__source">{{ source }}</div>
    </div>
    <div class="p-card__content">
      <div class="p-card__title">{{ title }}</div>
      <div class="p-card__description">{{ description }}</div>
    </div>
  </component>
</template>
<style lang="sass" scoped>
.p-card
  width: 100%
  transition: all var(--transition)
  border-radius: var(--border-radius)
  color: var(--text-color)
  text-decoration: none
  &:hover
    background-color: var(--background-layer-2)
    box-shadow: 0 0 0 var(--padding) var(--background-layer-2)
    .p-card__img
      filter: brightness(1.05)
  &:active
    transform: scale(0.95)
  .p-card__img-container
    position: relative
    width: 100%
    .p-card__img
      border-radius: var(--border-radius)
      width: 100%
      aspect-ratio: 1/1
      object-fit: cover
      border: 1px solid var(--background-layer-2)
      transition: filter var(--transition)
    .p-card__source
      position: absolute
      top: calc(var(--padding) / 2)
      right: calc(var(--padding) / 2)
      padding: calc(var(--padding) * .5) var(--padding)
      background-color: var(--background-layer-2)
      color: var(--text-color)
      font-size: 0.75rem
      opacity: 0.75
      border-radius: calc(var(--border-radius) - var(--padding) / 2)
  .p-card__content
    padding: calc(var(--padding) / 2) 0
    .p-card__title
      font-size: 1em
      font-weight: 700
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
    .p-card__description
      color: var(--text-color)
      opacity: 0.75
      font-size: 0.875rem
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis

</style>