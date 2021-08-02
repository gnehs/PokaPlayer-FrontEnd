<template>
  <v-fab-transition v-if="isPinned != null && isPinned != 'disabled' && btnType == 'speed-dial'">
    <v-btn color="primary" fab large dark bottom right fixed style="bottom: calc(16px + 69px)" :loading="loading" @click="pin">
      <v-icon class="bx">{{ isPinned ? 'bxs-pin' : 'bx-pin' }}</v-icon>
    </v-btn>
  </v-fab-transition>
  <v-btn
    @click="pin"
    :loading="loading"
    color="primary"
    class="rounded-lg"
    :outlined="!isPinned"
    v-else-if="isPinned != null && isPinned != 'disabled' && btnType == 'icon-button'"
  >
    <v-icon class="bx mr-2">{{ isPinned ? 'bxs-pin' : 'bx-pin' }}</v-icon>
    {{ $t('pin') }}
  </v-btn>
</template>

<script>
export default {
  name: 'pin-button',
  created() {
    this.getPinStatus()
  },
  props: {
    source: String,
    type: String,
    id: String,
    name: String,
    cover: String,
    artist: { type: String, default: '' },
    btnType: { type: String, default: 'speed-dial' }
  },
  data: () => ({
    server: _setting(`server`),
    isPinned: null,
    loading: false
  }),
  methods: {
    getPinStatus() {
      if (this.name) {
        this.loading = true
        let [source, id, type] = [this.source, this.id, this.type]
        this.axios.post(`/pokaapi/v2/pin/ispinned`, { source, id, name, type }).then(r => {
          this.isPinned = r.data
          this.loading = false
        })
      }
    },
    pin() {
      this.loading = true
      let [source, id, type, name, cover, artist] = [this.source, this.id, this.type, this.name, this.cover, this.artist]
      cover = cover.replace(_setting('server'), '')
      this.axios
        .post(`/pokaapi/v2/pin/${this.isPinned ? 'unpin' : 'pin'}`, {
          source,
          id,
          type,
          name,
          cover,
          artist
        })
        .then(r => {
          this.getPinStatus()
        })
    }
  }
}
</script>
