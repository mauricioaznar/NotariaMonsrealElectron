import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import MauPlugin from 'src/components/mau-components/mau-components-plugin'
import VueResource from 'vue-resource'
import moment from 'moment'
import Notifications from 'vue-notification'
import VeeValidate, { Validator } from 'vee-validate'
import VeeValidateDictionary from 'src/services/form/VeeValidateDictionary'
import VeeValidateCustomRules from 'src/services/form/VeeValidateCustomRules'
import esLocale from 'vee-validate/dist/locale/es'
Vue.use(Notifications)
moment.locale('es', {
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY-MM-DD',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd D MMMM YYYY HH:mm'
  }
})
Vue.use(MauPlugin)
Vue.use(BootstrapVue)
Vue.use(VueResource)
Validator.localize(esLocale)
Validator.extend('object_required', VeeValidateCustomRules.objectRequired)
Validator.extend('array_required', VeeValidateCustomRules.arrayRequired)
Vue.use(VeeValidate, {
  fieldsBagName: 'formFields',
  locale: 'es',
  dictionary: VeeValidateDictionary
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
