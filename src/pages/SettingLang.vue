<template>
	<div>
		<poka-header :title="$t('settings')" :subtitle="$t('settings_lang')" />
		<div class="poka list">
			<div class="item" @click="$router.push('/setting')" v-ripple>
				<div class="content">
					<v-avatar size="42px" item>
						<v-icon>arrow_back</v-icon>
					</v-avatar>
					<div class="header">
						<div class="title t-ellipsis">{{$t('back')}}</div>
					</div>
				</div>
			</div>
			<div
				class="item"
				v-for="(lang,index) of languages"
				:key="`lang${lang}-${index}`"
				@click="setLang(lang)"
				v-ripple
			>
				<div class="content">
					<v-avatar size="42px" item>
						<v-icon>translate</v-icon>
					</v-avatar>
					<div class="header">
						<div class="title t-ellipsis">{{$t('title',lang)}}</div>
					</div>
					<div class="action">
						<v-icon v-show="currentLang==lang">check</v-icon>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "SettingLang",
	data: () => ({
		languages: Object.keys(window.i18n.messages),
		currentLang: window.i18n.locale
	}),
	methods: {
		setLang(lang) {
			window.i18n.locale = lang;
			this.currentLang = lang;
			window._setting("lang", lang);
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