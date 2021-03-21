<template>
	<poka-cards>
		<poka-card
			v-if="$route.name=='PlaylistFolder'"
			poka-icon="arrow_back_ios"
			to="/playlist/"
			:poka-title="$t('back')"
		/>
		<template v-for="({name, image, id, source, type, icon}, index) in data">
			<poka-card
				v-if="type=='folder'"
				:poka-icon="icon||'folder'"
				:key="`/playlist/f/${encodeURIComponent(id)}`"
				:to="`/playlist/f/${encodeURIComponent(id)}`"
				:poka-title="name"
				:poka-subtitle="$t(`source.${source}`)"
				:source="$t(`source.${source}`)"
			/>

			<poka-card
				v-if="!type||type!='folder'"
				:poka-icon="icon||'queue_music'"
				:key="`/playlist/p/${encodeURIComponent(source)}/${encodeURIComponent(id||'unknown')}`"
				:to="`/playlist/p/${encodeURIComponent(source)}/${encodeURIComponent(id||'unknown')}`"
				:poka-bg="image||false"
				:poka-title="name"
				:poka-subtitle="$t(`source.${source}`)"
				:source="$t(`source.${source}`)"
			/>
		</template>
	</poka-cards>
</template>

<script>
export default {
	name: "poka-parse-playlists",
	props: ["data"],
	data: () => ({
		server: _setting(`server`)
	})
};
</script>
