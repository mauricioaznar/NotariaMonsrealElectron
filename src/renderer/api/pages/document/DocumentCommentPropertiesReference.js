import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
import MauInputTypes from 'renderer/components/mau-components/mau-form-inputs/MauInputTypes'
import MauInputDefaultValues from 'renderer/components/mau-components/mau-form-inputs/MauInputDefaultValues'

export default {
  COMMENT: {
    title: 'Comentario',
    name: 'comment',
    display: DisplayFunctions.getNameFromObject,
    required: false,
    mauInputType: MauInputTypes.SELECTOR,
    defaultValue: MauInputDefaultValues.SELECTOR
  },
  USER: {
    title: 'Usuario',
    name: 'user',
    relationship_id_name: 'user_id',
    display: DisplayFunctions.getPersona,
    required: true
  }
}
