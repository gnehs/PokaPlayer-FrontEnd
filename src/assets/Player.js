import APlayer from "aplayer";
export default class {
  constructor() {
    this.player = new APlayer({
      container: document.getElementById("player")
    });
  }
  toggle() {
    this.player.toggle();
  }
  addSongs(songs, options = { index: 0, clear: true }) {
    if (options.clear) {
      this.player.list.clear();
    }
    let songRes = `original`
    const playlist = songs.map(item => {
      const song = this.#deepcopy(item);
      song.originalURL = song.url;
      song.url = song.url + "&songRes=" + songRes;

      if (song.source === "DSM") {
        if (songRes === "high") {
          if (song.codec === "mp3") {
            songRes = "original";
          } else if (song.codec === "aac") {
            songRes = "original";
          } else if (song.codec === "flac" && song.bitrate <= 1600 * 1000 && !isSafari) {
            songRes = "original";
          }
        }
      }

      song.uuid = this.#uuid();
      return song;
    });

    this.player.list.add(playlist);
    if (options.index && this.player.options.order === "random") {
      this.player.options.order = "list";
      this.player.list.switch(options.index);
      this.player.options.order = "random";
    } else if (options.index) {
      this.player.list.switch(options.index);
    }
    this.player.play();
  }
  next() {
    this.player.skipForward()
    this.player.play()
  }
  previous() {
    this.player.skipBack()
    this.player.play()
  }
  get audioOrder() {
    return this.player.options.order;
  }
  set audioOrder(mode) {
    this.player.options.order = mode;
  }
  get trackInfo() {
    return this.player.list.audios[this.player.list.index];
  }
  get paused() {
    return this.player.paused;
  }
  get currentTime() {
    return this.#secondToTime(this.player.audio?.currentTime || 0);
  }
  get duration() {
    return this.#secondToTime(this.player.audio?.duration || 0)
  }
  #deepcopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  #secondToTime(s) {
    let m = Math.floor(s / 60);
    let ss = Math.floor(s % 60);
    return `${m}:${`0${ss}`.slice(-2)}`;
  }
  #uuid() {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
      d += performance.now();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
}