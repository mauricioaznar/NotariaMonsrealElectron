import {globalEntityIdentificator} from 'renderer/config'
import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
import MauInputTypes from 'renderer/components/mau-components/mau-form-inputs/MauInputTypes'
import MauInputDefaultValues from 'renderer/components/mau-components/mau-form-inputs/MauInputDefaultValues'
import Masks from 'renderer/services/form/Masks'

export default {
  ID: {
    title: 'id',
    name: globalEntityIdentificator,
    display: DisplayFunctions.getValue,
    relationship_id_name: 'user_id',
    mauInputType: MauInputTypes.NUMBER,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  NAME: {
    title: 'Nombre',
    name: 'name',
    display: DisplayFunctions.getValue,
    mauInputType: MauInputTypes.TEXT,
    defaultValue: MauInputDefaultValues.TEXT
  },
  LASTNAME: {
    title: 'Apellidos',
    name: 'lastname',
    display: DisplayFunctions.getValue,
    mauInputType: MauInputTypes.TEXT,
    defaultValue: MauInputDefaultValues.TEXT
  },
  EMAIL: {
    title: 'Correo Electronico',
    name: 'email',
    mask: Masks.email,
    display: DisplayFunctions.getValue,
    mauInputType: MauInputTypes.TEXT,
    defaultValue: MauInputDefaultValues.TEXT
  },
  PHONE: {
    title: 'Telefono',
    name: 'phone',
    display: DisplayFunctions.getValue,
    mask: Masks.phone,
    mauInputType: MauInputTypes.NUMBER,
    defaultValue: ''
  },
  ROLE: {
    title: 'rol',
    name: 'role',
    display: DisplayFunctions.getNameFromObject,
    relationship_id_name: 'role_id',
    mauInputType: MauInputTypes.SELECTOR,
    defaultValue: MauInputDefaultValues.SELECTOR
  },
  GROUPS: {
    title: 'Grupos',
    name: 'group',
    display: DisplayFunctions.getPersonaArray,
    mauInputType: MauInputTypes.MULTISELECTOR,
    defaultValue: MauInputDefaultValues.MULTISELECTOR
  }
}
