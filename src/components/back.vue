<template>
  <v-btn @click="$router.go(-1)" text rounded large :dark="dark">
    <v-icon class="mr-2">arrow_back</v-icon>
    {{$t('back')}}
  </v-btn>
</template>
  
<script>
export default {
  name: "back",
  props: {
    dark: { type: Boolean, default: false }
  }
};
</script>

<style>
</style>