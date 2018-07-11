import ProductPropertiesReference from './PropertiesReference'
// import DisplayFunctions from 'renderer/services/functions/displayFunctions'
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
    sortField: ProductPropertiesReference.EMAIL.name,
    filter: true
  },
  {
    name: ProductPropertiesReference.PHONE.name,
    title: ProductPropertiesReference.PHONE.title,
    sortField: ProductPropertiesReference.PHONE.name,
    filter: true
  },
  {
    name: '__slot:actions',
    title: 'Acciones',
    hidden: true
  }
]

