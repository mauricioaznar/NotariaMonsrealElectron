import apiDomain from 'renderer/services/api/ApiDomain'
import EntityTypes from 'renderer/api/EntityTypes'
import combineProperties from 'renderer/services/common/combineProperties'

export const ApiRouteTypes = {
  LIST: 'list',
  GET_BY_ID: 'getById',
  EDIT: 'edit',
  CREATE: 'create',
  EXCEL: 'excel',
  DEL: 'del',
  USER: 'user',
  TOKEN: 'token',
  RESET: 'reset',
  HISTORY: 'history',
  SEARCH: 'search',
  ANALYTICS: 'analytics',
  NOTIFICATIONS: 'notifications'
}

export function getApiRoute (entityType, apiRouteType) {
  if (!ApiRoutes.hasOwnProperty(entityType.name)) {
    console.log('Error! no entityType with name: ' + entityType.name)
    if (!ApiRoutes[entityType.name].hasOwnProperty(apiRouteType)) {
      console.log('Error! Entity with name ' + entityType.name + ' has no apiRouteType \'' + apiRouteType + '\'')
    }
  }
  return ApiRoutes[entityType.name][apiRouteType]
}

function createDefaultRoutes (entityType) {
  return {
    [ApiRouteTypes.LIST]: apiDomain + entityType.name + '/list',
    [ApiRouteTypes.GET_BY_ID]: apiDomain + entityType.name + '/',
    [ApiRouteTypes.EDIT]: apiDomain + entityType.name + '/',
    [ApiRouteTypes.CREATE]: apiDomain + entityType.name + '/',
    [ApiRouteTypes.DEL]: apiDomain + entityType.name + '/'
  }
}

function createDocumentRoutes (entityType) {
  return {
    [ApiRouteTypes.HISTORY]: apiDomain + entityType.name + '/search?recent=me',
    [ApiRouteTypes.SEARCH]: apiDomain + entityType.name + '/search',
    [ApiRouteTypes.ANALYTICS]: apiDomain + 'data/me'
  }
}

export const ApiRoutes = {
  [EntityTypes.DOCUMENT.name]: combineProperties(
    [createDefaultRoutes(EntityTypes.DOCUMENT), createDocumentRoutes(EntityTypes.DOCUMENT)]),
  [EntityTypes.CLIENT.name]: createDefaultRoutes(EntityTypes.CLIENT),
  [EntityTypes.ATTACHMENT.name]: createDefaultRoutes(EntityTypes.ATTACHMENT),
  [EntityTypes.USER.name]: createDefaultRoutes(EntityTypes.USER),
  [EntityTypes.DOCUMENT_TYPE.name]: createDefaultRoutes(EntityTypes.DOCUMENT_TYPE),
  [EntityTypes.DOCUMENT_STATUS.name]: createDefaultRoutes(EntityTypes.DOCUMENT_STATUS),
  [EntityTypes.GRANTOR.name]: createDefaultRoutes(EntityTypes.GRANTOR),
  [EntityTypes.GROUP.name]: createDefaultRoutes(EntityTypes.GROUP),
  [EntityTypes.OPERATION.name]: createDefaultRoutes(EntityTypes.OPERATION),
  [EntityTypes.DOCUMENT_OPERATION.name]: createDefaultRoutes(EntityTypes.DOCUMENT_OPERATION),
  [EntityTypes.DOCUMENT_ATTACHMENT.name]: createDefaultRoutes(EntityTypes.DOCUMENT_ATTACHMENT),
  [EntityTypes.LAWYER.name]: createDefaultRoutes(EntityTypes.LAWYER),
  [EntityTypes.CLIENT_GRANTOR.name]: createDefaultRoutes(EntityTypes.CLIENT_GRANTOR),
  [EntityTypes.USER_GROUP.name]: createDefaultRoutes(EntityTypes.USER_GROUP),
  [EntityTypes.DOCUMENT_GROUP.name]: createDefaultRoutes(EntityTypes.DOCUMENT_GROUP),
  [EntityTypes.DOCUMENT_USER.name]: createDefaultRoutes(EntityTypes.DOCUMENT_USER),
  [EntityTypes.DOCUMENT_GRANTOR.name]: createDefaultRoutes(EntityTypes.DOCUMENT_GRANTOR),
  [EntityTypes.DOCUMENT_COMMENT.name]: createDefaultRoutes(EntityTypes.DOCUMENT_COMMENT),
  [EntityTypes.APPOINTMENT.name]: createDefaultRoutes(EntityTypes.APPOINTMENT),
  [EntityTypes.APPOINTMENT_USER.name]: createDefaultRoutes(EntityTypes.APPOINTMENT_USER),
  [EntityTypes.APPOINTMENT_CLIENT.name]: createDefaultRoutes(EntityTypes.APPOINTMENT_CLIENT),
  [EntityTypes.EXCEL.name]: {
    [ApiRouteTypes.EXCEL]: apiDomain + 'export/excel?'
  },
  [EntityTypes.ROOM.name]: createDefaultRoutes(EntityTypes.ROOM),
  [EntityTypes.AUTH.name]: {
    [ApiRouteTypes.USER]: apiDomain + EntityTypes.AUTH.name + '/user',
    [ApiRouteTypes.TOKEN]: apiDomain + EntityTypes.AUTH.name + '/login',
    [ApiRouteTypes.RESET]: apiDomain + 'user/reset/password'
  },
  [EntityTypes.NOTIFICATION.name]: {
    [ApiRouteTypes.NOTIFICATIONS]: apiDomain + 'notifications'
  }
}


