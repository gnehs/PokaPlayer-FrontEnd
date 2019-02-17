<template>
  <md-empty-state md-rounded md-icon="clear" :md-label="$t('nothingFound')">
    <md-button class="md-primary md-raised" to="/">{{$t('home')}}</md-button>
  </md-empty-state>
</template>
<script>
export default {
  name: "Notfound"
};
</script>