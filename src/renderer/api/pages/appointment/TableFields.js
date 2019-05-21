import PropertiesReference from './PropertiesReference'
import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
import EntityTypes from 'renderer/api/EntityTypes'
export default [
  {
    name: PropertiesReference.NAME.name,
    title: PropertiesReference.NAME.title,
    sortField: PropertiesReference.NAME.name
  },
  {
    name: PropertiesReference.START_DATE.name,
    title: PropertiesReference.START_DATE.title,
    sortField: PropertiesReference.START_DATE.name,
    callback: PropertiesReference.START_DATE.display,
    default: true
  },
  {
    name: PropertiesReference.START_DATE.name,
    title: 'Hora de inicio',
    callback: DisplayFunctions.getTimeFromDateTime
  },
  {
    name: PropertiesReference.END_DATE.name,
    title: 'Hora de fin',
    callback: DisplayFunctions.getTimeFromDateTime
  },
  {
    name: PropertiesReference.ROOM.name,
    title: PropertiesReference.ROOM.title,
    entity: EntityTypes.ROOM.apiName,
    entityFieldName: 'name',
    callback: DisplayFunctions.getNameFromObject
  },
  {
    name: '__slot:actions',
    title: 'Acciones',
    hidden: true
  }
]

