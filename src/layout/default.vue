<template>
	<div>
		<v-app-bar :clipped-left="$vuetify.breakpoint.mdAndUp" app>
			<v-app-bar-nav-icon @click.stop="toggleMenu()" />
			<v-toolbar-title style="width: 300px">
				<span>PokaPlayer</span>
			</v-toolbar-title>
			<v-spacer />
			<v-btn icon @click="switch_audio_order">
				<v-icon class="outline-repeat" v-if="audio_order==='list'"></v-icon>
				<v-icon class="outline-shuffle" v-else></v-icon>
			</v-btn>
		</v-app-bar>
		<v-navigation-drawer
			v-model="drawer"
			:clipped="$vuetify.breakpoint.mdAndUp"
			mobile-break-point="1024"
			app
		>
			<v-list shaped>
				<v-list-item-group color="primary">
					<template v-for="item in items">
						<v-divider v-if="item.divider" :key="item.text" style="margin: 4px 0;" />
						<v-list-item v-else :key="item.text" :to="item.to" link>
							<v-list-item-action>
								<v-icon :class="item.icon"></v-icon>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title>{{ item.text }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</template>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
		<v-content>
			<transition :name="transitionName" mode="out-in">
				<router-view style="padding: 16px" :key="$route.path" />
			</transition>
			<div style="height:69px"></div>
		</v-content>
		<div class="bottom-player">
			<div class="app-progress-bar">
				<v-progress-linear
					v-model="audio_currentTimePercent"
					:buffer-value="audio_bufferPercent"
					color="primary"
				></v-progress-linear>
				<label class="pure-material-slider">
					<input
						type="range"
						min="0"
						max="100"
						step="0.000001"
						v-model="audio_currentTimePercent"
						v-on:input="audio_seek"
					/>
				</label>
			</div>
			<div class="song-info">
				<div class="left">
					<div class="cover">
						<img :src="audio_cover" />
					</div>
					<div class="song-title" @click="$router.push($route.path!='/now'?'/now':'/lyric')">
						<div class="song-name">{{audio_title}}</div>
						<div class="song-artist">{{audio_artist||$t('app_waitForPlay')}}</div>
					</div>
				</div>
				<div class="center">
					<span class="time">{{audio_currentTime}}</span>

					<v-btn icon @click="audio_previous">
						<v-icon class="outline-skip_previous" />
					</v-btn>

					<v-btn small fab depressed @click="audio_toggle" color="primary">
						<v-icon class="outline-play_arrow" v-if="audio_paused" />
						<v-icon class="outline-pause" v-else />
					</v-btn>

					<v-btn icon @click="audio_next">
						<v-icon class="outline-skip_next" />
					</v-btn>

					<span class="time">{{audio_totalTime}}</span>
				</div>
				<div class="right" v-if="audio_artist">
					<v-btn icon @click="switch_audio_order">
						<v-icon class="outline-repeat" v-if="audio_order==='list'"></v-icon>
						<v-icon class="outline-shuffle" v-else></v-icon>
					</v-btn>
					<v-btn icon to="/now" v-if="$route.path!='/now'">
						<v-icon class="outline-playlist_play" />
					</v-btn>
					<v-btn icon to="/lyric" v-else>
						<v-icon class="outline-subtitles" />
					</v-btn>
				</div>
				<div class="right" v-else>
					<play-random-button />
				</div>
				<div class="right-s" v-if="audio_artist">
					<v-btn icon @click="audio_previous">
						<v-icon class="outline-skip_previous" />
					</v-btn>

					<v-btn small fab depressed @click="audio_toggle" color="primary">
						<v-icon class="outline-play_arrow" v-if="audio_paused" />
						<v-icon class="outline-pause" v-else />
					</v-btn>

					<v-btn icon @click="audio_next">
						<v-icon class="outline-skip_next" />
					</v-btn>
				</div>
				<div class="right-s" v-else>
					<play-random-button />
				</div>
			</div>
		</div>
		<v-snackbar v-model="snackbar.show">{{snackbar.message}}</v-snackbar>
	</div>
</template>
<script>
import Vue from "vue";
export default {
	name: "App",
	data: () => ({
		menuVisible: false,
		drawer: null,
		audio_interval: null,
		audio_currentTimePercent: 100,
		audio_bufferPercent: 100,
		audio_currentTime: "0:00",
		audio_totalTime: "0:00",
		audio_paused: true,
		audio_cover: _setting(`headerBgSource`),
		audio_title: "PokaPlayer",
		audio_artist: null,
		audio_next_name: "",
		audio_previous_name: "",
		audio_order: _player.options.order,
		transitionName: "fade",
		scrollPositions: {},
		settings: { darkMode: window._setting("darkMode") },
		snackbar: {
			show: false,
			message: ``,
			timeout: null
		},
		items: [
			{ icon: 'outline-home', text: i18n.t("home"), to: "/home" },
			{ icon: 'outline-playlist_play', text: i18n.t("nowplaying"), to: "/now" },
			{ icon: 'outline-subtitles', text: i18n.t("lrc"), to: "/lyric" },
			{ divider: true },
			{ icon: 'outline-search', text: i18n.t("search"), to: "/search" },
			{ icon: 'outline-album', text: i18n.t("album"), to: "/album" },
			{ icon: 'outline-folder', text: i18n.t("folder"), to: "/folder" },
			{ icon: 'outline-mic_none', text: i18n.t("artist"), to: "/artist" },
			{ icon: 'outline-music_note', text: i18n.t("composer"), to: "/composer" },
			{ icon: 'outline-format_list_bulleted', text: i18n.t("playlist"), to: "/playlist" },
			{ divider: true },
			{ icon: 'outline-settings', text: i18n.t("settings"), to: "/setting" },
		],
	}),
	destroyed() {
		if (this.audio_interval) clearInterval(this.audio_interval);
	},
	created() {
		//註冊點心條組件
		Vue.prototype.$snackbar = (msg = ``, duration = 1500) => {
			this.snackbar.message = msg;
			this.snackbar.show = true;
			clearTimeout(this.snackbar.timeout);
			this.snackbar.timeout = setTimeout(
				() => (this.snackbar.show = false),
				duration
			);
		};
		Vue.prototype.$randomPlay = window._randomPlay;
		Vue.prototype.$addSongs = window._addSongs;
		sessionStorage.removeItem("login");
		function vhResize() {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		}
		window.addEventListener("resize", vhResize);
		vhResize();
		this.drawer = this.$vuetify.breakpoint.lgAndUp
		this.$router.beforeEach((to, from, next) => {
			let transitionName =
				to.meta.transitionName || from.meta.transitionName || "fade";
			if (transitionName === "slide") {
				const toDepth = to.path.split("/").length;
				const fromDepth = from.path.split("/").length;
				transitionName =
					toDepth < fromDepth ? "slide-right" : "slide-left";
				transitionName = toDepth == fromDepth ? "fade" : transitionName; //同一層
			}
			this.transitionName = transitionName;
			this.getStatus();

			let el = document.querySelector("main.v-content");
			if (el) this.scrollPositions[from.name] = el.scrollTop;

			next();
		});
		window.addEventListener("popstate", () => {
			let currentRouteName = this.$router.history.current.name;
			let el = document.querySelector("main.v-content");
			if (el && currentRouteName in this.scrollPositions) {
				let positions = this.scrollPositions[currentRouteName];
				setTimeout(() => (el.scrollTop = positions), 500);
			}
		});
		this.axios.defaults.withCredentials = true;
		this.axios.defaults.baseURL = _setting(`server`);
		this.getStatus(true);
		if ("mediaSession" in navigator) {
			navigator.mediaSession.setActionHandler("play", () =>
				_player.toggle()
			);
			navigator.mediaSession.setActionHandler("pause", () =>
				_player.pause()
			);
			navigator.mediaSession.setActionHandler("previoustrack", () =>
				_player.skipBack()
			);
			navigator.mediaSession.setActionHandler("nexttrack", () =>
				_player.skipForward()
			);
		}
		this.audio_interval = setInterval(() => {
			this.audio_paused = _player.paused;
			this.audio_order = _player.options.order;
			if (_player.list.audios.length > 0) {
				let nowPlaying = _player.list.audios[_player.list.index];
				let buffered = _player.audio.buffered;
				let audioBuffered =
					_player.audio.currentTime > 1
						? (buffered.end(buffered.length - 1) /
							_player.audio.duration) *
						100
						: 0,
					cent =
						(_player.audio.currentTime / _player.audio.duration) *
						100;
				this.audio_currentTimePercent = cent;
				this.audio_bufferPercent = audioBuffered;
				this.audio_paused = _player.paused;
				this.audio_title = nowPlaying.name;
				this.audio_artist = nowPlaying.artist;
				this.audio_cover = nowPlaying.cover;
				this.audio_currentTime = this.secondToTime(
					_player.audio.currentTime || 0
				);
				this.audio_totalTime = this.secondToTime(
					_player.audio.duration || 0
				);
				this.audio_next_name =
					_player.list.audios[_player.nextIndex()].name;
				this.audio_previous_name =
					_player.list.audios[_player.prevIndex()].name;
				if ("mediaSession" in navigator) {
					//讀圖片
					let image = document.querySelector(".cover img");
					let artworkData = [
						{
							src: image.complete
								? nowPlaying.cover
								: "/static/img/icons/512x512.png",
							sizes: image.complete
								? `${image.naturalWidth}x${image.naturalHeight}`
								: "512x512",
							type: "image/png"
						}
					];
					//寫入 mediaSession.metadata
					navigator.mediaSession.metadata = new MediaMetadata({
						title: nowPlaying.name,
						artist: nowPlaying.artist,
						artwork: artworkData
					});
				}
			} else {
				this.audio_currentTime = "0:00";
				this.audio_totalTime = "0:00";
				this.audio_currentTimePercent = 100;
				this.audio_bufferPercent = 100;
				this.audio_paused = _player.paused;
				this.audio_title = "PokaPlayer";
				this.audio_artist = null;
				this.audio_cover = _setting(`headerBgSource`);
				if ("mediaSession" in navigator) {
					navigator.mediaSession.metadata = null;
				}
			}
		}, 400);
	},
	methods: {
		secondToTime(second) {
			//秒數轉時間
			let MM = Math.floor(second / 60);
			let SS = Math.floor(second % 60);
			SS = SS < 10 ? "0" + SS : SS;
			return MM + ":" + SS;
		},
		audio_toggle() {
			if (_player.list.audios.length > 0) {
				_player.toggle();
				this.audio_paused = _player.paused;
			} else {
				this.$randomPlay();
			}
		},
		audio_next() {
			_player.skipForward();
			_player.play();
		},
		audio_previous() {
			_player.skipBack();
			_player.play();
		},
		audio_seek() {
			_player.seek(
				(this.audio_currentTimePercent / 100) * _player.audio.duration
			);
		},
		closeMenu() {
			this.drawer = false;
		},
		toggleMenu() {
			this.drawer = !this.drawer;
		},
		switch_audio_order() {
			_player.options.order =
				_player.options.order === "random" ? "list" : "random";
			this.audio_order = _player.options.order;
		},
		switchTheme() {
			this.settings.darkMode = !this.settings.darkMode;
			window._setting("darkMode", this.settings.darkMode);
			this.settings.darkMode
				? window._theme.switchToDark()
				: window._theme.switchToLight();
		},
		getStatus(checkUpdate = false) {
			if (sessionStorage.getItem("login"))
				sessionStorage.setItem("login", false);
			this.axios
				.get(_setting(`server`) + "/status/")
				.then(async response => {
					if (!response.data.install) {
						return this.$router.push("/install");
					} else if (!response.data.login) {
						return this.$router.push("/login");
					}
					// 標記為已登入
					sessionStorage.setItem("login", true);
					let userProfile = await this.axios.get(
						_setting(`server`) + "/profile/"
					);
					sessionStorage.setItem(
						"login",
						JSON.stringify(userProfile.data)
					);
				});
		}
	}
};
</script>
<style lang="sass" scoped>
.v-content 
	height: calc(var(--vh,1vh) * 100) 
	overflow: hidden
	overflow-y: scroll
	margin-bottom: -69px
.v-navigation-drawer:not(.v-navigation-drawer--is-mobile)
	height: calc(var(--vh,1vh) * 100 - 69px - 64px) !important
</style>
<style lang="sass" scoped>

.bottom-player
	box-sizing: border-box
	height: 69px
	max-height: 69px
	backdrop-filter: blur(3px)
	z-index: 99
	position: fixed
	background-color: rgba(255, 255, 255, 0.9)
	@media (prefers-color-scheme: dark) 
		&
			background-color: rgba(40, 37, 53, 0.95)
	.song-info
		display: grid
		grid-gap: 10px
		grid-template-columns: .5fr 250px .5fr
		width: 100vw
		max-width: 100vw
		box-sizing: border-box
		.left
			display: flex
			align-items: center
			overflow: hidden
			height: 64px
			.song-title
				flex: 1
				overflow: hidden
				cursor: pointer
				.song-name,.song-artist
					padding-left: 2px
					overflow: hidden
					text-overflow: ellipsis
					white-space: nowrap
					line-height: 24px
				.song-name
					font-weight: bold
			.cover
				margin: 0 8px
				--cover-size: 56px
				height: var(--cover-size)
				min-width: var(--cover-size)
				position: relative
				background-size: cover
				background-position: center
				background-position: center
				border-radius: 4px
				overflow: hidden
				img
					transition: all .6s cubic-bezier(0.55, 0, 0.1, 1)
					width: var(--cover-size)
					height: var(--cover-size)
					max-width: var(--cover-size)
					max-height: var(--cover-size)
					object-fit: cover
		.center
			display: flex
			align-items: center
			height: 64px
			justify-content: center
			span.time
				font-family: var(--product-font)
				width: 2.8em
				text-align: center
		.right
			display: flex
			align-items: center
			height: 64px
			justify-content: flex-end
			padding-right: 8px
		.right-s
			width: 144px
			display: none
			align-items: center
			height: 64px
			justify-content: flex-end
			padding-right: 8px
@media screen and (max-width: 600px)
	.bottom-player
		.song-info
			grid-template-columns: 1fr 144px
			.center,.right
				display: none
			.right-s
				display: flex
</style>
