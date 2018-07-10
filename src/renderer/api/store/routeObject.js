import Routes from 'renderer/api/RouteObjects'
import RouteObjectActions from 'renderer/api/store/routeObjectActions'

const state = {
  currentRouteObject: null,
  currentRouteObjectUserAuth: null,
  routeObjects: [],
  authWidgetRouteObjects: [],
  sidebarRouteObjects: []
}

Routes.forEach(routesObj => {
  state.routeObjects.push(routesObj)
})

const mutations = {
  SET_AUTH_WIDGET_ROUTE_OBJECTS: function (state, data) {
    state.authWidgetRouteObjects = data
  },
  SET_SIDEBAR_ROUTE_OBJECTS: function (state, data) {
    state.sidebarRouteObjects = data
  },
  SET_CURRENT_ROUTE_OBJECT: function (state, data) {
    state.currentRouteObject = data
  },
  SET_CURRENT_ROUTE_OBJECT_USER_AUTH: function (state, data) {
    state.currentRouteObjectUserAuth = data
  }
}

const actions = {
  [RouteObjectActions.SET_AUTH_WIDGET_ROUTE_OBJECTS] ({commit}, payload) {
    commit('SET_AUTH_WIDGET_ROUTE_OBJECTS', payload)
  },
  [RouteObjectActions.UNSET_AUTH_WIDGET_ROUTE_OBJECTS] ({commit}, payload) {
    commit('SET_AUTH_WIDGET_ROUTE_OBJECTS', [])
  },
  [RouteObjectActions.SET_SIDEBAR_ROUTE_OBJECTS] ({commit}, payload) {
    commit('SET_SIDEBAR_ROUTE_OBJECTS', payload)
  },
  [RouteObjectActions.UNSET_SIDEBAR_ROUTE_OBJECTS] ({commit}, payload) {
    commit('SET_SIDEBAR_ROUTE_OBJECTS', [])
  },
  [RouteObjectActions.SET_CURRENT_ROUTE_OBJECT] ({commit}, payload) {
    commit('SET_CURRENT_ROUTE_OBJECT', payload)
  },
  [RouteObjectActions.SET_CURRENT_ROUTE_OBJECT_USER_AUTH] ({commit}, payload) {
    commit('SET_CURRENT_ROUTE_OBJECT_USER_AUTH', payload)
  }
}

export default {
  state,
  mutations,
  actions
}
