<template>
	<poka-cards>
		<poka-card
			v-if="$route.name=='PlaylistFolder'"
			poka-icon="arrow_back_ios"
			to="/playlist/"
			:poka-title="$t('back')"
		/>
		<poka-card
			v-for="({name, image, id, source, type},index) in data"
			v-if="type=='folder'"
			poka-icon="folder"
			:key="index"
			:to="`/playlist/f/${encodeURIComponent(id)}`"
			:poka-title="name"
			:poka-subtitle="$t(`source.${source}`)"
			:source="$t(`source.${source}`)"
		/>
		<poka-card
			v-for="({name, image, id, source, type},index) in data"
			v-if="!type||type!='folder'"
			poka-icon="playlist_play"
			:key="index"
			:to="`/playlist/p/${encodeURIComponent(source)}/${encodeURIComponent(id||'unknown')}`"
			:poka-bg="image||false"
			:poka-title="name"
			:poka-subtitle="$t(`source.${source}`)"
			:source="$t(`source.${source}`)"
		/> 
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
