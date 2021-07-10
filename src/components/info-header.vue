<template>
  <div class="info-header">
    <back />
    <poka-cover
      :cover="cover"
      :name="title"
      size="240px"
      style="margin: 8px auto;margin-bottom: 8px;display: block;"
    />
    <div class="info-title" :title="title">{{title}}</div>
    <div class="metadatas">
      <span class="meta" v-if="subtitle">{{subtitle}}</span>
      <span class="meta" v-if="songs" :key="songs">{{$t("album_total", { songs: songs })}}</span>
    </div>
    <div class="actions">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: "info-header",
  props: {
    cover: String,
    title: String,
    subtitle: String,
    songs: { default: 0 }
  }
};
</script>

<style lang="sass" scoped>
/* 專輯歌曲頁面 - 專輯簡介 */
.info-header
	position: relative
	overflow: hidden
	padding: 16px 0
	*
		transition: all .3s ease
		position: relative
	.info-title,.info-subtitle,.metadatas
		text-align: center
		font-size: 14px
	.info-title
		font-size: 24px
		font-weight: bold
	.info-subtitle
		font-size: 18px
		opacity: .8
	.metadatas
		opacity: .8
		.meta + .meta
			&::before
				content: '．'
	.actions
		margin-top: 16px
		text-align: center
</style>