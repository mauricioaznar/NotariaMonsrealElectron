import OrderPropertiesReference from 'src/api/propertiesReference/BagOrderPropertiesReference'
import DisplayFunctions from 'src/services/api/DisplayFunctions'
import MauInputDefaultValues from 'src/components/mau-components/mau-form-inputs/MauInputDefaultValues'

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
