<template lang="pug">
  router-link.card(v-if="to",:to="to",:data-source="source||undefined")
      .image(v-if="pokaBg",:style="{backgroundImage:`url(\"${pokaBg}\")`}")
        md-tooltip {{pokaTitle}}
      .image(v-else)
        md-icon(class="icon-white", :class="pokaIcon")
        md-tooltip {{pokaTitle}}
      .title {{pokaTitle}}
      .subtitle {{pokaSubtitle}}
  a.card(v-else,:data-source="source||undefined")
      .image(v-if="pokaBg",:style="{backgroundImage:`url(\"${pokaBg}\")`}")
        md-tooltip {{pokaTitle}}
      .image(v-else)
        md-icon(class="icon-white", :class="pokaIcon")
        md-tooltip {{pokaTitle}}
      .title {{pokaTitle}}
      .subtitle {{pokaSubtitle}}
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
    pokaIcon: { default: "outline-play_circle_filled", type: String }
  },
  created() {
    // source
    if (this.source == "Netease2") {
      this.source = i18n.t("moduleShowName_Netease");
    } else if (this.source == "DSM") {
      this.source = i18n.t("moduleShowName_DSM");
    }
  }
};
</script>
