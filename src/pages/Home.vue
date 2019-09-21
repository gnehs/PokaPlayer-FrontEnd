<template>
	<div>
		<poka-header
			:title="$t('header_welcome')"
			:subtitle="$t('header_version',{version:poka_version})"
		/>
		<poka-loader v-if="!data" />
		<poka-parse-multiple v-else :data="data" />
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
