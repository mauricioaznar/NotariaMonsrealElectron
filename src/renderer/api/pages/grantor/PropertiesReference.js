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
    mask: Masks.phone,
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
    mask: Masks.regularNumber,
    mauInputType: MauInputTypes.NUMBER,
    defaultValue: ''
  },
  CLIENTS: {
    title: 'Clientes',
    name: 'clients',
    entityName: 'clientGrantor',
    relationship_id_name: 'client_id',
    display: DisplayFunctions.getPersonaArray,
    required: false,
    defaultValue: MauInputDefaultValues.MULTISELECTOR
  }
}
