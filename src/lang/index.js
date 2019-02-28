import Vue from 'vue'
import VueI18n from 'vue-i18n'

import zh_CN from './zh-CN/index.json'
import zh_TW from './zh-TW/index.json'
import en_US from './en-US/index.json'

Vue.use(VueI18n)
const locale = 'zh_TW'
const messages = {
    zh_CN: zh_CN,
    zh_TW: zh_TW,
    en_US: en_US
}

const i18n = new VueI18n({
    /** 默認值 */
    locale,
    fallbackLocale: 'en_US',
    messages
})


export default i18n