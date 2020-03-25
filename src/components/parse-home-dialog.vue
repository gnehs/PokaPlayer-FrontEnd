<template>
	<v-dialog v-model="dialog" width>
		<template v-slot:activator="{ on }">
			<poka-card
				:poka-bg="false"
				:poka-title="$t(data.title)||'未知'"
				:poka-subtitle="$t(`source.${data.source}`)"
				:poka-icon="data.icon"
				@click.native="dialog=true"
			/>
		</template>

		<poka-parse-multiple :data="{item:data}" />
	</v-dialog>
</template>
<script>
export default {
	name: "poka-parse-home-dialog",
	props: ["data"],
	data: () => ({ dialog: false })
};
</script>