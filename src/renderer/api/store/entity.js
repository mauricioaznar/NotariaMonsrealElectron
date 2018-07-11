import { ApiRoutes } from 'renderer/api/ApiRoutes'
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
  documentTypes: [],
  documentStatuses: [],
  attachments: [],
  operations: [],
  lawyers: [],
  clients: [],
  grantors: [],
  groups: [],
  users: [],
  rooms: [],
  roles: roles
}

const mutations = {
  SET_REQUESTED_ENTITY (state, data) {
    state.requestedEntity = data
  },
  SET_DOCUMENT_TYPES (state, data) {
    state.documentTypes = data
  },
  SET_DOCUMENT_STATUSES (state, data) {
    state.documentStatuses = data
  },
  SET_ATTACHMENTS (state, data) {
    state.attachments = data
  },
  SET_OPERATIONS (state, data) {
    state.operations = data
  },
  SET_LAWYERS (state, data) {
    state.lawyers = data
  },
  SET_CLIENTS (state, data) {
    state.clients = data
  },
  SET_GRANTORS (state, data) {
    state.grantors = data
  },
  SET_GROUPS (state, data) {
    state.groups = data
  },
  SET_USERS (state, data) {
    state.users = data
  },
  SET_ROOMS (state, data) {
    state.rooms = data
  }
}

const actions = {
  [EntityActions.SET_REQUESTED_ENTITY]: function ({commit}, entityObj) {
    commit('SET_REQUESTED_ENTITY', entityObj)
  },
  [EntityActions.UNSET_REQUESTED_ENTITY]: function ({commit}) {
    commit('SET_REQUESTED_ENTITY', null)
  },
  [EntityActions.GET_DOCUMENT_TYPES]: function ({commit}) {
    ApiFunctions.get(ApiRoutes.documentType.list + '?per_page=1000').then(data => {
      commit('SET_DOCUMENT_TYPES', data)
    }).catch(e => {
      console.log(e)
    })
  },
  [EntityActions.GET_DOCUMENT_STATUSES]: function ({commit}) {
    ApiFunctions.get(ApiRoutes.documentStatus.list + '?per_page=1000').then(data => {
      commit('SET_DOCUMENT_STATUSES', data)
    }).catch(e => {
      console.log(e)
    })
  },
  [EntityActions.GET_OPERATIONS]: function ({commit}, documentTypeName) {
    let extraQuery = ''
    if (documentTypeName) {
      extraQuery = '&filter_entity=documentTypes&filter=name&filter_value=' + documentTypeName
    }
    ApiFunctions.get(ApiRoutes.operation.list + '?per_page=1000' + extraQuery).then(data => {
      commit('SET_OPERATIONS', data)
    }).catch(e => {
      console.log(e)
    })
  },
  [EntityActions.GET_LAWYERS]: function ({commit}) {
    ApiFunctions.get(ApiRoutes.lawyer.list + '?per_page=1000').then(data => {
      commit('SET_LAWYERS', data)
    }).catch(e => {
      console.log(e)
    })
  },
  [EntityActions.GET_ATTACHMENTS]: function ({commit}, documentTypeName) {
    let extraQuery = ''
    if (documentTypeName) {
      extraQuery = '&filter_entity=documentTypes&filter=name&filter_value=' + documentTypeName
    }
    ApiFunctions.get(ApiRoutes.attachment.list + '?per_page=1000' + extraQuery).then(data => {
      commit('SET_ATTACHMENTS', data)
    }).catch(e => {
      console.log(e)
    })
  },
  [EntityActions.GET_CLIENTS]: function ({commit}) {
    ApiFunctions.get(ApiRoutes.client.list + '?per_page=1000').then(data => {
      commit('SET_CLIENTS', data)
    }).catch(e => {
      console.log(e)
    })
  },
  [EntityActions.GET_GRANTORS]: function ({commit}, clientId) {
    let extraQuery = ''
    if (clientId) {
      extraQuery = '&filter_entity=clients&filter=client_id&filter_value=' + clientId // TODO use client_id instead of id
    }
    ApiFunctions.get(ApiRoutes.grantor.list + '?per_page=1000' + extraQuery).then(data => {
      commit('SET_GRANTORS', data)
    }).catch(e => {
      console.log(e)
    })
  },
  [EntityActions.GET_GROUPS]: function ({commit}) {
    ApiFunctions.get(ApiRoutes.group.list + '?per_page=1000').then(data => {
      commit('SET_GROUPS', data)
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
  },
  [EntityActions.GET_ROOMS]: function ({commit}) {
    ApiFunctions.get(ApiRoutes.room.list + '?per_page=1000').then(data => {
      commit('SET_ROOMS', data)
    }).catch(e => {
      console.log(e)
    })
  }
}


export default {
  state, mutations, actions
}
