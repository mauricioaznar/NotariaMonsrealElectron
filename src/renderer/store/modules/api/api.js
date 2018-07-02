// import Vue from 'vue'
// import {getHeaders} from 'src/config'
import auth from 'src/api/store/auth'
import entity from 'src/api/store/entity'
import routeObject from 'src/api/store/routeObject'
import * as getters from 'src/api/store/apiGetters'



export default {
  modules: {
    auth,
    entity,
    routeObject
  },
  state: {},
  mutations: {},
  getters
}
