<template>
	<div>
		<poka-header :title="$t('folder')" />
		<md-button class="md-raised md-primary" @click="goBack" v-show="!$route.meta.root">
			<v-icon>arrow_back</v-icon>
			{{$t('back')}}
		</md-button>
		<poka-parse-folders v-if="data" :data="data.folders" />
		<poka-parse-songs v-if="data" :data="data.songs" />
		<poka-loader v-else />
	</div>
</template>

<script>
export default {
	name: "Folder",
	created() {
		let url = this.server + "/pokaapi/";
		if (this.$route.meta.root) {
			url += "folders/";
		} else {
			let source = encodeURIComponent(this.$route.params.source);
			let foldertId = encodeURIComponent(this.$route.params.id);
			url += `folderFiles/?moduleName=${source}&id=${foldertId}`;
		}
		this.axios.get(url).then(response => {
			this.data = response.data;
		});
	},
	data: () => ({
		data: null,
		server: _setting(`server`)
	}),
	methods: {
		goBack() {
			window.history.length > 1
				? this.$router.go(-1)
				: this.$router.push("/folder");
		}
	}
};
</script>