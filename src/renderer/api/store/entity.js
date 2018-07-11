import { ApiRoutes, getApiRoute, ApiRouteTypes } from 'renderer/api/ApiRoutes'
import EntityTypes from 'renderer/api/EntityTypes'
import RolesTypes from 'renderer/api/RoleTypes'
import EntityActions from './entityActions'
import ApiFunctions from 'renderer/services/api/ApiOperations'

let roles = []
Object.keys(RolesTypes).forEach(key => {
  let roleStoreObj = {id: RolesTypes[key].id, name: RolesTypes[key].name, value: RolesTypes[key].title}
  roles.push(roleStoreObj)
})

const state = {
  // General
  requestedEntity: null,
  // Dependencies
  bagTypes: [],
  bagPackings: [],
  bags: [],
  bagOrderAdjustmentTypes: [],
  expenseTypes: [],
  suppliers: [],
  clients: [],
  users: [],
  roles: roles
}

const mutations = {
  SET_REQUESTED_ENTITY (state, data) {
    state.requestedEntity = data
  },
  SET_BAGS (state, data) {
    state.bags = data
  },
  SET_BAG_TYPES (state, data) {
    state.bagTypes = data
  },
  SET_BAG_PACKINGS (state, data) {
    state.bagPackings = data
  },
  SET_EXPENSE_TYPES (state, data) {
    state.expenseTypes = data
  },
  SET_BAG_ORDER_ADJUSTMENT_TYPES (state, data) {
    state.bagOrderAdjustmentTypes = data
  },
  SET_SUPPLIERS (state, data) {
    state.suppliers = data
  },
  SET_CLIENTS (state, data) {
    state.clients = data
  },
  SET_USERS (state, data) {
    state.users = data
  }
}

const actions = {
  [EntityActions.SET_REQUESTED_ENTITY]: function ({commit}, entityObj) {
    commit('SET_REQUESTED_ENTITY', entityObj)
  },
  [EntityActions.UNSET_REQUESTED_ENTITY]: function ({commit}) {
    commit('SET_REQUESTED_ENTITY', null)
  },
  [EntityActions.GET_BAG_TYPES]: function ({commit}) {
    ApiFunctions.get(getApiRoute(EntityTypes.BAG_TYPE, ApiRouteTypes.LIST) + '?per_page=1000').then(data => {
      commit('SET_BAG_TYPES', data)
    }).catch(e => {
      console.log(e)
    })
  },
  [EntityActions.GET_BAG_PACKINGS]: function ({commit}) {
    ApiFunctions.get(getApiRoute(EntityTypes.BAG_PACKING, ApiRouteTypes.LIST) + '?per_page=1000').then(data => {
      commit('SET_BAG_PACKINGS', data)
    }).catch(e => {
      console.log(e)
    })
  },
  [EntityActions.GET_BAGS]: function ({commit}) {
    ApiFunctions.get(getApiRoute(EntityTypes.BAG, ApiRouteTypes.LIST) + '?per_page=1000').then(data => {
      commit('SET_BAGS', data)
    }).catch(e => {
      console.log(e)
    })
  },
  [EntityActions.GET_EXPENSE_TYPES]: function ({commit}) {
    ApiFunctions.get(getApiRoute(EntityTypes.EXPENSE_TYPE, ApiRouteTypes.LIST) + '?per_page=1000').then(data => {
      commit('SET_EXPENSE_TYPES', data)
    }).catch(e => {
      console.log(e)
    })
  },
  [EntityActions.GET_ORDER_ADJUSTMENT_TYPES]: function ({commit}) {
    ApiFunctions.get(getApiRoute(EntityTypes.BAG_ORDER_ADJUSTMENT_TYPE, ApiRouteTypes.LIST) + '?per_page=1000').then(data => {
      commit('SET_BAG_ORDER_ADJUSTMENT_TYPES', data)
    }).catch(e => {
      console.log(e)
    })
  },
  [EntityActions.GET_SUPPLIERS]: function ({commit}) {
    ApiFunctions.get(getApiRoute(EntityTypes.SUPPLIER, ApiRouteTypes.LIST) + '?per_page=1000').then(data => {
      commit('SET_SUPPLIERS', data)
    }).catch(e => {
      console.log(e)
    })
  },
  [EntityActions.GET_CLIENTS]: function ({commit}) {
    ApiFunctions.get(getApiRoute(EntityTypes.CLIENT, ApiRouteTypes.LIST) + '?per_page=1000').then(data => {
      commit('SET_CLIENTS', data)
    }).catch(e => {
      console.log(e)
    })
  },
  [EntityActions.GET_USERS]: function ({commit}) {
    ApiFunctions.get(ApiRoutes.user.list + '?per_page=1000').then(data => {
      commit('SET_USERS', data)
    }).catch(e => {
      console.log(e)
    })
  }
}


export default {
  state, mutations, actions
}
