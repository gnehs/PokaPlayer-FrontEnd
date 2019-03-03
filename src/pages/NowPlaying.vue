<template>
  <div>
    <poka-header/>
    <div style="position: relative">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "NowPlaying",
  data() {
    return {
      msg: "現正播放"
    };
  }
};
</script>