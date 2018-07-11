import SimpleOrderPropertiesReference from '../../../propertiesReference/BagOrderPropertiesReference'
import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
export default [
  {
    name: SimpleOrderPropertiesReference.NAME.name,
    title: SimpleOrderPropertiesReference.NAME.title,
    filter: true,
    default: true
  },
  {
    name: SimpleOrderPropertiesReference.DATE.name,
    title: SimpleOrderPropertiesReference.DATE.title,
    sortField: SimpleOrderPropertiesReference.DATE.name,
    callback: DisplayFunctions.getDateFromDateTime,
    filter: true,
    default: true
  },
  {
    name: SimpleOrderPropertiesReference.BAGS.name,
    title: SimpleOrderPropertiesReference.BAGS.title,
    hidden: true,
    callback: DisplayFunctions.getProductWithQuantity
  }
]
