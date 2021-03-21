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
	watch: {
		'$route.path': function (val, oldVal) {
			this.fetchData();
		}
	},
	created() {
		this.fetchData();
	},
	data: () => ({
		data: null,
		rawData: null,
		server: _setting(`server`),
		title: i18n.t('playlist')
	}),
	methods: {
		async fetchData() {
			let routerParams = this.$route.params.pathMatch,
				routerNames = this.$route.name
			this.data = null
			if (!this.rawData) {
				this.rawData = (await this.axios(_setting(`server`) + `/pokaapi/playlists?rnd=${Math.floor(Math.random() * 9999999)}`)).data.playlists
			}
			if (routerNames == 'PlaylistFolder') {
				this.title = this.rawData.filter(x => x.id == routerParams)[0].name
				this.data = this.rawData.filter(x => x.id == routerParams)[0].playlists
			} else {
				this.title = i18n.t('playlist')
				this.data = this.rawData;
			}
		}
	},
};
</script>