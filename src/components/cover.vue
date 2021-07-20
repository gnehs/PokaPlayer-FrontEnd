<template>
  <overdrive :id="cover" :duration="300" :key="parsedCover" class="cover" :style="{ '--size': size }">
    <img aspect-ratio="1" class="cover-img" :src="parsedCover" />
    <img aspect-ratio="1" class="cover-shadow" :src="parsedCover" v-if="!hideShadow" />
  </overdrive>
</template>

<script>
const GeoPattern = require('geopattern')
export default {
  name: 'poka-cover',
  props: {
    cover: { type: String },
    size: { type: String },
    name: { type: String, default: 'cover' },
    hideShadow: { type: Boolean, default: false }
  },
  data: () => ({
    parsedCover: null
  }),
  watch: {
    cover() {
      this.updateImg()
    }
  },
  created() {
    this.updateImg()
  },
  methods: {
    updateImg() {
      if (this.cover) {
        this.parsedCover = this.cover
      } else {
        this.parsedCover = GeoPattern.generate(this.name, {
          baseColor: '#fc0'
        }).toDataUri()
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.cover
  --size: 100%
  width: var(--size)
  height: var(--size)
  position: relative
  .cover-img,.cover-shadow
    object-fit: cover
    border-radius: 16px
    width: 100%
    height: 100%
  .cover-img
    position: relative

    z-index: 1
  .cover-shadow
    position: absolute
    filter: blur(20px) brightness(.9)
    opacity: .5
    transform: translateY(8px)
    top: 0
    left: 0
    transition: .2s ease
</style>