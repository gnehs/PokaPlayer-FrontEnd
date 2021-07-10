<template>
  <div>
    <poka-header :blurbg="!isCoverGenerate" :bg="cover" />
    <info-header
      :title="title||$t('loading')"
      :subtitle="$t('playlist')"
      :cover="cover"
      :songs="data?data.songs.length:0||0"
    >
      <pin-button
        v-if="title"
        :source="$route.params.source"
        :id="$route.params.id"
        :cover="cover"
        type="playlist"
        :name="title"
        btn-type="icon-button"
      />

      <v-btn
        v-if="fromPoka"
        @click="playlistDialog=true"
        outlined
        color="info"
        class="ml-2 rounded-lg"
      >
        <v-icon class="material-icons-outlined mr-2">edit</v-icon>
        {{$t('playlist_page.edit_title')}}
      </v-btn>
    </info-header>
    <v-divider />
    <poka-parse-songs v-if="data" :data="data.songs" />
    <poka-loader v-else />
    <v-dialog v-model="playlistDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">{{$t('playlist_page.edit_title')}}</v-card-title>
        <v-card-text style="padding-bottom: 0;">
          <v-text-field
            v-model="editData.name"
            :label="$t('playlist_page.title_input')"
            outlined
            hide-details
          />
          <br />
          <v-text-field
            v-model="editData.image"
            :label="$t('playlist_page.cover_input')"
            outlined
            hide-details
          />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="playlistDialog = false;playlistDel=true">{{$t('playlist_page.del')}}</v-btn>
          <v-spacer />
          <v-btn text @click="editPlaylist">{{$t('done')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="playlistDel" max-width="400">
      <v-card>
        <v-card-title class="headline">{{$t("playlist_page.del_title")}}</v-card-title>
        <v-card-text>{{$t("playlist_page.delconfirm",{title})}}</v-card-text>
        <v-card-actions>
          <v-btn text @click="playlistDel = false">{{$t('cancel')}}</v-btn>
          <v-spacer />
          <v-btn text @click="playlistDel = false;delPlaylist()">{{$t('ok')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
const GeoPattern = require("geopattern");
export default {
  name: "PlaylistSongs",
  data: () => ({
    data: null,
    title: null,
    cover: null,
    isCoverGenerate: false,
    server: _setting(`server`),
    editData: {
      name: null,
      image: _setting(`headerBgSource`)
    },
    fromPoka: false,
    playlistDialog: false,
    playlistDel: false,
    playlistDelConfirm: ""
  }),
  created() {
    this.fetchData();
  },
  methods: {
    async editPlaylist() {
      if (this.editData.name == "" || this.editData.cover == "")
        return this.$snackbar(i18n.t("playlist_page.edit_empty"));
      this.playlistDialog = false;
      await this.axios.post(`${this.server}/pokaapi/playlist/edit`, {
        id: this.data.playlists[0].id,
        data: this.editData
      });
      this.fetchData();
    },
    async delPlaylist() {
      await this.axios.post(`${this.server}/pokaapi/playlist/del`, {
        id: this.data.playlists[0].id
      });
      this.$router.push("/playlist");
    },
    fetchData() {
      let source = encodeURIComponent(this.$route.params.source);
      let playlistId = encodeURIComponent(this.$route.params.id);
      let server = this.server;
      this.axios
        .get(
          `${server}/pokaapi/playlistSongs/?moduleName=${source}&id=${playlistId}&rnd=${Math.floor(
            Math.random() * 9999999
          )}`
        )
        .then(response => {
          this.data = response.data;
          this.title = this.data.playlists[0].name;
          this.editData.name = this.data.playlists[0].name;
          if (this.data.playlists[0].image) {
            this.cover = this.data.playlists[0].image;
            this.editData.image = this.data.playlists[0].image;
            if (!this.data.playlists[0].image.startsWith("http")) {
              this.cover = this.server + this.cover;
            }
          } else {
            this.cover = GeoPattern.generate(this.title, {
              baseColor: "#fc0"
            }).toDataUri();
            this.isCoverGenerate = true;
          }
          this.fromPoka = this.data.playlists[0].source == "poka";
        });
    }
  }
};
</script>