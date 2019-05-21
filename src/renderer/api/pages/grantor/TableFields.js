import ProductPropertiesReference from './PropertiesReference'
// import DisplayFunctions from 'renderer/services/functions/displayFunctions'
export default [
  {
    name: 'fullname',
    title: 'Nombre Completo',
    sortField: 'fullname',
    default: true
  },
  {
    name: ProductPropertiesReference.EMAIL.name,
    title: ProductPropertiesReference.EMAIL.title,
    sortField: ProductPropertiesReference.EMAIL.name
  },
  {
    name: ProductPropertiesReference.ADDRESS1.name,
    title: ProductPropertiesReference.ADDRESS1.title,
    sortField: ProductPropertiesReference.ADDRESS1.name
  },
  {
    name: '__slot:actions',
    title: 'Acciones',
    hidden: true
  }
]

