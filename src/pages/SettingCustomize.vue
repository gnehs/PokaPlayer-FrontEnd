<template>
	<div>
		<poka-header :title="$t('settings')" :subtitle="$t('settings_customize')" :bg="setting.bg" />
		<div class="poka list">
			<div class="item" @click="$router.push('/setting')" v-ripple>
				<div class="content">
					<v-avatar size="42px" item>
						<v-icon>arrow_back</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">{{$t('back')}}</div>
					</div>
				</div>
			</div>
		</div>
		<div style="margin-left:16px">
			<p class="title">{{$t('settings_customize_bg')}}</p>
			<poka-cards>
				<poka-card
					@click.native="bg_prompt_active=true"
					poka-icon="outline-link"
					:poka-title="$t('settings_customize_bg_link')"
				/>
				<poka-card
					v-for="{name, src} in imgSources"
					@click.native="setBg(src)"
					:key="src"
					:poka-bg="src"
					:poka-title="name"
				/>
			</poka-cards>
		</div>
		<v-dialog v-model="bg_prompt_active" max-width="420">
			<v-card>
				<v-card-title class="headline">{{$t("settings_customize_bg")}}</v-card-title>
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
	</div>
</template>

<script>
export default {
	name: "SettingCustomize",
	data: () => ({
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
				src:
					"https://api.thedogapi.com/v1/images/search?format=src&mime_types=image/gif"
			},
			{
				name: "The Dog API (PNG)",
				src:
					"https://api.thedogapi.com/v1/images/search?format=src&mime_types=image/png"
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
			{
				name: "iClart 隨機 ACG 圖片",
				src: `https://acg.iclart.com/api.php?return=webp&rand=${new Date().getTime()}`
			}
		]
	}),
	watch: {
		"setting.bg": value => {
			window._setting("headerBgSource", value);
		}
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
		bg_prompt_cancel() {
			this.bg_prompt_active = false
			this.bg_prompt_textbox = window._setting("headerBgSource")
		},
		bg_prompt_ok() {
			this.bg_prompt_active = false
			this.setBg(this.bg_prompt_textbox)
		}
	}
};
</script>
