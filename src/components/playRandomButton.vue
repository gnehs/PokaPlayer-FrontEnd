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
		server: _setting(`server`),
		loadingRandom: false
	}),
	methods: {
		randomPlay() {
			this.loadingRandom = true;
			let randomStr = Math.random()
				.toString(36)
				.substring(7);
			this.axios(`/pokaapi/randomSongs?${randomStr}`)
				.then(res => {
					this.$addSongs({ songs: res.data.songs });
					setTimeout(() => (this.loadingRandom = false), 500);
				})
				.catch(e => alert(`PokaPlayer Error\n${e}`));
		}
	}
};
</script>