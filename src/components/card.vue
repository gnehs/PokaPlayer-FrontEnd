<template lang="pug">
router-link.card(v-if="to", :to="to", :data-source="parsed_source || undefined")
  .image
    poka-cover(
      :cover="parsed_pokaBg",
      :name="pokaTitle",
      style="position: absolute"
    )
    .icon(v-if="pokaIcon")
      v-icon.material-icons-outlined {{ pokaIcon }}
  .title(:class="{ 't-ellipsis': ellipsis }") {{ pokaTitle }}
  .subtitle(:class="{ 't-ellipsis': ellipsis }") {{ pokaSubtitle }}
a.card(v-else, :data-source="parsed_source || undefined")
  .image
    poka-cover(
      :cover="parsed_pokaBg",
      :name="pokaTitle",
      style="position: absolute"
    )
    .icon(v-if="pokaIcon", :class="{ 'with-img': !!parsed_pokaBg }")
      v-icon.material-icons-outlined {{ pokaIcon }}
  .title(:class="{ 't-ellipsis': ellipsis }") {{ pokaTitle }}
  .subtitle(:class="{ 't-ellipsis': ellipsis }") {{ pokaSubtitle }}
</template>

<script>
const GeoPattern = require("geopattern");
export default {
  name: "poka-card",
  props: {
    pokaBg: { default: null },
    ellipsis: { default: true },
    source: { default: "" },
    pokaTitle: String,
    pokaSubtitle: String,
    to: String,
    pokaIcon: { type: String }
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
    } else {
      this.parsed_pokaBg = GeoPattern.generate(this.pokaTitle, {
        baseColor: "#fc0"
      }).toDataUri();
    }
  }
};
</script>
