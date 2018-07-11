import OrderProductPropertiesReference from 'renderer/api/propertiesReference/BagOrderProductPropertiesReference'
import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
import MauInputDefaultValues from 'renderer/components/mau-components/mau-form-inputs/MauInputDefaultValues'

let OrderProductSalePropertiesReference = {
  UNIT_PRICE: {
    title: 'Precio unitario',
    name: 'unit_price',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  TOTAL_COST: {
    title: 'Costo total',
    name: 'total_cost',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  DISCOUNT: {
    title: 'Descuento',
    name: 'discount',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  }
}

export default Object.assign({}, OrderProductSalePropertiesReference, OrderProductPropertiesReference)
