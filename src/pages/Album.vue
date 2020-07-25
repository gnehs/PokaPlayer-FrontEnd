<template>
	<div>
		<poka-header :title="$t('album')" />
		<v-slide-y-reverse-transition>
			<poka-parse-albums v-if="data" :data="data.albums" />
		</v-slide-y-reverse-transition>
		<poka-loader v-if="!data" />
	</div>
</template>

<script>
export default {
	name: "Album",
	created() {
		let url = _setting(`server`) + "/pokaapi/albums/";
		this.axios.get(url).then(response => {
			this.data = response.data;
		});
	},
	data: () => ({
		data: null,
		server: _setting(`server`)
	})
};
</script>