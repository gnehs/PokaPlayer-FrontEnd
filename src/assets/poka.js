import APlayer from 'aplayer';
import axios from 'axios';
window._randomPlay = function () {
    let randomStr = Math.random()
        .toString(36)
        .substring(7);
    axios(`/pokaapi/randomSongs?${randomStr}`)
        .then(res => res.data.songs)
        .then(songs => {
            _addSongs({
                songs: songs
            });
        })
        .catch(e => alert(`PokaPlayer Error\n${e}`));
};
window._addSongs = function ({
    songs,
    index,
    clear = true
}) {
    const server = window._setting(`server`);
    const defaultCover = window._setting(`headerBgSource`);
    let playlist = [];
    for (let song of songs) {
        playlist.push({
            url: server +
                song.url +
                "&songRes=" +
                _setting(`audioQuality`).toLowerCase(),
            cover: song.cover && song.cover.startsWith("http") ?
                song.cover :
                song.cover ?
                server + song.cover :
                defaultCover,
            name: song.name,
            artist: song.artist,
            artistId: song.artistId,
            album: song.album,
            albumId: song.albumId,
            id: song.id,
            source: song.source,
            uuid: _uuid()
        });
    }
    if (clear) _player.list.clear();
    _player.list.add(playlist);
    if (index && _player.options.order === "random") {
        _player.options.order = "list";
        _player.list.switch(index);
        _player.options.order = "random";
    } else if (index) {
        _player.list.switch(index);
    }
    _player.play();
};
window._player = new APlayer({
    container: document.getElementById('player')
});
window._uuid = () => {
    var d = Date.now();
    if (
        typeof performance !== "undefined" &&
        typeof performance.now === "function"
    ) {
        d += performance.now(); //use high-precision timer if available
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
        c
    ) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
}
window._lyricReader = require('@/assets/lyrics.min.js')
window._lrc = new(require('@/assets/lyrics.min.js'))(`[00:00.000]`);
window._setting = (setting, value) => {
    let pokaSetting = JSON.parse(localStorage.pokaSetting || `{}`)
    let defaultPokaSetting = {
        "audioQuality": "High",
        "headerBgSource": "https://i.imgur.com/IdbJiao.jpg",
        "darkMode": false,
        "server": location.origin,
        "password": ""
    }
    // default language
    let userLang = navigator.language || navigator.userLanguage
    switch (userLang) {
        case "zh-TW":
            defaultPokaSetting.lang = "zh_TW"
            break;
        case "zh-CN":
            defaultPokaSetting.lang = "zh_CN"
            break;
        default:
            defaultPokaSetting.lang = "en_US"
            break;
    }

    if (value) { //設定值
        pokaSetting[setting] = value
        localStorage.pokaSetting = JSON.stringify(pokaSetting)
        return pokaSetting[setting]
    } else { //取值
        if (pokaSetting[setting]) { //已有值
            return pokaSetting[setting]
        } else if (defaultPokaSetting[setting]) { //未有，先存下再回傳
            pokaSetting[setting] = defaultPokaSetting[setting] || ""
            localStorage.pokaSetting = JSON.stringify(pokaSetting)
            return pokaSetting[setting]
        } else {
            return ""
        }
    }
}
window._socket = io(window._setting(`server`), {
    transports: ['websocket']
});
// scroll 

window.scrollTo = (element, to, duration) => {
    let start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

    let animateScroll = function () {
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
};