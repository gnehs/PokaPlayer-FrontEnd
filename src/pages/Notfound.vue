<template>
	<md-empty-state md-icon="clear" :md-label="$t('nothingFound')">
		<md-button class="md-primary outlined" to="/">{{$t('home')}}</md-button>
	</md-empty-state>
</template>
<script>
export default {
	name: "Notfound"
};
</script>