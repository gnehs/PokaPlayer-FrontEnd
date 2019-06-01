<template>
	<div>
		<div v-on:dblclick="openLyricDialog" class="lyric" :class="{lyricTranslated:lyricTranslated}">
			<div v-if="lyric.length > 1">
				<p
					v-for="(item, index) of lyric"
					:key="index"
					:class="{focus: index==lyricFocus }"
				>{{item.text}}</p>
			</div>
			<md-empty-state v-else-if="lyricSearching" md-icon="subtitles" :md-label="$t('loading')"/>
			<md-empty-state v-else md-icon="subtitles" :md-label="$t('lrc_noLyrics')">
				<md-button class="md-primary outlined" @click="showLyricDialog = true">{{$t('lrc_search')}}</md-button>
			</md-empty-state>
		</div>
		<md-dialog :md-active.sync="showLyricDialog" :md-fullscreen="false">
			<md-dialog-title>{{$t("lrc_search")}}</md-dialog-title>
			<md-dialog-content style="max-width: 100vw;">
				<md-list class="md-double-line">
					<md-list-item @click="loadLrc(`[00:00.000]`,true);showLyricDialog = false">
						<md-icon>close</md-icon>
						<div class="md-list-item-text">
							<span>{{$t('lrc_notLoad')}}</span>
							<span>{{$t('lrc_notLoad_description')}}</span>
						</div>
					</md-list-item>
				</md-list>
				<md-list class="md-triple-line" style="overflow:hidden;" v-if="lyricSearchResult">
					<md-list-item
						v-for="(item, index) of lyricSearchResult"
						:key="index"
						@click="loadLrc(item.lyric,true);showLyricDialog = false"
					>
						<md-icon>subtitles</md-icon>
						<div class="md-list-item-text t-ellipsis">
							<span class="t-ellipsis">{{item.name}}</span>
							<span class="t-ellipsis">{{item.artist}}</span>
							<p class="t-ellipsis">({{item.rate}}% match) {{item.lyric.substring(0,50-1)+"..."}}</p>
						</div>
					</md-list-item>
				</md-list>
				<poka-loader v-else/>
			</md-dialog-content>
			<md-dialog-actions>
				<md-button class="md-primary" @click="showLyricDialog = false">{{$t('cancel')}}</md-button>
			</md-dialog-actions>
		</md-dialog>
	</div>
</template>
<style lang="sass" scoped>
.lyric
	text-align: center
	>div
		padding-top: 80px
		padding-bottom: 80px
	p
		transition: all 0.5s cubic-bezier(0.77, 0, 0.18, 1), color 0.2s linear, opacity 0.2s linear
		opacity: .5
		min-height: 1em
		transform: scale(0.95)
		position: relative
		font-size: calc(12px + 1.2vmin)
		&.focus
			opacity: 1
			transform: scale(1)
			font-weight: 700
	&.lyricTranslated
		p.focus:not(:empty) + p
			opacity: .95
			transform: scale(0.98)
</style>

<script>
export default {
	name: "Lyrics",
	data: () => ({
		audio_title: null,
		audio_artist: null,
		showLyricDialog: false,
		lyric: [],
		lyricFocus: 0,
		lyricSearching: true,
		lyricSearchResult: [],
		lyricTranslated: false,
		Lyric_Update: null
	}),
	created() {
		this.updateLyric();
		this.startUpdateLyric();
	},
	destroyed() {
		this.stopUpdateLyric();
	},
	methods: {
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
			if (!this.lyricSearchResult) {
				this.getLyricByKeyword(
					nowPlaying.name,
					nowPlaying.artist,
					false
				); //搜尋一下
			}
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
					this.getLyric(
						nowPlaying.name,
						nowPlaying.artist,
						nowPlaying.id,
						nowPlaying.source
					);
					this.audio_title = nowPlaying.name;
					this.audio_artist = nowPlaying.artist;
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
								if ($(".lyric p.focus").length > 0) {
									let sh =
										$(".lyric p.focus")[0].offsetTop -
										$(".lyric p.focus").height() / 2 -
										$(".lyric p.focus")[0].clientHeight -
										$(window).height() * 0.32;
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
				url =
					_setting(`server`) +
					`/pokaapi/lyric/?moduleName=${encodeURIComponent(
						source
					)}&id=${encodeURIComponent(
						id
					)}&time=${new Date().getTime()}`;

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
						this.getLyricByKeyword(title, artist);
					}
				});
			} else {
				this.getLyricByKeyword(title, artist);
			}
		},
		getLyricByKeyword(title, artist, set = true) {
			this.axios(
				_setting(`server`) +
					`/pokaapi/searchLyrics/?keyword=${encodeURIComponent(
						title + " " + artist
					)}`
			)
				.then(result => result.data)
				.then(result => {
					if (result.lyrics.length > 0) {
						//計算傳回歌詞匹配率
						result.lyrics.forEach(element => {
							let rate =
								this.matchRate(title, element.name) * 0.7 +
								this.matchRate(artist, element.artist) * 0.3;
							rate = Math.round(rate * 100) / 100;
							element.rate =
								rate > 0 ? (rate > 100 ? 90.25 : rate) : 0;
						});
						//以匹配率排序
						result.lyrics.sort((a, b) => b.rate - a.rate);
						if (title == this.audio_title) {
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
			//如果最後兩個時間相同把後面那個的時間調到一個世紀後
			if (
				window._lrc.lyrics_all[window._lrc.lyrics_all.length - 2]
					.timestamp ==
				window._lrc.lyrics_all[window._lrc.lyrics_all.length - 1]
					.timestamp
			) {
				window._lrc.lyrics_all[
					window._lrc.lyrics_all.length - 1
				].timestamp = 99999;
				this.lyricTranslated = true;
			} else {
				this.lyricTranslated = false;
			}
			this.lyricSearching = false;
			this.updateLyric();
			if (save) {
				let nowPlaying = _player.list.audios[_player.list.index];
				this.axios.post(_setting(`server`) + `/pokaapi/lyric`, {
					title: nowPlaying.name,
					artist: nowPlaying.artist,
					songId: nowPlaying.id,
					source: nowPlaying.source,
					lyric: lrc
				});
			}
		}
	}
};
</script>