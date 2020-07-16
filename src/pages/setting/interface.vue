<template>
	<div>
		<poka-header :title="$t('settingInterface._')" :bg="setting.bg" />
		<div class="poka list">
			<div class="item" @click="lang_dialog=true" v-ripple>
				<div class="content">
					<v-avatar size="42px" item>
						<v-icon>translate</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">{{$t('settingInterface.lang')}}</div>
						<div class="t-ellipsis">{{$t('title',currentLang)}}</div>
					</div>
				</div>
			</div>
		</div>
		<h4>{{$t('settingInterface.customize._')}}</h4>
		<div class="poka list">
			<div class="item" @click="customize_bg_dialog=true" v-ripple>
				<div class="content">
					<v-avatar size="42px" item>
						<v-icon>landscape</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">{{$t('settingInterface.customize.bg._')}}</div>
						<div class="t-ellipsis">{{$t('settingInterface.customize.bg.description')}}</div>
					</div>
				</div>
			</div>
			<div class="item" @click="bg_height_dialog=true" v-ripple>
				<div class="content">
					<v-avatar size="42px" item>
						<v-icon>style</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">{{$t('settingInterface.customize.bg_cover._')}}</div>
						<div class="t-ellipsis">{{$t('settingInterface.customize.bg_cover.description')}}</div>
					</div>
				</div>
			</div>
			<div class="item" @click="theme_dialog=true" v-ripple>
				<div class="content">
					<v-avatar size="42px" item>
						<v-icon>palette</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">{{$t('settingInterface.customize.theme._')}}</div>
						<div class="t-ellipsis">{{$t('settingInterface.customize.theme.description')}}</div>
					</div>
				</div>
			</div>
		</div>

		<v-dialog v-model="bg_height_dialog" max-width="300">
			<v-card>
				<v-card-title class="headline">{{$t('settingInterface.customize.bg_cover._')}}</v-card-title>
				<v-card-text>
					<div class="poka list">
						<div class="item" @click="setBgHeight('full')" v-ripple>
							<div class="content">
								<v-avatar size="24px" item>
									<v-icon>star</v-icon>
								</v-avatar>
								<div class="header">
									<div class="head">{{$t('settingInterface.customize.bg_cover.options.full')}}</div>
								</div>
							</div>
						</div>
						<div class="item" @click="setBgHeight('half')" v-ripple>
							<div class="content">
								<v-avatar size="24px" item>
									<v-icon>star_half</v-icon>
								</v-avatar>
								<div class="header">
									<div class="head">{{$t('settingInterface.customize.bg_cover.options.half')}}</div>
								</div>
							</div>
						</div>
						<div class="item" @click="setBgHeight('none')" v-ripple>
							<div class="content">
								<v-avatar size="24px" item>
									<v-icon>star_border</v-icon>
								</v-avatar>
								<div class="header">
									<div class="head">{{$t('settingInterface.customize.bg_cover.options.none')}}</div>
								</div>
							</div>
						</div>
					</div>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text @click="bg_height_dialog = false">{{$t('back')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="customize_bg_dialog" max-width="1200">
			<v-card>
				<v-card-title class="headline">{{$t('settingInterface.customize.bg._')}}</v-card-title>
				<v-card-text>
					<poka-cards>
						<poka-card
							@click.native="bg_prompt_active=true"
							poka-icon="link"
							:poka-title="$t('settingInterface.customize.bg.custom_link')"
						/>
						<poka-card
							v-for="{name, src} in imgSources"
							@click.native="setBg(src)"
							:key="src"
							:poka-bg="src"
							:poka-title="name"
						/>
					</poka-cards>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text @click="customize_bg_dialog = false">{{$t('done')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="theme_dialog" max-width="340">
			<v-card>
				<v-card-title class="headline">{{$t('settingInterface.customize.theme._')}}</v-card-title>
				<v-card-text>
					<v-color-picker
						style="margin:8px auto !important"
						flat
						mode="hex"
						v-model="color"
						class="ma-2"
						:swatches="swatches"
						show-swatches
					></v-color-picker>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text @click="theme_dialog = false">{{$t('done')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="bg_prompt_active" max-width="420">
			<v-card>
				<v-card-title class="headline">{{$t("settingInterface.customize.bg._")}}</v-card-title>
				<v-card-text style="padding-bottom: 0;">
					<v-text-field label="URL" v-model.trim="bg_prompt_textbox" filled></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn text @click="bg_prompt_cancel">{{$t('cancel')}}</v-btn>
					<v-btn text @click="bg_prompt_ok">{{$t('ok')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="lang_dialog" max-width="300">
			<v-card>
				<v-card-title class="headline">{{$t('settingInterface.lang')}}</v-card-title>
				<v-card-text>
					<div class="poka list">
						<div
							class="item"
							v-for="(lang,index) of languages"
							:key="`lang${lang}-${index}`"
							@click="setLang(lang)"
							v-ripple
						>
							<div class="content">
								<v-avatar size="24px" item>
									<v-icon>translate</v-icon>
								</v-avatar>
								<div class="header">
									<div class="head t-ellipsis">{{$t('title',lang)}}</div>
								</div>
							</div>
						</div>
					</div>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text @click="lang_dialog = false">{{$t('cancel')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	name: "SettingCustomize",
	data: () => ({
		lang_dialog: false,
		languages: Object.keys(window.i18n.messages),
		currentLang: window.i18n.locale,

		theme_dialog: false,
		bg_height_dialog: false,
		customize_bg_dialog: false,
		bg_prompt_active: false,
		bg_prompt_textbox: window._setting("headerBgSource"),
		setting: { bg: window._setting("headerBgSource") },
		imgSources: [
			{
				name: "LoremFlickr",
				src: "https://loremflickr.com/1920/1080"
			},
			{
				name: "Picsum Photos",
				src: "https://picsum.photos/1920/1080/?random"
			},
			{
				name: "Bing",
				src: "https://area.sinaapp.com/bingImg/"
			},
			{
				name: "The Dog API (GIF)",
				src: "https://api.thedogapi.com/v1/images/search?format=src&mime_types=image/gif"
			},
			{
				name: "The Dog API (PNG)",
				src: "https://api.thedogapi.com/v1/images/search?format=src&mime_types=image/png"
			},
			{
				name: "The Cat API (GIF)",
				src: "https://thecatapi.com/api/images/get?format=src&type=gif"
			},
			{
				name: "The Cat API (PNG)",
				src: "https://thecatapi.com/api/images/get?format=src&type=png"
			},
			{
				name: "Unsplash Source",
				src: "https://source.unsplash.com/random"
			},
			{
				name: "Sword Art Online: Alicization",
				src: "https://images2.imgbox.com/99/e2/knJdNcns_o.jpg"
			},
		],
		swatches: [
			[
				'#5c95c4',
				'#fc5185',
			],
			[
				'#824c96',
				'#107a8b',
			],
			[
				'#facf5a',
				"#000"
			],
			[
				'#fd0054',
			],
			[
				'#f96d00',
			]
		]
	}),
	computed: {
		"color": {
			get() {
				return window._setting("theme")
			},
			set(value) {
				this.setPrimaryColor(value)
			}
		}
	},
	watch: {
		"setting.bg": value => window._setting("headerBgSource", value)
	},
	methods: {
		setBg(bg) {
			this.setting.bg = bg;
			//同步設定
			this.axios({
				method: "post",
				url: _setting(`server`) + "/setting/",
				data: { n: { headerBgSource: bg } }
			});
		},
		setBgHeight(h) {
			switch (h) {
				case 'full':
					window._CSSsetting("--pokabgheight", "calc( 100vh - 69px - 64px )")
					break;
				case 'none':
					window._CSSsetting("--pokabgheight", "0px")
					break;
				default:
					window._CSSsetting("--pokabgheight", "400px")
					break;
			}
			//this.bg_height_dialog = false
			let cssVariable = window._setting('cssVariable')
			this.axios({
				method: "post",
				url: _setting(`server`) + "/setting/",
				data: { n: { cssVariable } }
			});

		},
		bg_prompt_cancel() {
			this.bg_prompt_active = false
			this.bg_prompt_textbox = window._setting("headerBgSource")
		},
		bg_prompt_ok() {
			this.bg_prompt_active = false
			this.setBg(this.bg_prompt_textbox)
		},
		setPrimaryColor(color) {
			this.$vuetify.theme.themes.dark.primary = color
			this.$vuetify.theme.themes.light.primary = color

			window._setting("theme", color);

			let theme = window._setting('theme')
			this.axios({
				method: "post",
				url: _setting(`server`) + "/setting/",
				data: { n: { theme } }
			});
		},
		setLang(lang) {
			window.i18n.locale = lang;
			this.currentLang = lang;
			window._setting("lang", lang);
			this.lang_dialog = false
			//同步設定
			this.axios({
				method: "post",
				url: _setting(`server`) + "/setting/",
				data: { n: { lang } }
			});
		}
	}
};
</script>
