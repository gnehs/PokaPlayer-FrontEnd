<template>
	<div>
		<v-slide-y-reverse-transition>
			<div class="poka list" v-if="logs.length">
				<div class="item" v-ripple v-for="item of logs" :key="item._id">
					<div class="content">
						<v-icon
							class="material-icons-outlined"
							:color="$vuetify.theme.isDark?'#FFF':'primary'"
							v-text="{user:'person',system:'dns'}[item.type]"
						/>
						<div class="header">
							<div class="head t-ellipsis">{{item.event}}</div>
							<div class="t-ellipsis">{{item.discription}}</div>
						</div>
						<div class="action" style="font-size: .7em;opacity: .7;text-align: right;">
							{{item.user}}
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
			v-if="!logs.length"
		>
			<v-card-text class="text-center">
				<v-icon class="material-icons-outlined display-4">receipt_long</v-icon>
				<p class="headline text--primary">No logs available</p>
			</v-card-text>
		</v-card>
		<!--<v-fab-transition>
			<v-btn
				color="primary"
				fab
				large
				dark
				bottom
				right
				fixed
				style="bottom: calc(16px + 69px);"
				v-if="logs.length"
				@click="clearLogs"
			>
				<v-icon class="material-icons-outlined">clear_all</v-icon>
			</v-btn>
		</v-fab-transition>-->
	</div>
</template>

<script>
export default {
	name: "AdminLogs",
	data: () => ({
		logs: []
	}),
	created() {
		this.getLogs()
	},
	methods: {
		async getLogs() {
			let { data: result } = await this.axios(`${_setting('server')}/pokaapi/v2/log?${Math.random().toString(36).substring(7)}`)
			let { data: users } = await this.axios(`${_setting('server')}/pokaapi/v2/users/list?${Math.random().toString(36).substring(7)}`)

			this.logs = result.map(x => {
				for (let { _id, username } of users) {
					x.discription = x.discription.replace(new RegExp(`{${_id}}`, "g"), username)
				}
				return x
			})
		},
		async clearLogs() {
			await this.axios.post(`${_setting('server')}/pokaapi/v2/log/clear`)
			this.getLogs()

		}
	}
}
</script>