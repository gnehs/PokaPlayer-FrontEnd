<template>
	<div>
		<poka-header :title="$t('settingPins.title')" />
		<div class="poka list" v-if="pins">
			<div class="item" v-ripple v-for="pin of pins" :key="pin._id" @click="unPin(pin)">
				<div class="content">
					<v-avatar size="42px" item>
						<v-img :src="pin.cover" alt="John" />
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">
							{{pin.name}}
							<span
								style="font-size: .7em;opacity: .7;font-weight: normal;"
							>{{ $t(`source.${pin.source}`)}}</span>
						</div>
						<div class="t-ellipsis">{{$t(pin.type)}}</div>
					</div>
					<div class="action">
						<v-btn icon>
							<v-icon>mdi-delete</v-icon>
						</v-btn>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "SettingPins",
	data: () => ({
		pins: null
	}),
	created() {
		this.getPins()
	},
	methods: {
		async getPins() {
			this.axios
				.post(`${_setting('server')}/pokaapi/v2/pin/pins`)
				.then(r => {
					this.pins = r.data.map(x => {
						if (!x.cover.startsWith('http')) x.cover = _setting('server') + x.cover
						return x
					})
				});
		},
		async unPin(pin) {
			if (confirm(i18n.t('settingPins.deleteConfirm'))) {
				this.axios
					.post(`${_setting('server')}/pokaapi/v2/pin/unpin`, pin)
					.then(r => {
						this.getPins();
					});
			}
		}
	}
}
</script>