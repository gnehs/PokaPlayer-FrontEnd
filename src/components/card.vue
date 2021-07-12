<template>
  <div :is="to ? 'router-link' : 'a'" :to="to" :data-source="parsed_source" @click="$emit(`click`, fn)" class="card">
    <div class="image">
      <poka-cover :cover="parsed_pokaBg" :name="pokaTitle" style="position: absolute" />
      <div class="icon" v-if="pokaIcon">
        <v-icon class="material-icons-outlined">{{ pokaIcon }}</v-icon>
      </div>
    </div>
    <div class="poka-card-title" :class="{ 't-ellipsis': ellipsis }" v-text="pokaTitle" />
    <div class="poka-card-subtitle" :class="{ 't-ellipsis': ellipsis }" v-text="pokaSubtitle" />
  </div>
</template>
<script>
const GeoPattern = require('geopattern')
export default {
  name: 'poka-card',
  props: {
    pokaBg: { default: null },
    ellipsis: { default: true },
    source: { type: String, default: null },
    pokaTitle: String,
    pokaSubtitle: String,
    to: { type: String, default: null },
    pokaIcon: { type: String },
    fn: { type: Function, default: () => {} }
  },
  data: () => ({ parsed_source: null, parsed_pokaBg: null }),
  created() {
    // source
    if (this.source == 'Netease2') {
      this.parsed_source = i18n.t('moduleShowName_Netease')
    } else if (this.source == 'DSM') {
      this.parsed_source = i18n.t('moduleShowName_DSM')
    } else {
      this.parsed_source = this.source
    }
    if (typeof this.pokaBg === 'string' && this.pokaBg.startsWith('http')) {
      this.parsed_pokaBg = this.pokaBg
    } else if (this.pokaBg) {
      this.parsed_pokaBg = _setting('server') + this.pokaBg
    } else {
      this.parsed_pokaBg = GeoPattern.generate(this.pokaTitle, {
        baseColor: '#fc0'
      }).toDataUri()
    }
  }
}
</script>
