<template>
  <div class="poka-pagenation" v-show="length>1" ref="pagenation">
    <div
      class="poka-pagenation-item"
      v-for="n in length"
      :key="n"
      @click="switchPage(n)"
      :class="{active: value == n}"
    >{{n}}</div>
  </div>
</template>

<script>
export default {
  name: "poka-pagenation",
  props: {
    value: {
      type: Number
    },
    length: {
      type: Number
    }
  },
  methods: {
    switchPage(n) {
      this.$emit("input", n);
      this.$refs.pagenation.parentElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }
};
</script>
<style lang="sass">
.poka-pagenation
    display: flex
    margin: 24px auto
    justify-content: center
    .poka-pagenation-item
        min-width: 40px
        background-color: rgba(0,0,0,.05)
        line-height: 32px
        margin: 0 4px
        border-radius: 8px
        text-align: center
        padding: 4px 12px
        cursor: pointer
        font-family: var(--product-font)
        transition: .2s ease
        &.active
            box-shadow: 0 4px 8px var(--v-primary-base)
            background-color: var(--v-primary-base) !important
            color: #fff
            transform: translateY(-4px)
        &:hover
            background-color: rgba(0,0,0,.075)
        &:active
            background-color: rgba(0,0,0,.1)
</style>