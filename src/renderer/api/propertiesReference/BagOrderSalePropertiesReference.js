import OrderPropertiesReference from 'renderer/api/propertiesReference/BagOrderPropertiesReference'
import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
import MauInputDefaultValues from 'renderer/components/mau-components/mau-form-inputs/MauInputDefaultValues'

let OrderSalePropertiesReference = {
  CLIENT: {
    name: 'client',
    title: 'Cliente',
    relationship_id_name: 'client_id',
    display: DisplayFunctions.getNameFromObject,
    required: false,
    defaultValue: MauInputDefaultValues.SELECT
  }
}

export default Object.assign({}, OrderSalePropertiesReference, OrderPropertiesReference)
