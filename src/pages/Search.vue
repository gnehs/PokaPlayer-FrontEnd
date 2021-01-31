<template>
	<div>
		<div class="search-box" :class="{focus: searchBoxFocus}">
			<input
				class="search-input"
				type="text"
				v-on:keyup.enter="searchClick"
				v-model.trim="keyword"
				:placeholder="$t('search')"
				autocomplete="off"
				@focus="searchBoxFocus = true"
				@blur="searchBoxFocus = false"
				required
			/>
			<button class="search-button" @click="search">
				<v-icon>search</v-icon>
			</button>
		</div>

		<v-overlay absolute :value="isLoading">
			<poka-loader />
		</v-overlay>
		<v-slide-y-reverse-transition>
			<div v-if="searchResult">
				<div class="chip-nav">
					<div
						class="chip-nav-item"
						v-for="itemName of Object.keys(searchResult).filter(x=>searchResult[x].length)"
						:key="itemName"
						:class="{active:active==itemName}"
						@click="active=itemName"
						v-ripple
					>
						<span>{{$t(itemName.substring(0, itemName.length-1))}}</span>
					</div>
				</div>

				<div
					v-for="itemName of Object.keys(searchResult).filter(x=>searchResult[x].length)"
					:key="itemName"
				>
					<div v-show="active==itemName">
						<poka-parse-songs v-if="itemName=='songs'" :data="searchResult[itemName]" />
						<poka-parse-albums v-if="itemName=='albums'" :data="searchResult[itemName]" />
						<poka-parse-playlists v-if="itemName=='playlists' " :data="searchResult[itemName]" />
						<poka-parse-folders v-if="itemName=='folders' " :data="searchResult[itemName]" />
						<poka-parse-composers v-if="itemName=='composers' " :data="searchResult[itemName]" />
						<poka-parse-artists v-if="itemName=='artists' " :data="searchResult[itemName]" />
					</div>
				</div>
			</div>
		</v-slide-y-reverse-transition>
	</div>
</template>

<style lang="sass" scoped>
.search-box
	width: calc(100vw - 60px)
	max-width: 360px
	margin: 18px auto
	display: flex
	border: 1px solid #90909061
	border-radius: 24px
	overflow: hidden
	transition-duration: 0.3s
	transition-property: border, box-shadow
	transition-timing-function: ease
	background-color: white
	&:hover,&.focus
		box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28)
		border: 1px solid #90909000
	&.focus>.search-button
		opacity: 1
	>.search-input
		flex: 1
		outline: none
		border: 0
		border-radius: 24px
		padding: 12px 14px
		font-size: 14px
		color: #000
	>.search-button
		outline: none
		border: 0
		border-radius: 0 2px 2px 0
		padding: 0 10px
		opacity: .7
		background: #FFF
		>i
			color: rgba(0, 0, 0, 0.54)
</style>
<script>
export default {
	name: "Search",
	data: () => ({
		keyword: "",
		active: null,
		searchResult: false,
		isLoading: false,
		searchBoxFocus: false,
	}),
	created() {
		if (this.$route.query.keyword) {
			this.keyword = this.$route.query.keyword
			this.search()
		}
	},
	methods: {
		searchClick() {
			this.$router.replace({ query: { keyword: this.keyword } })
			this.search()
		},
		search() {
			if (!this.keyword || this.keyword == "") return;
			this.isLoading = true;

			this.axios
				.get(_setting(`server`) + "/pokaapi/search/?keyword=" + this.keyword)
				.then(response => {
					this.searchResult = response.data;

					this.active = Object.keys(this.searchResult).filter(x => this.searchResult[x].length)[0]
					this.isLoading = false;
				})
				.catch(e => (this.isLoading = false));
		}
	}
};
</script>