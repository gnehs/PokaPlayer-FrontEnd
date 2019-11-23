import Vue from 'vue'
import VueI18n from 'vue-i18n'

const zh_CN = require('./zh-CN.js').default
const zh_TW = require('./zh-TW.js').default
const en_US = require('./en-US.js').default

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
    module.hot.accept(['./zh-CN.js', './zh-TW.js', './en-US.js'], function () {
        i18n.setLocaleMessage('zh_CN', require('./zh-CN.js'))
        i18n.setLocaleMessage('en_US', require('./en-US.js'))
        i18n.setLocaleMessage('zh_TW', require('./zh-TW.js'))
    })
}
export default i18n