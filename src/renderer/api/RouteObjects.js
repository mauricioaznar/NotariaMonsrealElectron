import {createRouteObject} from 'renderer/services/api/RouteObject'
import EntityTypes from 'renderer/api/EntityTypes'
import ChildTypes from 'renderer/api/ChildTypes'
import RolesTypes from 'renderer/api/RoleTypes'
import {globalEntityIdentificator} from 'renderer/config'
let routeObjects = []

routeObjects.push(createRouteObject(EntityTypes.AUTH, ChildTypes.TOKEN, RolesTypes, {
  requiresAuth: false
}))
routeObjects.push(createRouteObject(EntityTypes.AUTH, ChildTypes.MY_PROFILE, RolesTypes, {}))
// Documentos
routeObjects.push(createRouteObject(EntityTypes.DOCUMENT, ChildTypes.LIST, RolesTypes,
  {
    sidebar: true,
    sidebarTitle: EntityTypes.DOCUMENT.title,
    default: true
  }
))
routeObjects.push(createRouteObject(EntityTypes.DOCUMENT, ChildTypes.CREATE, RolesTypes, {}))
routeObjects.push(createRouteObject(EntityTypes.DOCUMENT, ChildTypes.HISTORY, RolesTypes, {
  sidebar: true,
  sidebarTitle: ChildTypes.HISTORY.title,
  sidebarIcon: ChildTypes.HISTORY.icon
}))
routeObjects.push(createRouteObject(EntityTypes.DOCUMENT, ChildTypes.EDIT, RolesTypes,
  {
    params: [globalEntityIdentificator]
  }
))
routeObjects.push(createRouteObject(EntityTypes.DOCUMENT, ChildTypes.VIEW, RolesTypes,
  {
    params: [globalEntityIdentificator]
  }
))
routeObjects.push(createRouteObject(EntityTypes.DOCUMENT, ChildTypes.DEL, RolesTypes,
  {
    params: [globalEntityIdentificator],
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(createRouteObject(EntityTypes.DOCUMENT, ChildTypes.ANALYTICS, RolesTypes,
  {
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
// Cliente
routeObjects.push(createRouteObject(EntityTypes.CLIENT, ChildTypes.LIST, RolesTypes,
  {
    sidebarTitle: EntityTypes.CLIENT.title,
    sidebar: true
  }
))
routeObjects.push(createRouteObject(EntityTypes.CLIENT, ChildTypes.CREATE, RolesTypes, {}))
routeObjects.push(createRouteObject(EntityTypes.CLIENT, ChildTypes.EDIT, RolesTypes,
  {
    params: [globalEntityIdentificator]
  }
))
routeObjects.push(createRouteObject(EntityTypes.CLIENT, ChildTypes.VIEW, RolesTypes,
  {
    params: [globalEntityIdentificator]
  }
))
routeObjects.push(createRouteObject(EntityTypes.CLIENT, ChildTypes.DEL, RolesTypes,
  {
    params: [globalEntityIdentificator],
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
// Otorgante
routeObjects.push(createRouteObject(EntityTypes.GRANTOR, ChildTypes.LIST, RolesTypes,
  {
    sidebarTitle: EntityTypes.GRANTOR.title,
    sidebar: true
  }
))
routeObjects.push(createRouteObject(EntityTypes.GRANTOR, ChildTypes.CREATE, RolesTypes, {}))
routeObjects.push(createRouteObject(EntityTypes.GRANTOR, ChildTypes.EDIT, RolesTypes,
  {
    params: [globalEntityIdentificator]
  }
))
routeObjects.push(createRouteObject(EntityTypes.GRANTOR, ChildTypes.VIEW, RolesTypes,
  {
    params: [globalEntityIdentificator]
  }
))
routeObjects.push(createRouteObject(EntityTypes.GRANTOR, ChildTypes.DEL, RolesTypes,
  {
    params: [globalEntityIdentificator],
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(createRouteObject(EntityTypes.APPOINTMENT, ChildTypes.LIST, RolesTypes, {}))
routeObjects.push(createRouteObject(EntityTypes.APPOINTMENT, ChildTypes.CREATE, RolesTypes, {}))
routeObjects.push(createRouteObject(EntityTypes.APPOINTMENT, ChildTypes.DASHBOARD, RolesTypes, {
  sidebarTitle: EntityTypes.APPOINTMENT.title,
  sidebar: true
}))
routeObjects.push(createRouteObject(EntityTypes.APPOINTMENT, ChildTypes.EDIT, RolesTypes,
  {
    params: [globalEntityIdentificator]
  }
))
routeObjects.push(createRouteObject(EntityTypes.APPOINTMENT, ChildTypes.VIEW, RolesTypes,
  {
    params: [globalEntityIdentificator]
  }
))
routeObjects.push(createRouteObject(EntityTypes.APPOINTMENT, ChildTypes.DEL, RolesTypes,
  {
    params: [globalEntityIdentificator],
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(createRouteObject(EntityTypes.USER, ChildTypes.LIST, RolesTypes,
  {
    sidebarTitle: EntityTypes.USER.title,
    sidebar: true,
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(createRouteObject(EntityTypes.USER, ChildTypes.CREATE, RolesTypes,
  {
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(createRouteObject(EntityTypes.USER, ChildTypes.EDIT, RolesTypes,
  {
    params: [globalEntityIdentificator],
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(createRouteObject(EntityTypes.USER, ChildTypes.VIEW, RolesTypes,
  {
    params: [globalEntityIdentificator],
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(createRouteObject(EntityTypes.USER, ChildTypes.DEL, RolesTypes,
  {
    params: [globalEntityIdentificator],
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(createRouteObject(EntityTypes.GROUP, ChildTypes.LIST, RolesTypes,
  {
    sidebarTitle: EntityTypes.GROUP.title,
    sidebar: true,
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(createRouteObject(EntityTypes.GROUP, ChildTypes.CREATE, RolesTypes, {
  security: {
    [RolesTypes.SECRETARY.name]: false,
    [RolesTypes.LAWYER.name]: false,
    [RolesTypes.GUEST.name]: false
  }
}))
routeObjects.push(createRouteObject(EntityTypes.GROUP, ChildTypes.EDIT, RolesTypes,
  {
    params: [globalEntityIdentificator],
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(createRouteObject(EntityTypes.GROUP, ChildTypes.VIEW, RolesTypes,
  {
    params: [globalEntityIdentificator],
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(createRouteObject(EntityTypes.GROUP, ChildTypes.DEL, RolesTypes,
  {
    params: [globalEntityIdentificator],
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(createRouteObject(EntityTypes.NOTIFICATION, ChildTypes.NOTIFICATIONS, RolesTypes, {}
))

export default routeObjects

