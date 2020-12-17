<template>
	<div>
		<poka-header :title="$t('settingPravicy.title')" />
		<div class="poka-notify cloud">
			<h1>{{$t('settingPravicy.notify.title')}}</h1>
			<p style="margin-bottom:0">{{$t('settingPravicy.notify.body')}}</p>
		</div>
		<div class="poka list">
			<div class="item" v-ripple @click="setDataRecord">
				<div class="content">
					<v-avatar size="42px" item>
						<v-icon :color="dataRecord?'purple':null">analytics</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">{{$t('settingPravicy.dataRecord._')}}</div>
						<div class="t-ellipsis">{{$t('settingPravicy.dataRecord.'+(dataRecord?'enabled':'disabled'))}}</div>
					</div>
				</div>
			</div>
			<div class="item" v-ripple @click="clearRecord">
				<div class="content">
					<v-avatar size="42px" item>
						<v-icon>clear</v-icon>
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">{{$t('settingPravicy.dataRecord.clear')}}</div>
						<div
							class="t-ellipsis"
						>{{dataRecordCount>-1?$t('settingPravicy.dataRecord.logged',{count:dataRecordCount}):$t('settingPravicy.dataRecord.loading')}}</div>
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
			this.axios(_setting(`server`) + `/pokaapi/v2/record/count/user?${Date.now()}`)
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