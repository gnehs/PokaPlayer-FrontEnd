import APlayer from 'APlayer';
import $ from 'jquery'
window.$ = $
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
window._lrc = new(require('@/assets/lyrics.min.js'))(`[00:00.000]`);
window._setting = (setting, value) => {
    let pokaSetting = JSON.parse(localStorage.pokaSetting || `{}`)
    let defaultPokaSetting = {
        "audioQuality": "High",
        "headerBgSource": "https://i.imgur.com/EcmOwlT.jpg",
        "darkMode": false,
        "server": location.origin + "/",
        "password": "",
        "rememberPass": true,
        "lang": "en_US",
    }
    if (value != undefined) { //設定值
        pokaSetting[setting] = value
        localStorage.pokaSetting = JSON.stringify(pokaSetting)
        return pokaSetting[setting]
    } else { //取值
        if (pokaSetting[setting] != undefined) { //已有值
            return pokaSetting[setting]
        } else { //未有，先存下再回傳
            pokaSetting[setting] = defaultPokaSetting[setting] || ""
            localStorage.pokaSetting = JSON.stringify(pokaSetting)
            return pokaSetting[setting]
        }
    }
}