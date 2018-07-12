import globalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
import MauInputTypes from 'renderer/components/mau-components/mau-form-inputs/MauInputTypes'
import MauInputDefaultValues from 'renderer/components/mau-components/mau-form-inputs/MauInputDefaultValues'

export default {
  ID: {
    title: 'id',
    name: globalEntityIdentifier,
    display: DisplayFunctions.getValue,
    relationship_id_name: 'group_id',
    mauInputType: MauInputTypes.NUMBER,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  NAME: {
    title: 'Nombre del grupo',
    name: 'name',
    display: DisplayFunctions.getValue,
    required: true,
    mauInputType: MauInputTypes.TEXT,
    defaultValue: MauInputDefaultValues.TEXT
  },
  USERS: {
    title: 'Integrantes',
    name: 'users',
    entityName: 'userGroup',
    relationship_id_name: 'user_id',
    ID: globalEntityIdentifier,
    display: DisplayFunctions.getPersonaArray,
    defaultValue: MauInputDefaultValues.MULTISELECTOR
  },
  USER: {
    title: 'Lider',
    name: 'user',
    relationship_id_name: 'user_id',
    ID: globalEntityIdentifier,
    display: DisplayFunctions.getPersona,
    mauInputType: MauInputTypes.SELECTOR,
    defaultValue: MauInputDefaultValues.SELECTOR
  }
}
