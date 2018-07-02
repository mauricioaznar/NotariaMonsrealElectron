import Vue from 'vue'
import Router from 'vue-router'
import store from 'src/store/index'
import ChildTypes from 'src/api/ChildTypes'
import RouteObjectActions from 'src/api/store/routeObjectActions'
import EntityActions from 'src/api/store/entityActions'
import AuthActions from 'src/api/store/authActions'
import AppActions from 'src/app/store/AppActions'
import ApiOperations from 'src/services/api/ApiOperations'
import {ApiRouteTypes, getApiRoute} from 'src/api/ApiRoutes'
import EntityTypes from 'src/api/EntityTypes'
import GlobalEntityIdentifier from 'src/services/api/GlobalEntityIdentifier'
import RouteObjectHelper from 'src/services/routeObject/RouteObjectHelper'
import routeObjectStore from 'src/api/store/routeObject'

Vue.use(Router)
let router = new Router({
  routes: [
    ...generateRoutesFromMenu(routeObjectStore.state.routeObjects),
    {path: '*', redirect: { name: getDefaultRoute(routeObjectStore.state.routeObjects).name }}
  ],
  mode: 'history'
})

export default router

function generateRoutesFromMenu (menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i]
    // console.log(item.name)
    if (item.path) {
      routes.push(item)
    }
    if (item.children) {
      generateRoutesFromMenu(item.children, routes)
    }
  }
  return routes
}

function getDefaultRoute (menu = []) {
  let defaultRoute

  menu.forEach((item) => {
    if (item.meta.default) {
      defaultRoute = item
    } else if (item.children) {
      let defaultChild = item.children.find((i) => i.meta.default)
      defaultRoute = defaultChild || defaultRoute
    }
  })

  return defaultRoute
}

router.beforeEach(async (to, from, next) => {
  let toRequiresAuth = RouteObjectHelper.getRouteObjectMetaPropertyValue(to, 'requiresAuth')
  store.dispatch(AppActions.SET_IS_ROUTE_OBJECT_LOADING, true)
  if (!toRequiresAuth) {
    next()
  }
  try {
    let user = await ApiOperations.get(getApiRoute(EntityTypes.AUTH, ApiRouteTypes.USER))
    store.dispatch(AuthActions.SET_USER, user)
    let userRole = store.getters.getRoleByRoleId(user.role_id)
    let toEntity = RouteObjectHelper.getRouteObjectMetaPropertyValue(to, 'entityType')
    if (!RouteObjectHelper.validateRouteSecurity(userRole, to)) {
      store.dispatch(RouteObjectActions.SET_CURRENT_ROUTE_OBJECT_USER_AUTH, false)
    } else {
      store.dispatch(RouteObjectActions.SET_CURRENT_ROUTE_OBJECT_USER_AUTH, true)
    }
    store.dispatch(RouteObjectActions.SET_CURRENT_ROUTE_OBJECT, to)
    let idParam = to.params ? (to.params[GlobalEntityIdentifier] ? to.params[GlobalEntityIdentifier] : null) : null
    let requestedEntityObj = null
    if (idParam !== null) {
      requestedEntityObj = await ApiOperations.getById(getApiRoute(toEntity, ApiRouteTypes.GET_BY_ID), idParam)
    }
    store.dispatch(EntityActions.SET_REQUESTED_ENTITY, requestedEntityObj)
    let groupedRouteObjectsByEntity = RouteObjectHelper.validateRoutesSecurity(userRole, store.getters.getRouteObjectsByEntityType(to))
    let authWidgetRouteObjects = setAuthWidgetRouteObjects(groupedRouteObjectsByEntity, requestedEntityObj)
    store.dispatch(RouteObjectActions.SET_AUTH_WIDGET_ROUTE_OBJECTS, authWidgetRouteObjects)
  } catch (e) {
    next({path: RouteObjectHelper.createPath(EntityTypes.AUTH, ChildTypes.TOKEN)})
  }
  next()
})

router.afterEach((to, from, next) => {
  store.dispatch(AppActions.SET_IS_ROUTE_OBJECT_LOADING, false)
})

function setAuthWidgetRouteObjects (groupedRouteObjects, requestedEntityObj) {
  let authWidgetRouteObjects = []
  if (requestedEntityObj) {
    if (requestedEntityObj.editable) {
      authWidgetRouteObjects = pushToAuthWidgetIfExists(authWidgetRouteObjects, ChildTypes.DEL.name, groupedRouteObjects)
      authWidgetRouteObjects = pushToAuthWidgetIfExists(authWidgetRouteObjects, ChildTypes.EDIT.name, groupedRouteObjects)
    }
    authWidgetRouteObjects = pushToAuthWidgetIfExists(authWidgetRouteObjects, ChildTypes.VIEW.name, groupedRouteObjects)
  }
  authWidgetRouteObjects = pushToAuthWidgetIfExists(authWidgetRouteObjects, ChildTypes.CREATE.name, groupedRouteObjects)
  return authWidgetRouteObjects
}

function pushToAuthWidgetIfExists (authWidgetArray, childTypeName, groupedRouteObjects) {
  let foundChildRouteObject = groupedRouteObjects.find(
    groupedRouteObj => childTypeName === RouteObjectHelper.getRouteObjectMetaPropertyValue(groupedRouteObj, 'childType').name)
  if (foundChildRouteObject) {
    authWidgetArray.push(foundChildRouteObject)
  }
  return authWidgetArray
}
