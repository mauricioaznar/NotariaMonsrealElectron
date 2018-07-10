import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
import MauInputDefaultValues from 'renderer/components/mau-components/mau-form-inputs/MauInputDefaultValues'
import Masks from 'renderer/services/form/Masks'

export default {
  ID: {
    title: 'id',
    name: GlobalEntityIdentifier,
    relationship_id_name: 'appointment_id',
    display: DisplayFunctions.getValue,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  OBSERVATION: {
    title: 'Observacion',
    name: 'observation',
    display: DisplayFunctions.getValue,
    required: false,
    defaultValue: MauInputDefaultValues.TEXT
  },
  COST: {
    title: 'Costo',
    name: 'cost',
    display: DisplayFunctions.getValue,
    required: true,
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.TEXT
  },
  DATE: {
    title: 'Fecha',
    name: 'date',
    display: DisplayFunctions.getDateFromDateTime,
    required: true,
    defaultValue: MauInputDefaultValues.DATE
  },
  EXPENSE_TYPE: {
    title: 'Tipo de gasto',
    name: 'expense_type',
    relationship_id_name: 'expense_type_id',
    display: DisplayFunctions.getNameFromObject,
    required: false,
    defaultValue: MauInputDefaultValues.SELECT
  },
  SUPPLIER: {
    title: 'Proveedor',
    name: 'supplier',
    relationship_id_name: 'supplier_id',
    display: DisplayFunctions.getNameFromObject,
    required: false,
    defaultValue: MauInputDefaultValues.SELECT
  }
}
