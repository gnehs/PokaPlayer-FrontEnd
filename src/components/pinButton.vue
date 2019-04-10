<template>
  <div>
    <md-speed-dial
      class="md-bottom-right"
      v-if="isPinned != null && isPinned != 'disabled' && btnType == 'speed-dial'"
    >
      <md-speed-dial-target @click="pin">
        <md-icon v-if="isPinned">turned_in</md-icon>
        <md-icon v-else>turned_in_not</md-icon>
      </md-speed-dial-target>
    </md-speed-dial>
    <md-button
      class="md-icon-button"
      @click="pin"
      v-if="isPinned != null && isPinned != 'disabled' && btnType == 'icon-button'"
    >
      <md-icon v-if="isPinned">turned_in</md-icon>
      <md-icon v-else>turned_in_not</md-icon>
    </md-button>
  </div>
</template>
<style lang="sass" scoped>
.md-button
  height: 42px
  min-width: 42px
  width: 42px
</style>

<script>
export default {
  name: "pin-button",
  created() {
    this.getPinStatus();
  },
  props: {
    source: String,
    type: String,
    id: String,
    name: String,
    btnType: { type: String, default: "speed-dial" }
  },
  data: () => ({
    server: _setting(`server`),
    isPinned: null
  }),
  methods: {
    getPinStatus() {
      if (this.name) {
        this.axios
          .post(
            `/pokaapi/isPinned/?moduleName=${this.source}&type=${
              this.type
            }&id=${this.id}&name=${this.name}`
          )
          .then(r => {
            this.isPinned = r.data;
          });
      }
    },
    pin() {
      this.axios
        .post(
          `/pokaapi/${!this.isPinned ? "addPin" : "unPin"}/?moduleName=${
            this.source
          }&type=${this.type}&id=${this.id}&name=${this.name}`
        )
        .then(r => {
          this.getPinStatus();
        });
    }
  }
};
</script>