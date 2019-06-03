<template>
	<div>
		<poka-header :blurbg="true" :bg="cover||null"/>
		<info-header v-if="name" :title="name" :subtitle="artist" :cover="cover" :songs="songs.length">
			<pin-button
				v-if="name"
				:source="$route.params.source"
				:id="$route.params.id"
				type="album"
				:name="name"
				btn-type="icon-button"
			/>
		</info-header>
		<md-divider/>
		<poka-parse-songs :data="songs" v-if="songs"/>
		<poka-loader v-else/>
	</div>
</template>

<script>
export default {
	name: "AlbumSongs",
	created() {
		let albumSource = this.$route.params.source;
		let albumID = this.$route.params.id;
		this.axios
			.get(
				`${this.server}/pokaapi/album?moduleName=${encodeURIComponent(
					albumSource
				)}&id=${encodeURIComponent(albumID)}`
			)
			.then(response => {
				this.songs = response.data.songs;
				this.name = response.data.name;
				this.artist = response.data.artist;
				this.cover =
					this.server + response.data.cover.replace(/'/, "\\'");
				this.name = response.data.name;
			});
	},
	data: () => ({
		data: null,
		cover: null,
		name: null,
		artist: null,
		songs: null,
		server: _setting(`server`)
	})
};
</script>