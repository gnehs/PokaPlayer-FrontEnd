<template lang="pug">
	router-link.card(v-if="to",:to="to",:data-source="parsed_source||undefined")
		.image(v-if="parsed_pokaBg",:style="{backgroundImage:`url(\"${parsed_pokaBg}\")`}")
		.image(v-else)
			v-icon(class="icon-white", :class="pokaIcon")
		.title.t-ellipsis {{pokaTitle}}
		.subtitle.t-ellipsis {{pokaSubtitle}}
	a.card(v-else,:data-source="parsed_source||undefined")
		.image(v-if="parsed_pokaBg",:style="{backgroundImage:`url(\"${parsed_pokaBg}\")`}")
		.image(v-else)
			v-icon(class="icon-white material-icons-outlined") {{pokaIcon}}
		.title.t-ellipsis {{pokaTitle}}
		.subtitle.t-ellipsis {{pokaSubtitle}}
</template>

<script>
export default {
	name: "poka-card",
	props: {
		pokaBg: { default: null },
		source: { default: "" },
		pokaTitle: String,
		pokaSubtitle: String,
		to: String,
		pokaIcon: { default: "play_circle_filled", type: String }
	},
	data: () => ({ parsed_source: null, parsed_pokaBg: null }),
	created() {
		// source
		if (this.source == "Netease2") {
			this.parsed_source = i18n.t("moduleShowName_Netease");
		} else if (this.source == "DSM") {
			this.parsed_source = i18n.t("moduleShowName_DSM");
		} else {
			this.parsed_source = this.source;
		}
		if (typeof this.pokaBg === "string" && this.pokaBg.startsWith("http")) {
			this.parsed_pokaBg = this.pokaBg;
		} else if (this.pokaBg) {
			this.parsed_pokaBg = _setting("server") + this.pokaBg;
		}
	}
};
</script>
