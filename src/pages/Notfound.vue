<template>
	<div>
		<poka-header />
		<v-card class="mx-auto blur-card" max-width="344" style="margin-top:32px;" key="card">
			<v-card-text class="text-center">
				<v-icon class="material-icons-outlined display-4">clear</v-icon>
				<p class="headline text--primary">{{$t('nothingFound')}}</p>

				<v-btn outlined color="primary" to="/">{{$t('home')}}</v-btn>
			</v-card-text>
		</v-card>
	</div>
</template>
<script>
export default {
	name: "Notfound"
};
</script>