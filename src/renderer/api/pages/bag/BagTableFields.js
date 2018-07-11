import PropertiesReference from 'renderer/api/propertiesReference/BagPropertiesReference'
import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
export default [
  {
    name: PropertiesReference.NAME.name,
    title: PropertiesReference.NAME.title,
    dataClass: 'text-center'
  },
  {
    name: PropertiesReference.DESCRIPTION.name,
    title: PropertiesReference.DESCRIPTION.title,
    dataClass: 'text-center'
  },
  {
    name: PropertiesReference.WIDTH.name,
    title: PropertiesReference.WIDTH.title
  },
  {
    name: PropertiesReference.LENGTH.name,
    title: PropertiesReference.LENGTH.title
  },
  {
    name: PropertiesReference.CURRENT_GROUP_WEIGHT.name,
    title: PropertiesReference.CURRENT_GROUP_WEIGHT.title
  },
  {
    name: PropertiesReference.BAG_TYPE.name,
    title: PropertiesReference.BAG_TYPE.title,
    callback: DisplayFunctions.getNameFromObject
  },
  {
    name: PropertiesReference.BAG_PACKING.name,
    title: PropertiesReference.BAG_PACKING.title,
    callback: DisplayFunctions.getNameFromObject
  }
]

