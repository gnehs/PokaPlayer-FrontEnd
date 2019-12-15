<template>
	<div class="poka two list">
		<div class="item" v-for="(song,index) of data" :key="index" v-ripple>
			<div class="content" @click="$addSongs({songs:data,index:index})">
				<v-avatar size="42px" item>
					<v-img
						:src="song.cover?(song.cover.startsWith('http')?song.cover:server+song.cover):defaultCover"
						alt="cover"
					/>
				</v-avatar>
				<div class="header">
					<div class="head t-ellipsis">{{song.name}}</div>
					<div class="t-ellipsis">{{song.artist}}</div>
				</div>
			</div>
			<div class="action">
				<v-btn icon @click="$addSongs({songs:[song],clear:false});isInSongList.push(index);">
					<v-icon v-if="isInSongList.includes(index)">done</v-icon>
					<v-icon v-else>add</v-icon>
				</v-btn>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "poka-parse-songs",
	props: ["data"],
	data: () => ({
		server: _setting(`server`),
		defaultCover: _setting(`headerBgSource`),
		isInSongList: []
	})
};
</script>
