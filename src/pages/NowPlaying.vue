<template>
	<div>
		<transition :name="bgSlideAnimation" mode="out-in">
			<poka-header
				:blurbg="true"
				:title="$t('nowplaying')"
				:bg="audio_cover"
				v-if="audio_queue.length>0"
				:key="audio_index"
			/>
			<poka-header v-else key="2" />
		</transition>
		<transition name="slide-left" mode="out-in">
			<poka-parse-songs
				v-if="audio_queue.length>0"
				:data="audio_queue"
				now-playing
				:active-index="audio_index"
			>
				<template slot-scope="props">
					<v-btn icon @click.stop="props.moreDialog(props.song)" v-show="isSafari">
						<v-icon class="material-icons-outlined">more_horiz</v-icon>
					</v-btn>
					<v-btn icon @click.stop="removeSong(props.index)">
						<v-icon class="material-icons-outlined">close</v-icon>
					</v-btn>
				</template>
			</poka-parse-songs>

			<v-card v-else class="mx-auto blur-card" max-width="344" style="margin-top:32px;" key="card">
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
	</div>
</template>
<script>
export default {
	name: "NowPlaying",
	data: () => ({
		defaultCover: _setting(`headerBgSource`),
		audio_cover: _setting(`headerBgSource`),
		audio_queue: null,
		audio_index: -1,
		audio_uuid: ":D",
		updateInterval: null,
		bgSlideAnimation: 'slide-left',
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
		startUpdatePlayer() {
			this.updateInterval = setInterval(() => this.updatePlayer(), 400);
		},
		stopUpdatePlayer() {
			if (this.updateInterval) clearInterval(this.updateInterval);
		},
		updatePlayer() {
			this.audio_queue = _player.list.audios;
			if (_player.list.audios.length > 0) {
				let uuid_temp = this.audio_uuid;
				let audio_index_temp = this.audio_index;
				this.audio_index = _player.list.index;
				this.audio_uuid = _player.list.audios[this.audio_index].uuid;
				this.audio_cover = _player.list.audios[this.audio_index].cover;
				if (uuid_temp != this.audio_uuid) {
					//換歌ㄌ
					if (this.audio_index > audio_index_temp)
						this.bgSlideAnimation = 'slide-left'
					else
						this.bgSlideAnimation = 'slide-right'
					this.$nextTick(() => {
						let activeItem = document.querySelector(
							".poka.list > .active"
						);
						if (activeItem) {
							let sh = activeItem.offsetTop - document.querySelector("main").clientHeight * 0.5 + activeItem.clientHeight * 0.75;
							sh += 69 //底部播放器
							sh += 150 // Title
							this.$vuetify.goTo(sh, {
								duration: 250,
								offset: 0,
								container: "main",
								easing: 'easeInOutCubic',
							})
						}
					});
				}
			} else {
				this.audio_cover = _setting(`headerBgSource`);
			}
		},
		removeSong(index) {
			_player.list.remove(index);
			this.updatePlayer();
		},
		audio_clean() { _player.list.clear(); },
	}
};
</script>