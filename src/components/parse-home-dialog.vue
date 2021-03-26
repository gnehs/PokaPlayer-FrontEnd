<template>
	<v-bottom-sheet v-model="dialog" inset content-class="poka-home-dialog-sheet">
		<template v-slot:activator="{ on }">
			<poka-card
				:poka-bg="false"
				:poka-title="$t(data.title)||'未知'"
				:poka-subtitle="$t(`source.${data.source}`)"
				:poka-icon="data.icon"
				v-on="on"
				@click.native="dialog=true"
			/>
		</template>

		<v-toolbar>
			<v-toolbar-title>{{$t(data.title)}}</v-toolbar-title>
			<div v-if="filteredKeys.length>1">
				<v-chip
					class="ma-1"
					v-for="itemName of filteredKeys"
					:key="itemName"
					:class="{active:active==itemName}"
					@click="active=itemName"
					:outlined="active!=itemName"
					pill
				>{{$t(itemName.substring(0, itemName.length-1))}}</v-chip>
			</div>
			<v-spacer />
			<v-btn icon @click="dialog = false">
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<div class="poka-home-card" v-if="dialog" tile elevation="0">
			<div v-for="itemName of filteredKeys" :key="itemName">
				<div v-show="active==itemName">
					<poka-parse-songs v-if="itemName=='songs'" :data="data[itemName]" />
					<poka-parse-albums v-if="itemName=='albums'" :data="data[itemName]" />
					<poka-parse-playlists v-if="itemName=='playlists' " :data="data[itemName]" />
					<poka-parse-folders v-if="itemName=='folders' " :data="data[itemName]" />
					<poka-parse-composers v-if="itemName=='composers' " :data="data[itemName]" />
					<poka-parse-artists v-if="itemName=='artists' " :data="data[itemName]" />
				</div>
			</div>
		</div>
	</v-bottom-sheet>
</template>
<style lang="sass">
.poka-home-dialog-sheet.poka-home-dialog-sheet.poka-home-dialog-sheet
	border-radius: 16px 16px 0 0
	overflow: hidden
	.poka-home-card.poka-home-card.poka-home-card
		padding: 16px
		overflow: hidden auto
		max-height: 80vh
		position: relative
		border-radius: 0 !important
		background-color: #FFF
</style>
<script>
export default {
	name: "poka-parse-home-dialog",
	props: ["data"],
	data() {
		return ({
			dialog: false,
			tab: null,
			active: null,
			filteredKeys: []
		})
	},
	created() {
		this.filteredKeys = Object.keys(this.data).filter(x => x != 'title' && x != 'source' && x != 'icon' && this.data[x].length)
		this.active = this.filteredKeys[0]
	}
};
</script>