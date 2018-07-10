import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
import EntityTypes from 'renderer/api/EntityTypes'
import ChildTypes from 'renderer/api/ChildTypes'
import Categories from 'renderer/api/Categories'
import RolesTypes from 'renderer/api/RoleTypes'
import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'

let routeObjects = []

routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.AUTH, ChildTypes.TOKEN, {
  category: Categories.AUTH,
  requiresAuth: false
}))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.AUTH, ChildTypes.MY_PROFILE, {
  category: Categories.AUTH,
  categoryDefault: true,
  title: 'Mi perfil'
}))
// Documentos
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG, ChildTypes.LIST,
  {
    showNavbar: true,
    category: Categories.PRODUCTION,
    categoryDefault: true,
    default: true
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG, ChildTypes.CREATE,
  {
    category: Categories.PRODUCTION
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG, ChildTypes.EDIT,
  {
    category: Categories.PRODUCTION,
    params: [GlobalEntityIdentifier]
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG, ChildTypes.VIEW,
  {
    category: Categories.PRODUCTION,
    params: [GlobalEntityIdentifier]
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG, ChildTypes.DEL,
  {
    category: Categories.PRODUCTION,
    params: [GlobalEntityIdentifier]
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.SUPPLIER, ChildTypes.LIST,
  {
    showNavbar: true,
    title: 'Lista de proveedores',
    category: Categories.ACCOUNTING
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.SUPPLIER, ChildTypes.CREATE,
  {
    category: Categories.ACCOUNTING
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.SUPPLIER, ChildTypes.EDIT,
  {
    category: Categories.ACCOUNTING,
    params: [GlobalEntityIdentifier]
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.SUPPLIER, ChildTypes.VIEW,
  {
    category: Categories.ACCOUNTING,
    params: [GlobalEntityIdentifier]
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.SUPPLIER, ChildTypes.DEL,
  {
    category: Categories.ACCOUNTING,
    params: [GlobalEntityIdentifier]
  }
))
// Cliente
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.CLIENT, ChildTypes.LIST,
  {
    showNavbar: true,
    title: 'Lista de clientes',
    category: Categories.SALES
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.CLIENT, ChildTypes.CREATE,
  {
    category: Categories.SALES
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.CLIENT, ChildTypes.EDIT,
  {
    category: Categories.SALES,
    params: [GlobalEntityIdentifier]
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.CLIENT, ChildTypes.VIEW,
  {
    category: Categories.SALES,
    params: [GlobalEntityIdentifier]
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.CLIENT, ChildTypes.DEL,
  {
    category: Categories.SALES,
    params: [GlobalEntityIdentifier],
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.EXPENSE, ChildTypes.LIST, {
  showNavbar: true,
  title: 'Gastos',
  category: Categories.ACCOUNTING,
  categoryDefault: true,
  sidebarTitle: EntityTypes.EXPENSE.title,
  sidebar: true
}))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.EXPENSE, ChildTypes.CREATE, {
  category: Categories.ACCOUNTING
}))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.EXPENSE, ChildTypes.EDIT,
  {
    category: Categories.ACCOUNTING,
    params: [GlobalEntityIdentifier]
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.EXPENSE, ChildTypes.VIEW,
  {
    category: Categories.ACCOUNTING,
    params: [GlobalEntityIdentifier]
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.EXPENSE, ChildTypes.DEL,
  {
    category: Categories.ACCOUNTING,
    params: [GlobalEntityIdentifier],
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.USER, ChildTypes.LIST,
  {
    category: Categories.AUTH,
    showNavbar: true,
    title: 'Lista de usuarios',
    sidebarTitle: EntityTypes.USER.title,
    sidebar: true,
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.USER, ChildTypes.CREATE,
  {
    category: Categories.AUTH,
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.USER, ChildTypes.EDIT,
  {
    category: Categories.AUTH,
    params: [GlobalEntityIdentifier],
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.USER, ChildTypes.VIEW,
  {
    category: Categories.AUTH,
    params: [GlobalEntityIdentifier],
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.USER, ChildTypes.DEL,
  {
    category: Categories.AUTH,
    params: [GlobalEntityIdentifier],
    security: {
      [RolesTypes.SECRETARY.name]: false,
      [RolesTypes.LAWYER.name]: false,
      [RolesTypes.GUEST.name]: false
    }
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION, ChildTypes.LIST,
  {
    category: Categories.PRODUCTION,
    categoryDefault: true,
    showNavbar: true
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION, ChildTypes.CREATE, {
  category: Categories.PRODUCTION
}))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION, ChildTypes.EDIT,
  {
    category: Categories.PRODUCTION,
    params: [GlobalEntityIdentifier]
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION, ChildTypes.VIEW,
  {
    category: Categories.PRODUCTION,
    params: [GlobalEntityIdentifier]
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_PRODUCTION, ChildTypes.DEL,
  {
    category: Categories.PRODUCTION,
    params: [GlobalEntityIdentifier]
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_ADJUSTMENT, ChildTypes.LIST,
  {
    category: Categories.PRODUCTION,
    showNavbar: true
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_ADJUSTMENT, ChildTypes.CREATE, {
  category: Categories.PRODUCTION
}))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_ADJUSTMENT, ChildTypes.EDIT,
  {
    category: Categories.PRODUCTION,
    params: [GlobalEntityIdentifier]
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_ADJUSTMENT, ChildTypes.VIEW,
  {
    category: Categories.PRODUCTION,
    params: [GlobalEntityIdentifier]
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_ADJUSTMENT, ChildTypes.DEL,
  {
    category: Categories.PRODUCTION,
    params: [GlobalEntityIdentifier]
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE, ChildTypes.LIST,
  {
    category: Categories.SALES,
    categoryDefault: true,
    showNavbar: true
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE, ChildTypes.CREATE, {
  category: Categories.SALES
}))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE, ChildTypes.EDIT,
  {
    category: Categories.SALES,
    params: [GlobalEntityIdentifier]
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE, ChildTypes.VIEW,
  {
    category: Categories.SALES,
    params: [GlobalEntityIdentifier]
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.BAG_ORDER_SALE, ChildTypes.DEL,
  {
    category: Categories.SALES,
    params: [GlobalEntityIdentifier]
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.NOTIFICATION, ChildTypes.NOTIFICATIONS,
  {
    category: Categories.AUTH
  }
))
routeObjects.push(RouteObjectHelper.createRouteObject(EntityTypes.AUTH, ChildTypes.DOWNLOADS,
  {
    category: Categories.AUTH,
    showNavbar: true,
    title: 'Descargas'
  }
))

export default routeObjects

