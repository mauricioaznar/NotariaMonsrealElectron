import globalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
import MauInputTypes from 'renderer/components/mau-components/mau-form-inputs/MauInputTypes'
import MauInputDefaultValues from 'renderer/components/mau-components/mau-form-inputs/MauInputDefaultValues'

export default {
  ID: {
    title: 'id',
    name: globalEntityIdentifier,
    relationship_id_name: 'appointment_id',
    display: DisplayFunctions.getValue,
    mauInputType: MauInputTypes.NUMBER,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  NAME: {
    title: 'Asunto',
    name: 'name',
    display: DisplayFunctions.getValue,
    required: true,
    mauInputType: MauInputTypes.TEXT,
    defaultValue: MauInputDefaultValues.TEXT
  },
  DESCRIPTION: {
    title: 'Descripcion',
    name: 'description',
    display: DisplayFunctions.getValue,
    required: false,
    mauInputType: MauInputTypes.TEXT,
    defaultValue: MauInputDefaultValues.TEXT
  },

  START_DATE: {
    title: 'Fecha',
    name: 'start_date',
    display: DisplayFunctions.getDateFromDateTime,
    required: true,
    mauInputType: MauInputTypes.DATE,
    defaultValue: MauInputDefaultValues.DATE
  },
  END_DATE: {
    title: 'Fecha y hora de termino',
    name: 'end_date',
    display: DisplayFunctions.getDateFromDateTime,
    required: false,
    mauInputType: MauInputTypes.DATE,
    defaultValue: MauInputDefaultValues.DATE
  },
  USERS: {
    title: 'Usuarios',
    name: 'users',
    relationship_id_name: 'user_id',
    entityName: 'appointmentUser',
    required: false,
    display: DisplayFunctions.getArrayLength,
    mauInputType: MauInputTypes.MULTISELECTOR,
    defaultValue: MauInputDefaultValues.MULTISELECTOR
  },
  CLIENTS: {
    title: 'Clientes',
    name: 'clients',
    relationship_id_name: 'client_id',
    entityName: 'appointmentClient',
    display: DisplayFunctions.getArrayLength,
    required: false,
    mauInputType: MauInputTypes.MULTISELECTOR,
    defaultValue: MauInputDefaultValues.MULTISELECTOR
  },
  ROOM: {
    title: 'Sala',
    name: 'room',
    relationship_id_name: 'room_id',
    display: DisplayFunctions.getNameFromObject,
    required: false,
    mauInputType: MauInputTypes.SELECTOR,
    defaultValue: MauInputDefaultValues.SELECTOR
  },
  CREATED_BY: {
    title: 'Creado por',
    name: 'created_by',
    relationship_id_name: 'created_by_user_id',
    display: DisplayFunctions.getNameFromObject,
    mauInputType: MauInputTypes.SELECTOR,
    defaultValue: MauInputDefaultValues.SELECTOR
  }
}
