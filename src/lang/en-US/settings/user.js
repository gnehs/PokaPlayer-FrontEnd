export default {
  title: "User",
  description: "View your profile, change your password",
  name: "Name",
  username: "Username",
  role: "Role",
  password: "Password",
  passwordDescription: "Tap here to change your password",
  changeName: {
    title: "Change name",
    placeholder: "Enter a new name",
    result: {
      success: "Name successfully changed to {name}",
      error: "Name change failed"
    }
  },
  changeUsername: {
    title: "Change username",
    placeholder: "Enter a new username",
    result: {
      success:
        "Username successfully changed to {name}, please login with a new username next time",
      error: "Username change failed"
    }
  },
  changePassword: {
    title: "Change the password",
    oldPassword: "old password",
    newPassword: "new password",
    confirmPassword: "confirm password",
    confirmPasswordHelperText: "Enter your new password again",
    done: "change",
    result: {
      inconsistent: "Two passwords are inconsistent",
      same: "Password cannot be the same as the old password",
      success: "Password changed successfully",
      error: "Password change failed"
    }
  }
}