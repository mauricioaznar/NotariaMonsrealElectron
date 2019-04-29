import RolesTypes from 'renderer/api/RoleTypes'
import EntityActions from './entityActions'

let roles = []
Object.keys(RolesTypes).forEach(key => {
  let roleStoreObj = {id: RolesTypes[key].id, name: RolesTypes[key].name, value: RolesTypes[key].title}
  roles.push(roleStoreObj)
})

const state = {
  // General
  requestedEntity: null,
  // Dependencies
  roles: roles
}

const mutations = {
  SET_REQUESTED_ENTITY (state, data) {
    state.requestedEntity = data
  }
}

const actions = {
  [EntityActions.SET_REQUESTED_ENTITY]: function ({commit}, entityObj) {
    commit('SET_REQUESTED_ENTITY', entityObj)
  },
  [EntityActions.UNSET_REQUESTED_ENTITY]: function ({commit}) {
    commit('SET_REQUESTED_ENTITY', null)
  }
}


export default {
  state, mutations, actions
}
