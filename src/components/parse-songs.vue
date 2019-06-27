<template>
	<div class="poka two list">
		<div class="item" v-for="(song,index) of data" :key="index">
			<md-ripple>
				<div class="content" @click="addSongs({songlist:data,index:index})">
					<md-avatar>
						<img
							:src="song.cover?(song.cover.startsWith('http')?song.cover:server+song.cover):defaultCover"
							alt="cover"
						>
					</md-avatar>
					<div class="header">
						<div class="title t-ellipsis">{{song.name}}</div>
						<div class="t-ellipsis">{{song.artist}}</div>
					</div>
				</div>
				<div class="action">
					<md-button
						class="md-icon-button md-list-action"
						@click="addSongs({songlist:[song],clear:false});isInSongList.push(index);"
					>
						<md-icon v-if="isInSongList.includes(index)">done</md-icon>
						<md-icon v-else>add</md-icon>
					</md-button>
				</div>
			</md-ripple>
		</div>
	</div>
</template>
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
