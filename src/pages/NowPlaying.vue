<template>
	<div>
		<poka-header :blurbg="true" :bg="audio_cover"/>
		<div style="position: relative">
			<transition-group name="songlist" tag="div" class="poka list" v-if="audio_queue.length>0">
				<div
					class="item"
					v-for="(song,index) of audio_queue"
					:key="song.uuid"
					:class="{active:index==audio_index}"
				>
					<md-ripple>
						<div class="content" @click="playSong(index)">
							<md-avatar>
								<img :src="song.cover" alt="cover">
							</md-avatar>
							<div class="header">
								<div class="title t-ellipsis">{{song.name}}</div>
								<div class="t-ellipsis">{{song.artist}}</div>
							</div>
						</div>
						<div class="action">
							<md-button class="md-icon-button md-list-action" @click="moreDialog(song)">
								<md-icon>more_horiz</md-icon>
							</md-button>
							<md-button class="md-icon-button md-list-action" @click="removeSong(index)">
								<md-icon>close</md-icon>
							</md-button>
						</div>
					</md-ripple>
				</div>
			</transition-group>
			<md-empty-state
				v-else
				md-icon="queue_music"
				:md-label="$t('app_waitForPlay')"
				:md-description="$t('app_waitForPlay_description')"
			>
				<play-random-button/>
			</md-empty-state>
			<md-dialog-confirm
				:md-active.sync="cleanActive"
				:md-title="$t('now_cleanSongs')"
				:md-content="$t('now_cleanSongs_description')"
				:md-cancel-text="$t('cancel')"
				:md-confirm-text="$t('ok')"
				@md-confirm="audio_clean"
			/>
		</div>

		<md-speed-dial class="md-bottom-right" v-if="audio_queue.length>0">
			<md-speed-dial-target @click="cleanActive=true">
				<md-icon>clear_all</md-icon>
			</md-speed-dial-target>

			<!--<md-speed-dial-content>
				<md-button class="md-icon-button" @click="switch_audio_order">
					<md-icon class="outline-repeat" v-if="audio_order==='list'"></md-icon>
					<md-icon class="outline-shuffle" v-else></md-icon>
				</md-button>
				<md-button class="md-icon-button">
					<md-icon>clear_all</md-icon>
				</md-button>
			</md-speed-dial-content>-->
		</md-speed-dial>
		<md-dialog :md-active.sync="moreDialogShow" :md-fullscreen="false">
			<md-dialog-title>{{$t("songAction_title")}}</md-dialog-title>
			<md-dialog-content style="min-width: 400px;">
				<div class="poka list">
					<div class="item disabled">
						<md-ripple>
							<div class="content">
								<md-avatar>
									<md-icon class="outline-turned_in_not"/>
								</md-avatar>
								<div class="header">
									<div class="title">{{$t('songAction_like')}}</div>
								</div>
							</div>
						</md-ripple>
					</div>
					<div class="item disabled">
						<md-ripple>
							<div class="content">
								<md-avatar>
									<md-icon class="outline-star"/>
								</md-avatar>
								<div class="header">
									<div class="title">{{$t('songAction_rating')}}</div>
								</div>
							</div>
						</md-ripple>
					</div>
					<div class="item disabled">
						<md-ripple>
							<div class="content">
								<md-avatar>
									<md-icon class="outline-playlist_add"/>
								</md-avatar>
								<div class="header">
									<div class="title">{{$t('songAction_add2playlist')}}</div>
								</div>
							</div>
						</md-ripple>
					</div>
					<div class="item" v-if="moreDialogTemp">
						<div class="content">
							<md-avatar>
								<md-icon class="outline-music_note"/>
							</md-avatar>
							<div class="header">
								<div class="title t-ellipsis">{{moreDialogTemp.name}}</div>
								<div class="t-ellipsis">歌曲名稱</div>
							</div>
						</div>
					</div>
					<div class="item" v-if="moreDialogTemp" @click="moreDialog_goto_artist">
						<md-ripple>
							<div class="content">
								<md-avatar>
									<md-icon class="outline-mic_none"/>
								</md-avatar>
								<div class="header">
									<div class="title t-ellipsis">{{moreDialogTemp.artist}}</div>
									<div class="t-ellipsis">演出者</div>
								</div>
							</div>
						</md-ripple>
					</div>
					<div class="item" v-if="moreDialogTemp" @click="moreDialog_goto_album">
						<md-ripple>
							<div class="content">
								<md-avatar>
									<md-icon class="outline-album"/>
								</md-avatar>
								<div class="header">
									<div class="title t-ellipsis">{{moreDialogTemp.album}}</div>
									<div class="t-ellipsis">專輯</div>
								</div>
							</div>
						</md-ripple>
					</div>
					<div class="item" v-if="moreDialogTemp">
						<div class="content">
							<md-avatar>
								<md-icon class="outline-cloud"/>
							</md-avatar>
							<div class="header">
								<div class="title t-ellipsis">{{moreDialogTemp.source}}</div>
								<div class="t-ellipsis">來源</div>
							</div>
						</div>
					</div>
				</div>
			</md-dialog-content>
			<md-dialog-actions>
				<md-button class="md-primary" @click="moreDialogShow = false">{{$t('back')}}</md-button>
			</md-dialog-actions>
		</md-dialog>
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
		cleanActive: false,
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
						if ($(".poka.list > .active").length > 0) {
							let sh =
								$(".poka.list > .active")[0].offsetTop -
								$("main").height() * 0.5 +
								$(".poka.list > .active").height() * 0.75;
							$(".md-app-content")
								.clearQueue()
								.animate(
									{
										scrollTop: sh
									},
									250
								);
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
<style lang="sass" scoped>
.songlist-enter, .songlist-leave-to
	opacity: 0
	transform: scaleY(0) scaleX(0.7)
	transform-origin: center top
.songlist-leave-active 
	position: absolute
.songlist-move
	transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95)
	transition-property: opacity, transform
</style>