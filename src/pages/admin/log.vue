<template>
	<div>
		<v-slide-y-reverse-transition>
			<div class="poka list" v-if="logs.length">
				<div
					class="item log"
					:class="[`level-${item.level}`]"
					v-for="item of logs"
					:key="item._id"
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
							<div class="t-ellipsis">{{item.discription}}</div>
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
				for (let { _id, username } of users) {
					x.discription = x.discription.replace(new RegExp(`{${_id}}`, "g"), username)
				}
				return x
			})
			this.loading = false
		},
		async clearLogs() {
			await this.axios.post(`${_setting('server')}/pokaapi/v2/log/clear`)
			this.getLogs()

		}
	}
}
</script>