<template>
  <div class="poka-pagination" v-show="length > 1" ref="pagination">
    <div class="poka-pagination-item" @click="switchPage(value - 1)" :class="{ disabled: value == 1 }">
      <v-icon class="bx">bx-chevron-left</v-icon>
    </div>
    <div
      class="poka-pagination-item"
      v-for="(n, i) of pages"
      :key="i"
      @click="switchPage(n)"
      :class="{ active: value == n, disabled: n == '...' }"
    >
      {{ n }}
    </div>
    <div class="poka-pagination-item" @click="switchPage(value + 1)" :class="{ disabled: value == length }">
      <v-icon class="bx">bx-chevron-right</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'poka-pagination',
  props: {
    value: {
      type: Number
    },
    length: {
      type: Number
    }
  },
  data: () => ({
    pages: []
  }),
  created() {
    this.updatePages()
  },
  methods: {
    switchPage(n) {
      if (n != '...' && n != this.value) {
        this.$emit('input', n)
        this.$refs.pagination.parentElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        this.$nextTick(() => {
          this.updatePages()
        })
      }
    },
    updatePages() {
      if (this.length > 7) {
        function setPages(start, end) {
          return [...Array(end).keys()].splice(start)
        }
        let start = this.value - 1
        let end = this.value + 2
        if (start <= 3) {
          this.pages = [...setPages(1, end - start + 3), '...', this.length]
        } else if (end >= this.length - 1) {
          this.pages = [1, '...', ...setPages(start + (this.length - end) - 1, this.length + 1)]
        } else {
          this.pages = [1, '...', ...setPages(start, end), '...', this.length]
        }
      } else {
        this.pages = [...Array(this.length).keys()].map(x => x + 1)
      }
    }
  }
}
</script>
<style lang="sass">
.poka-pagination
  display: flex
  margin: 24px auto
  justify-content: center
  gap: 4px
  .poka-pagination-item
    min-width: 44px
    background-color: rgba(0,0,0,.05)
    line-height: 36px
    border-radius: 8px
    text-align: center
    padding: 4px 0
    cursor: pointer
    font-family: var(--product-font)
    transition: .2s ease
    &.disabled
      color: rgba(0,0,0,.5)
      background-color: rgba(0,0,0,.025)
      pointer-events: none
    &.active
      box-shadow: 0 4px 8px var(--v-primary-base)
      background-color: var(--v-primary-base) !important
      color: #fff
      transform: translateY(-4px)
      &:hover
        background-color: rgba(0,0,0,.075)
      &:active
        background-color: rgba(0,0,0,.1)
@media screen and (max-width: 512px)
  .poka-pagination
    .poka-pagination-item
      min-width: 35px
      line-height: 28px
</style>
