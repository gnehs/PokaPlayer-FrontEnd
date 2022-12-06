<template>
  <Dialog v-model="dialog">
    <h1>登入</h1>
    {{ server }}
    <p-input label="server" v-model="server" />
    <p-input label="username" v-model="username" />
    <p-input label="password" v-model="password" type="password" />
  </Dialog>
</template>
<script>
export default {
  name: 'LoginDialog',
  data() {
    return {
      server: '',
      username: '',
      password: '',
    }
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialog: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
}
</script>