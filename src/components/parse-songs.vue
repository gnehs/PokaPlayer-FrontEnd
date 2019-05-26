<template>
	<md-list class="md-double-line">
		<md-list-item v-for="(song,index) of data" :key="index">
			<md-avatar>
				<img :src="song.cover||defaultCover" alt="cover">
			</md-avatar>
			<div class="md-list-item-text" @click="addSongs({songlist:data,index:index})">
				<span>{{song.name}}</span>
				<span>{{song.artist}}</span>
			</div>
			<md-button
				class="md-icon-button md-list-action"
				@click="addSongs({songlist:[song],clear:false});isInSongList.push(index);"
			>
				<md-icon v-if="isInSongList.includes(index)">done</md-icon>
				<md-icon v-else>add</md-icon>
			</md-button>
		</md-list-item>
	</md-list>
</template>

<style lang="sass" scoped>
.md-list
	display: flex
	flex-wrap: wrap
	width: 100%
	flex-direction: row
	background-color: transparent
	.md-list-item
		width: 50%
		border-radius: 8px
		overflow: hidden
		transition: all 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95)
		*
			cursor: pointer
		&:hover
			background-color: rgba(0, 0, 0,.12)
@media screen and (max-width: 600px) 
		.md-list
				.md-list-item
						width: 100%
</style>
<script>
export default {
	name: "poka-parse-songs",
	props: ["data"],
	data: () => ({
		server: _setting(`server`),
		defaultCover: _setting(`headerBgSource`),
		isInSongList: []
	}),
	methods: {
		addSongs({ songlist, index, clear = true }) {
			let playlist = [];
			for (let nowsong of songlist) {
				playlist.push({
					url:
						this.server +
						nowsong.url +
						"&songRes=" +
						_setting(`audioQuality`).toLowerCase(),
					cover: nowsong.cover.startsWith("http")
						? nowsong.cover
						: nowsong.cover
						? this.server + nowsong.cover
						: this.defaultCover,
					name: nowsong.name,
					artist: nowsong.artist,
					album: nowsong.album,
					id: nowsong.id,
					source: nowsong.source,
					uuid: _uuid()
				});
			}
			if (clear) _player.list.clear();
			_player.list.add(playlist);
			if (index && _player.options.order === "random") {
				_player.options.order = "list";
				_player.list.switch(index);
				_player.options.order = "random";
			} else if (index) {
				_player.list.switch(index);
			}
			_player.play();
		}
	}
};
</script>
