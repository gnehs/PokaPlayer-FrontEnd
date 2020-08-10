<template>
	<div>
		<v-app-bar v-if="!$vuetify.breakpoint.mdAndUp" app>
			<v-app-bar-nav-icon @click.stop="toggleMenu()" />
			<v-toolbar-title style="width: 300px">
				<span>PokaPlayer</span>
			</v-toolbar-title>
			<v-spacer />
			<v-btn icon @click="switch_audio_order">
				<v-icon class="material-icons-outlined" v-if="audio_order==='list'">repeat</v-icon>
				<v-icon class="material-icons-outlined" v-else>shuffle</v-icon>
			</v-btn>
		</v-app-bar>
		<v-navigation-drawer
			v-model="drawer"
			:clipped="$vuetify.breakpoint.mdAndUp"
			:mini-variant="$vuetify.breakpoint.mdOnly"
			:mobile-breakpoint="960"
			app
		>
			<div class="poka-drawer-logo" v-show="$vuetify.breakpoint.lgAndUp">
				<h1>PokaPlayer</h1>
				<p>{{poka_version}}</p>
			</div>
			<v-divider v-show="$vuetify.breakpoint.lgAndUp" style="margin: 0px 0;" />
			<v-list shaped>
				<v-list-item-group color="primary">
					<template v-for="item in items">
						<v-divider v-if="item.divider" :key="item.text" style="margin: 4px 0;" />
						<v-list-item v-else :key="item.text" :to="item.to" link>
							<v-list-item-action>
								<v-icon class="material-icons-outlined" v-text="item.icon"></v-icon>
								<v-icon class="material-icons" v-text="item.icon"></v-icon>
							</v-list-item-action>
							<v-list-item-content>
								<v-list-item-title>{{ item.text }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</template>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
		<transition :name="transitionName" mode="out-in" v-on:enter="pageEnter">
			<v-main :key="$route.path">
				<div class="router-view">
					<router-view />
				</div>
				<div style="height:69px"></div>
			</v-main>
		</transition>
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
						<v-icon class="material-icons-outlined">skip_previous</v-icon>
					</v-btn>

					<v-btn small fab depressed @click="audio_toggle" color="primary">
						<v-icon class="material-icons-outlined" key="play" v-if="audio_paused">play_arrow</v-icon>
						<v-icon class="material-icons-outlined" key="pause" v-else>pause</v-icon>
					</v-btn>

					<v-btn icon @click="audio_next">
						<v-icon class="material-icons-outlined">skip_next</v-icon>
					</v-btn>

					<span class="time">{{audio_totalTime}}</span>
				</div>
				<div class="right" v-if="audio_artist">
					<v-btn icon @click="switch_audio_order">
						<v-icon class="material-icons-outlined" v-if="audio_order==='list'">repeat</v-icon>
						<v-icon class="material-icons-outlined" v-else>shuffle</v-icon>
					</v-btn>
					<v-btn icon to="/now" v-if="$route.path!='/now'">
						<v-icon class="material-icons-outlined">playlist_play</v-icon>
					</v-btn>
					<v-btn icon to="/lyric" v-else>
						<v-icon class="material-icons-outlined">subtitles</v-icon>
					</v-btn>
				</div>
				<div class="right" v-else>
					<play-random-button />
				</div>
				<div class="right-s" v-if="audio_artist">
					<v-btn icon @click="audio_previous">
						<v-icon class="material-icons-outlined">skip_previous</v-icon>
					</v-btn>

					<v-btn small fab depressed @click="audio_toggle" color="primary">
						<v-icon class="material-icons-outlined" key="play" v-if="audio_paused">play_arrow</v-icon>
						<v-icon class="material-icons-outlined" key="pause" v-else>pause</v-icon>
					</v-btn>

					<v-btn icon @click="audio_next">
						<v-icon class="material-icons-outlined">skip_next</v-icon>
					</v-btn>
				</div>
				<div class="right-s" v-else>
					<play-random-button />
				</div>
			</div>
		</div>
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
		audio_order: _player.options.order,
		transitionName: "fade",
		poka_version: "0.0.0",
		scrollPositions: {},
		settings: { darkMode: window._setting("darkMode") },
		items: [
			{ icon: 'home', text: i18n.t("home"), to: "/home" },
			{ icon: 'playlist_play', text: i18n.t("nowplaying"), to: "/now" },
			{ icon: 'subtitles', text: i18n.t("lrc"), to: "/lyric" },
			{ divider: true },
			{ icon: 'search', text: i18n.t("search"), to: "/search" },
			{ icon: 'album', text: i18n.t("album"), to: "/album" },
			{ icon: 'folder', text: i18n.t("folder"), to: "/folder" },
			{ icon: 'mic_none', text: i18n.t("artist"), to: "/artist" },
			{ icon: 'music_note', text: i18n.t("composer"), to: "/composer" },
			{ icon: 'queue_music', text: i18n.t("playlist"), to: "/playlist" },
			{ divider: true },
			{ icon: 'settings', text: i18n.t("settings"), to: "/setting" },
		],
	}),
	destroyed() {
		if (this.audio_interval) clearInterval(this.audio_interval);
	},
	created() {
		// 狀態欄顏色
		document.getElementsByTagName('meta')["theme-color"].content = this.$vuetify.theme.isDark ? "rgb(47, 43, 62)" : "rgb(245, 245, 245)"
		function vhResize() {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		}
		window.addEventListener("resize", vhResize);
		vhResize();
		this.drawer = this.$vuetify.breakpoint.mdAndUp
		this.$router.beforeEach((to, from, next) => {
			let transitionName = to.meta.transitionName || from.meta.transitionName || "fade";
			if (transitionName === "slide") {
				const toDepth = to.path.split("/").length;
				const fromDepth = from.path.split("/").length;
				transitionName = toDepth < fromDepth ? "zoom-out" : "zoom-in";
				transitionName = toDepth == fromDepth ? "fade" : transitionName; //同一層
			}
			this.transitionName = transitionName;
			this.getStatus();
			let el = document.querySelector("main");
			if (el) this.scrollPositions[from.name] = el.scrollTop;
			next();
		});
		this.axios.defaults.withCredentials = true;
		this.axios.defaults.baseURL = _setting(`server`);
		this.getStatus();
		//login socket
		_socket.emit("login", {
			username: window._setting(`username`),
			password: window._setting(`password`)
		});
		_socket.emit('send-nickname', _setting('nickname'));
		if ("mediaSession" in navigator) {
			navigator.mediaSession.setActionHandler("play", () => _player.toggle());
			navigator.mediaSession.setActionHandler("pause", () => _player.pause());
			navigator.mediaSession.setActionHandler("previoustrack", () => _payer.skipBack());
			navigator.mediaSession.setActionHandler("nexttrack", () => _player.skipForward());
		}
		this.audio_interval = setInterval(() => {
			this.audio_paused = _player.paused;
			this.audio_order = _player.options.order;
			if (_player.list.audios.length > 0) {
				let nowPlaying = _player.list.audios[_player.list.index];
				let buffered = _player.audio.buffered;
				let audioBuffered = _player.audio.currentTime > 1 ? (buffered.end(buffered.length - 1) / _player.audio.duration) * 100 : 0
				let cent = (_player.audio.currentTime / _player.audio.duration) * 100;
				this.audio_currentTimePercent = cent;
				this.audio_bufferPercent = audioBuffered;
				this.audio_paused = _player.paused;
				this.audio_title = nowPlaying.name;
				this.audio_artist = nowPlaying.artist;
				this.audio_cover = nowPlaying.cover;
				this.audio_currentTime = this.secondToTime(_player.audio.currentTime || 0);
				this.audio_totalTime = this.secondToTime(_player.audio.duration || 0);
				if ("mediaSession" in navigator) {
					//讀圖片
					let image = document.querySelector(".cover img");
					let artworkData = [{
						src: image.complete ? nowPlaying.cover : "/static/img/icons/512x512.png",
						sizes: image.complete ? `${image.naturalWidth}x${image.naturalHeight}` : "512x512",
						type: "image/png"
					}];
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
				if ("mediaSession" in navigator) { navigator.mediaSession.metadata = null; }
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
			_player.seek((this.audio_currentTimePercent / 100) * _player.audio.duration);
		},
		closeMenu() {
			this.drawer = false;
		},
		toggleMenu() {
			this.drawer = !this.drawer;
		},
		switch_audio_order() {
			_player.options.order = _player.options.order === "random" ? "list" : "random";
			this.audio_order = _player.options.order;
		},
		switchTheme() {
			this.settings.darkMode = !this.settings.darkMode;
			window._setting("darkMode", this.settings.darkMode);
			this.settings.darkMode ? window._theme.switchToDark() : window._theme.switchToLight();
		},
		getStatus() {
			this.axios
				.get(_setting(`server`) + "/status/")
				.then(async response => {
					// 沒登入滾回登入頁面
					if (!response.data.login) return this.$router.push("/login");
					// version
					this.poka_version = response.data.version;
					// 標記為已登入
					let userProfile = await this.axios.get(_setting(`server`) + "/profile/");
					sessionStorage.setItem("login", JSON.stringify(userProfile.data));
				});
		},
		pageEnter() {
			let currentRouteName = this.$router.history.current.name;
			let el = document.querySelector("main");
			if (el && currentRouteName in this.scrollPositions) {
				let positions = this.scrollPositions[currentRouteName];
				setTimeout(() => (el.scrollTop = positions), 100);
			}
		}
	}
};
</script>
<style lang="sass" scoped>
nav
	.v-list-item
		.material-icons:not(.material-icons-outlined)
			display: none
		&.v-item--active
			.material-icons:not(.material-icons-outlined)
				display: block
			.material-icons-outlined
				display: none
main
	height: calc(var(--vh,1vh) * 100)
	overflow: hidden
	overflow-y: scroll
	margin-bottom: -69px

.v-navigation-drawer:not(.v-navigation-drawer--is-mobile)
	height: calc(var(--vh,1vh) * 100 - 69px) !important
.poka-drawer-logo
	padding: 8px 16px
	font-family: var(--product-font)
	p
		margin-bottom: 0

nav
	.v-list
		.v-list-item.theme--dark
			&.v-list-item--active::before
				opacity: 1
				background-color: var(--v-primary-base) !important
			.v-list-item__action,.v-list-item__content
				z-index: 1

@media (min-width: 576px)
	.router-view
		padding: 16px

.v-app-bar
	box-shadow: inset 0 -1px 0 0 #dadce0
@media (prefers-color-scheme: dark)
	.v-app-bar
		box-shadow: inset 0 -1px 0 0 hsla(0,0%,100%,.12)

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
