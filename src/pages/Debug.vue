<template>
	<div>
		<poka-header title="Debug" />
		<div class="title">Snackbar</div>
		<v-btn text @click="$snackbar('test test 123')">Open Snackbar</v-btn>

		<v-expansion-panels>
			<v-expansion-panel>
				<v-expansion-panel-header>Audios</v-expansion-panel-header>
				<v-expansion-panel-content>
					<pre>{{audios}}</pre>
				</v-expansion-panel-content>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-header>Config</v-expansion-panel-header>
				<v-expansion-panel-content>
					<pre>{{pokaSetting}}</pre>
				</v-expansion-panel-content>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-header>Lyric</v-expansion-panel-header>
				<v-expansion-panel-content>
					<pre>{{lyric}}</pre>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script>
export default {
	name: "Debug",
	created() {
	},
	data: () => ({
		pokaSetting: JSON.parse(localStorage.pokaSetting),
		audios: _player.list.audios,
		lyric: _lrc.lyrics_all
	})
};
</script>