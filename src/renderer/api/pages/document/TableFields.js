import PropertiesReference from './PropertiesReference'
import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
export default [
  {
    name: PropertiesReference.FILE_NUMBER.name,
    title: PropertiesReference.FILE_NUMBER.title,
    sortField: PropertiesReference.FILE_NUMBER.name
  },
  {
    name: PropertiesReference.DATE.name,
    title: 'Año',
    sortField: PropertiesReference.DATE.name,
    callback: DisplayFunctions.getDateYear
  },
  {
    name: PropertiesReference.DATE.name,
    title: PropertiesReference.DATE.title,
    sortField: PropertiesReference.DATE.name,
    callback: PropertiesReference.DATE.display
  },
  {
    name: PropertiesReference.FOLIO.name,
    title: PropertiesReference.FOLIO.title,
    sortField: PropertiesReference.FOLIO.name
  },
  {
    name: PropertiesReference.TOME.name,
    title: PropertiesReference.TOME.title,
    sortField: PropertiesReference.TOME.name
  },
  {
    name: PropertiesReference.MONEY_LAUNDERING.name,
    title: PropertiesReference.MONEY_LAUNDERING.title,
    sortField: PropertiesReference.MONEY_LAUNDERING.name,
    callback: DisplayFunctions.getBooleanIcon,
    dataClass: 'text-center'
  },
  {
    name: PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.name,
    title: PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.title,
    sortField: PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.name,
    callback: PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.callback
  },
  {
    name: PropertiesReference.DOCUMENT_STATUS.name,
    title: PropertiesReference.DOCUMENT_STATUS.title,
    callback: PropertiesReference.DOCUMENT_STATUS.display
  },
  {
    name: PropertiesReference.CLIENT.name,
    title: PropertiesReference.CLIENT.title,
    callback: DisplayFunctions.getPersona
  },
  {
    name: '__slot:actions',
    title: 'Acciones',
    hidden: true
  }
]

