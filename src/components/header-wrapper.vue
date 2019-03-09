<template lang="pug">
div
	.header-wrapper
		.bg(:style=`{backgroundImage: 'url("'+bg+'")'}`,:class="{blur: blurbg}")
	.header
		.title(style="line-height: normal;") {{title}}
		.subtitle {{subtitle}}
</template>

<script>
export default {
  name: "poka-header",
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
    },
    blurbg: { type: Boolean, default: false }
  }
};
</script>
<style lang="sass" scoped>
.header-wrapper
	width: 100%
	position: relative
	min-height: 1px
	.bg
		transform: scale(1.12)
		background-size: cover
		background-position: center
		mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 10%, transparent 90%)
		-webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 10%, transparent 90%)
		width: 100%
		position: absolute
		min-height: 300px
	.bg.blur
		filter: blur(5px)
.header
	font-weight: bold
	margin-left: 16px
	margin-top: 32px
	position: relative
	>.title,>.subtitle
		overflow: hidden
		text-overflow: ellipsis
		white-space: nowrap
	>.title
		font-size: 3.5em
	>.subtitle
		font-size: 1.5em
</style>