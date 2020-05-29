<template>
	<div>
		<poka-header :title="$t('settingPravicy.title')" :subtitle="$t('settings')" />
		<div class="privacy-notify">
			<h1>關於 PokaPlayer 資料記錄</h1>
			<p style="margin-bottom:0">資料紀錄功能僅會將您的資料於本地伺服器運算，並提供您更優質的使用體驗，並不會被上傳至網路進行分析。</p>
		</div>
		<div class="poka list">
			<div class="item" @click="$router.push('/setting')" v-ripple>
				<div class="content">
					<v-avatar size="24px" item>
						<v-icon>arrow_back</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">{{$t('back')}}</div>
					</div>
				</div>
			</div>
			<div class="item" v-ripple>
				<div class="content">
					<v-avatar size="24px" item>
						<v-icon>security</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">資料記錄</div>
						<div class="t-ellipsis">啟用</div>
					</div>
				</div>
			</div>
			<div class="item" v-ripple>
				<div class="content">
					<v-avatar size="24px" item>
						<v-icon>clear</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">清除目前紀錄資料</div>
						<div class="t-ellipsis">目前已紀錄約 1000 筆資料</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "SettingPravicy",
	data: () => ({
	}),
	created() {
	},
	methods: {}
}
</script>

<style lang="sass">
.privacy-notify
	background: var(--v-primary-base)
	text-shadow: 0 0 6px var(--v-primary-base)
	position: relative
	margin: 16px 2px
	padding: 24px 32px
	border-radius: 8px
	color: #FFF
	box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.3)
</style>