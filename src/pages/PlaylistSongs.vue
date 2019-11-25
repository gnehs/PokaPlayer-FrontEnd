<template>
	<div>
		<poka-header :blurbg="true" :bg="cover" />
		<info-header
			:title="title||$t('loading')"
			:subtitle="$t('playlist')"
			:cover="cover"
			:songs="data.songs.length||0"
		/>
		<v-divider />
		<poka-parse-songs v-if="data" :data="data.songs" />
		<poka-loader v-else />
		<pin-button
			v-if="title"
			:source="$route.params.source"
			:id="$route.params.id"
			type="playlist"
			:name="title"
		/>
	</div>
</template>

<script>
export default {
	name: "PlaylistSongs",
	created() {
		let source = encodeURIComponent(this.$route.params.source);
		let playlistId = encodeURIComponent(this.$route.params.id);
		let server = this.server;
		this.axios
			.get(
				`${server}/pokaapi/playlistSongs/?moduleName=${source}&id=${playlistId}`
			)
			.then(response => {
				this.data = response.data;
				this.title = this.data.playlists[0].name;
				this.cover = this.data.playlists[0].image
					? this.server + this.data.playlists[0].image
					: this.cover;
			});
	},
	data: () => ({
		data: null,
		title: null,
		cover: _setting(`headerBgSource`),
		server: _setting(`server`)
	})
};
</script>