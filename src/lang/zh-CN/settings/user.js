export default {
  title: "使用者",
  description: "检视您的资料、修改密码",
  name: "名称",
  username: "使用者名称",
  role: "权限",
  password: "密码",
  passwordDescription: "轻触此处来更改密码",
  changeName: {
    title: "更改名称",
    placeholder: "输入新的名称",
    result: {
      success: "名称成功更改为 {name}",
      error: "名称更改失败"
    }
  },
  changeUsername: {
    title: "更改使用者名称",
    placeholder: "输入新的使用者名称",
    result: {
      success: "使用者名称成功更改为 {name}，下次请用新的使用者名称来登入",
      error: "使用者名称更改失败"
    }
  },
  changePassword: {
    title: "更改密码",
    oldPassword: "旧密码",
    newPassword: "新密码",
    confirmPassword: "确认密码",
    confirmPasswordHelperText: "再输入一次您的新密码",
    done: "更改密码",
    result: {
      inconsistent: "两次密码不一致",
      same: "密码不可与旧密码相同",
      success: "密码更改成功",
      error: "密码更改失败"
    }
  }
}
