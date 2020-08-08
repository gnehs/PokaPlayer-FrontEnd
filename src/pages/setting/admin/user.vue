<template>
	<div>
		<poka-header title="使用者管理" />
		<poka-loader v-if="!users" />
		<v-slide-y-reverse-transition>
			<div class="poka list" v-if="users">
				<div class="item" v-ripple v-for="user in users" :key="user._id" @click="openUserDialog(user)">
					<div class="content">
						<v-avatar size="24px" item>
							<v-icon>mdi-account</v-icon>
						</v-avatar>
						<div class="header">
							<div class="head t-ellipsis">{{user.username}}</div>
							<div class="t-ellipsis">{{user.role}}</div>
						</div>
					</div>
				</div>
			</div>
		</v-slide-y-reverse-transition>
		<v-dialog v-model="userDialog" max-width="300">
			<v-card>
				<v-card-title class="headline">{{userTemp.name}}</v-card-title>
				<v-card-text>
					<div class="poka list">
						<div class="item" v-ripple>
							<div class="content">
								<div class="header">
									<div class="head t-ellipsis">Name</div>
									<div class="t-ellipsis">{{userTemp.name}}</div>
								</div>
							</div>
						</div>
						<div class="item" v-ripple>
							<div class="content">
								<div class="header">
									<div class="head t-ellipsis">Username</div>
									<div class="t-ellipsis">{{userTemp.username}}</div>
								</div>
							</div>
						</div>
						<div class="item" v-ripple>
							<div class="content">
								<div class="header">
									<div class="head t-ellipsis">Role</div>
									<div class="t-ellipsis">{{userTemp.role}}</div>
								</div>
							</div>
						</div>
						<v-divider style="margin: 4px 0;" />
						<div class="item" v-ripple @click="changePassword">
							<div class="content">
								<v-avatar size="28px" item>
									<v-icon>mdi-lock</v-icon>
								</v-avatar>
								<div class="header">
									<div class="head t-ellipsis">Change password</div>
								</div>
							</div>
						</div>
						<div class="item" v-ripple @click="deleteUser">
							<div class="content">
								<v-avatar size="28px" item>
									<v-icon>mdi-delete</v-icon>
								</v-avatar>
								<div class="header">
									<div class="head t-ellipsis">Delete this user</div>
								</div>
							</div>
						</div>
					</div>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn text @click="userDialog = false" color="primary">{{$t('back')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="createUserDialog" max-width="300">
			<v-card>
				<v-card-title class="headline">Create User</v-card-title>
				<v-card-text>
					<v-text-field label="Name" v-model="userTemp.name" outlined></v-text-field>
					<v-text-field label="Username" v-model="userTemp.username" outlined></v-text-field>
					<v-text-field label="Password" v-model="userTemp.password" outlined></v-text-field>
					<v-select :items="['admin','user']" v-model="userTemp.role" label="Role" outlined></v-select>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn text @click="createUserDialog = false" color="primary">{{$t('back')}}</v-btn>
					<v-btn text @click="createUser" color="primary">create</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-fab-transition v-if="!createUserDialog">
			<v-btn color="primary" fab large dark bottom right fixed @click="openCreateUserDialog">
				<v-icon>mdi-account-plus</v-icon>
			</v-btn>
		</v-fab-transition>
	</div>
</template>

<script>
export default {
	name: "SettingAdminUser",
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
			createTime: null,
		}
	}),
	created() {
		this.fetchUsers()
	},
	methods: {
		fetchUsers() {
			this.axios.get(_setting(`server`) + "/pokaapi/v2/users/list").then(response => {
				this.users = response.data
			}).catch(e => {
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
				createTime: null,
			})
			this.createUserDialog = true
		},
		async createUser() {
			let { name, username, password, role } = this.userTemp
			await this.axios.post(_setting(`server`) + "/pokaapi/v2/users/create", { name, username, password, role })
			this.$snackbar('User created.')
			this.createUserDialog = false
			this.fetchUsers()
		},
		async changePassword() {
			let password = prompt("Please enter the password");
			if (password) {
				await this.axios.post(_setting(`server`) + "/pokaapi/v2/users/change-password", {
					_id: this.userTemp._id, password
				}).catch(e => {
					this.$snackbar(e)
				})
				this.$snackbar('Password changed.')
			}
		},
		async deleteUser() {
			if (confirm(`Are you sure want to delete "${this.userTemp.name}"?`)) {
				await this.axios.post(_setting(`server`) + "/pokaapi/v2/users/delete", {
					_id: this.userTemp._id
				}).catch(e => {
					this.$snackbar(e)
				})
				this.userDialog = false
				this.fetchUsers()
			}
		}
	}
}
</script>