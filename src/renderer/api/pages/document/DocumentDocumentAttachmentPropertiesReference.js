import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
import MauInputTypes from 'renderer/components/mau-components/mau-form-inputs/MauInputTypes'
import MauInputDefaultValues from 'renderer/components/mau-components/mau-form-inputs/MauInputDefaultValues'

export default {
  DELIVERED: {
    title: 'Entregado',
    name: 'attachment_status',
    display: DisplayFunctions.getBooleanIcon,
    required: true,
    mauInputType: MauInputTypes.BOOLEAN,
    defaultValue: MauInputDefaultValues.BOOLEAN
  }
}
