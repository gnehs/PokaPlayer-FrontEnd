<template>
	<div>
		<transition name="fade" mode="out-in">
			<poka-header :blurbg="true" :bg="audio_cover" v-if="audio_cover" :key="audio_cover" />
			<poka-header v-else key="2" />
		</transition>
		<div v-on:dblclick="openLyricDialog">
			<transition name="fade" mode="out-in">
				<div
					v-if="lyric.length > 1"
					class="lyric"
					key="lyric"
					:class="{lyricTranslated:lyricTranslated}"
				>
					<p
						v-for="(item, index) of lyric"
						:key="index"
						:class="{focus: index==lyricFocus }"
					>{{item.text}}</p>
				</div>

				<v-card
					v-else-if="lyricSearching"
					class="mx-auto"
					max-width="344"
					style="margin-top:32px;"
					key="lyricSearchingcard"
				>
					<v-card-text class="text-center">
						<v-icon class="material-icons-outlined display-4">subtitles</v-icon>
						<p class="headline text--primary">{{$t('loading')}}</p>
					</v-card-text>
				</v-card>

				<v-card v-else class="mx-auto" max-width="344" style="margin-top:32px;" key="lrc_noLyrics">
					<v-card-text class="text-center">
						<v-icon class="material-icons-outlined display-4">subtitles</v-icon>
						<p class="headline text--primary">{{$t('lrc_noLyrics')}}</p>
						<v-btn outlined color="primary" @click="showLyricDialog = true">{{$t('lrc_search')}}</v-btn>
					</v-card-text>
				</v-card>
			</transition>
		</div>
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
				@click="openLyricDialog"
			>
				<v-icon>search</v-icon>
			</v-btn>
		</v-fab-transition>
		<v-dialog v-model="showLyricDialog" max-width="420">
			<v-card>
				<v-card-title class="headline">{{$t("lrc_search")}}</v-card-title>
				<v-card-text style="padding-bottom: 0;">
					<v-text-field
						:label="$t('lrc_search')"
						name="searchLyric"
						v-model.trim="lyricSearchkeyword"
						:disabled="lyricSearching"
						@keyup.enter="getLyricByKeyword()"
						@change="getLyricByKeyword()"
						solo
					></v-text-field>
					<p style="margin-top: -22px">
						<small>{{$t('lrc_enter2search')}}</small>
					</p>
				</v-card-text>
				<v-divider />
				<v-card-text style="max-height: 400px;overflow: scroll;overflow-x:hidden">
					<div class="poka list" style="width: 372px;">
						<div class="item" @click="loadLrc(`[00:00.000]`,true);showLyricDialog = false" v-ripple>
							<div class="content">
								<div class="header">
									<div class="head t-ellipsis">{{$t('lrc_notLoad')}}</div>
									<div class="t-ellipsis">{{$t('lrc_notLoad_description')}}</div>
								</div>
							</div>
						</div>
					</div>
					<div class="poka list" v-if="!lyricSearching&&lyricSearchResult" style="width: 100%;">
						<div
							class="item"
							v-for="(item, index) of lyricSearchResult"
							:key="index"
							@click="loadLrc(item.lyric,true);showLyricDialog = false"
							v-ripple
						>
							<div class="content">
								<div class="header">
									<div class="head t-ellipsis">{{item.name}}</div>
									<div class="t-ellipsis">{{item.artist}}</div>
								</div>
							</div>
						</div>
					</div>
					<poka-loader v-else-if="lyricSearching" />
					<div style="text-align:center;padding: 40px 0;" v-else>
						<v-btn @click="dialogSearch" color="primary">{{$t('search')}}</v-btn>
					</div>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-btn text @click="editLyric">編輯目前的歌詞</v-btn>
					<v-spacer></v-spacer>
					<v-btn text @click="showLyricDialog = false">{{$t('cancel')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<style lang="sass" scoped>
.lyric
	text-align: center
	padding-top: 80px
	padding-bottom: 80px
	p
		transition: all 0.5s cubic-bezier(0.77, 0, 0.18, 1), color 0.2s linear, opacity 0.2s linear
		opacity: .4
		line-height: 1.2em
		transform: scale(.7)
		position: relative
		font-size: calc(16px + 1.2vmin)
		&.focus
			opacity: 1
			transform: scale(1)
			font-weight: 700
			text-shadow: 0 1px 8px rgba(0, 0, 0, 0.1)
			.theme--dark &
				text-shadow: 0 1px 4px rgba(255, 255, 255, 0.4)
	&.lyricTranslated
		p.focus:not(:empty) + p
			opacity: .8
			transform: scale(.8)
			text-shadow: 0 1px 8px rgba(0, 0, 0, 0.1)
			font-weight: 700
			letter-spacing: .5px
			.theme--dark &
				text-shadow: 0 1px 4px rgba(255, 255, 255, 0.4)
</style>

<script>
export default {
	name: "LyricEdit",
	data: () => ({
		audio_title: null,
		audio_artist: null,
		audio_cover: null,
		showLyricDialog: false,
		lyric: [],
		lyric_raw: null,
		lyricFocus: 0,
		lyricSearching: true,
		lyricSearchResult: null,
		lyricTranslated: false,
		lyricSearchkeyword: null,
		Lyric_Update: null,
	}),
	created() {
		this.updateLyric();
		this.startUpdateLyric();
	},
	destroyed() {
		this.stopUpdateLyric();
	},
	methods: {
		editLyric() {
			window.localStorage['lrc_temp'] = this.lyric_raw
			this.$router.push("/lyric/edit");
		},
		startUpdateLyric() {
			this.Lyric_Update = setInterval(() => this.updateLyric(), 300);
		},
		stopUpdateLyric() {
			if (this.Lyric_Update) {
				clearInterval(this.Lyric_Update);
			}
		},
		openLyricDialog() {
			this.showLyricDialog = true;
			let nowPlaying = _player.list.audios[_player.list.index];
			this.lyricSearchkeyword = this.audio_title + " " + this.audio_artist

		},
		dialogSearch() {
			this.getLyricByKeyword(this.lyricSearchkeyword, false); //搜尋一下
		},
		updateLyric() {
			let nowPlaying = _player.list.audios[_player.list.index];
			if (_player.list.audios.length > 0) {
				if (this.audio_title != nowPlaying.name) {
					//找歌詞囉
					window._lrc.load(`[00:00.000]`);
					this.lyricFocus = 0;
					this.lyricSearching = true;
					this.lyricSearchResult = null;
					this.lyricSearchkeyword = nowPlaying.name + " " + nowPlaying.artist
					this.getLyric(
						nowPlaying.name,
						nowPlaying.artist,
						nowPlaying.id,
						nowPlaying.source
					);
					this.audio_title = nowPlaying.name;
					this.audio_artist = nowPlaying.artist;
					this.audio_cover = nowPlaying.cover;
				} else {
					//更新時間就好
					this.lyric = window._lrc.getLyrics();
					if (this.lyric.length > 1) {
						let lyricFocus_temp = window._lrc.select(
							_player.audio.currentTime
						);
						if (this.lyricFocus != lyricFocus_temp) {
							this.lyricFocus = lyricFocus_temp;
							this.$nextTick(() => {
								//等 Vue 好了再去更新捲動條
								let focusedLyric = document.querySelector(".lyric p.focus");
								if (focusedLyric) {
									let sh = focusedLyric.offsetTop - document.querySelector("main").clientHeight * 0.5 +
										focusedLyric.clientHeight * (this.lyricTranslated ? 1.75 : 0.75);
									sh += 69 //底部播放器高度
									sh += 50 // 偏移調整
									this.$vuetify.goTo(sh, {
										duration: 250,
										offset: 0,
										container: "main.v-content",
										easing: 'easeInOutCubic',
									})
								} else {
									this.lyricFocus = 0
								}
							});
						}
					}
				}
			} else {
				this.noloadedLyric = true;
				this.lyricSearching = false;
			}
		},
		getLyric(title, artist, id = false, source) {
			let lyricRegex = /\[([0-9.:]*)\]/i;
			let response, url;
			if (id) {
				url = _setting(`server`) + `/pokaapi/lyric/?moduleName=${encodeURIComponent(source)}&id=${encodeURIComponent(id)}&time=${new Date().getTime()}`;

				this.axios(url).then(response => {
					if (
						response.data.lyrics[0].lyric &&
						response.data.lyrics[0].lyric.match(lyricRegex)
					) {
						if (title == this.audio_title) {
							//透過 id 找到歌詞ㄌ
							this.loadLrc(response.data.lyrics[0].lyric);
						}
					} else {
						//沒找到，拿 title 跟 artist 找找看
						this.getLyricByKeyword(this.lyricSearchkeyword);
					}
				});
			} else {
				this.getLyricByKeyword(this.lyricSearchkeyword);
			}
		},
		getLyricByKeyword(keyword, set = true) {
			if (!keyword) keyword = this.lyricSearchkeyword
			this.lyricSearching = true;
			this.axios(_setting(`server`) + `/pokaapi/searchLyrics/?keyword=${encodeURIComponent(keyword)}`)
				.then(result => result.data)
				.then(result => {
					if (result.lyrics.length > 0) {
						//計算傳回歌詞匹配率
						result.lyrics.forEach(element => {
							let rate =
								this.matchRate(this.audio_title, element.name) * 0.7 +
								this.matchRate(this.audio_artist, element.artist) * 0.3;
							rate = Math.round(rate * 100) / 100;
							element.rate = rate > 0 ? (rate > 100 ? 90.25 : rate) : 0;
						});
						//以匹配率排序
						result.lyrics.sort((a, b) => b.rate - a.rate);
						if (keyword == this.lyricSearchkeyword) {
							//最高者若超過 .7 則載入歌詞
							if (result.lyrics[0].rate > 35 && set)
								this.loadLrc(result.lyrics[0].lyric);
							this.lyricSearchResult = result.lyrics;
						}
					}
					this.lyricSearching = false;
				});
		},
		matchRate(a, b, rate = 0) {
			a = a.toLowerCase();
			b = b.toLowerCase();
			for (let c of a.split("")) b.includes(c) ? rate++ : rate--;
			for (let c of b.split("")) a.includes(c) ? rate++ : rate--;
			return Math.round((rate / (a.length * 2)) * 10000) / 100;
		},
		loadLrc(lrc, save = false) {
			window._lrc.load(lrc);
			this.lyric_raw = lrc
			this.$vuetify.goTo(0, {
				duration: 250,
				offset: 0,
				container: "main.v-content",
				easing: 'easeInOutCubic',
			})
			this.lyricFocus = 0; // 歌詞進度歸零
			try {
				//如果最後兩個時間相同把後面那個的時間調到一個世紀後
				if (window._lrc.lyrics_all[window._lrc.lyrics_all.length - 2].timestamp ==
					window._lrc.lyrics_all[window._lrc.lyrics_all.length - 1].timestamp) {
					window._lrc.lyrics_all[window._lrc.lyrics_all.length - 2].timestamp += 100;
					this.lyricTranslated = true;
					window._lrc.lyrics_all = window._lrc.lyrics_all.sort((a, b) => a.timestamp - b.timestamp)
				} else {
					this.lyricTranslated = false;
				}
			} catch (e) {
				this.lyricTranslated = false;
			}
			this.lyricSearching = false;
			if (save) {
				let nowPlaying = _player.list.audios[_player.list.index];
				this.axios.post(_setting(`server`) + `/pokaapi/lyric`, {
					title: nowPlaying.name,
					artist: nowPlaying.artist,
					songId: nowPlaying.id,
					source: nowPlaying.source,
					lyric: lrc
				});
				this.$snackbar(i18n.t('lrc_saved'));
			}
		}
	}
};
</script>