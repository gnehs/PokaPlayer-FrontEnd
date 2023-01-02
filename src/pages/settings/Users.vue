<script setup>
import { ref, computed, watch, inject, onMounted } from 'vue'
const PokaAPI = inject('PokaAPI')
const users = ref(null)
const selectedUser = ref(null)
const newUser = ref({
  name: "",
  username: "",
  password: "",
  role: "user"
})
const userDialog = computed({
  get: () => !!selectedUser.value,
  set: () => selectedUser.value = null
})
const createUserDialog = ref(false)
async function getUserList() {
  let data = await PokaAPI.getUserList()
  users.value = data
}
async function changePassword() {
  let newPassword = prompt("New password")
  if (newPassword) {
    let data = await PokaAPI.changeUserPasswordById(selectedUser.value._id, newPassword)
    if (data.success) {
      alert("Password changed")
    } else {
      alert("Error: " + data.error)
    }
  }
}
async function deleteUser() {
  let confirm = prompt("Are you sure you want to delete this user? Type 'yes' to confirm")
  if (confirm == "yes") {
    let data = await PokaAPI.deleteUser(selectedUser.value._id)
    if (data.ok) {
      await getUserList()
    } else {
      alert("Error")
    }

  }
}
async function createUser() {
  let data = await PokaAPI.createUser(newUser.value)
  if (data.success) {
    await getUserList()
    createUserDialog.value = false
  } else {
    alert("Error: " + data.error)
  }
}
onMounted(async () => {
  await getUserList()
})
</script>
<template>
  <Teleport to="#header-center">
    <p>{{ $t('settings.users.title') }}</p>
  </Teleport>
  <Teleport to="#header-actions">
    <p-btn @click="createUserDialog = true" outline>Create</p-btn>
  </Teleport>
  <p-list-items v-if="users">
    <p-list-item v-for="user of users" :tabindex="0">
      <!-- <p-list-item-img :src="item.cover" /> -->
      <p-list-item-content
        :title="user.name"
        :description="user.username" />
      <template #actions>
        <span>{{ user.role }}</span>
        <p-list-item-icon-btn @click="selectedUser = user">
          <i class='bx bx-edit'></i>
        </p-list-item-icon-btn>
      </template>
    </p-list-item>
  </p-list-items>
  <Dialog v-model="createUserDialog">
    <h3>Create user</h3>
    <p>Create a new user</p>
    <p-input v-model="newUser.name" label="Name" />
    <p-input v-model="newUser.username" label="Username" />
    <p-input v-model="newUser.password" label="Password" type="password" />
    <p-select v-model="newUser.role" label="Role" style="margin-top: var(--padding);">
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </p-select>

    <div style="display: flex;justify-content: flex-end;margin-top: var(--padding);gap: var(--padding);">
      <p-btn @click="createUserDialog = false">Cancel</p-btn>
      <p-btn @click="createUser" color="primary">Create</p-btn>
    </div>
  </Dialog>
  <Dialog v-model="userDialog">
    <p-list-items v-if="selectedUser" single-row>
      <p-list-item tabindex="0">
        <p-list-item-content
          :title="selectedUser.name"
          :description="selectedUser.username" />
      </p-list-item>
      <p-list-item tabindex="0">
        <p-list-item-content
          :title="selectedUser._id"
          description="ID" />
      </p-list-item>
      <p-list-item tabindex="0">
        <p-list-item-content
          :title="selectedUser.role"
          description="Role" />
      </p-list-item>
      <p-list-item tabindex="0">
        <p-list-item-content
          :title="new Date(selectedUser.createTime).toLocaleString()"
          description="Create time" />
      </p-list-item>
      <p-list-item tabindex="0">
        <p-list-item-content
          :title="new Date(selectedUser.lastLoginTime).toLocaleString()"
          description="Last login time" />
      </p-list-item>
      <p-list-item tabindex="0" @click="changePassword">
        <p-list-item-icon-btn>
          <i class='bx bx-lock-alt'></i>
        </p-list-item-icon-btn>
        <p-list-item-content
          :title="$t('settings.user.changePassword')" />
      </p-list-item>
      <p-list-item tabindex="0" @click="deleteUser">
        <p-list-item-icon-btn>
          <i class='bx bx-trash-alt'></i>
        </p-list-item-icon-btn>
        <p-list-item-content
          title="Delete user" />
      </p-list-item>
    </p-list-items>
    <div style="display: flex;justify-content: flex-end;margin-top: var(--padding);">
      <p-btn
        @click="userDialog = false"
        color="primary">
        {{ $t('close') }}
      </p-btn>
    </div>
  </Dialog>
</template>