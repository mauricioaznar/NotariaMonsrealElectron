import ProductPropertiesReference from './PropertiesReference'
import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
import EntityTypes from 'renderer/api/EntityTypes'
export default [
  {
    name: ProductPropertiesReference.NAME.name,
    title: ProductPropertiesReference.NAME.title,
    filter: true,
    default: true
  },
  {
    name: ProductPropertiesReference.USER.name,
    title: ProductPropertiesReference.USER.title,
    callback: DisplayFunctions.getPersona,
    entity: EntityTypes.USER.apiName,
    entityFieldName: 'fullname'
  },
  {
    name: '__slot:actions',
    title: 'Acciones',
    hidden: true
  }
]
