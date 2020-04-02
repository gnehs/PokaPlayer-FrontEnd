<template>
	<div class="poka cards">
		<slot />
	</div>
</template>

<script>
export default {
	name: "poka-cards"
};
</script>
<style lang="sass">
.theme--dark
	.poka.cards
		--text-color: #FFF
.poka.cards
	--text-color: #000
	display: flex
	flex-wrap: wrap
	max-width: 100%
	width: 100%
	.card
		--size: calc(16.6% - .5em)
		height: 0
		width: var(--size)
		font-size: 11px
		margin: .8em .25em
		background-position: center
		background-size: cover
		padding-bottom: var(--size)
		padding: .475em .5em
		display: block
		height: auto
		padding-bottom: 0
		text-decoration: none
		position: relative

.poka.cards .card[data-source]:before
	content: attr(data-source)
	position: absolute
	color: #FFF
	display: block
	position: absolute
	text-align: right
	right: 10px
	z-index: 1
	top: 11px
	background-color: rgba(0, 0, 0, 0.4)
	padding: 2px 3px
	border-radius: 4px
	font-size: 12px
	max-width: 7em
	white-space: nowrap
	overflow: hidden
	text-overflow: ellipsis
	transition: all .2s
	will-change: transform
.poka
	&.cards .card
		&[data-source]:hover:before
			transform: translateY(-5px)
		.image
			height: 0
			padding-bottom: 100%
			background-size: cover
			border-radius: .8em
			box-shadow: 0 0.4px 0.3px rgba(0, 0, 0, 0.008),0 1.1px 0.8px rgba(0, 0, 0, 0.012),0 2.2px 1.5px rgba(0, 0, 0, 0.015),0 4.2px 2.7px rgba(0, 0, 0, 0.018),0 7.8px 5px rgba(0, 0, 0, 0.022),0 12px 12px rgba(0, 0, 0, 0.03)
			transition: all .2s
			will-change: box-shadow, transform
			position: relative
		&:hover .image
			transform: translateY(-5px)
			box-shadow: 0 0.8px 1.9px rgba(0, 0, 0, 0.02),0 2.3px 4.5px rgba(0, 0, 0, 0.028),0 4.8px 8.5px rgba(0, 0, 0, 0.035),0 9.2px 15.2px rgba(0, 0, 0, 0.042),0 16.9px 28.4px rgba(0, 0, 0, 0.05),0 26px 68px rgba(0, 0, 0, 0.07)
		&:active .image
			transform: translateY(-5px) scale(1.1)
			transition: transform .1s
			z-index: 5
		.image i
			position: absolute
			font-size: 7em
			color: #FFF
			display: flex
			top: 0
			bottom: 0
			left: 0
			right: 0
		.title
			font-size: 1.5em !important
			padding-top: 5px
			line-height: 1.5em
			font-weight: bold
			color: var(--text-color)
			opacity: .9
		.subtitle
			font-size: 1em !important
			padding-top: 0px
			line-height: 1.5em
			color: var(--text-color)
			opacity: .75
		.image
			background-color: #B0BEC5B3
			backdrop-filter: blur(5px)
		&:nth-child(14n+2) .image
			background-color: #BCAAA4B3
		&:nth-child(14n+3) .image
			background-color: #FFAB91B3
		&:nth-child(14n+4) .image
			background-color: #FFF59DB3
		&:nth-child(14n+5) .image
			background-color: #FFE082B3
		&:nth-child(14n+6) .image
			background-color: #FFCC80B3
		&:nth-child(14n+7) .image
			background-color: #A5D6A7B3
		&:nth-child(14n+8) .image
			background-color: #C5E1A5B3
		&:nth-child(14n+9) .image
			background-color: #E6EE9CB3
		&:nth-child(14n+10) .image
			background-color: #81D4FAB3
		&:nth-child(14n+11) .image
			background-color: #80DEEAB3
		&:nth-child(14n+12) .image
			background-color: #80CBC4B3
		&:nth-child(14n+13) .image
			background-color: #B39DDBB3
		&:nth-child(14n+14) .image
			background-color: #90CAF9B3
	&.two.cards .card
		--size: calc(100% / 2 - .5em)
	&.three.cards .card
		--size: calc(100% / 3 - .5em)
	&.four.cards .card
		--size: calc(100% / 4 - .5em)
	&.five.cards .card
		--size: calc(100% / 5 - .5em)
	&.six.cards .card
		--size: calc(100% / 6 - .5em)
	&.sever.cards .card
		--size: calc(100% / 7 - .5em)
	&.eight.cards .card
		--size: calc(100% / 8 - .5em)
	&.nine.cards .card
		--size: calc(100% / 9 - .5em)
	&.ten.cards .card
		--size: calc(100% / 10 - .5em)

@media (max-width: 380px)
	.poka
		&.cards .card
			--size: calc(100% - .5em)
		&.doubling.four.cards .card
			--size: calc(100% - .5em)
@media (max-width: 575.98px)
	.poka
		&.cards .card
			--size: calc(33.3% - .5em)
		&.doubling.four.cards .card
			--size: calc(50% - .5em)

@media (min-width: 576px) and (max-width: 767.98px)
	.poka.cards .card
		--size: calc(33.3% - .5em)
		.image i
			font-size: 5em

@media (min-width: 768px) and (max-width: 991.98px)
	.poka.cards .card
		--size: calc(25% - .5em)

@media (min-width: 992px) and (max-width: 1199.98px)
	.poka.cards .card
		--size: calc(20% - .5em)

@media (min-width: 1200px)
	.poka.cards .card
		--size: calc(16.6% - .5em)

@media (max-width: 575.98px)
	.poka
		&.doubling.ten.cards .card
			--size: calc(20% - .5em)
		&.color.picker.cards > .card
			--size: calc(20%)
</style>