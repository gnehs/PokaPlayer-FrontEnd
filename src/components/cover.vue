<template>
  <transition name="fade" mode="out-in">
    <div class="cover" :style="{'--size': size}" :key="parsedCover">
      <img class="cover-shadow" loading="lazy" :src="parsedCover" />
      <img class="cover-img" loading="lazy" :src="parsedCover" />
    </div>
  </transition>
</template>

<script>
const GeoPattern = require("geopattern");
export default {
  name: "poka-cover",
  props: {
    cover: { type: String },
    size: { type: String },
    name: { type: String, default: "cover" }
  },
  data: () => ({
    parsedCover: null
  }),
  watch: {
    cover() {
      this.updateImg();
    }
  },
  created() {
    this.updateImg();
  },
  methods: {
    updateImg() {
      this.parsedCover = GeoPattern.generate(this.name, {
        baseColor: "#fc0"
      }).toDataUri();
      if (this.cover) {
        let img = new Image();
        let vm = this;
        img.onload = function() {
          vm.parsedCover = vm.cover;
        };
        img.src = this.cover;
      }
    }
  }
};
</script>
<style lang="sass" scoped>
.cover
    position: relative
    --size: 100%
    width: var(--size)
    height: var(--size)
    display: inline-block
    .cover-img,.cover-shadow
        object-fit: cover
        border-radius: 16px
        width: 100%
        height: 100%
    .cover-img
        position: relative
    .cover-shadow
        position: absolute
        filter: blur(20px) brightness(.9)
        opacity: .5
        transform: translateY(8px)
        top: 0
        left: 0
        transition: .2s ease
</style>