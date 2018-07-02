import ProductPropertiesReference from './PropertiesReference'
// import DisplayFunctions from 'src/services/functions/displayFunctions'
export default [
  {
    name: ProductPropertiesReference.ID.name,
    title: ProductPropertiesReference.ID.title,
    sortField: ProductPropertiesReference.ID.name
  },
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
    name: ProductPropertiesReference.ADDRESS1.name,
    title: ProductPropertiesReference.ADDRESS1.title,
    sortField: ProductPropertiesReference.ADDRESS1.name,
    filter: true
  },
  {
    name: '__slot:actions',
    title: 'Acciones',
    hidden: true
  }
]

