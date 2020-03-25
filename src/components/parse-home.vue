<template>
	<poka-cards>
		<poka-parse-home-dialog v-for="(item,index) of data" :key="index" :data="item" />
	</poka-cards>
</template>
<script>
export default {
	name: "poka-parse-home",
	props: ["data"],
	data: () => ({ dialog: false })
};
</script>