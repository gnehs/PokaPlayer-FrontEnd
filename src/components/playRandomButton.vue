<template>
	<div>
		<md-button class="md-primary md-outlined" @click="randomPlay" :disabled="loadingRandom">
			<span v-if="!loadingRandom">{{$t('playlist_random')}}</span>
			<span v-else>{{$t('loading')}}</span>
		</md-button>
	</div>
</template>

<script>
export default {
	name: "play-random-button",
	data: () => ({
		loadingRandom: false
	}),
	methods: {
		randomPlay() {
			this.loadingRandom = true;
			this.$randomPlay();
		}
	}
};
</script>