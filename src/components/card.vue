<template lang="pug">
    a.card(:title="pokaTitle+`\n`+pokaSubtitle")
        .image(:style="{backgroundImage:`url(\"${pokaBg}\")`}",v-if="pokaBg")
        .image(v-else)
            <md-icon :class="pokaIcon+' icon-white'"></md-icon>
        .title {{pokaTitle}}
        .subtitle {{pokaSubtitle}}
</template>

<script>
export default {
  name: "poka-card",
  props: {
    pokaBg: { default: false, type: String },
    pokaTitle: String,
    pokaSubtitle: String,
    pokaIcon: { default: "outline-play_circle_filled", type: String }
  }
};
</script>
