<template>
	<div>
		<poka-cards v-if="artistView=='card'">
			<poka-card
				v-for="{name, cover, id, source} in data"
				:key="id"
				:to="`/artist/${encodeURIComponent(source)}/${encodeURIComponent(id||'unknown')}`"
				:poka-bg="cover||false"
				:poka-title="name||'未知'"
				:poka-subtitle="$t(`source.${source}`)"
			/>
		</poka-cards>
		<div class="poka list" v-if="artistView=='list'">
			<div
				class="item"
				style="user-select: none;"
				v-for="{name, cover, id, source} in data"
				:key="id"
				@click="$router.push(`/artist/${encodeURIComponent(source)}/${encodeURIComponent(id||'unknown')}`)"
				v-ripple
			>
				<div class="content">
					<v-avatar size="28px" item>
						<v-img :src="coverPaser(cover)" alt="cover" />
					</v-avatar>
					<div class="header">
						<div class="head t-ellipsis">
							{{name||'未知'}}
							<span style="font-size: .7em;opacity: .7;font-weight: normal;">{{source}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "poka-parse-artists",
	props: ["data"],
	data: () => ({
		server: _setting(`server`),
		artistView: _setting(`artistView`),
	}),
	methods: {
		coverPaser(cover) {
			if (cover.startsWith('http'))
				return cover
			else if (cover)
				return _setting(`server`) + cover
			else
				return _setting(`headerBgSource`)
		}
	}
};
</script>
