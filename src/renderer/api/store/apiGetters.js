import globalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
import UserPropertiesReference from 'renderer/api/pages/user/PropertiesReference'
import isEntityEditable from 'renderer/services/api/isEntityEditable'
import {getRouteObjectMetaPropertyValue} from 'renderer/services/api/RouteObject'
const user = state => {
  let user = state.auth.user
  return user !== null ? user : ''
}
const getUsersInGroups = apiState => (groups) => {
  let filteredUsers = []
  let users = apiState.entity.users
  let usersLength = users.length
  for (let usersIndex = 0; usersIndex < usersLength; usersIndex++) {
    let user = users[usersIndex]
    let userGroups = user[UserPropertiesReference.GROUPS.name]
    let userGroupsLength = userGroups.length
    for (let userGroupsIndex = 0; userGroupsIndex < userGroupsLength; userGroupsIndex++) {
      let userGroup = userGroups[userGroupsIndex]
      let foundGroup = groups.find(group => {
        return group[globalEntityIdentifier] === userGroup[globalEntityIdentifier]
      })
      if (foundGroup) {
        filteredUsers.push(user)
        break
      }
    }
  }
  return filteredUsers
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
const getRoles = state => {
  return state.entity.roles
}
const getUsers = state => {
  return state.entity.users
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
const isRequestedEntityEditable = state => {
  return isEntityEditable(state.entity.requestedEntity)
}

export {
  user,
  getUsers,
  currentRouteObjectUserAuth,
  getUsersInGroups,
  getRoles,
  isRequestedEntityEditable,
  getRoleByRoleId,
  authWidgetRouteObjects,
  getRouteObjectsBySidebar,
  getRouteObjectsByEntityType,
  routeObjects,
  requestedEntity
}
