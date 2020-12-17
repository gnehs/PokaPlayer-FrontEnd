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
		}).catch(e => {
			this.$router.push('/login')
		})
	},
	data: () => ({ data: null, poka_version: null })
};
</script>
