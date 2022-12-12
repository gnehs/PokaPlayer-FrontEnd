import APlayer from "aplayer";
export default class {
  constructor() {
    this.player = new APlayer({
      container: document.getElementById("player")
    });
    if ('mediaSession' in navigator) {
      setInterval(() => {
        if (this.trackInfo) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: this.trackInfo?.name || 'PokaPlayer',
            artist: this.trackInfo?.artist || 'PokaPlayer',
            album: this.trackInfo?.album || 'PokaPlayer',
            artwork: [
              { src: this.trackInfo?.cover },
            ]
          });
        } else {
          navigator.mediaSession.metadata = null
        }
        navigator.mediaSession.playbackState = this.paused ? 'paused' : `playing`

        if ('setPositionState' in navigator.mediaSession) {
          navigator.mediaSession.setPositionState({
            duration: this.player.audio.duration || 0,
            playbackRate: 1,
            position: this.player.audio.currentTime || 0
          })
        }
      }, 100);
      navigator.mediaSession.setActionHandler('play', () => {
        this.player.play()
        navigator.mediaSession.playbackState = 'playing'
      })
      navigator.mediaSession.setActionHandler('pause', () => {
        this.player.pause()
        navigator.mediaSession.playbackState = 'paused'
      })
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        this.previous()
      })
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        this.next()
      })
      try {
        navigator.mediaSession.setActionHandler('seekto', event => {
          this.player.seek(event.seekTime)
        })
      } catch (error) {
        console.warn('Warning! The "seekto" media session action is not supported.')
      }
    }
  }
  toggle() {
    this.player.toggle();
  }
  addSongs({ songs = [], index = 0, clear = true }) {
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

    if (clear) {
      this.player.list.clear();
    }
    this.player.list.add(playlist);
    this.player.list.switch(index);
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
  seek(s) {
    this.player.seek(s)
  }
  get audioOrder() {
    return this.player.options.order;
  }
  set audioOrder(mode) {
    this.player.options.order = mode;
  }
  get trackInfo() {
    return this.songList[this.currentIndex];
  }
  get paused() {
    return this.player.paused;
  }
  get currentTime() {
    return this.#secondToTime(this.player.audio?.currentTime || 0);
  }
  get rawCurrentTime() {
    return this.player.audio?.currentTime || 0
  }
  get duration() {
    return this.#secondToTime(this.player.audio?.duration || 0)
  }
  get rawDuration() {
    return this.player.audio?.duration || 0
  }
  get songList() {
    return this.player.list.audios;
  }
  get currentIndex() {
    return this.player.list.index;
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