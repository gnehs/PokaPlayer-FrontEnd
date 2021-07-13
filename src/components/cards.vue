<template>
  <div class="poka cards">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'poka-cards'
}
</script>
<style lang="sass">
.theme--dark
	.poka.cards
		--text-color: #FFF
.poka
	&.cards
		--text-color: #000
		display: grid
		grid-template-columns: repeat(auto-fill,minmax(176px, 1fr))
		grid-gap: 16px 12px
		.card
			height: 0
			font-size: 11px
			background-position: center
			background-size: cover
			display: block
			height: auto
			padding-bottom: 0
			text-decoration: none
			position: relative
			&[data-source]:before
				content: attr(data-source)
				position: absolute
				color: #FFF
				display: block
				text-align: right
				right: 10px
				z-index: 1
				top: 11px
				background: linear-gradient(135deg, rgba(0,0,0,.4),rgba(0,0,0,.8))
				padding: 3px 5px
				border-radius: 4px
				font-size: 12px
				max-width: 7em
				backdrop-filter: blur(8px)
				white-space: nowrap
				overflow: hidden
				text-overflow: ellipsis
			.image
				height: 0
				padding-bottom: 100%
				background-size: cover
				border-radius: 16px
				transition: all .2s ease
				position: relative
				background-color: var(--card-background-color,#607D8B)
				box-shadow: 0 4px 7px rgba(0,0,0,.25)
				.cover
					border-radius: 16px
					transition: filter .2s ease
					position: absolute
			&:hover .image
				background-color: #000
				.cover
					filter: brightness(80%)
			&:active .image .cover
				filter: brightness(70%)
			.poka-card-title
				font-size: 15px !important
				padding-top: 5px
				line-height: 1.5em
				font-weight: normal
				color: var(--text-color)
				opacity: .9
			.poka-card-subtitle
				font-size: 1em !important
				padding-top: 0px
				line-height: 12px
				color: var(--text-color)
				opacity: .6
			.icon
				position: absolute
				background-color: rgba(0,0,0,.75)
				background: linear-gradient(135deg, rgba(0,0,0,.4),rgba(0,0,0,.8))
				opacity: 1
				backdrop-filter: blur(8px)
				border-radius: 16px
				padding: 12px
				box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25)
				bottom: 0
				right: 0
				transform: translate(-3px,-3px)
				i
					font-size: 24px
					color: #fff
			&:nth-child(14n+2)
				--card-background-color: #F44336
			&:nth-child(14n+3)
				--card-background-color: #E91E63
			&:nth-child(14n+4)
				--card-background-color: #9C27B0
			&:nth-child(14n+5)
				--card-background-color: #FF9800
			&:nth-child(14n+6)
				--card-background-color: #2196F3
			&:nth-child(14n+7)
				--card-background-color: #00BCD4
			&:nth-child(14n+8)
				--card-background-color: #009688
			&:nth-child(14n+9)
				--card-background-color: #4CAF50
			&:nth-child(14n+10)
				--card-background-color: #8BC34A
			&:nth-child(14n+11)
				--card-background-color: #FFC107
			&:nth-child(14n+12)
				--card-background-color: #3F51B5
			&:nth-child(14n+13)
				--card-background-color: #FF5722
			&:nth-child(14n+14)
				--card-background-color: #795548
@media (max-width: 768px)
	.poka.cards
		grid-template-columns: repeat(auto-fill,minmax(128px, 1fr))
		grid-gap: 8px 12px
		.card
			.icon
				padding: 8px
				border-radius: 16px
				i
					font-size: 22px
</style>
