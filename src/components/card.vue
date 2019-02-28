<template lang="pug">
    a.card(v-bind="$props",:title="pokaTitle+`&#10;`+pokaSubtitle")
        .image(:style="{backgroundImage:`url('${pokaBg}')`}",v-if="pokaBg!=false")
        .image(v-else)
            <md-icon class="outline-play_circle_filled icon-white"></md-icon>
        .title {{pokaTitle}}
        .subtitle {{pokaSubtitle}}
</template>

<script>
export default {
  name: "poka-card",
  props: {
    pokaBg: String,
    pokaTitle: String,
    pokaSubtitle: String,
    download: String,
    href: String,
    hreflang: String,
    ping: String,
    rel: String,
    target: String,
    type: String
  }
};
</script>
