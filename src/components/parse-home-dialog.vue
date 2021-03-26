<template>
	<v-bottom-sheet v-model="dialog" inset>
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
		<v-card class="poka-home-card" v-if="dialog">
			<div class="hw-header" style="line-height: normal;">
				<div class="hw-title">{{$t(data.title)}}</div>
				<div class="hw-subtitle">{{$t(`source.${data.source}`)}}</div>
			</div>
			<div class="chip-nav" v-if="filteredKeys.length>1">
				<div
					class="chip-nav-item"
					v-for="itemName of filteredKeys"
					:key="itemName"
					:class="{active:active==itemName}"
					@click="active=itemName"
					v-ripple
				>
					<span>{{$t(itemName.substring(0, itemName.length-1))}}</span>
				</div>
			</div>

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
		</v-card>
	</v-bottom-sheet>
</template>
<style lang="sass" scoped>
.poka-home-card
	padding: 16px
	overflow: hidden auto
	max-height: 80vh
	position: relative
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