import ProductPropertiesReference from './PropertiesReference'
import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
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
    callback: DisplayFunctions.getNameFromObject
  },
  {
    name: '__slot:actions',
    title: 'Acciones'
  }
]
