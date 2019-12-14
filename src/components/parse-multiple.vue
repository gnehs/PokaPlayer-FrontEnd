<template>
	<div class="poka-parse-multiple">
		<v-card class="mx-auto" v-for="(item,index) of data" :key="index">
			<v-card-text>
				<div v-if="item.source">{{$t(`source.${item.source}`)}}</div>
				<p v-if="item.title" class="display-1 text--primary">{{$t(item.title)}}</p>
				<v-tabs background-color="transparent" color="primary">
					<template v-for="itemName of Object.keys(item).filter(x=>x!='title'&&x!='source')">
						<v-tab
							v-if="item[itemName]&&item[itemName].length>0"
							:key="itemName"
						>{{$t(itemName.substring(0, itemName.length-1))}}</v-tab>
					</template>
					<template v-for="itemName of Object.keys(item).filter(x=>x!='title'&&x!='source')">
						<v-tab-item v-if="item[itemName]&&item[itemName].length>0" :key="itemName">
							<poka-parse-songs v-if="itemName=='songs'" :data="item[itemName]" />
							<poka-parse-albums v-if="itemName=='albums'" :data="item[itemName]" />
							<poka-parse-playlists v-if="itemName=='playlists'" :data="item[itemName]" />
							<poka-parse-folders v-if="itemName=='folders'" :data="item[itemName]" />
							<poka-parse-composers v-if="itemName=='composers'" :data="item[itemName]" />
							<poka-parse-artists v-if="itemName=='artists'" :data="item[itemName]" />
						</v-tab-item>
					</template>
				</v-tabs>
			</v-card-text>
		</v-card>
	</div>
</template>
<style lang="sass" scoped>
.poka-parse-multiple
	padding: 2px
</style>
<script>
export default {
	name: "poka-parse-multiple",
	props: ["data"]
};
</script>