import globalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
import MauInputTypes from 'renderer/components/mau-components/mau-form-inputs/MauInputTypes'
import MauInputDefaultValues from 'renderer/components/mau-components/mau-form-inputs/MauInputDefaultValues'
import Masks from 'renderer/services/form/Masks'
export default {
  ID: {
    title: 'id',
    name: globalEntityIdentifier,
    display: DisplayFunctions.getValue,
    relationship_id_name: 'client_id',
    mauInputType: MauInputTypes.NUMBER,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  NAME: {
    title: 'Nombre',
    name: 'name',
    display: DisplayFunctions.getValue,
    required: true,
    mauInputType: MauInputTypes.TEXT,
    defaultValue: MauInputDefaultValues.TEXT
  },
  LASTNAME: {
    title: 'Apellidos',
    name: 'lastname',
    display: DisplayFunctions.getValue,
    required: true,
    mauInputType: MauInputTypes.TEXT,
    defaultValue: MauInputDefaultValues.TEXT
  },
  EMAIL: {
    title: 'Correo Electronico',
    name: 'email',
    mask: Masks.email,
    display: DisplayFunctions.getValue,
    required: false,
    mauInputType: MauInputTypes.TEXT,
    defaultValue: MauInputDefaultValues.TEXT
  },
  ADDRESS1: {
    title: 'Direccion',
    name: 'address1',
    display: DisplayFunctions.getValue,
    required: false,
    mauInputType: MauInputTypes.TEXT,
    defaultValue: MauInputDefaultValues.TEXT
  },
  PHONE: {
    title: 'Telefono',
    name: 'phone',
    display: DisplayFunctions.getValue,
    required: false,
    mask: Masks.cellphone,
    mauInputType: MauInputTypes.NUMBER,
    defaultValue: ''
  },
  COUNTRY: {
    title: 'Pais',
    name: 'country',
    display: DisplayFunctions.getValue,
    required: false,
    defaultValue: ''
  },
  CITY: {
    title: 'Ciudad',
    name: 'city',
    display: DisplayFunctions.getValue,
    required: false,
    defaultValue: ''
  },
  ZIPCODE: {
    title: 'Codigo Postal',
    name: 'zip_code',
    display: DisplayFunctions.getValue,
    required: false,
    mask: Masks.quantityNumber,
    mauInputType: MauInputTypes.NUMBER,
    defaultValue: ''
  },
  GRANTORS: {
    title: 'Otorgantes',
    name: 'grantors',
    entityName: 'clientGrantor',
    relationship_id_name: 'grantor_id',
    display: DisplayFunctions.getPersonaArray,
    required: false,
    defaultValue: MauInputDefaultValues.MULTISELECTOR
  }
}
