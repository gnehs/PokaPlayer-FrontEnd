<template>
	<div style="padding:16px;">
		<transition name="fade" mode="in-out">
			<poka-header :blurbg="true" :bg="audio_cover" v-if="audio_queue.length>0" key="1" />
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
					v-for="(song,index) of audio_queue"
					:key="song.uuid"
					:class="{active:index==audio_index}"
					@click="playSong(index)"
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
						<v-btn icon @click.stop="moreDialog(song)">
							<v-icon class="outline-more_horiz" />
						</v-btn>
						<v-btn icon @click.stop="removeSong(song)">
							<v-icon class="outline-close" />
						</v-btn>
					</div>
				</div>
			</transition-group>

			<v-card v-else class="mx-auto" max-width="344" style="margin-top:32px;" key="card">
				<v-card-text class="text-center">
					<v-icon class="display-4 outline-queue_music" />
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
				<v-icon class="outline-clear_all" />
			</v-btn>
		</v-fab-transition>
		<v-dialog v-model="moreDialogShow" max-width="400">
			<v-card>
				<v-card-title class="headline">{{$t("songAction_title")}}</v-card-title>

				<v-card-text>
					<div class="poka list">
						<div class="item disabled" v-ripple>
							<div class="content">
								<v-avatar size="42px" item>
									<v-icon class="outline-turned_in_not" />
								</v-avatar>
								<div class="header">
									<div class="head">{{$t('songAction_like')}}</div>
								</div>
							</div>
						</div>
						<div class="item disabled" v-ripple>
							<div class="content">
								<v-avatar size="42px" item>
									<v-icon class="outline-star" />
								</v-avatar>
								<div class="header">
									<div class="head">{{$t('songAction_rating')}}</div>
								</div>
							</div>
						</div>
						<div class="item disabled" v-ripple>
							<div class="content">
								<v-avatar size="42px" item>
									<v-icon class="outline-playlist_add" />
								</v-avatar>
								<div class="header">
									<div class="head">{{$t('songAction_add2playlist')}}</div>
								</div>
							</div>
						</div>
						<div class="item" v-if="moreDialogTemp" v-ripple>
							<div class="content">
								<v-avatar size="42px" item>
									<v-icon class="outline-music_note" />
								</v-avatar>
								<div class="header">
									<div class="head t-ellipsis">{{moreDialogTemp.name}}</div>
									<div class="t-ellipsis">{{$t('songAction_name')}}</div>
								</div>
							</div>
						</div>
						<div class="item" v-if="moreDialogTemp" @click="moreDialog_goto_artist" v-ripple>
							<div class="content">
								<v-avatar size="42px" item>
									<v-icon class="outline-mic_none" />
								</v-avatar>
								<div class="header">
									<div class="head t-ellipsis">{{moreDialogTemp.artist}}</div>
									<div class="t-ellipsis">{{$t('songAction_artist')}}</div>
								</div>
							</div>
						</div>
						<div class="item" v-if="moreDialogTemp" @click="moreDialog_goto_album" v-ripple>
							<div class="content">
								<v-avatar size="42px" item>
									<v-icon class="outline-album" />
								</v-avatar>
								<div class="header">
									<div class="head t-ellipsis">{{moreDialogTemp.album}}</div>
									<div class="t-ellipsis">{{$t('songAction_album')}}</div>
								</div>
							</div>
						</div>
						<div class="item" v-if="moreDialogTemp" v-ripple>
							<div class="content">
								<v-avatar size="42px" item>
									<v-icon class="outline-cloud" />
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
		moreDialogShow: false,
		moreDialogTemp: null
	}),
	created() {
		this.updatePlayer();
		this.startUpdatePlayer();
	},
	destroyed() {
		this.stopUpdatePlayer();
	},
	methods: {
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
		removeSong(i) {
			_player.list.remove(i);
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