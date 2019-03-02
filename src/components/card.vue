<template lang="pug">
  router-link.card(:title="pokaTitle+`\n`+pokaSubtitle" v-if="to" :to="to")
      .image(:style="{backgroundImage:`url(\"${pokaBg}\")`}",v-if="pokaBg")
      .image(v-else)
          <md-icon class="icon-white" :class="pokaIcon"></md-icon>
      .title {{pokaTitle}}
      .subtitle {{pokaSubtitle}}
  a.card(:title="pokaTitle+`\n`+pokaSubtitle" v-else)
      .image(:style="{backgroundImage:`url(\"${pokaBg}\")`}",v-if="pokaBg")
      .image(v-else)
          <md-icon class="icon-white" :class="pokaIcon"></md-icon>
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
    to: String,
    pokaIcon: { default: "outline-play_circle_filled", type: String }
  }
};
</script>
