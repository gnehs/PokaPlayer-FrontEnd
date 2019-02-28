<template lang="pug">
.header-wrapper
	.bg2
	.bg(:style=`{backgroundImage: 'url("'+bg+'")'}`)
	.title(style="max-width: 950px !important;")
		.title(style="line-height: normal;") {{title}}
		.subtitle {{subtitle}}
</template>

<script>
export default {
  name: "headerWrapper",
  props: {
    title: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    },
    bg: {
      type: String,
      default: _setting(`randomImgSource`)
    }
  }
};
</script>
<style lang="sass" scoped>
.header-wrapper
	width: calc(100% + 16px * 2)
	overflow: hidden
	position: relative
	margin: -16px
	margin-bottom: -200px
	.bg
		transform: scale(1.05)
		min-height: 350px
		background-size: cover
		background-position: center
		mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 10%, transparent 90%)
		-webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 10%, transparent 90%)
		width: 100%
	.bg.blur
		filter: blur(5px)
	> .title
		font-weight: bold
		margin-top: -300px
		margin-left: 32px
		position: absolute
		.title
			font-size: 3.5em
		.subtitle
			font-size: 1.5em
</style>