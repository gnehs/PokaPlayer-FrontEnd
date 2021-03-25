<template>
	<div>
		<poka-header :blurbg="true" :bg="cover||null" />
		<info-header :title="name" :subtitle="artist" :cover="cover" :songs="songs&&songs.length">
			<v-fade-transition>
				<pin-button
					v-if="songs"
					:source="$route.params.source"
					:id="$route.params.id"
					type="album"
					:cover="cover"
					:artist="artist"
					:name="name"
					btn-type="icon-button"
				/>
			</v-fade-transition>
		</info-header>
		<v-divider v-if="name" />
		<poka-loader v-if="!songs" style="margin: 64px 0;" />
		<v-slide-y-reverse-transition>
			<poka-parse-songs style="margin: 16px 0;" :data="songs" v-if="songs" />
		</v-slide-y-reverse-transition>
		<v-slide-y-reverse-transition>
			<div v-if="artistAlbums&&songs">
				<v-divider />
				<h1 class="title" style="padding-left: 0.5em;margin-top: 8px;">{{$t('albumsOfSameArtist')}}</h1>
				<poka-parse-albums :data="artistAlbums" />
			</div>
		</v-slide-y-reverse-transition>
	</div>
</template>

<script>
export default {
	name: "AlbumSongs",
	created() {
		this.fetchData()
	},
	watch: {
		'$route.path': function () {
			this.fetchData();
		}
	},
	data: () => ({
		data: null,
		cover: null,
		name: null,
		artist: null,
		songs: null,
		artistAlbums: null,
		server: _setting(`server`)
	}),
	methods: {
		async fetchData() {
			//取得專輯資料
			let albumSource = this.$route.params.source;
			let albumID = this.$route.params.id;
			console.log(this.$route.query)
			this.songs = null
			this.name = this.$route.query.name || '█'.repeat(10)
			this.artist = this.$route.query.artist || '█'.repeat(10)
			this.cover = Boolean(this.$route.query.cover) ? (this.server + this.$route.query.cover) : null
			await this.axios
				.get(`${this.server}/pokaapi/album?moduleName=${encodeURIComponent(albumSource)}&id=${encodeURIComponent(albumID)}`)
				.then(response => {
					this.songs = response.data.songs;
					this.artist = response.data.artist;
					this.cover = this.server + response.data.cover.replace(/'/, "\\'");
					this.name = response.data.name;
				});
			// 取得相同演出者的專輯
			let ArtistId = this.artist;
			let ArtistSource = albumSource;
			// - 取得專輯資料
			let url = `${this.server}/pokaapi/artistAlbums/?moduleName=${encodeURIComponent(ArtistSource)}&id=${encodeURIComponent(ArtistId)}`;
			this.axios.get(url).then(response => {
				this.artistAlbums = response.data.albums.filter(x => x.id != albumID); //篩選掉這張專輯
				if (this.artistAlbums.length < 1) this.artistAlbums = null;
			});
		}
	}
};
</script>