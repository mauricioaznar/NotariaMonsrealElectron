import globalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
import {getRouteObjectMetaPropertyValue} from 'renderer/services/api/RouteObject'
const user = state => {
  let user = state.auth.user
  return user !== null ? user : ''
}
const isAdminUser = state => {
  let user = state.auth.user
  let roleId = user ? user.role_id : 0
  return roleId === 1
}
const routeObjects = state => state.routeObject.routeObjects
const authWidgetRouteObjects = state => state.routeObject.authWidgetRouteObjects
const getRouteObjectsByEntityType = state => (searchedRouteObj) => {
  if (searchedRouteObj.name === null) {
    return []
  }
  let searchedRouteObjEntityType = getRouteObjectMetaPropertyValue(searchedRouteObj, 'entityType')
  return state.routeObject.routeObjects.filter(iRouteObj => {
    let iRouteObjEntityType = getRouteObjectMetaPropertyValue(iRouteObj, 'entityType')
    return searchedRouteObjEntityType.name === iRouteObjEntityType.name
  })
}
const getRouteObjectsBySidebar = state => () => {
  return state.routeObject.routeObjects.filter(routeObj => {
    return getRouteObjectMetaPropertyValue(routeObj, 'sidebar')
  })
}
const getRoleByRoleId = state => (roleId) => {
  return state.entity.roles.find(roleObj => { return roleObj[globalEntityIdentifier] === roleId })
}
const requestedEntity = state => {
  return state.entity.requestedEntity
}
const currentRouteObjectUserAuth = state => {
  return state.routeObject.currentRouteObjectUserAuth
}


export {
  user,
  isAdminUser,
  currentRouteObjectUserAuth,
  getRoleByRoleId,
  authWidgetRouteObjects,
  getRouteObjectsBySidebar,
  getRouteObjectsByEntityType,
  routeObjects,
  requestedEntity
}
