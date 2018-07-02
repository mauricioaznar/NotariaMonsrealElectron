import GlobalEntityIdentifier from 'src/services/api/GlobalEntityIdentifier'
import isEntityEditable from 'src/services/api/isEntityEditable'
import RouteObjectHelper from 'src/services/routeObject/RouteObjectHelper'
const user = state => {
  let user = state.auth.user
  return user !== null ? user : ''
}
const routeObjects = state => state.routeObject.routeObjects
const authWidgetRouteObjects = state => state.routeObject.authWidgetRouteObjects
const getRouteObjectsByEntityType = state => (searchedRouteObj) => {
  if (searchedRouteObj.name === null) {
    return []
  }
  let searchedRouteObjEntityType = RouteObjectHelper.getRouteObjectMetaPropertyValue(searchedRouteObj, 'entityType')
  return state.routeObject.routeObjects.filter(iRouteObj => {
    let iRouteObjEntityType = RouteObjectHelper.getRouteObjectMetaPropertyValue(iRouteObj, 'entityType')
    return searchedRouteObjEntityType.name === iRouteObjEntityType.name
  })
}
const getDefaultRouteObjectByCategory = state => (category) => {
  let filteredRouteObjectsByCategory = state.routeObject.routeObjects.filter(routeObj => {
    return RouteObjectHelper.getRouteObjectMetaPropertyValue(routeObj, 'category').name === category.name
  })
  return filteredRouteObjectsByCategory.find(routeObj => {
    return RouteObjectHelper.getRouteObjectMetaPropertyValue(routeObj, 'categoryDefault')
  })
}
const getRoles = state => {
  return state.entity.roles
}
const getUsers = state => {
  return state.entity.users
}
const getRoleByRoleId = state => (roleId) => {
  return state.entity.roles.find(roleObj => { return roleObj[GlobalEntityIdentifier] === roleId })
}
const requestedEntity = state => {
  return state.entity.requestedEntity
}
const currentRouteObjectUserAuth = state => {
  return state.routeObject.currentRouteObjectUserAuth
}
const isRequestedEntityEditable = state => {
  return isEntityEditable(state.entity.requestedEntity)
}

const getBagById = state => (productId) => {
  return state.entity.bags.find(productObj => { return productObj[GlobalEntityIdentifier] === productId })
}
export {
  user,
  getUsers,
  currentRouteObjectUserAuth,
  getRoles,
  isRequestedEntityEditable,
  getRoleByRoleId,
  authWidgetRouteObjects,
  getDefaultRouteObjectByCategory,
  getRouteObjectsByEntityType,
  getBagById,
  routeObjects,
  requestedEntity
}
