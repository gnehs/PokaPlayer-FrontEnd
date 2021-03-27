<template>
	<div>
		<v-slide-y-reverse-transition>
			<div class="poka list" v-if="logs.length">
				<div
					class="item log"
					:class="[`level-${item.level}`]"
					v-for="item of logs"
					:key="item._id"
					@click="openLogDialog(item)"
					v-ripple
				>
					<div class="content">
						<v-icon
							class="material-icons-outlined"
							:color="$vuetify.theme.isDark?'#FFF':'primary'"
							v-text="{user:'person',system:'dns'}[item.type]"
						/>
						<div class="header">
							<div class="head t-ellipsis">{{item.event}}</div>
							<div class="t-ellipsis">{{item.description}}</div>
						</div>
						<div class="action" style="opacity: .7;text-align: right;">
							<strong>{{item.user}}</strong>
							<br />
							{{new Date(item.time).toLocaleString()}}
						</div>
					</div>
				</div>
			</div>
		</v-slide-y-reverse-transition>
		<v-card
			class="mx-auto blur-card"
			max-width="344"
			style="margin-top:32px;"
			key="card"
			v-if="!logs.length&&!loading"
		>
			<v-card-text class="text-center">
				<v-icon class="material-icons-outlined display-4">receipt_long</v-icon>
				<p class="headline text--primary">No logs available</p>
			</v-card-text>
		</v-card>
		<v-dialog v-model="logDialog" max-width="600px">
			<v-card v-if="logDialogData">
				<v-toolbar>
					<v-toolbar-title>{{logDialogData.event}}</v-toolbar-title>
					<v-spacer />
					<v-btn icon @click="logDialog = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-toolbar>
				<div class="poka list" v-if="logDialogData">
					<div class="item log" v-ripple>
						<div class="content">
							<v-icon
								class="material-icons-outlined"
								:color="$vuetify.theme.isDark?'#FFF':'primary'"
								v-text="{user:'person',system:'dns'}[logDialogData.type]"
							/>
							<div class="header">
								<div class="head t-ellipsis">{{logDialogData.type}}</div>
								<div class="t-ellipsis">Type</div>
							</div>
						</div>
					</div>
					<div class="item log" v-ripple>
						<div class="content">
							<v-icon
								class="material-icons-outlined"
								:color="$vuetify.theme.isDark?'#FFF':'primary'"
								v-text="{info:'info',warn:'warning',error:'close'}[logDialogData.level]"
							/>
							<div class="header">
								<div class="head t-ellipsis">{{logDialogData.level}}</div>
								<div class="t-ellipsis">Level</div>
							</div>
						</div>
					</div>
					<div class="item log" v-ripple>
						<div class="content">
							<v-icon
								class="material-icons-outlined"
								:color="$vuetify.theme.isDark?'#FFF':'primary'"
								v-text="'access_time'"
							/>
							<div class="header">
								<div class="head t-ellipsis">{{new Date(logDialogData.time).toLocaleString()}}</div>
								<div class="t-ellipsis">Time</div>
							</div>
						</div>
					</div>
					<div class="item log" v-ripple>
						<div class="content">
							<v-icon
								class="material-icons-outlined"
								:color="$vuetify.theme.isDark?'#FFF':'primary'"
								v-text="'person'"
							/>
							<div class="header">
								<div class="head t-ellipsis">{{logDialogData.user}}</div>
								<div class="t-ellipsis">User</div>
							</div>
						</div>
					</div>
				</div>
				<pre class="log">{{logDialogData.description}}</pre>
			</v-card>
		</v-dialog>
	</div>
</template> 
<style lang="sass">
.poka.list
	.item.log
		font-family: 'Ubuntu Mono', monospace
		&.level
			&-warn
				background-color: #ffff003b
			&-error
				background-color: #ff00003b
</style>
<script>
export default {
	name: "AdminLogs",
	data: () => ({
		loading: true,
		logDialog: false,
		logDialogData: null,
		logs: []
	}),
	created() {
		this.getLogs()
	},
	methods: {
		async getLogs() {
			this.loading = true
			let { data: result } = await this.axios(`${_setting('server')}/pokaapi/v2/log?${Math.random().toString(36).substring(7)}`)
			let { data: users } = await this.axios(`${_setting('server')}/pokaapi/v2/users/list?${Math.random().toString(36).substring(7)}`)
			this.logs = result.map(x => {
				if (x.discription) x.description = x.discription //fix typo
				for (let { _id, username } of users) {
					x.description = x.description.replace(new RegExp(`{${_id}}`, "g"), username)
				}
				return x
			})
			this.loading = false
		},
		async clearLogs() {
			await this.axios.post(`${_setting('server')}/pokaapi/v2/log/clear`)
			this.getLogs()
		},
		openLogDialog(item) {
			this.logDialogData = JSON.parse(JSON.stringify(item))
			this.logDialog = true
		}
	}
}
</script>