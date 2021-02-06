<template>
	<div>
		<poka-header :blurbg="true" :bg="cover||null" />
		<info-header :title="name" :subtitle="artist" :cover="cover" :songs="songs&&songs.length">
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
		</info-header>
		<v-divider v-if="name" />
		<poka-parse-songs style="margin: 16px 0;" :data="songs" v-if="songs" />
		<poka-loader v-if="!songs" style="margin: 20px 0;" />
		<v-divider v-if="artistAlbums" />
		<h1
			v-if="artistAlbums"
			class="title"
			style="padding-left: 0.5em;margin-top: 8px;"
		>{{$t('albumsOfSameArtist')}}</h1>
		<poka-parse-albums v-if="artistAlbums" :data="artistAlbums" />
	</div>
</template>

<script>
export default {
	name: "AlbumSongs",
	created() {
		this.fetchData()
	},
	watch: {
		'$route.path': function (val, oldVal) {
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

			this.songs = null
			this.name = '█'.repeat(10)
			this.artist = '█'.repeat(10)
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