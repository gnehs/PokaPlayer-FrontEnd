<template>
	<div>
		<poka-header :title="title" />
		<v-slide-y-reverse-transition>
			<poka-parse-playlists v-if="data" :data="data" />
		</v-slide-y-reverse-transition>
		<poka-loader v-if="!data" />
	</div>
</template>

<script>
export default {
	name: "Playlist",
	created() {
		let routerParams = this.$route.params.pathMatch, routerNames = this.$route.name
		this.axios
			.get(_setting(`server`) + `/pokaapi/playlists?rnd=${Math.floor(Math.random() * 9999999)}`)
			.then(response => {
				if (routerNames == 'PlaylistFolder') {
					this.title = response.data.playlists.filter(x => x.id == routerParams)[0].name
					this.data = response.data.playlists.filter(x => x.id == routerParams)[0].playlists
				} else {
					this.data = response.data.playlists;
				}
			});
	},
	data: () => ({
		data: null,
		server: _setting(`server`),
		title: i18n.t('playlist')
	})
};
</script>