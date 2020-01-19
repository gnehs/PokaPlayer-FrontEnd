<template>
	<div>
		<transition name="fade" mode="in-out">
			<poka-header
				:blurbg="true"
				:title="$t('nowplaying')"
				:bg="audio_cover"
				v-if="audio_queue.length>0"
				key="1"
			/>
			<poka-header :bg="defaultCover" v-else key="2" />
		</transition>
		<transition name="slide-left" mode="out-in">
			<transition-group
				name="songlist"
				tag="div"
				class="poka list"
				style="position: relative"
				v-if="audio_queue.length>0"
				key="songlist"
			>
				<div
					class="item"
					style="user-select: none;"
					v-for="(song,index) of audio_queue"
					:key="song.uuid"
					:class="{active:index==audio_index}"
					@click="playSong(index)"
					@contextmenu.prevent="moreDialog(song)"
					v-ripple
				>
					<div class="content">
						<v-avatar size="42px" item>
							<v-img :src="song.cover" alt="cover" />
						</v-avatar>
						<div class="header">
							<div class="head t-ellipsis">{{song.name}}</div>
							<div class="t-ellipsis">{{song.artist}}</div>
						</div>
					</div>
					<div class="action">
						<v-btn icon @click.stop="moreDialog(song)" v-show="isSafari">
							<v-icon class="material-icons-outlined">more_horiz</v-icon>
						</v-btn>
						<v-btn icon @click.stop="removeSong(index)">
							<v-icon class="material-icons-outlined">close</v-icon>
						</v-btn>
					</div>
				</div>
			</transition-group>

			<v-card v-else class="mx-auto" max-width="344" style="margin-top:32px;" key="card">
				<v-card-text class="text-center">
					<v-icon class="display-4 material-icons-outlined">queue_music</v-icon>
					<p class="headline text--primary">{{$t('app_waitForPlay')}}</p>
					<p>{{$t('app_waitForPlay_description')}}</p>
					<play-random-button />
				</v-card-text>
			</v-card>
		</transition>
		<v-fab-transition>
			<v-btn
				color="primary"
				fab
				large
				dark
				bottom
				right
				fixed
				style="bottom: calc(16px + 69px);"
				v-if="audio_queue.length>0"
				@click="audio_clean"
			>
				<v-icon class="material-icons-outlined">clear_all</v-icon>
			</v-btn>
		</v-fab-transition>
		<v-dialog v-model="moreDialogShow" max-width="400">
			<v-card>
				<v-card-title class="headline">{{$t("songAction_title")}}</v-card-title>
				<v-card-text>
					<div class="poka list">
						<!--<div class="item disabled" v-ripple>
							<div class="content">
								<v-avatar size="24px" item>
									<v-icon class="material-icons-outlined">turned_in_not</v-icon>
								</v-avatar>
								<div class="header">
									<div class="head">{{$t('songAction_like')}}</div>
								</div>
							</div>
						</div>
						<div class="item disabled" v-ripple>
							<div class="content">
								<v-avatar size="24px" item>
									<v-icon class="material-icons-outlined">star</v-icon>
								</v-avatar>
								<div class="header">
									<div class="head">{{$t('songAction_rating')}}</div>
								</div>
							</div>
						</div>-->
						<div class="item" v-ripple @click="openPlaylistDialog();moreDialogShow=false">
							<div class="content">
								<v-avatar size="24px" item>
									<v-icon class="material-icons-outlined">playlist_add</v-icon>
								</v-avatar>
								<div class="header">
									<div class="head">{{$t('songAction_add2playlist')}}</div>
								</div>
							</div>
						</div>
						<v-divider />
						<div class="item" v-if="moreDialogTemp" v-ripple>
							<div class="content">
								<v-avatar size="24px" item>
									<v-icon class="material-icons-outlined">music_note</v-icon>
								</v-avatar>
								<div class="header">
									<div class="head t-ellipsis">{{moreDialogTemp.name}}</div>
									<div class="t-ellipsis">{{$t('songAction_name')}}</div>
								</div>
							</div>
						</div>
						<div class="item" v-if="moreDialogTemp" @click="moreDialog_goto_artist" v-ripple>
							<div class="content">
								<v-avatar size="24px" item>
									<v-icon class="material-icons-outlined">mic_none</v-icon>
								</v-avatar>
								<div class="header">
									<div class="head t-ellipsis">{{moreDialogTemp.artist}}</div>
									<div class="t-ellipsis">{{$t('songAction_artist')}}</div>
								</div>
							</div>
						</div>
						<div class="item" v-if="moreDialogTemp" @click="moreDialog_goto_album" v-ripple>
							<div class="content">
								<v-avatar size="24px" item>
									<v-icon class="material-icons-outlined">album</v-icon>
								</v-avatar>
								<div class="header">
									<div class="head t-ellipsis">{{moreDialogTemp.album}}</div>
									<div class="t-ellipsis">{{$t('songAction_album')}}</div>
								</div>
							</div>
						</div>
						<div class="item" v-if="moreDialogTemp" v-ripple>
							<div class="content">
								<v-avatar size="24px" item>
									<v-icon class="material-icons-outlined">cloud</v-icon>
								</v-avatar>
								<div class="header">
									<div class="head t-ellipsis">{{$t(`source.${moreDialogTemp.source}`)}}</div>
									<div class="t-ellipsis">{{$t('songAction_source')}}</div>
								</div>
							</div>
						</div>
					</div>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text @click="moreDialogShow = false">{{$t('back')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="playlistDialog" max-width="400">
			<v-card id="playlist-dialog">
				<v-toolbar dark flat>
					<v-card-title class="headline">{{$t("songAction_add2playlist")}}</v-card-title>
					<v-spacer></v-spacer>
					<v-btn dark icon @click="openCreatePlaylistDialog">
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
								<v-list-item :key="`item-${i}`" :value="item" @click="toggleSongOfPlaylist(item);">
									<v-list-item-action>
										<v-checkbox :input-value="existsPlaylists.includes(item._id)"></v-checkbox>
									</v-list-item-action>
									<v-list-item-content>
										<v-list-item-title v-text="item.name"></v-list-item-title>
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
					<v-spacer></v-spacer>
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
					<v-spacer></v-spacer>
					<v-btn text @click="createPlaylist">{{$t('done')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
export default {
	name: "NowPlaying",
	data: () => ({
		server: _setting(`server`),
		defaultCover: _setting(`headerBgSource`),
		audio_paused: true,
		audio_cover: _setting(`headerBgSource`),
		audio_queue: null,
		audio_index: -1,
		audio_title: "PokaPlayer",
		audio_artist: null,
		audio_order: _player.options.order,
		audio_uuid: ":D",
		NowPlaying_updatePlayer: null,
		playlistDialog: false,
		playlistDialogLoading: false,
		createPlaylistDialog: false,
		createPlaylistName: '',
		moreDialogShow: false,
		moreDialogTemp: null,
		playlists: [],
		existsPlaylists: [],
		isSafari: /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent)
	}),
	created() {
		this.updatePlayer();
		this.startUpdatePlayer();
	},
	destroyed() {
		this.stopUpdatePlayer();
	},
	methods: {
		async openPlaylistDialog() {
			this.playlistDialog = true
			this.playlistDialogLoading = true
			await this.updatePlaylistData()
			this.playlistDialogLoading = false
		},
		async toggleSongOfPlaylist(playlist) {
			let song = this.$deepCopy(this.moreDialogTemp)
			song.url = song.originalURL
			song.cover = song.originalCover
			delete song.originalURL
			delete song.uuid
			delete song.originalCover
			await this.axios.post(`${this.server}/pokaapi/playlist/song`, {
				playlistId: playlist._id,
				song
			})
			await this.updatePlaylistData()
		},
		openCreatePlaylistDialog() {
			this.createPlaylistDialog = true
			this.createPlaylistName = ''
		},
		async createPlaylist() {
			await this.axios.post(`${this.server}/pokaapi/playlist/create`, { name: this.createPlaylistName })
			this.createPlaylistDialog = false
			await this.updatePlaylistData()
		},
		async updatePlaylistData() {
			let res = (await this.axios.post(`${this.server}/pokaapi/playlist/song/exist`, this.moreDialogTemp)).data
			this.playlists = res.playlists
			this.existsPlaylists = res.existsPlaylists.map(x => x._id)
		},
		startUpdatePlayer() {
			this.NowPlaying_updatePlayer = setInterval(
				() => this.updatePlayer(),
				400
			);
		},
		stopUpdatePlayer() {
			if (this.NowPlaying_updatePlayer) {
				clearInterval(this.NowPlaying_updatePlayer);
			}
		},
		updatePlayer() {
			this.audio_queue = _player.list.audios;
			this.audio_paused = _player.paused;
			this.audio_order = _player.options.order;
			if (_player.list.audios.length > 0) {
				let uuid_temp = this.audio_uuid;
				this.audio_index = _player.list.index;
				this.audio_uuid = _player.list.audios[this.audio_index].uuid;
				this.audio_cover = _player.list.audios[this.audio_index].cover;
				this.audio_title = _player.list.audios[this.audio_index].name;
				this.audio_artist =
					_player.list.audios[this.audio_index].artist;
				if (uuid_temp != this.audio_uuid) {
					//換歌ㄌ
					this.$nextTick(() => {
						let activeItem = document.querySelector(
							".poka.list > .active"
						);
						if (activeItem) {
							let sh = activeItem.offsetTop - document.querySelector("main.v-content").clientHeight * 0.5 + activeItem.clientHeight * 0.75;
							sh += 69 //底部播放器
							sh += 150 // Title
							window.scrollTo(document.querySelector("main.v-content"), sh, 200);
						}
					});
				}
			} else {
				this.audio_cover = _setting(`headerBgSource`);
			}
		},
		secondToTime(second) {
			//秒數轉時間
			let MM = Math.floor(second / 60);
			let SS = Math.floor(second % 60);
			SS = SS < 10 ? "0" + SS : SS;
			return MM + ":" + SS;
		},
		playSong(i) {
			_player.list.switch(i);
			_player.play();
			this.updatePlayer();
		},
		removeSong(index) {
			_player.list.remove(index);
			this.updatePlayer();
		},
		audio_toggle() {
			_player.toggle();
			this.audio_paused = _player.paused;
		},
		audio_clean() {
			_player.list.clear();
		},
		switch_audio_order() {
			_player.options.order =
				_player.options.order === "random" ? "list" : "random";
			this.audio_order = _player.options.order;
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
					this.$router.push(
						`/album/songs/${encodeURIComponent(
							t.source
						)}/${encodeURIComponent(t.albumId)}`
					);
				});
			}
		},
		moreDialog_goto_artist() {
			let t = this.moreDialogTemp;
			if (t && t.artistId) {
				this.moreDialogShow = false;
				this.$nextTick(() => {
					this.$router.push(
						`/artist/${encodeURIComponent(
							t.source
						)}/${encodeURIComponent(t.artistId)}`
					);
				});
			}
		}
	}
};
</script>