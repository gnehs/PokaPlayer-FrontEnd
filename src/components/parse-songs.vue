<template>
	<div>
		<transition-group
			name="songlist"
			tag="div"
			class="poka list"
			:class="{ two: !nowPlaying }"
			style="position: relative"
			key="songlist"
		>
			<div
				class="item"
				style="user-select: none;"
				v-for="(song,index) of data"
				:key="nowPlaying?song.uuid:index"
				:class="{active:index==activeIndex}"
				@contextmenu.prevent="moreDialog(song)"
				@click="nowPlaying?playSong(index):$addSongs({songs:data,index:index})"
				v-ripple
			>
				<div class="content">
					<v-avatar size="42px" item>
						<v-img
							:src="song.cover?(song.cover.startsWith('http')?song.cover:server+song.cover):defaultCover"
							alt="cover"
						/>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">{{song.name}}</div>
						<div class="t-ellipsis">{{song.artist}}</div>
					</div>
				</div>
				<div class="action">
					<slot :index="index" :song="song" :moreDialog="moreDialog">
						<v-btn icon @click.stop="moreDialog(song)" v-show="isSafari">
							<v-icon class="material-icons-outlined">more_horiz</v-icon>
						</v-btn>
						<v-btn icon @click.stop="$addSongs({songs:[song],clear:false});isInSongList.push(index);">
							<v-icon v-if="isInSongList.includes(index)">done</v-icon>
							<v-icon v-else>add</v-icon>
						</v-btn>
					</slot>
				</div>
			</div>
		</transition-group>
		<v-dialog v-model="moreDialogShow" max-width="400">
			<v-card>
				<div class="d-flex flex-column align-center moreDialog-header" v-if="moreDialogTemp">
					<v-img
						v-if="moreDialogTemp"
						width="200px"
						aspect-ratio="1"
						class="moreDialog-cover"
						:src=" moreDialogTemp.cover
							? moreDialogTemp.cover.startsWith('http')
								? moreDialogTemp.cover
								: server + moreDialogTemp.cover
							: defaultCover
					"
					></v-img>
					<div class="head t-ellipsis">{{moreDialogTemp.name}}</div>
					<div class="artist t-ellipsis">{{moreDialogTemp.artist}}</div>
				</div>
				<v-card-text class="moreDialog-content">
					<div class="poka list" v-if="moreDialogTemp">
						<div class="item" v-ripple @click="openPlaylistDialog();moreDialogShow=false">
							<div class="content">
								<v-avatar size="42px" item>
									<v-icon class="material-icons-outlined" color="primary">playlist_add</v-icon>
								</v-avatar>
								<div class="header">
									<div class="head">{{$t('songAction_add2playlist')}}</div>
								</div>
							</div>
							<div class="action">
								<v-btn icon>
									<v-icon>keyboard_arrow_right</v-icon>
								</v-btn>
							</div>
						</div>
						<v-divider />
						<div class="item" @click="moreDialog_goto_artist" v-ripple>
							<div class="content">
								<v-avatar size="42px" item>
									<v-icon class="material-icons-outlined" color="primary">mic</v-icon>
								</v-avatar>
								<div class="header">
									<div class="head t-ellipsis">{{moreDialogTemp.artist}}</div>
									<div>{{$t('songAction_artist')}}</div>
								</div>
								<div class="action">
									<v-btn icon>
										<v-icon>keyboard_arrow_right</v-icon>
									</v-btn>
								</div>
							</div>
						</div>
						<div class="item" @click="moreDialog_goto_album" v-ripple>
							<div class="content">
								<v-avatar size="42px" item>
									<v-icon class="material-icons-outlined" color="primary">album</v-icon>
								</v-avatar>
								<div class="header">
									<div class="head t-ellipsis">{{moreDialogTemp.album}}</div>
									<div class="t-ellipsis">
										<span v-if="moreDialogTemp.year">{{moreDialogTemp.year}}</span>
										<span v-else>{{$t('songAction_album')}}</span>
									</div>
								</div>
								<div class="action">
									<v-btn icon>
										<v-icon>keyboard_arrow_right</v-icon>
									</v-btn>
								</div>
							</div>
						</div>
						<div class="item" v-ripple>
							<div class="content">
								<v-avatar size="42px" item>
									<v-icon class="material-icons-outlined" color="primary">storage</v-icon>
								</v-avatar>
								<div class="header">
									<div class="head t-ellipsis">{{$t(`source.${moreDialogTemp.source}`)}}</div>
									<div class="t-ellipsis">{{moreDialogTemp.id}}</div>
								</div>
							</div>
						</div>
						<div class="item" v-if="moreDialogTemp.codec" v-ripple>
							<div class="content">
								<v-avatar size="42px" item>
									<v-icon class="material-icons-outlined" color="primary">insert_drive_file</v-icon>
								</v-avatar>
								<div class="header">
									<div class="head t-ellipsis">{{moreDialogTemp.codec.toUpperCase()}}</div>
									<div class="t-ellipsis">
										<span v-if="moreDialogTemp.bitrate">{{moreDialogTemp.bitrate/1000}}k</span>
										<span v-else>Codec</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn text @click="moreDialogShow = false">{{$t('back')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="playlistDialog" max-width="400">
			<v-card id="playlist-dialog">
				<v-toolbar flat>
					<v-card-title class="headline">{{$t("songAction_add2playlist")}}</v-card-title>
					<v-spacer />
					<v-btn icon @click="openCreatePlaylistDialog">
						<v-icon class="material-icons-outlined">add</v-icon>
					</v-btn>
				</v-toolbar>
				<v-card-text style="height: 300px;" v-if="playlistDialogLoading">
					<poka-loader />
				</v-card-text>
				<v-card-text style="height: 300px;" v-else>
					<v-list v-if="playlists.length>0">
						<v-list-item-group v-model="existsPlaylists" multiple>
							<template v-for="(item, i) in playlists">
								<v-list-item
									:key="`item-${i}`"
									:value="item"
									@click="toggleSongOfPlaylist(item);"
									:title="item.name"
								>
									<v-list-item-action>
										<v-checkbox color="primary" :input-value="existsPlaylists.includes(item._id)" />
									</v-list-item-action>
									<v-list-item-content>
										<v-list-item-title v-text="item.name" class="t-ellipsis" />
									</v-list-item-content>
								</v-list-item>
							</template>
						</v-list-item-group>
					</v-list>
					<p
						style="user-select: none;margin:100px 0;text-align: center;"
						v-else
					>{{$t('playlist_page.playlist_empty')}}</p>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn text @click="playlistDialog = false">{{$t('done')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="createPlaylistDialog" max-width="400">
			<v-card>
				<v-card-title class="headline">{{$t('playlist_page.add_title')}}</v-card-title>
				<v-card-text>
					<v-text-field v-model="createPlaylistName" :label="$t('playlist_page.title_input')" outlined></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-btn text @click="createPlaylistDialog = false">{{$t('back')}}</v-btn>
					<v-spacer />
					<v-btn text @click="createPlaylist">{{$t('done')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<style lang="sass">
.moreDialog-header
	padding: 16px 0
	.moreDialog-cover
		background: #555
		border-radius: 16px
		margin-bottom: 8px
		box-shadow: 0 0.8px 1.9px rgba(0, 0, 0, 0.02),0 2.3px 4.5px rgba(0, 0, 0, 0.028),0 4.8px 8.5px rgba(0, 0, 0, 0.035),0 9.2px 15.2px rgba(0, 0, 0, 0.042),0 16.9px 28.4px rgba(0, 0, 0, 0.05),0 26px 68px rgba(0, 0, 0, 0.07)
	.head
		font-weight: bold
		font-size: 18px
		line-height: 1.25em
		opacity: 0.999
	.head,.artist
		max-width: 95%
.moreDialog-content
	.item
		.v-avatar
			position: relative
			&:before
				background-color: var(--v-primary-base)
				-webkit-backdrop-filter: blur(10px)
				bottom: 0
				content: ""
				left: 0
				opacity: 0.1
				pointer-events: none
				position: absolute
				right: 0
				top: 0
				border-radius: 4px
				transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
		&:hover .v-avatar:before
			opacity: .2
</style>
<script>
export default {
	name: "poka-parse-songs",
	props: {
		data: { type: Array, required: true },
		nowPlaying: { type: Boolean, default: false },
		activeIndex: Number
	},
	data: () => ({
		server: _setting(`server`),
		defaultCover: _setting(`headerBgSource`),
		isInSongList: [],
		playlistDialog: false,
		playlistDialogLoading: false,
		createPlaylistDialog: false,
		createPlaylistName: '',
		moreDialogShow: false,
		moreDialogTemp: null,
		playlists: [],
		existsPlaylists: [],
		isSafari: /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent),
	}),
	methods: {
		async openPlaylistDialog() {
			this.playlistDialog = true
			this.playlistDialogLoading = true
			await this.updatePlaylistData()
			this.playlistDialogLoading = false
		},
		playSong(i) {
			_player.list.switch(i);
			_player.play();
			//this.updatePlayer();
		},
		async toggleSongOfPlaylist(playlist) {
			let song = this.$deepCopy(this.moreDialogTemp)
			if (song.originalURL) song.url = song.originalURL
			if (song.originalCover) song.cover = song.originalCover
			delete song.originalURL
			delete song.uuid
			delete song.originalCover
			await this.axios.post(`${this.server}/pokaapi/playlist/song`, { playlistId: playlist._id, song })
			await this.updatePlaylistData()
		},
		openCreatePlaylistDialog() {
			this.createPlaylistDialog = true
			this.createPlaylistName = ''
		},
		async createPlaylist() {
			if (this.createPlaylistName != '') {
				await this.axios.post(`${this.server}/pokaapi/playlist/create`, { name: this.createPlaylistName })
				this.createPlaylistDialog = false
				await this.updatePlaylistData()
			} else {
				this.$snackbar(i18n.t('playlist_page.edit_empty'));
			}
		},
		async updatePlaylistData() {
			let res = (await this.axios.post(`${this.server}/pokaapi/playlist/song/exist`, this.moreDialogTemp)).data
			this.playlists = res.playlists
			this.existsPlaylists = res.existsPlaylists.map(x => x._id)
		},
		moreDialog(song) {
			this.moreDialogTemp = song;
			this.moreDialogShow = true;
		},
		moreDialog_goto_album() {
			let t = this.moreDialogTemp;
			if (t && t.albumId) {
				this.moreDialogShow = false;
				this.$nextTick(() => {
					this.$router.push(`/album/songs/${encodeURIComponent(t.source)}/${encodeURIComponent(t.albumId)}`);
				});
			}
		},
		moreDialog_goto_artist() {
			let t = this.moreDialogTemp;
			if (t && t.artistId) {
				this.moreDialogShow = false;
				this.$nextTick(() => {
					this.$router.push(`/artist/${encodeURIComponent(t.source)}/${encodeURIComponent(t.artistId)}`);
				});
			}
		}
	}
};
</script>
