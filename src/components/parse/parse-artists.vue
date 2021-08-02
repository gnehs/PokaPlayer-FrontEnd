<template>
  <div>
    <v-fade-transition>
      <poka-cards v-show="artistView == 'card'">
        <poka-card
          v-for="{ name, cover, id, source } in $pagination(data, page)"
          :key="id"
          :to="`/artist/${encodeURIComponent(source)}/${encodeURIComponent(id || 'unknown')}`"
          poka-icon="bx-microphone"
          :poka-bg="cover || false"
          :poka-title="name || '未知'"
          :poka-subtitle="$t(`source.${source}`)"
        />
      </poka-cards>
    </v-fade-transition>
    <v-fade-transition>
      <div class="poka two list" v-show="artistView == 'list'">
        <div
          class="item"
          style="user-select: none"
          v-for="{ name, cover, id, source } in $pagination(data, page)"
          :key="id"
          @click="$router.push(`/artist/${encodeURIComponent(source)}/${encodeURIComponent(id || 'unknown')}`)"
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
  </div>
</template>

<script>
export default {
  name: 'poka-parse-artists',
  props: {
    data: { type: Array }
  },
  data: () => ({
    server: _setting(`server`),
    artistView: _setting(`artistView`),
    page: 1
  }),
  methods: {
    coverPaser(cover) {
      if (cover.startsWith('http')) return cover
      else if (cover) return _setting(`server`) + cover
      else return _setting(`headerBgSource`)
    }
  }
}
</script>
