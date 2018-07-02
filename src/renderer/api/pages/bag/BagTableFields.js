import PropertiesReference from 'src/api/propertiesReference/BagPropertiesReference'
import DisplayFunctions from 'src/services/api/DisplayFunctions'
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
    name: PropertiesReference.CURRENT_UNIT_PRICE.name,
    title: PropertiesReference.CURRENT_UNIT_PRICE.title
  },
  {
    name: PropertiesReference.CURRENT_GROUP_WEIGHT.name,
    title: PropertiesReference.CURRENT_GROUP_WEIGHT.title
  },
  {
    name: PropertiesReference.BAG_TYPE.name,
    title: PropertiesReference.BAG_TYPE.title,
    callback: DisplayFunctions.getNameFromObject
  }
]

