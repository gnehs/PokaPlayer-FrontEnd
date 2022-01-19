export default {
  title: "User management",
  role: {
    user: "user",
    admin: "admin"
  },
  dialog: {
    //create
    create: "Create User",
    createBtn: "Create",
    userCreated: "User created.",
    userCreateFailed: "User create failed.",
    userCreateUsernameRepeat: "Username is already taken.",
    //edit
    edit: "Edit User",
    //changePassword
    changePassword: "Change Password",
    changePasswordSuccess: "Password changed.",
    changePasswordFailed: "An error occurred when changing the password.",
    enterNewPassword: "Please enter the new password",
    //deleteUser
    deleteUser: "Delete this user",
    deleteUserFailed: "An error occurred when deleting the user"
  },
  field: {
    name: "Name",
    username: "Username",
    role: "Role",
    password: "Password",
    createTime: "Created time",
    lastLoginTime: "Last login"
  }
}