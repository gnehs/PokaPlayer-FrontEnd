<template>
  <md-speed-dial class="md-bottom-right" v-if="isPinned != null&& isPinned != 'disabled'">
    <md-speed-dial-target @click="pin">
      <md-icon v-if="isPinned">turned_in</md-icon>
      <md-icon v-else>turned_in_not</md-icon>
    </md-speed-dial-target>
  </md-speed-dial>
</template>

<script>
export default {
  name: "pin-button",
  created() {
    this.getPinStatus();
  },
  props: ["source", "type", "id", "name"],
  data: () => ({
    server: _setting(`server`),
    isPinned: null
  }),
  methods: {
    getPinStatus() {
      console.log(this.source, this.type, this.id, this.name);
      this.axios
        .post(
          `/pokaapi/isPinned/?moduleName=${this.source}&type=${this.type}&id=${
            this.id
          }&name=${this.name}`
        )
        .then(r => {
          this.isPinned = r.data;
        });
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