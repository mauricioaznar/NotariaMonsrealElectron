import OrderAdjustmentPropertiesReference from 'src/api/propertiesReference/BagOrderAdjustmentPropertiesReference'
import SimpleOrderPropertiesReference from 'src/api/propertiesReference/BagOrderPropertiesReference'
import DisplayFunctions from 'src/services/api/DisplayFunctions'
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
  },
  {
    name: OrderAdjustmentPropertiesReference.ADJUSTMENT_TYPE.name,
    title: OrderAdjustmentPropertiesReference.ADJUSTMENT_TYPE.title,
    callback: OrderAdjustmentPropertiesReference.ADJUSTMENT_TYPE.display
  }
]
