<template>
  <div>
    <!--隱私-->
    <v-subheader>{{ $t('settingPravicy.title') }}</v-subheader>
    <v-card outlined>
      <v-card-text>
        <div class="headline text--primary">
          {{ $t('settingPravicy.notify.title') }}
        </div>
        <div>{{ $t('settingPravicy.notify.body') }}</div>
      </v-card-text>
    </v-card>
    <div class="poka list">
      <div class="item" v-ripple @click="setDataRecord">
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon class="bx" :color="dataRecord ? 'purple' : null">bx-data</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">
              {{ $t('settingPravicy.dataRecord._') }}
            </div>
            <div class="t-ellipsis">
              {{ $t('settingPravicy.dataRecord.' + (dataRecord ? 'enabled' : 'disabled')) }}
            </div>
          </div>
        </div>
      </div>
      <div class="item" v-ripple @click="clearRecord">
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon class="bx">bx-x</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">
              {{ $t('settingPravicy.dataRecord.clear') }}
            </div>
            <div class="t-ellipsis">
              {{
                dataRecordCount > -1
                  ? $t('settingPravicy.dataRecord.logged', {
                      count: dataRecordCount
                    })
                  : $t('settingPravicy.dataRecord.loading')
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--使用者-->
    <v-subheader>{{ $t('settingUser.title') }}</v-subheader>
    <div class="poka list">
      <div class="item" @click="copyID" v-if="userdata" v-ripple>
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon class="bx">bx-key</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">ID</div>
            <div class="t-ellipsis">{{ userdata._id }}</div>
          </div>
        </div>
      </div>
      <div class="item" @click="temp.changeNamePrompt = true" v-if="userdata" v-ripple>
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon class="bx">bx-user</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">{{ $t('settingUser.name') }}</div>
            <div class="t-ellipsis">{{ userdata.name }}</div>
          </div>
        </div>
      </div>
      <div class="item" @click="temp.changeUsernamePrompt = true" v-if="userdata" v-ripple>
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon class="bx">bx-at</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">{{ $t('settingUser.username') }}</div>
            <div class="t-ellipsis">{{ userdata.username }}</div>
          </div>
        </div>
      </div>
      <div class="item" v-if="userdata">
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon class="bx">bx-cog</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">{{ $t('settingUser.role') }}</div>
            <div class="t-ellipsis">{{ userdata.role }}</div>
          </div>
        </div>
      </div>
      <div class="item" @click="temp.changePasswordDialog = true" v-if="userdata">
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon class="bx">bx-lock</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">{{ $t('settingUser.password') }}</div>
            <div class="t-ellipsis">
              {{ $t('settingUser.passwordDescription') }}
            </div>
          </div>
        </div>
      </div>
      <div class="item" @click="logout" v-if="userdata">
        <div class="content">
          <v-avatar size="42px" item>
            <v-icon class="bx">bx-log-out-circle</v-icon>
          </v-avatar>
          <div class="header">
            <div class="head t-ellipsis">{{ $t('settings_logout') }}</div>
          </div>
        </div>
      </div>
    </div>
    <poka-loader v-if="!userdata" />

    <v-dialog v-model="temp.changeNamePrompt" max-width="300">
      <v-card>
        <v-card-title class="headline">{{ $t('settingUser.changeName.title') }}</v-card-title>
        <v-card-text style="padding-bottom: 0">
          <v-text-field :label="$t('settingUser.changeName.placeholder')" v-model.trim="temp.changeNameValue" outlined hide-details />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="temp.changeNamePrompt = false">{{ $t('cancel') }}</v-btn>
          <v-btn
            text
            @click="
              temp.changeNamePrompt = false
              changeName()
            "
            color="primary"
            >{{ $t('done') }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="temp.changeUsernamePrompt" max-width="300">
      <v-card>
        <v-card-title class="headline">{{ $t('settingUser.changeName.title') }}</v-card-title>
        <v-card-text style="padding-bottom: 0">
          <v-text-field
            :label="$t('settingUser.changeUsername.placeholder')"
            v-model.trim="temp.changeUsernameValue"
            outlined
            hide-details
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="temp.changeUsernamePrompt = false">{{ $t('cancel') }}</v-btn>
          <v-btn
            text
            @click="
              temp.changeUsernamePrompt = false
              changeUsername()
            "
            color="primary"
            >{{ $t('done') }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="temp.changePasswordDialog" max-width="300">
      <v-card>
        <v-card-title class="headline">{{ $t('settingUser.changePassword.title') }}</v-card-title>
        <v-card-text>
          <v-text-field :label="$t('settingUser.changePassword.oldPassword')" v-model="temp.changePasswordold" outlined hide-details />
          <br />
          <v-text-field :label="$t('settingUser.changePassword.newPassword')" v-model="temp.changePassword" outlined hide-details />
          <br />
          <v-text-field
            :label="$t('settingUser.changePassword.confirmPassword')"
            v-model="temp.changePassword2"
            :hint="$t('settingUser.changePassword.confirmPasswordHelperText')"
            outlined
            hide-details
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="temp.changePasswordDialog = false">{{ $t('cancel') }}</v-btn>
          <v-btn text @click="changePassword()" color="primary">{{ $t('settingUser.changePassword.done') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'SettingUser',
  data: () => ({
    //使用者
    userdata: null,
    temp: {
      changeNamePrompt: false,
      changeNameValue: '',
      changeUsernamePrompt: false,
      changeUsernameValue: '',
      changePasswordDialog: false,
      changePassword: '',
      changePassword2: '',
      changePasswordold: ''
    },
    //隱私
    dataRecord: window._setting('dataRecord'),
    dataRecordCount: -1
  }),
  async created() {
    //使用者
    this.userdata = (await this.axios.get(_setting(`server`) + '/pokaapi/v2/user/')).data
    //隱私
    this.dataRecordCount = (await this.axios(_setting(`server`) + `/pokaapi/v2/record/count/user?${Date.now()}`)).data
  },
  methods: {
    //使用者
    copyID() {
      navigator.clipboard.writeText(this.userdata._id).then(
        () => {
          this.$snackbar(this.$t('copy.success'))
        },
        () => {
          this.$snackbar(this.$t('copy.failed'))
        }
      )
    },
    changeName() {
      if (this.temp.changeNameValue == '' || !this.temp.changeNameValue)
        return this.$snackbar(this.$t('settingUser.changeName.result.error'))
      this.axios
        .post(_setting(`server`) + '/pokaapi/v2/user/name/', {
          n: this.temp.changeNameValue
        })
        .then(response => {
          if (response.data.success) {
            this.userdata.name = this.temp.changeNameValue
            this.$snackbar(
              this.$t('settingUser.changeName.result.success', {
                name: this.temp.changeNameValue
              })
            )
          } else {
            this.$snackbar(this.$t('settingUser.changeName.result.error'))
          }
        })
    },
    changeUsername() {
      if (this.temp.changeUsernameValue == '' || !this.temp.changeUsernameValue)
        return this.$snackbar(this.$t('settingUser.changeUsername.result.error'))
      this.axios
        .post(_setting(`server`) + '/pokaapi/v2/user/username/', {
          n: this.temp.changeUsernameValue
        })
        .then(response => {
          if (response.data.success) {
            this.userdata.username = this.temp.changeUsernameValue
            this.$snackbar(
              this.$t('settingUser.changeUsername.result.success', {
                name: this.temp.changeUsernameValue
              })
            )
          } else if (response.data.error) {
            this.$snackbar(response.data.error)
          } else {
            this.$snackbar(this.$t('settingUser.changeUsername.result.error'))
          }
        })
    },
    changePassword() {
      if (
        this.temp.changePassword == '' ||
        !this.temp.changePassword ||
        this.temp.changePassword2 == '' ||
        !this.temp.changePassword2 ||
        this.temp.changePasswordold == '' ||
        !this.temp.changePasswordold
      )
        return this.$snackbar(this.$t('settingUser.changePassword.result.error'))
      if (this.temp.changePassword !== this.temp.changePassword2)
        return this.$snackbar(this.$t('settingUser.changePassword.result.inconsistent'))
      if (this.temp.changePassword === this.temp.changePasswordold) return this.$snackbar(this.$t('settingUser.changePassword.result.same'))
      this.axios
        .post(_setting(`server`) + '/pokaapi/v2/user/password/', {
          oldpassword: this.temp.changePasswordold,
          password: this.temp.changePassword
        })
        .then(response => {
          if (response.data.success) {
            this.$snackbar(this.$t('settingUser.changePassword.result.success'))
            this.temp.changePasswordDialog = false
          } else if (response.data.error) {
            this.$snackbar(response.data.error)
          } else {
            this.$snackbar(this.$t('settingUser.changePassword.result.error'))
          }
        })
    },
    logout() {
      sessionStorage.removeItem('login')
      _player.pause()
      this.axios(_setting(`server`) + '/logout').then(e => this.$router.push('/login'))
    },
    //隱私
    async setDataRecord() {
      this.dataRecord = !this.dataRecord
      // sync setting
      this.axios({
        method: 'post',
        url: _setting(`server`) + '/pokaapi/v2/user/setting/',
        data: { dataRecord: this.dataRecord }
      })
    },
    async clearRecord() {
      if (confirm('您確定要清除資料嗎？'))
        this.axios.post(_setting(`server`) + `/pokaapi/v2/record/clear`).then(r => {
          this.$snackbar('資料已清除')
          this.dataRecordCount = 0
        })
    }
  }
}
</script>
