<template>
	<div>
		<poka-header :title="$t('settingPravicy.title')" />
		<div class="poka-notify cloud">
			<h1>關於 PokaPlayer 記錄</h1>
			<p style="margin-bottom:0">
				資料僅會於您的伺服器進行運算，不會被上傳至網路進行分析。
				<br />該功能可提供您更優質的使用體驗（如：年度回顧、最近播放）。
				<br />若您有疑慮可於下方關閉此功能，並將已記錄的資料清除。
			</p>
		</div>
		<div class="poka list">
			<div class="item" v-ripple @click="setDataRecord">
				<div class="content">
					<v-avatar size="42px" item>
						<v-icon :color="dataRecord?'purple':null">analytics</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">資料記錄</div>
						<div class="t-ellipsis">{{dataRecord?'啟用':'已停用'}}</div>
					</div>
				</div>
			</div>
			<div class="item" v-ripple @click="clearRecord">
				<div class="content">
					<v-avatar size="42px" item>
						<v-icon>clear</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">清除目前已紀錄資料</div>
						<div class="t-ellipsis">{{dataRecordCount>-1?`目前已記錄 ${dataRecordCount} 筆資料`:'正在統計資料...'}}</div>
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
		dataRecord: window._setting("dataRecord"),
		dataRecordCount: -1
	}),
	mounted() {
		this.getDataRecordCount()
	},
	methods: {
		async setDataRecord() {
			this.dataRecord = !this.dataRecord

			let n = { dataRecord: this.dataRecord }
			this.axios({
				method: "post",
				url: _setting(`server`) + "/setting/",
				data: { n }
			});
		},
		async getDataRecordCount() {
			this.axios(_setting(`server`) + `/pokaapi/v2/record/count/user`)
				.then(r => {
					this.dataRecordCount = r.data
				});
		},
		async clearRecord() {
			if (confirm('您確定要清除資料嗎？'))
				this.axios.post(_setting(`server`) + `/pokaapi/v2/record/clear`)
					.then(r => {
						this.$snackbar('資料已清除')
						this.dataRecordCount = 0
					});
		}
	}
}
</script>