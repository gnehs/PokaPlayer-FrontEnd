export default {
  title: "使用者管理",
  role: {
    user: "普通使用者",
    admin: "管理员"
  },
  dialog: {
    //create
    create: "建立使用者",
    createBtn: "建立",
    userCreated: "使用者建立成功",
    userCreateFailed: "建立使用者时发生错误",
    userCreateUsernameRepeat: "使用者名称已被使用",
    //edit
    edit: "编辑使用者",
    //changePassword
    changePassword: "更改密码",
    changePasswordSuccess: "密码已变更",
    changePasswordFailed: "更改密码时发生了错误",
    enterNewPassword: "请输入新密码",
    //deleteUser
    deleteUser: "删除使用者",
    deleteUserFailed: "删除使用者时发生了错误"
  },

  field: {
    name: "名称",
    username: "使用者名称",
    role: "权限",
    password: "密码",
    createTime: "建立时间",
    lastLoginTime: "上次登入"
  }
}
