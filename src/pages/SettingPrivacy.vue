<template>
	<div>
		<poka-header :title="$t('settingPravicy.title')" />
		<div class="poka-notify">
			<h1>關於 PokaPlayer 資料記錄</h1>
			<p style="margin-bottom:0">資料紀錄功能僅會將您的資料於本地伺服器運算，並提供您更優質的使用體驗，並不會被上傳至網路進行分析。</p>
		</div>
		<div class="poka list">
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