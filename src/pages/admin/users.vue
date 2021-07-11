<template>
  <div>
    <poka-loader v-if="!users" />
    <v-slide-y-reverse-transition>
      <div class="poka list" v-if="users">
        <div class="item" v-ripple v-for="user in users" :key="user._id" @click="openUserDialog(user)">
          <div class="content">
            <v-icon class="material-icons-outlined" :color="$vuetify.theme.isDark ? '#FFF' : 'primary'" v-text="'person'" />
            <div class="header">
              <div class="head t-ellipsis">{{ user.username }}</div>
              <div class="t-ellipsis">
                {{ $t('settingUserManagement.role.' + user.role) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-slide-y-reverse-transition>
    <v-dialog v-model="userDialog" max-width="300">
      <v-card>
        <v-card-title class="headline">{{ $t('settingUserManagement.dialog.edit') }}</v-card-title>
        <v-card-text>
          <div class="poka list">
            <div class="item" v-ripple>
              <div class="content">
                <div class="header">
                  <div class="head t-ellipsis">
                    {{ $t('settingUserManagement.field.name') }}
                  </div>
                  <div class="t-ellipsis">{{ userTemp.name }}</div>
                </div>
              </div>
            </div>
            <div class="item" v-ripple>
              <div class="content">
                <div class="header">
                  <div class="head t-ellipsis">
                    {{ $t('settingUserManagement.field.username') }}
                  </div>
                  <div class="t-ellipsis">{{ userTemp.username }}</div>
                </div>
              </div>
            </div>
            <div class="item" v-ripple>
              <div class="content">
                <div class="header">
                  <div class="head t-ellipsis">
                    {{ $t('settingUserManagement.field.role') }}
                  </div>
                  <div class="t-ellipsis">{{ userTemp.role }}</div>
                </div>
              </div>
            </div>
            <v-divider style="margin: 4px 0" />
            <div class="item" v-ripple @click="changePassword">
              <div class="content">
                <v-icon class="material-icons-outlined" :color="$vuetify.theme.isDark ? '#FFF' : 'primary'" v-text="'lock'" />
                <div class="header">
                  <div class="head t-ellipsis">
                    {{ $t('settingUserManagement.dialog.changePassword') }}
                  </div>
                </div>
              </div>
            </div>
            <div class="item" v-ripple @click="deleteUser">
              <div class="content">
                <v-icon class="material-icons-outlined" :color="$vuetify.theme.isDark ? '#FFF' : 'primary'" v-text="'delete'" />
                <div class="header">
                  <div class="head t-ellipsis">
                    {{ $t('settingUserManagement.dialog.deleteUser') }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="userDialog = false" color="primary">{{ $t('back') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="createUserDialog" max-width="300">
      <v-card>
        <v-card-title class="headline">{{ $t('settingUserManagement.dialog.create') }}</v-card-title>
        <v-card-text>
          <v-text-field :label="$t('settingUserManagement.field.name')" v-model="userTemp.name" outlined></v-text-field>
          <v-text-field :label="$t('settingUserManagement.field.username')" v-model="userTemp.username" outlined></v-text-field>
          <v-text-field :label="$t('settingUserManagement.field.password')" v-model="userTemp.password" outlined></v-text-field>
          <v-select :label="$t('settingUserManagement.field.role')" :items="['admin', 'user']" v-model="userTemp.role" outlined></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="createUserDialog = false" color="primary">{{ $t('back') }}</v-btn>
          <v-btn text @click="createUser" color="primary">{{ $t('settingUserManagement.dialog.createBtn') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-fab-transition v-if="!createUserDialog">
      <v-btn color="primary" fab large dark bottom right fixed style="bottom: calc(16px + 69px)" @click="openCreateUserDialog">
        <v-icon class="material-icons-outlined">person_add</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
export default {
  name: 'SettingAdminUser',
  data: () => ({
    users: null,
    userDialog: false,
    createUserDialog: false,
    userTemp: {
      _id: -1,
      role: null,
      settings: null,
      name: null,
      username: null,
      password: null,
      createTime: null
    }
  }),
  created() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {
      this.axios
        .get(_setting(`server`) + '/pokaapi/v2/users/list')
        .then(response => {
          this.users = response.data
        })
        .catch(e => {
          this.$snackbar(e)
          this.users = []
        })
    },
    openUserDialog(user) {
      this.userTemp = this.$deepCopy(user)
      this.userDialog = true
    },
    openCreateUserDialog() {
      this.userTemp = this.$deepCopy({
        _id: -1,
        role: null,
        settings: null,
        name: null,
        username: null,
        password: null,
        createTime: null
      })
      this.createUserDialog = true
    },
    async createUser() {
      let { name, username, password, role } = this.userTemp
      let createUserResult = await this.axios.post(_setting(`server`) + '/pokaapi/v2/users/create', { name, username, password, role })
      if (createUserResult.data.success) {
        this.$snackbar(i18n.t('settingUserManagement.dialog.userCreated'))
        this.createUserDialog = false
        this.fetchUsers()
      } else {
        if (createUserResult.data.error == 'username already taken') {
          this.$snackbar(i18n.t('settingUserManagement.dialog.userCreateUsernameRepeat'))
        } else {
          this.$snackbar(i18n.t('settingUserManagement.dialog.userCreateFailed'))
        }
      }
    },
    async changePassword() {
      let password = prompt(i18n.t('settingUserManagement.dialog.enterNewPassword'))
      if (password) {
        await this.axios
          .post(_setting(`server`) + '/pokaapi/v2/users/change-password', {
            _id: this.userTemp._id,
            password
          })
          .catch(e => {
            this.$snackbar(i18n.t('settingUserManagement.dialog.changePasswordFailed'))
          })
        this.$snackbar(i18n.t('settingUserManagement.dialog.changePasswordSuccess'))
      }
    },
    async deleteUser() {
      if (confirm(`Are you sure want to delete "${this.userTemp.name}"?`)) {
        await this.axios
          .post(_setting(`server`) + '/pokaapi/v2/users/delete', {
            _id: this.userTemp._id
          })
          .catch(e => {
            this.$snackbar(i18n.t('settingUserManagement.dialog.deleteUserFailed'))
          })
        this.userDialog = false
        this.fetchUsers()
      }
    }
  }
}
</script>
