import Masks from 'src/services/form/Masks'
import MauInputDefaultValues from 'src/components/mau-components/mau-form-inputs/MauInputDefaultValues'
export default {
  UNITS: {
    title: 'Cantidad en kilos',
    name: 'units',
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  GROUPS: {
    title: 'Cantidad en bultos',
    name: 'groups',
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  GROUP_WEIGHT: {
    title: 'Peso del bulto en kilos',
    name: 'group_weight',
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  }
}
