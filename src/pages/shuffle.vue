<template></template>

<script>
export default {
  name: 'Shuffle',
  created() {
    this.$randomPlay()
    this.$router.push('/home')
  }
}
</script>
