import GlobalEntityIdentifier from 'src/services/api/GlobalEntityIdentifier'
import DisplayFunctions from 'src/services/api/DisplayFunctions'
import EntityTypes from 'src/api/EntityTypes'
import MauInputDefaultValues from 'src/components/mau-components/mau-form-inputs/MauInputDefaultValues'

export default {
  ID: {
    title: 'id',
    name: GlobalEntityIdentifier,
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  DATE: {
    title: 'Fecha',
    name: 'date',
    display: DisplayFunctions.getDate,
    defaultValue: MauInputDefaultValues.DATE
  },
  NAME: {
    title: 'Identificador de la orden',
    name: 'name',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.TEXT
  },
  BAGS: {
    title: 'Bolsas',
    name: 'bags',
    relationship_id_name: 'bag_order_production_id',
    entityName: EntityTypes.BAG_ORDER_PRODUCTION_PRODUCT.name,
    display: DisplayFunctions.getProductWithQuantity,
    defaultValue: MauInputDefaultValues.MULTISELECT
  }
}
