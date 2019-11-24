<template>
	<div class="poka two list">
		<router-link
			class="item"
			v-for="{name, image, id, source} in data"
			:key="id"
			:to="`/folder/${encodeURIComponent(source)}/${encodeURIComponent(id||'unknown')}`"
		>
			<md-ripple>
				<div class="content">
					<md-avatar>
						<v-icon>folder</v-icon>
					</md-avatar>
					<div class="header">
						<div class="title t-ellipsis">{{name}}</div>
						<div class="t-ellipsis">{{$t(`source.${source}`)}}</div>
					</div>
				</div>
			</md-ripple>
		</router-link>
	</div>
</template>

<style lang="sass" scoped>
.poka.list
	.item
		overflow: hidden
</style>
<script>
export default {
	name: "poka-parse-folders",
	props: ["data"],
	data: () => ({
		server: _setting(`server`)
	})
};
</script>
