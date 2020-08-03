<template>
	<v-dialog v-model="dialog" fullscreen scrollable transition="dialog-bottom-transition">
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
		<v-card class="mx-auto">
			<v-toolbar dark color="primary" flat>
				<v-toolbar-title>{{$t(data.title)}}</v-toolbar-title>
				<v-chip class="ma-2" color="white" outlined pill>{{$t(`source.${data.source}`)}}</v-chip>
				<v-spacer></v-spacer>

				<v-btn icon dark @click="dialog = false">
					<v-icon>mdi-close</v-icon>
				</v-btn>

				<template v-slot:extension>
					<v-tabs v-model="tab" background-color="primary" color="white" slider-color="yellow">
						<v-tab
							v-for="itemName of Object.keys(data).filter(x=>x!='title'&&x!='source'&&x!='icon'&&data[x].length)"
							:key="itemName"
						>{{$t(itemName.substring(0, itemName.length-1))}}</v-tab>
					</v-tabs>
				</template>
			</v-toolbar>
			<v-card-text style="height: calc(100% - 64px)">
				<v-tabs-items v-model="tab">
					<v-tab-item
						v-for="itemName of Object.keys(data).filter(x=>x!='title'&&x!='source'&&x!='icon'&&data[x].length) "
						:key="itemName"
					>
						<poka-parse-songs v-if="itemName=='songs'" :data="data[itemName]" />
						<poka-parse-albums v-if="itemName=='albums'" :data="data[itemName]" />
						<poka-parse-playlists v-if="itemName=='playlists'" :data="data[itemName]" />
						<poka-parse-folders v-if="itemName=='folders'" :data="data[itemName]" />
						<poka-parse-composers v-if="itemName=='composers'" :data="data[itemName]" />
						<poka-parse-artists v-if="itemName=='artists'" :data="data[itemName]" />
					</v-tab-item>
				</v-tabs-items>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>
<script>
export default {
	name: "poka-parse-home-dialog",
	props: ["data"],
	data: () => ({ dialog: false, tab: null })
};
</script>