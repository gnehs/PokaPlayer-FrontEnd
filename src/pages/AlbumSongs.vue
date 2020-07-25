<template>
	<div>
		<poka-header :blurbg="true" :bg="cover||null" />
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
		<v-divider v-if="songs" />
		<poka-parse-songs style="margin: 16px 0;" :data="songs" v-if="songs" />
		<poka-loader v-if="!songs" />
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
	async created() {
		//取得專輯資料
		let albumSource = this.$route.params.source;
		let albumID = this.$route.params.id;
		await this.axios
			.get(`${this.server}/pokaapi/album?moduleName=${encodeURIComponent(albumSource)}&id=${encodeURIComponent(albumID)}`)
			.then(response => {
				this.songs = response.data.songs;
				this.name = response.data.name;
				this.artist = response.data.artist;
				this.cover = this.server + response.data.cover.replace(/'/, "\\'");
				this.name = response.data.name;
			});
		// 取得相同演出者的專輯
		let ArtistId = this.artist;
		let ArtistSource = albumSource;
		//取得專輯資料
		let url = `${this.server}/pokaapi/artistAlbums/?moduleName=${encodeURIComponent(ArtistSource)}&id=${encodeURIComponent(ArtistId)}`;
		this.axios.get(url).then(response => {
			this.artistAlbums = response.data.albums.filter(x => x.id != albumID); //篩選掉這張專輯
			if (this.artistAlbums.length < 1) this.artistAlbums = null;
		});
	},
	data: () => ({
		data: null,
		cover: null,
		name: null,
		artist: null,
		songs: null,
		artistAlbums: null,
		server: _setting(`server`)
	})
};
</script>