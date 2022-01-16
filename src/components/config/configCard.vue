<template>
  <div
    class="config-card"
    @click="value = !value"
    :style="{ '--bgColor': bgColor, 'backgroundImage': backgroundImage }"
    :class="{ 'active': value }"
    v-ripple
  >
    <v-icon class="bx">{{ icon }}</v-icon>
    <!-- <div class="status">{{ value ? $t('settings.config.enabled') : $t('settings.config.disabled') }}</div> -->
    <v-spacer />
    <div class="title">{{ title }}</div>
    <div class="description">{{ description }}</div>
    <div class="toggle">
      <v-switch v-model="value" color="#fff" style="pointer-events: none;" />
    </div>
  </div>
</template>
<script>
const GeoPattern = require('geopattern')
export default {
  name: 'config-card',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: String,
    description: String,
    icon: String,
    bgColor: String,
  },
  watch: {
    value(newValue) {
      this.$emit('input', newValue)
    }
  },
  data: () => ({
    backgroundImage: null
  }),
  created() {
    this.updateBackgroundImage()
  },
  mounted() {
    this.updateBackgroundImage()
  },
  methods: {
    updateBackgroundImage() {
      let pattern = GeoPattern.generate(this.title, {
        color: this.bgColor,
      }).toDataUri()
      this.backgroundImage = `url(${pattern})`
    }
  }
}
</script>
<style lang="sass">

.config-card
  width: 100%
  cursor: pointer
  transition: all 0.2s ease-in-out
  background-color: gray
  border-radius: 8px
  padding: 16px
  color: white
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25)
  position: relative
  line-height: 1.25
  background-position: center
  background-repeat: repeat
  display: flex
  flex-direction: column
  align-items: flex-start
  .v-icon
    font-size: 24px
    margin-right: 16px
    color: white
  &:not(.active)
    filter: grayscale(100%)
  &.active
    background-color: var(--bgColor)
  .status
    font-size: 36px
  .title
    margin-top: 16px
    font-size: 16px
    font-weight: bold
  .description
    font-size: 10px
  .toggle
    position: absolute
    right: 16px
    top: 0
</style>