import OrderPropertiesReference from 'renderer/api/propertiesReference/BagOrderPropertiesReference'
import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
import MauInputDefaultValues from 'renderer/components/mau-components/mau-form-inputs/MauInputDefaultValues'

let OrderAdjustmentPropertiesReference = {
  ADJUSTMENT_TYPE: {
    name: 'bag_order_adjustment_type',
    title: 'tipo de ajuste',
    relationship_id_name: 'bag_order_adjustment_type_id',
    display: DisplayFunctions.getNameFromObject,
    defaultValue: MauInputDefaultValues.SELECT
  }
}

export default Object.assign({}, OrderAdjustmentPropertiesReference, OrderPropertiesReference)
