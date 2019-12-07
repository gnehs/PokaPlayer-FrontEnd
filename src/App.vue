<template>
	<v-app class="page-container">
		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
	</v-app>
</template>
<style lang="sass">
@import "@/assets/pokaList.sass"
@import "@/assets/main.sass"
</style>
<style lang="scss">
	.page-container {
		overflow: hidden;
		height: 100vh;
		width: 100vw;
		&.theme--dark {
			background: #282535 !important;
		}
	}
	.theme--dark.v-sheet,
	.theme--dark.v-navigation-drawer,
	.theme--dark.v-tabs-items,
	.theme--dark.v-stepper {
		border-color: #2f2b3e;
		background: #2f2b3e !important;
	}
	.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
		border-radius: 8px !important;
	}
	.v-card + .v-card {
		margin-top: 16px;
	}
	.t-ellipsis {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.v-snack--bottom {
		bottom: 77px !important;
	}
	.v-snack__wrapper {
		background-color: rgba(57, 53, 77, 0.8) !important;
		backdrop-filter: blur(3px) !important;
	}
</style>