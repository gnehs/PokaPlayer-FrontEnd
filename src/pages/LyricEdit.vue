<template>
	<div>
		<div>
			<div id="lrc-editor">
				<div
					v-if="lyric.length > 1"
					class="lyric-view"
					key="lyric"
					:class="{lyricTranslated:lyricTranslated}"
				>
					<p
						v-for="(item, index) of lyric"
						:key="index"
						:class="{focus:index==lyricFocus}"
						@click="musicSeek(item.timestamp)"
					>
						<span class="timestamp">{{timeToTag(item.timestamp)}}</span>
						{{item.text}}
					</p>
				</div>
				<div id="lyric-edit">
					<v-card class="mx-auto" id="lyric-edit-about">
						<v-card-text>
							<div>PokaPlayer 歌詞編輯器 Beta</div>
							<p class="display-1 text--primary">使用說明</p>
							<div class="text--primary">
								左側為歌詞預覽，右側則是編輯區塊
								<br />編輯完成後請按左下角打勾儲存歌詞，若要取消編輯點擊返回鍵即可跳出
								<br />點擊歌詞預覽的歌詞即可將歌曲轉跳至該時間，若是雙語歌詞，請點選原文部份
								<br />若有任何問題或功能建議，歡迎透過「設定->關於->GitHub->Issues」提出
							</div>
						</v-card-text>
					</v-card>
					<v-card class="mx-auto" id="lyric-edit-about-phone">
						<v-card-text>
							<div>PokaPlayer 歌詞編輯器 Beta</div>
							<p class="display-1 text--primary">使用說明</p>
							<div class="text--primary">
								上方為歌詞預覽，下方則是編輯區塊
								<br />編輯完成後請按左下角打勾儲存歌詞，若要取消編輯點擊返回鍵即可跳出
								<br />點擊歌詞預覽的歌詞即可將歌曲轉跳至該時間，若是雙語歌詞，請點選原文部份
								<br />若有任何問題或功能建議，歡迎透過「設定->關於->GitHub->Issues」提出
							</div>
						</v-card-text>
					</v-card>
					<v-card class="mx-auto" id="lyric-edit-time-shift">
						<v-card-text style="padding-bottom:0">
							<div>時間平移</div>
							<p
								class="display-1 text--primary"
								style="margin-bottom:0"
							>{{timeShiftValue>=0?'+':''}}{{timeShiftValue}}s</p>
						</v-card-text>
						<v-card-actions>
							<v-btn text @click="timeShift(-0.5)" color="red accent-4">-0.5s</v-btn>
							<v-btn text @click="timeShift(-0.1)" color="red accent-4">-0.1s</v-btn>
							<v-btn text @click="timeShift(0.1)" color="primary">+0.1s</v-btn>
							<v-btn text @click="timeShift(0.5)" color="primary">+0.5s</v-btn>
							<v-spacer />
							<v-btn text @click="timeShift(-timeShiftValue)" color="primary">重置</v-btn>
						</v-card-actions>
					</v-card>
					<v-card class="mx-auto" id="lyric-edit-text-editor">
						<v-card-text style="padding-bottom:0">
							<div>文字編輯器</div>
							<v-textarea v-model="lyric_raw" max-height="100%" rows="20"></v-textarea>
						</v-card-text>
					</v-card>
				</div>
			</div>
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
				@click="saveLyric"
			>
				<v-icon>done</v-icon>
			</v-btn>
		</v-fab-transition>
	</div>
</template>
<style lang="sass" scoped>
#lrc-editor
    display: flex
    flex-direction: row
    height: calc(100vh - 64px - 69px - 32px)
    .lyric-view
        width: 50%
        text-align: left
        padding-top: 80px
        padding-bottom: 80px
        padding-left: 8px
        height: 100%
        overflow: scroll
        //border: 1px solid rgba(0, 0, 0, 0.2)
        p
            transition: font-size 0.5s cubic-bezier(0.77, 0, 0.18, 1), color 0.2s linear, opacity 0.2s linear
            opacity: .4
            line-height: 1.2em
            position: relative
            font-size: 18px
            transform: none
            cursor: pointer
            .timestamp
                width: 85px
                display: inline-block
                background: var(--v-primary-base,#000)
                color: #FFF
                padding: 2px 5px
                font-size: 18px
                font-family: 'Ubuntu Mono', monospace
            &:hover
                background: rgba(0,0,0,.1)
            &.focus
                opacity: 1
                font-weight: 700
                text-shadow: 0 1px 8px rgba(0, 0, 0, 0.1)
                transform: none
                font-size: 20px
                .theme--dark &
                    text-shadow: 0 1px 4px rgba(255, 255, 255, 0.4)
        &.lyricTranslated
            p.focus:not(:empty) + p
                opacity: .8
                font-size: 18px
                text-shadow: 0 1px 8px rgba(0, 0, 0, 0.1)
                font-weight: 700
                .theme--dark &
                    text-shadow: 0 1px 4px rgba(255, 255, 255, 0.4)
    #lyric-edit
        height: 100%
        padding: 10px 8px
        width: 50%
        //border: 1px solid rgba(0, 0, 0, 0.2)
        border-left: 0
        font-family: 'Ubuntu Mono', monospace
        display: flex
        flex-direction: column
        height: 100%
        overflow: scroll
        #lyric-edit-time-shift
            width: 100%
        #lyric-edit-text-editor
            width: 100%
        #lyric-edit-about, #lyric-edit-about-phone
            width: 100%
        #lyric-edit-about-phone
            display: none

@media screen and (max-width: 768px)
    #lrc-editor
        display: block
        height: calc(100vh - 64px - 69px)
        .lyric-view
            width: 100%
            height: 30%
            box-shadow: inset 0 -1px 0 0 #dadce0
        #lyric-edit
            width: 100%
            height: 70%
            padding: 0 8px
            #lyric-edit-about
                display: none
            #lyric-edit-about-phone
                display: block
@media (prefers-color-scheme: dark) and (max-width: 768px)
    .lyric-view
        box-shadow: inset 0 -1px 0 0 hsla(0,0%,100%,.12)
</style>
<style lang="sass">
.v-textarea textarea
    line-height: 1.5em!important
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
		timeShiftValue: 0
	}),
	created() {
		this.updateLyric();
		this.startUpdateLyric();
		// 調整為單曲循環
		_player.options.order = _player.options.order + "_r"
		//讀取歌詞
		this.lyric_raw = window.localStorage['lrc_temp']
		this.loadLrc(this.lyric_raw)
	},
	destroyed() {
		this.stopUpdateLyric();
		_player.options.order = _player.options.order.replace('_r', '')
	},
	watch: {
		lyric_raw(val) {
			this.loadLrc(val)
		}
	},
	methods: {
		loadLrc(lrc) {
			window._lrc.load(lrc);
			//如果最後兩個時間相同就互相調換
			if (window._lrc.lyrics_all[window._lrc.lyrics_all.length - 2].timestamp ==
				window._lrc.lyrics_all[window._lrc.lyrics_all.length - 1].timestamp) {
				let a = window._lrc.lyrics_all[window._lrc.lyrics_all.length - 2].text
				window._lrc.lyrics_all[window._lrc.lyrics_all.length - 2].text = window._lrc.lyrics_all[window._lrc.lyrics_all.length - 1].text
				window._lrc.lyrics_all[window._lrc.lyrics_all.length - 1].text = a
				this.lyricTranslated = true
			}
		},
		timeShift(val) {
			let lyric_temp = window._lrc.getLyrics();
			let lrc_temp = ""
			for (let i in lyric_temp) {
				lyric_temp[i].timestamp = this.minus(lyric_temp[i].timestamp, this.times(val, -1))
				lrc_temp += `[${this.timeToTag(lyric_temp[i].timestamp)}]${lyric_temp[i].text}\n`
			}
			this.lyric_raw = lrc_temp
			this.timeShiftValue = this.minus(this.timeShiftValue, this.times(val, -1))
		},
		musicSeek(time) { _player.seek(time) },
		minus(num1, num2, ...others) {
			// 精確減法
			if (others.length > 0) return this.minus(this.minus(num1, num2), others[0], ...others.slice(1));
			const baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)));
			return (this.times(num1, baseNum) - this.times(num2, baseNum)) / baseNum;
		},
		digitLength(num) {
			// Get digit length of e
			const eSplit = num.toString().split(/[eE]/);
			const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
			return len > 0 ? len : 0;
		},
		times(num1, num2, ...others) {
			// 精確乘法
			function checkBoundary(num) {
				if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
					console.warn(`${num} is beyond boundary when transfer to integer, the results may not be accurate`);
				}
			}
			function float2Fixed(num) {
				if (num.toString().indexOf("e") === -1) return Number(num.toString().replace(".", ""));
				const dLen = this.digitLength(num);
				return dLen > 0 ? num * Math.pow(10, dLen) : num;
			}

			if (others.length > 0) return this.times(this.times(num1, num2), others[0], ...others.slice(1));
			const num1Changed = float2Fixed(num1);
			const num2Changed = float2Fixed(num2);
			const baseNum = this.digitLength(num1) + this.digitLength(num2);
			const leftValue = num1Changed * num2Changed;

			checkBoundary(leftValue);

			return leftValue / Math.pow(10, baseNum);
		},
		timeToTag(seconds) {
			let minute = Math.floor(seconds / 60);
			let second = this.minus(seconds, minute * 60);
			return `${minute}:${second}`;
		},
		startUpdateLyric() {
			this.Lyric_Update = setInterval(() => this.updateLyric(), 300);
		},
		stopUpdateLyric() {
			if (this.Lyric_Update) {
				clearInterval(this.Lyric_Update);
			}
		},
		updateLyric() {
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
						let focusedLyric = document.querySelector(".lyric-view p.focus");
						if (focusedLyric) {
							let sh = focusedLyric.offsetTop - document.querySelector(".lyric-view").clientHeight * 0.5 +
								focusedLyric.clientHeight * (this.lyricTranslated ? 1.75 : 0.75);
							window.scrollTo(document.querySelector(".lyric-view"), sh, 200);
						} else {
							this.lyricFocus = 0
						}
					});
				}
			}

		},
		saveLyric() {
			let nowPlaying = _player.list.audios[_player.list.index];
			this.axios.post(_setting(`server`) + `/pokaapi/lyric`, {
				title: nowPlaying.name,
				artist: nowPlaying.artist,
				songId: nowPlaying.id,
				source: nowPlaying.source,
				lyric: this.lyric_raw
			});
			this.$snackbar(i18n.t('lrc_saved'));
			this.$router.push("/lyric");
		}
	}
};
</script>