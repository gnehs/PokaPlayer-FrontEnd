<template>
	<v-card v-else class="mx-auto" max-width="344" style="margin-top:32px;" key="card">
		<v-card-text class="text-center">
			<v-icon class="display-4 outline-clear" />
			<p class="headline text--primary">{{$t('nothingFound')}}</p>

			<v-btn outlined color="primary" to="/">{{$t('home')}}</v-btn>
		</v-card-text>
	</v-card>
</template>
<script>
export default {
	name: "Notfound"
};
</script>