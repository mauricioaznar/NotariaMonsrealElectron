// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import MauPlugin from 'renderer/components/mau-components/mau-components-plugin'
import VueResource from 'vue-resource'
import moment from 'moment'
import Notifications from 'vue-notification'
import VeeValidate, { Validator } from 'vee-validate'
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
Vue.use(VeeValidate, {
  fieldsBagName: 'formFields',
  locale: 'es'
})

sync(store, router)

let mediaHandler = () => {
  if (window.matchMedia(store.getters.config.windowMatchSizeLg).matches) {
  }
}

router.afterEach((to, from) => {
  mediaHandler()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
