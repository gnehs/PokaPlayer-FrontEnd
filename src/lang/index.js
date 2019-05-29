import Vue from 'vue'
import VueI18n from 'vue-i18n'

import zh_CN from './zh-CN/index.json'
import zh_TW from './zh-TW/index.json'
import en_US from './en-US/index.json'

Vue.use(VueI18n)
const locale = window._setting('lang')
const messages = {
    zh_CN: zh_CN,
    zh_TW: zh_TW,
    en_US: en_US
}

const i18n = new VueI18n({
    /** 默認值 */
    locale,
    fallbackLocale: 'en_US',
    messages,
    missing: (locale, key, vm) => {
        console.log(locale, key, vm)
        return key
    },
})
window.i18n = i18n
// Hot updates
if (module.hot) {
    module.hot.accept(['./zh-CN/index.json', './zh-TW/index.json', './en-US/index.json'], function () {
        i18n.setLocaleMessage('zh_CN', require('./zh-CN/index.json'))
        i18n.setLocaleMessage('en_US', require('./en-US/index.json'))
        i18n.setLocaleMessage('zh_TW', require('./zh-TW/index.json'))
    })
}
export default i18n