<template>
  <div>
    <v-fade-transition>
      <poka-cards v-if="composerView == 'card'">
        <poka-card
          v-for="{ name, cover, id, source } in $pagination(data, page)"
          :key="id"
          :to="`/composer/${encodeURIComponent(source)}/${encodeURIComponent(id || 'unknown')}`"
          :poka-bg="cover || false"
          poka-icon="edit"
          :poka-title="name || '未知'"
          :poka-subtitle="$t(`source.${source}`)"
        />
      </poka-cards>
    </v-fade-transition>
    <v-fade-transition>
      <div class="poka two list" v-if="composerView == 'list'">
        <div
          class="item"
          style="user-select: none"
          v-for="{ name, cover, id, source } in $pagination(data, page)"
          :key="id"
          @click="$router.push(`/composer/${encodeURIComponent(source)}/${encodeURIComponent(id || 'unknown')}`)"
          v-ripple
        >
          <div class="content">
            <v-avatar size="28px" item>
              <v-img :src="coverPaser(cover)" alt="cover" />
            </v-avatar>
            <div class="header">
              <div class="head t-ellipsis">
                {{ name || '未知' }}
                <span style="font-size: 0.7em; opacity: 0.7; font-weight: normal">{{ source }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-fade-transition>
    <poka-pagination :length="$getPages(data)" v-model="page" />
    <v-btn color="primary" fab large dark bottom right fixed style="bottom: calc(16px + 69px)" v-if="!hideFab" @click="changeView">
      <v-icon v-if="composerView == 'card'" class="material-icons-outlined">list</v-icon>
      <v-icon v-else class="material-icons-outlined">grid_on</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'poka-parse-composers',
  props: {
    data: { type: Array },
    hideFab: { type: Boolean, default: false }
  },
  data: () => ({
    server: _setting(`server`),
    composerView: _setting(`composerView`),
    page: 1
  }),
  methods: {
    coverPaser(cover) {
      if (cover.startsWith('http')) return cover
      else if (cover) return _setting(`server`) + cover
      else return _setting(`headerBgSource`)
    },
    changeView() {
      this.composerView = this.composerView == 'list' ? 'card' : 'list'
      _setting(`composerView`, this.composerView)
    }
  }
}
</script>
