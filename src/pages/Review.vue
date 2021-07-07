<template>
  <div>
    <poka-header />
    <div class="text-center" style="margin-top: 64px;">
      <h1 class="text-h1 font-weight-thin">Review</h1>
      <h1 class="text-h3 font-weight-thin">你的 2021 年度回顧</h1>
    </div>
    <poka-loader v-if="!data" />
    <div v-if="data">
      <h1 class="text-center text-h3 font-weight-thin review-title">嘿</h1>
      <p
        class="text-center"
      >去年你一共在 PokaPlayer 聽了 {{data.total}} 首歌，在 {{data.days[0]._id}} 聽了最多首歌，居然有 {{data.days[0].count}} 首！</p>
      <h1 class="text-center text-h3 font-weight-thin review-title">收聽最多的歌曲</h1>
      <poka-parse-songs :data="data.songs" />
      <h1 class="text-center text-h3 font-weight-thin review-title">收聽最多的專輯</h1>
      <poka-parse-albums :data="data.albums" />
      <h1 class="text-center text-h3 font-weight-thin review-title">收聽最多的演出者</h1>
      <poka-parse-artists :data="data.artists" />
      <h1 class="text-center text-h3 font-weight-thin review-title">版本更新</h1>
      <h1 class="text-center text-h3 font-weight-thin review-title">社群貢獻</h1>
      <h1 class="text-center text-h3 font-weight-thin review-title">感謝有你</h1>
      <p class="text-center text-h5 font-weight-thin">感謝你使用 PokaPlayer，希望未來可以陪伴你走過更多時光！</p>
    </div>
  </div>
</template>
<style lang="sass" scoped>
.review-title
	margin-top: 64px
	margin-bottom: 16px
</style>
<script>
export default {
  name: "Review",
  data: () => ({
    data: null
  }),
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.data = (
        await this.axios.get(_setting(`server`) + "/pokaapi/v2/record/review")
      ).data;
    }
  }
};
</script>