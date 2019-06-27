<template>
	<div>
		<md-button class="md-primary outlined" @click="randomPlay" :disabled="loadingRandom">
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
					this.addSongs({ songlist: res.data.songs });
					setTimeout(() => (this.loadingRandom = false), 500);
				})
				.catch(e => alert(`PokaPlayer Error\n${e}`));
		},
		addSongs({ songlist, index, clear = true }) {
			let playlist = [];
			for (let nowsong of songlist) {
				playlist.push({
					url:
						this.server +
						nowsong.url +
						"&songRes=" +
						_setting(`audioQuality`).toLowerCase(),
					cover: nowsong.cover
						? this.server + nowsong.cover
						: this.defaultCover,
					name: nowsong.name,
					artist: nowsong.artist,
					artistId: nowsong.artistId,
					album: nowsong.album,
					albumId: nowsong.albumId,
					id: nowsong.id,
					source: nowsong.source,
					uuid: _uuid()
				});
			}
			if (clear) _player.list.clear();
			_player.list.add(playlist);
			if (index) _player.list.switch(index);
			_player.play();
		}
	}
};
</script>