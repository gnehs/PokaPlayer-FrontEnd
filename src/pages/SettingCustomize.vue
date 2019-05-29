<template>
	<div>
		<poka-header :title="$t('settings')" :subtitle="$t('settings_customize')" :bg="setting.bg"/>
		<md-list>
			<md-list-item to="/setting">
				<md-icon>arrow_back</md-icon>
				<div class="md-list-item-text">
					<span>{{$t('back')}}</span>
				</div>
			</md-list-item>
		</md-list>
		<div style="margin-left:16px">
			<span class="md-title">{{$t('settings_customize_bg')}}</span>
			<md-divider style="margin:4px"/>
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
		<md-dialog-prompt
			:md-active.sync="bg_prompt_active"
			v-model="setting.bg"
			:md-title="$t('settings_customize_bg')"
			md-input-placeholder="https://..."
			:md-cancel-text="$t('cancel')"
			:md-confirm-text="$t('ok')"
		/>
	</div>
</template>

<script>
export default {
	name: "SettingCustomize",
	data: () => ({
		bg_prompt_active: false,
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
				name: "阿珏隨機 ACG 圖片",
				src: `https://random.52ecy.cn/randbg.php?type=302&style=3&https=true&rand=${new Date().getTime()}`
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
			window._setting("headerBgSource", bg);
		}
	}
};
</script>
