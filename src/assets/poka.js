import APlayer from 'APlayer';
window._player = new APlayer({
    container: document.getElementById('player')
});
window._setting = (setting, value) => {
    let pokaSetting = JSON.parse(localStorage.pokaSetting || `{}`)
    let defaultPokaSetting = {
        "audioQuality": "High",
        "randomImgSource": "https://area.sinaapp.com/bingImg/",
        "randomImgName": "預設圖庫",
        "imageDataSaving": false,
        "showCardSource": true,
        "version": "0.0.0",
        "filterEnabled": true,
        "darkMode": false,
        "themeColor": "#009688",
        "themeTextColor": "#FFF",
        "server": location.origin + "/",
        "password": "",
        "rememberPass": true,
        "lang": "en-US",
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