<template>
	<div>
		<poka-header :title="$t('header_welcome')" />
		<poka-update />
		<poka-loader v-if="!data" />
		<v-slide-y-reverse-transition>
			<poka-parse-home v-if="data" :data="data" />
		</v-slide-y-reverse-transition>
	</div>
</template>
<script>
export default {
	name: "Home",
	created() {
		this.axios.get(_setting(`server`) + "/pokaapi/home/").then(response => {
			this.data = response.data;
		});
		this.axios.get(_setting(`server`) + "/status/").then(response => {
			this.poka_version = response.data.version;
		});
	},
	data: () => ({ data: null, poka_version: null })
};
</script>
