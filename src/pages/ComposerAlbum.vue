<template>
	<div>
		<poka-header :title="name" :subtitle="$t('composer')" :blurbg="true" :bg="server+cover||null" />
		<v-slide-y-reverse-transition>
			<poka-parse-albums v-if="data" :data="data.albums" />
		</v-slide-y-reverse-transition>
		<poka-loader v-if="!data" />
		<pin-button
			v-if="name"
			:source="$route.params.source"
			:id="$route.params.id"
			type="composer"
			:name="$route.params.id"
		/>
	</div>
</template>

<script>
export default {
	name: "ComposerAlbum",
	created() {
		let ComposerSource = this.$route.params.source;
		let ComposerId =
			this.$route.params.id == "unknown" ? "" : this.$route.params.id;
		let url = `${
			this.server
			}/pokaapi/composerAlbums/?moduleName=${encodeURIComponent(
				ComposerSource
			)}&id=${encodeURIComponent(ComposerId)}`;
		this.axios.get(url).then(response => {
			this.data = response.data;
		});

		//取得封面與名字
		this.axios
			.get(
				`/pokaapi/composer/?moduleName=${encodeURIComponent(
					ComposerSource
				)}&id=${encodeURIComponent(ComposerId)}`
			)
			.then(response => {
				this.cover = response.data.cover;
				this.name = response.data.name;
			});
	},
	data: () => ({
		data: null,
		cover: false,
		name: null,
		cover: null,
		server: _setting(`server`)
	})
};
</script>