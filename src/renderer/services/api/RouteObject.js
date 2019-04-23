import convertFirstCharacterTo from 'renderer/services/common/ConvertFirstCharacterTo'
import pagesComponentLoader from 'renderer/services/api/pagesCompenentLoader'
import store from 'renderer/store/index'
import ChildTypes from 'renderer/api/ChildTypes'
import RouteObjectActions from 'renderer/api/store/routeObjectActions'
import EntityActions from 'renderer/api/store/entityActions'
import AuthActions from 'renderer/api/store/authActions'
import AppActions from 'renderer/app/store/AppActions'
import ApiOperations from 'renderer/services/api/ApiOperations'
import {ApiRouteTypes, getApiRoute} from 'renderer/api/ApiRoutes'
import isEntityEditable from 'renderer/services/api/isEntityEditable'
import Entites from 'renderer/api/EntityTypes'
import router from 'renderer/router/index'
import globalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
function createRouteObjectName (entityType, childType) {
  return convertFirstCharacterTo.uppercase(childType.name) + convertFirstCharacterTo.uppercase(entityType.name)
}

function getRouteObjectMetaPropertyValue (routeObj, propertyName) {
  let meta = routeObj.meta
  if (!meta.hasOwnProperty(propertyName)) {
    console.log('RouteObj \'' + routeObj.name + '\' doesnt implement ' + propertyName)
    return ''
  }
  return meta[propertyName]
}

router.beforeEach(async (to, from, next) => {
  let toRequiresAuth = getRouteObjectMetaPropertyValue(to, 'requiresAuth')
  store.dispatch(AppActions.SET_IS_ROUTE_OBJECT_LOADING, true)
  if (!toRequiresAuth) {
    next()
  }
  try {
    let user = await ApiOperations.getCurrentUser()
    store.dispatch(AuthActions.SET_USER, user)
    let userRole = store.getters.getRoleByRoleId(user.role_id)
    let toEntity = getRouteObjectMetaPropertyValue(to, 'entityType')
    if (!validateRouteSecurity(userRole, to)) {
      store.dispatch(RouteObjectActions.SET_CURRENT_ROUTE_OBJECT_USER_AUTH, false)
    } else {
      store.dispatch(RouteObjectActions.SET_CURRENT_ROUTE_OBJECT_USER_AUTH, true)
    }
    store.dispatch(RouteObjectActions.SET_CURRENT_ROUTE_OBJECT, to)
    let idParam = to.params ? (to.params[globalEntityIdentifier] ? to.params[globalEntityIdentifier] : null) : null
    let requestedEntityObj = null
    if (idParam !== null) {
      requestedEntityObj = await ApiOperations.getById(getApiRoute(toEntity, ApiRouteTypes.GET_BY_ID), idParam)
    }
    store.dispatch(EntityActions.SET_REQUESTED_ENTITY, requestedEntityObj)
    let groupedRouteObjectsByEntity = securityValidations(userRole, store.getters.getRouteObjectsByEntityType(to))
    let groupedRouteObjectsBySidebar = securityValidations(userRole, store.getters.getRouteObjectsBySidebar())
    let authWidgetRouteObjects = setAuthWidgetRouteObjects(groupedRouteObjectsByEntity, requestedEntityObj)
    store.dispatch(RouteObjectActions.SET_AUTH_WIDGET_ROUTE_OBJECTS, authWidgetRouteObjects)
    store.dispatch(RouteObjectActions.SET_SIDEBAR_ROUTE_OBJECTS, groupedRouteObjectsBySidebar)
  } catch (e) {
    next({path: createRouteObjectPath(Entites.AUTH, ChildTypes.TOKEN)})
  }
  next()
})

router.afterEach((to, from, next) => {
  store.dispatch(AppActions.SET_IS_ROUTE_OBJECT_LOADING, false)
})

function createRouteObject (entityType, childType, roles, config) {
  let routeObject = {
    name: createRouteObjectName(entityType, childType),
    path: createRouteObjectPath(entityType, childType),
    component: pagesComponentLoader(convertFirstCharacterTo.lowercase(entityType.name) + '/children/' + convertFirstCharacterTo.uppercase(childType.name)),
    meta: {
      default: false,
      iconClass: '',
      title: entityType.title,
      requiresAuth: true,
      entityType: entityType,
      childType: childType
    }
  }
  routeObject.meta['default'] = config.hasOwnProperty('default') ? config['default'] : false
  routeObject.meta['title'] = config.hasOwnProperty('title') ? config['title'] : routeObject.meta.title
  routeObject.meta['iconClass'] = config.hasOwnProperty('iconClass') ? config['iconClass'] : ''
  routeObject.meta['requiresAuth'] = config.hasOwnProperty('requiresAuth') ? config['requiresAuth'] : true
  routeObject.meta['sidebar'] = config.hasOwnProperty('sidebar') ? config['sidebar'] : false
  routeObject.meta['sidebarTitle'] = config.hasOwnProperty('sidebarTitle') ? config['sidebarTitle'] : convertFirstCharacterTo.uppercase(entityType.title)
  routeObject.meta['sidebarIcon'] = config.hasOwnProperty('sidebarIcon') ? config['sidebarIcon'] : config.hasOwnProperty('entityTypeIcon')
  routeObject.meta['childTypeIcon'] = config.hasOwnProperty('childTypeIcon') ? config['childTypeIcon'] : (childType.icon ? childType.icon : '')
  routeObject.meta['entityTypeIcon'] = config.hasOwnProperty('entityTypeIcon') ? config['entityTypeIcon'] : (entityType.icon ? entityType.icon : '')
  if (config.hasOwnProperty('params')) {
    routeObject['props'] = true
    routeObject.meta['params'] = config['params']
    let props = config['params']
    let extraUrlPath = ''
    for (let i = 0; i < props.length; i++) {
      extraUrlPath += '/:' + props[i]
    }
    routeObject.path = routeObject.path + extraUrlPath
  }
  let securityObj = config.hasOwnProperty('security') ? config['security'] : {}
  for (let roleKey in roles) {
    if (roles.hasOwnProperty(roleKey)) {
      let roleObjName = roles[roleKey].name
      securityObj[roleObjName] = securityObj[roleObjName] !== false
    }
  }
  routeObject.meta['security'] = securityObj
  return routeObject
}

function setAuthWidgetRouteObjects (groupedRouteObjects, requestedEntityObj) {
  let authWidgetRouteObjects = []
  authWidgetRouteObjects = pushToAuthWidgetIfExists(authWidgetRouteObjects, ChildTypes.DASHBOARD.name, groupedRouteObjects)
  authWidgetRouteObjects = pushToAuthWidgetIfExists(authWidgetRouteObjects, ChildTypes.ANALYTICS.name, groupedRouteObjects)
  if (requestedEntityObj) {
    if (isEntityEditable(requestedEntityObj)) {
      authWidgetRouteObjects = pushToAuthWidgetIfExists(authWidgetRouteObjects, ChildTypes.DEL.name, groupedRouteObjects)
      authWidgetRouteObjects = pushToAuthWidgetIfExists(authWidgetRouteObjects, ChildTypes.EDIT.name, groupedRouteObjects)
    }
    authWidgetRouteObjects = pushToAuthWidgetIfExists(authWidgetRouteObjects, ChildTypes.VIEW.name, groupedRouteObjects)
  }
  authWidgetRouteObjects = pushToAuthWidgetIfExists(authWidgetRouteObjects, ChildTypes.LIST.name, groupedRouteObjects)
  authWidgetRouteObjects = pushToAuthWidgetIfExists(authWidgetRouteObjects, ChildTypes.CREATE.name, groupedRouteObjects)
  return authWidgetRouteObjects
}

function pushToAuthWidgetIfExists (authWidgetArray, childTypeName, groupedRouteObjects) {
  let foundChildRouteObject = groupedRouteObjects.find(
    groupedRouteObj => childTypeName === getRouteObjectMetaPropertyValue(groupedRouteObj, 'childType').name)
  if (foundChildRouteObject) {
    authWidgetArray.push(foundChildRouteObject)
  }
  return authWidgetArray
}

function securityValidations (userRole, routeObjects) {
  let routeObjectsLength = routeObjects.length
  let validatedRouteObjects = []
  for (let i = 0; i < routeObjectsLength; i++) {
    let validationResult = validateRouteSecurity(userRole, routeObjects[i])
    if (validationResult !== null) {
      validatedRouteObjects.push(validationResult)
    }
  }
  return validatedRouteObjects
}

function validateRouteSecurity (userRole, routeObj) {
  let security = getRouteObjectMetaPropertyValue(routeObj, 'security')
  if (security[userRole.name]) {
    return routeObj
  }
  return null
}

function createRouteObjectPath (entityType, childType) {
  return '/' + convertFirstCharacterTo.lowercase(entityType.name) + '/' + convertFirstCharacterTo.lowercase(childType.name)
}

export {createRouteObjectName, createRouteObject, createRouteObjectPath, getRouteObjectMetaPropertyValue}
