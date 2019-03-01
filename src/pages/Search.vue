<template>
  <div>
    <div class="md-layout md-gutter" :class="`md-alignment-center-center`">
      <div
        class="md-layout-item md-medium-size-50 md-large-size-50 md-xlarge-size-50 md-small-size-100"
      >
        <div class="search-box" :class="{focus: searchBoxFocus}">
          <input
            class="search-input"
            type="text"
            v-on:keyup.enter="search"
            v-model.trim="keyword"
            :placeholder="$t('search')"
            autocomplete="off"
            @focus="searchBoxFocus = true"
            @blur="searchBoxFocus = false"
            required
          >
          <button class="search-button" @click="search">
            <md-icon>search</md-icon>
          </button>
        </div>
      </div>
    </div>
    <poka-loader v-if="isLoading"/>
    <poka-parse-multiple v-if="!isLoading&&searchResult" :data="searchResult"/>
  </div>
</template>

<style lang="sass" scoped>
.search-box
	margin: 18px 0
	display: flex
	border: 1px solid #90909061
	border-radius: 24px
	overflow: hidden
	transition: all .3s ease
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
	>.search-button
		outline: none
		border: 0
		border-radius: 0 2px 2px 0
		padding: 0 10px
		opacity: .7
		background: #FFF
</style>
<script>
export default {
  name: "Search",
  data: () => ({
    keyword: "",
    searchResult: null,
    isLoading: false,
    searchBoxFocus: false
  }),
  methods: {
    search() {
      if (this.keyword == "") return;
      this.isLoading = true;

      this.axios
        .get(_setting(`server`) + "/pokaapi/search/?keyword=" + this.keyword)
        .then(response => {
          this.searchResult = [response.data];
          this.isLoading = false;
        })
        .catch(e => (this.isLoading = false));
    }
  }
};
</script>