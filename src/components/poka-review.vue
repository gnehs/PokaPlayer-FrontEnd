<template>
  <div class="review-notify" key="review" v-if="showNotify">
    <h1>{{ $t('review.notify.title') }}</h1>
    <p>{{ $t('review.notify.description') }}</p>

    <v-btn outlined to="/review" color="white" dark>{{ $t('review.notify.go') }}</v-btn>
    <img src="/img/review.png" class="review-notify-img" />
  </div>
</template>
<style lang="sass" scoped>
.review-notify
    background: #2f2b3e
    text-shadow: 0 0 6px #2f2b3e
    position: relative
    margin: 16px 2px
    padding: 24px 32px
    border-radius: 16px
    background-size: 400% 400%
    background-position: right
    background-repeat: no-repeat
    background-image: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)
    color: #FFF
    box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.3)
    animation: gradient 15s ease infinite
    .review-notify-img
        position: absolute
        top: 0
        right: 0
        height: 100%
@keyframes gradient
    0%
        background-position: 0% 50%
    50%
        background-position: 100% 50%
    100%
        background-position: 0% 50%
</style>
<script>
export default {
  name: 'poka-review',
  created() {
    let currentTime = new Date()
    if (currentTime.getMonth() == 12 - 1 && currentTime.getDate() > 25) {
      this.showNotify = true
    }
  },
  data: () => ({ showNotify: false }),
  methods: {}
}
</script>
