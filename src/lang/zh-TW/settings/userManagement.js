export default {
  title: "使用者管理",
  role: {
    user: "普通使用者",
    admin: "管理員"
  },
  dialog: {
    //create
    create: "建立使用者",
    createBtn: "建立",
    userCreated: "使用者建立成功",
    userCreateFailed: "建立使用者時發生錯誤",
    userCreateUsernameRepeat: "使用者名稱已被使用",
    //edit
    edit: "編輯使用者",
    //changePassword
    changePassword: "更改密碼",
    changePasswordSuccess: "密碼已變更",
    changePasswordFailed: "更改密碼時發生了錯誤",
    enterNewPassword: "請輸入新密碼",
    //deleteUser
    deleteUser: "刪除使用者",
    deleteUserFailed: "刪除使用者時發生了錯誤"
  },

  field: {
    name: "名稱",
    username: "使用者名稱",
    role: "權限",
    password: "密碼",
    createTime: "建立時間",
    lastLoginTime: "上次登入"
  }
}