<template lang="pug">
  router-link.card(v-if="to",:to="to",:data-source="source||undefined")
      .image(:style="{backgroundImage:`url(\"${pokaBg}\")`}",v-if="pokaBg")
        md-tooltip {{pokaTitle}}
      .image(v-else)
        md-icon(class="icon-white", :class="pokaIcon")
        md-tooltip {{pokaTitle}}
      .title {{pokaTitle}}
      .subtitle {{pokaSubtitle}}
  a.card(v-else,:data-source="source||undefined")
      .image(:style="{backgroundImage:`url(\"${pokaBg}\")`}",v-if="pokaBg")
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
    pokaBg: { default: false },
    source: { default: "" },
    pokaTitle: String,
    pokaSubtitle: String,
    to: String,
    pokaIcon: { default: "outline-play_circle_filled", type: String }
  }
};
</script>
