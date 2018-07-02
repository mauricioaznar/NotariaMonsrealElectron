import GlobalEntityIdentifier from 'src/services/api/GlobalEntityIdentifier'
import DisplayFunctions from 'src/services/api/DisplayFunctions'
import Masks from 'src/services/form/Masks'
import MauInputDefaultValues from 'src/components/mau-components/mau-form-inputs/MauInputDefaultValues'
export default {
  ID: {
    title: 'id',
    name: GlobalEntityIdentifier,
    display: DisplayFunctions.getValue,
    relationship_id_name: 'client_id',
    defaultValue: MauInputDefaultValues.NUMBER
  },
  NAME: {
    title: 'Nombre',
    name: 'name',
    display: DisplayFunctions.getValue,
    required: true,
    defaultValue: MauInputDefaultValues.TEXT
  },
  NICKNAME: {
    title: 'Apodo',
    name: 'nickname',
    display: DisplayFunctions.getValue,
    required: true,
    defaultValue: MauInputDefaultValues.TEXT
  },
  LASTNAME: {
    title: 'Apellidos',
    name: 'lastname',
    display: DisplayFunctions.getValue,
    required: true,
    defaultValue: MauInputDefaultValues.TEXT
  },
  EMAIL: {
    title: 'Correo Electronico',
    name: 'email',
    mask: Masks.email,
    display: DisplayFunctions.getValue,
    required: false,
    defaultValue: MauInputDefaultValues.TEXT
  },
  ADDRESS1: {
    title: 'Direccion',
    name: 'address1',
    display: DisplayFunctions.getValue,
    required: false,
    defaultValue: MauInputDefaultValues.TEXT
  },
  PHONE: {
    title: 'Telefono',
    name: 'phone',
    display: DisplayFunctions.getValue,
    required: false,
    mask: Masks.phone,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  COUNTRY: {
    title: 'Pais',
    name: 'country',
    display: DisplayFunctions.getValue,
    required: false,
    defaultValue: MauInputDefaultValues.TEXT
  },
  CITY: {
    title: 'Ciudad',
    name: 'city',
    display: DisplayFunctions.getValue,
    required: false,
    defaultValue: MauInputDefaultValues.TEXT
  },
  ZIPCODE: {
    title: 'Codigo Postal',
    name: 'zip_code',
    display: DisplayFunctions.getValue,
    required: false,
    mask: Masks.regularNumber,
    defaultValue: MauInputDefaultValues.NUMBER
  }
}
