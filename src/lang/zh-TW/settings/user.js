export default {
  title: "使用者",
  description: "檢視您的資料、修改密碼",
  name: "名稱",
  username: "使用者名稱",
  role: "權限",
  password: "密碼",
  passwordDescription: "輕觸此處來更改密碼",
  changeName: {
    title: "更改名稱",
    placeholder: "輸入新的名稱",
    result: {
      success: "名稱成功更改為 {name}",
      error: "名稱更改失敗"
    }
  },
  changeUsername: {
    title: "更改使用者名稱",
    placeholder: "輸入新的使用者名稱",
    result: {
      success: "使用者名稱成功更改為 {name}，下次請用新的使用者名稱來登入",
      error: "使用者名稱更改失敗"
    }
  },
  changePassword: {
    title: "更改密碼",
    oldPassword: "舊密碼",
    newPassword: "新密碼",
    confirmPassword: "確認密碼",
    confirmPasswordHelperText: "再輸入一次您的新密碼",
    done: "更改密碼",
    result: {
      inconsistent: "兩次密碼不一致",
      same: "密碼不可與舊密碼相同",
      success: "密碼更改成功",
      error: "密碼更改失敗"
    }
  }
}