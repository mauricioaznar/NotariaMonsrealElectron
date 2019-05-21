import ProductPropertiesReference from './PropertiesReference'
import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
import EntityTypes from 'renderer/api/EntityTypes'
export default [
  {
    name: 'fullname',
    title: 'Nombre Completo',
    sortField: 'fullname',
    filter: true,
    default: true
  },
  {
    name: ProductPropertiesReference.EMAIL.name,
    title: ProductPropertiesReference.EMAIL.title,
    sortField: ProductPropertiesReference.EMAIL.name
  },
  {
    name: ProductPropertiesReference.PHONE.name,
    title: ProductPropertiesReference.PHONE.title,
    sortField: ProductPropertiesReference.PHONE.name
  },
  {
    name: ProductPropertiesReference.ROLE.name,
    title: ProductPropertiesReference.ROLE.title,
    callback: DisplayFunctions.getNameFromObject,
    entity: EntityTypes.ROLE.apiName,
    entityFieldName: 'name'
  },
  {
    name: '__slot:actions',
    title: 'Acciones',
    hidden: true
  }
]

