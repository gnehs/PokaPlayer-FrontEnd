<template>
  <div>
    <v-fade-transition>
      <poka-cards v-show="artistView=='card'">
        <poka-card
          v-for="{name, cover, id, source} in $pagination(data,page)"
          :key="id"
          :to="`/artist/${encodeURIComponent(source)}/${encodeURIComponent(id||'unknown')}`"
          poka-icon="keyboard_voice"
          :poka-bg="cover||false"
          :poka-title="name||'未知'"
          :poka-subtitle="$t(`source.${source}`)"
        />
      </poka-cards>
    </v-fade-transition>
    <v-fade-transition>
      <div class="poka two list" v-show="artistView=='list'">
        <div
          class="item"
          style="user-select: none;"
          v-for="{name, cover, id, source} in $pagination(data,page)"
          :key="id"
          @click="$router.push(`/artist/${encodeURIComponent(source)}/${encodeURIComponent(id||'unknown')}`)"
          v-ripple
        >
          <div class="content">
            <v-avatar size="28px" item>
              <v-img :src="coverPaser(cover)" alt="cover" />
            </v-avatar>
            <div class="header">
              <div class="head t-ellipsis">
                {{name||'未知'}}
                <span
                  style="font-size: .7em;opacity: .7;font-weight: normal;"
                >{{source}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-fade-transition>
    <poka-pagination :length="$getPages(data)" v-model="page" />
    <v-btn
      color="primary"
      fab
      large
      dark
      bottom
      right
      fixed
      style="bottom: calc(16px + 69px);"
      v-if="!hideFab"
      @click="changeView"
    >
      <v-icon v-if="artistView=='card'" class="material-icons-outlined">list</v-icon>
      <v-icon v-else class="material-icons-outlined">grid_on</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "poka-parse-artists",
  props: {
    data: { type: Array },
    hideFab: { type: Boolean, default: false }
  },
  data: () => ({
    server: _setting(`server`),
    artistView: _setting(`artistView`),
    page: 1
  }),
  methods: {
    coverPaser(cover) {
      if (cover.startsWith("http")) return cover;
      else if (cover) return _setting(`server`) + cover;
      else return _setting(`headerBgSource`);
    },
    changeView() {
      this.artistView = this.artistView == "list" ? "card" : "list";
      _setting(`artistView`, this.artistView);
    }
  }
};
</script>
