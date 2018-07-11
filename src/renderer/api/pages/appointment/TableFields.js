import PropertiesReference from './PropertiesReference'
import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
export default [
  {
    name: PropertiesReference.NAME.name,
    title: PropertiesReference.NAME.title,
    sortField: PropertiesReference.NAME.name,
    filter: true
  },
  {
    name: PropertiesReference.START_DATE.name,
    title: PropertiesReference.START_DATE.title,
    sortField: PropertiesReference.START_DATE.name,
    callback: PropertiesReference.START_DATE.display,
    filter: true,
    default: true
  },
  {
    name: PropertiesReference.START_DATE.name,
    title: 'Hora de inicio',
    callback: DisplayFunctions.getTimeFromDateTime,
    filter: true
  },
  {
    name: PropertiesReference.END_DATE.name,
    title: 'Hora de fin',
    callback: DisplayFunctions.getTimeFromDateTime,
    filter: true
  },
  {
    name: PropertiesReference.ROOM.name,
    title: PropertiesReference.ROOM.title,
    callback: DisplayFunctions.getNameFromObject
  },
  {
    name: '__slot:actions',
    title: 'Acciones',
    hidden: true
  }
]

