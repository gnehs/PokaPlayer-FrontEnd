<template>
	<v-fab-transition v-if="isPinned != null && isPinned != 'disabled' && btnType == 'speed-dial'">
		<v-btn
			color="primary"
			fab
			large
			dark
			bottom
			right
			fixed
			style="bottom: calc(16px + 69px);"
			@click="pin"
		>
			<v-icon v-if="isPinned">turned_in</v-icon>
			<v-icon v-else>turned_in_not</v-icon>
		</v-btn>
	</v-fab-transition>
	<v-btn
		icon
		@click="pin"
		class="v-pin-btn"
		v-else-if="isPinned != null && isPinned != 'disabled' && btnType == 'icon-button'"
	>
		<v-icon v-if="isPinned">turned_in</v-icon>
		<v-icon v-else>turned_in_not</v-icon>
	</v-btn>
</template>
<style lang="sass" scoped>
.v-btn.v-pin-btn
  height: 42px
  min-width: 42px
  width: 42px
</style>

<script>
export default {
	name: "pin-button",
	created() {
		this.getPinStatus();
	},
	props: {
		source: String,
		type: String,
		id: String,
		name: String,
		btnType: { type: String, default: "speed-dial" }
	},
	data: () => ({
		server: _setting(`server`),
		isPinned: null
	}),
	methods: {
		getPinStatus() {
			if (this.name) {
				this.axios
					.post(
						`/pokaapi/isPinned/?moduleName=${this.source}&type=${
						this.type
						}&id=${this.id}&name=${this.name}`
					)
					.then(r => {
						this.isPinned = r.data;
					});
			}
		},
		pin() {
			this.axios
				.post(
					`/pokaapi/${!this.isPinned ? "addPin" : "unPin"}/?moduleName=${
					this.source
					}&type=${this.type}&id=${this.id}&name=${this.name}`
				)
				.then(r => {
					this.getPinStatus();
				});
		}
	}
};
</script>