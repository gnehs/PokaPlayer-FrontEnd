<script setup>
import { ref, inject } from 'vue'

import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const PokaAPI = inject('PokaAPI')
const editNameDialog = ref(false)
const editName = ref('')
const editUsernameDialog = ref(false)
const editUsername = ref('')
const editPasswordDialog = ref(false)
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
async function getUserInfo() {
  userInfo.value = await PokaAPI.getUserInfo()
}
async function editNameFunc() {
  await PokaAPI.changeUserName(editName.value)
  editNameDialog.value = false
  await getUserInfo()
}
async function editUsernameFunc() {
  await PokaAPI.changeUserUsername(editUsername.value)
  editUsernameDialog.value = false
  await getUserInfo()
}
async function editPasswordFunc() {
  if (newPassword.value !== confirmPassword.value) {
    window.alert('Password not match')
    return
  }
  await PokaAPI.changeUserPassword(oldPassword.value, newPassword.value)
  editPasswordDialog.value = false
}
</script>
<template>
  <Teleport to="#header-center">
    <p>{{ $t('settings.user.title') }}</p>
  </Teleport>
  <div v-if="userInfo">
    <div class="setting-item">
      <div class="content">
        <div class="title">{{ $t('settings.user.name') }}</div>
        <div class="description">
          {{ userInfo.name }}
        </div>
      </div>
      <div class="control">
        <p-btn @click="editNameDialog = true"> {{ $t('settings.user.edit') }}</p-btn>
      </div>
    </div>
    <div class="setting-item">
      <div class="content">
        <div class="title">{{ $t('settings.user.username') }}</div>
        <div class="description">
          {{ userInfo.username }}
        </div>
      </div>
      <div class="control">
        <p-btn @click="editUsernameDialog = true"> {{ $t('settings.user.edit') }}</p-btn>
      </div>
    </div>
    <div class="setting-item">
      <div class="content">
        <div class="title">{{ $t('settings.user.password') }}</div>
      </div>
      <div class="control">
        <p-btn @click="editPasswordDialog = true"> {{ $t('settings.user.changePassword') }}</p-btn>
      </div>
    </div>
    <div class="setting-item">
      <div class="content">
        <div class="title">{{ $t('settings.user.id') }}</div>
        <div class="description">
          {{ userInfo._id }}
        </div>
      </div>
    </div>
    <div class="setting-item">
      <div class="content">
        <div class="title">{{ $t('settings.user.role') }}</div>
        <div class="description">
          {{ userInfo.role }}
        </div>
      </div>
    </div>
    <div class="setting-item">
      <div class="content">
        <div class="title">{{ $t('settings.user.createTime') }}</div>
        <div class="description">
          {{ new Date(userInfo.createTime).toLocaleString() }}
        </div>
      </div>
    </div>
  </div>
  <Dialog v-model="editNameDialog">
    <h3>{{ $t('settings.user.name') }}</h3>
    <p-input :label="$t('settings.user.name')" v-model="editName" />
    <div style="display: flex;justify-content: flex-end;margin-top: var(--padding);gap: var(--padding);">
      <p-btn @click="editNameDialog = false">{{ $t('cancel') }}</p-btn>
      <p-btn @click="editNameFunc" color="primary">{{ $t('save') }}</p-btn>
    </div>
  </Dialog>
  <Dialog v-model="editUsernameDialog">
    <h3>{{ $t('settings.user.username') }}</h3>
    <p-input :label="$t('settings.user.username')" v-model="editUsername" />
    <div style="display: flex;justify-content: flex-end;margin-top: var(--padding);gap: var(--padding);">
      <p-btn @click="editUsernameDialog = false">{{ $t('cancel') }}</p-btn>
      <p-btn @click="editUsernameFunc" color="primary">{{ $t('save') }}</p-btn>
    </div>
  </Dialog>
  <Dialog v-model="editPasswordDialog">
    <h3>{{ $t('settings.user.changePassword') }}</h3>
    <p-input :label="$t('settings.user.oldPassword')" v-model="oldPassword" />
    <p-input :label="$t('settings.user.newPassword')" v-model="newPassword" />
    <p-input :label="$t('settings.user.confirmPassword')" v-model="confirmPassword" />
    <div style="display: flex;justify-content: flex-end;margin-top: var(--padding);gap: var(--padding);">
      <p-btn @click="editPasswordDialog = false">{{ $t('cancel') }}</p-btn>
      <p-btn @click="editPasswordFunc" color="primary">{{ $t('save') }}</p-btn>
    </div>
  </Dialog>
</template>