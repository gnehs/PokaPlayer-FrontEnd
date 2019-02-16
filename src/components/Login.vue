<template>
  <div>
    <form class="md-layout" v-on:submit.prevent="login">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>
          <md-field>
            <label for="server">Server</label>
            <md-input type="text" name="server" id="server" :disabled="logining"/>
            <span class="md-error">The email is required</span>
            <span class="md-error">Invalid email</span>
          </md-field>
          <md-field>
            <label for="password">Password</label>
            <md-input type="password" name="password" id="password" :disabled="logining"/>
            <span class="md-error">The email is required</span>
            <span class="md-error">Invalid email</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="logining"/>

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="logining">Login</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    logining: false
  }),
  methods: {
    login() {
      this.logining = true;
      setTimeout(() => this.$router.push("/"), 2000);
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
form .md-card {
  margin: 0 auto;
}
</style>