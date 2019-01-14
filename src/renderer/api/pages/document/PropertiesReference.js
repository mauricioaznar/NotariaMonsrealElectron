import globalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
import MauInputTypes from 'renderer/components/mau-components/mau-form-inputs/MauInputTypes'
import MauInputDefaultValues from 'renderer/components/mau-components/mau-form-inputs/MauInputDefaultValues'
import Masks from 'renderer/services/form/Masks'

export default {
  ID: {
    title: 'id',
    name: globalEntityIdentifier,
    relationship_id_name: 'document_id',
    display: DisplayFunctions.getValue,
    mauInputType: MauInputTypes.NUMBER,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  FOLIO: {
    title: 'Folio',
    name: 'folio',
    display: DisplayFunctions.getValue,
    required: true,
    mauInputType: MauInputTypes.NUMBER,
    defaultValue: MauInputDefaultValues.NUMBER,
    mask: Masks.regularNumber
  },
  TOME: {
    title: 'Tomo/Libro',
    name: 'tome',
    display: DisplayFunctions.getValue,
    required: true,
    mask: Masks.regularNumber,
    mauInputType: MauInputTypes.TEXT,
    defaultValue: MauInputDefaultValues.TEXT
  },
  ELECTRONIC_FOLIO: {
    title: 'Folio electronico',
    name: 'electronic_folio',
    display: DisplayFunctions.getValue,
    required: false,
    mask: Masks.regularNumber
  },
  FILE_NUMBER: {
    title: 'Numero de acta',
    name: 'file_number',
    display: DisplayFunctions.getValue,
    required: true,
    mask: Masks.regularNumber,
    mauInputType: MauInputTypes.NUMBER,
    defaultValue: MauInputDefaultValues.NUMBER
  },
  IDENTIFICATIONS: {
    title: 'Identificaciones',
    name: 'identifications',
    display: DisplayFunctions.getBooleanIcon,
    required: false,
    mauInputType: MauInputTypes.TRIPLE_BOOLEAN,
    defaultValue: MauInputDefaultValues.TRIPLE_BOOLEAN
  },
  PERSONALITIES: {
    title: 'Personalidades',
    name: 'personalities',
    display: DisplayFunctions.getBooleanIcon,
    required: false,
    mauInputType: MauInputTypes.TRIPLE_BOOLEAN,
    defaultValue: MauInputDefaultValues.TRIPLE_BOOLEAN
  },
  PUBLIC_REGISTRY_PATENT: {
    title: 'Patente del registro publico',
    name: 'public_registry_patent',
    display: DisplayFunctions.getBooleanIcon,
    required: false,
    mauInputType: MauInputTypes.TRIPLE_BOOLEAN,
    defaultValue: MauInputDefaultValues.TRIPLE_BOOLEAN
  },
  DOCUMENT_TYPE_OTHER: {
    title: 'Nombre del tipo de contrato',
    name: 'document_type_other',
    display: DisplayFunctions.getBooleanIcon,
    required: false,
    mauInputType: MauInputTypes.TEXT,
    defaultValue: MauInputDefaultValues.TEXT
  },
  MARGINAL_NOTES: {
    title: 'Notas marginales',
    name: 'marginal_notes',
    display: DisplayFunctions.getValue,
    required: false,
    mauInputType: MauInputTypes.TEXT,
    defaultValue: MauInputDefaultValues.TEXT
  },
  DOCUMENT_ATTACHMENTS: {
    title: 'Documentos Adjuntos',
    name: 'attachments',
    entityName: 'documentAttachment',
    relationship_id_name: 'attachment_id',
    display: DisplayFunctions.getNameArray,
    mauInputType: MauInputTypes.MULTISELECTOR,
    defaultValue: MauInputDefaultValues.MULTISELECTOR
  },
  DOCUMENT_TYPE: {
    title: 'Tipo',
    name: 'document_type',
    relationship_id_name: 'document_type_id',
    display: DisplayFunctions.getNameFromObject,
    required: true,
    mauInputType: MauInputTypes.SELECTOR,
    defaultValue: MauInputDefaultValues.SELECTOR
  },
  OPERATIONS: {
    title: 'Contratos',
    name: 'operations',
    entityName: 'documentOperation',
    relationship_id_name: 'operation_id',
    display: DisplayFunctions.getNameArray,
    mauInputType: MauInputTypes.MULTISELECTOR,
    defaultValue: MauInputDefaultValues.MULTISELECTOR
  },
  PUBLIC_REGISTRY_ENTRY_DATE: {
    title: 'Fecha de entrada al registro publico',
    name: 'public_registry_entry_date',
    display: DisplayFunctions.getDate,
    required: false,
    mauInputType: MauInputTypes.DATE,
    defaultValue: MauInputDefaultValues.DATE
  },
  PUBLIC_REGISTRY_EXIT_DATE: {
    title: 'Fecha de salida al registro publico',
    name: 'public_registry_exit_date',
    display: DisplayFunctions.getDate,
    required: false,
    mauInputType: MauInputTypes.DATE,
    defaultValue: MauInputDefaultValues.DATE
  },
  MONEY_LAUNDERING_EXPIRATION_DATE: {
    title: 'Fecha de vencimiento de lavado de dinero',
    name: 'money_laundering_expiration_date',
    display: DisplayFunctions.getDate,
    required: false,
    mauInputType: MauInputTypes.DATE,
    defaultValue: MauInputDefaultValues.DATE
  },
  MONEY_LAUNDERING: {
    title: 'Lavado de dinero',
    name: 'money_laundering',
    display: DisplayFunctions.getBooleanIcon,
    required: false,
    mauInputType: MauInputTypes.TRIPLE_BOOLEAN,
    defaultValue: MauInputDefaultValues.TRIPLE_BOOLEAN
  },
  GROUPS: {
    title: 'Grupos',
    name: 'groups',
    relationship_id_name: 'group_id',
    entityName: 'documentGroup',
    required: false,
    display: DisplayFunctions.getNameArray,
    mauInputType: MauInputTypes.MULTISELECTOR,
    defaultValue: MauInputDefaultValues.MULTISELECTOR
  },
  USERS: {
    title: 'Abogados',
    name: 'lawyers',
    relationship_id_name: 'user_id',
    entityName: 'documentUser',
    required: false,
    display: DisplayFunctions.getPersonaArray,
    mauInputType: MauInputTypes.MULTISELECTOR,
    defaultValue: MauInputDefaultValues.MULTISELECTOR
  },
  CLIENT: {
    title: 'Cliente',
    name: 'client',
    relationship_id_name: 'client_id',
    display: DisplayFunctions.getPersona,
    required: false,
    mauInputType: MauInputTypes.SELECTOR,
    defaultValue: MauInputDefaultValues.SELECTOR
  },
  GRANTORS: {
    title: 'Otorgantes',
    name: 'grantors',
    entityName: 'documentGrantor',
    relationship_id_name: 'grantor_id',
    display: DisplayFunctions.getPersonaArray, // TODO create new property for single item display function
    required: false,
    mauInputType: MauInputTypes.MULTISELECTOR,
    defaultValue: MauInputDefaultValues.MULTISELECTOR
  },
  COMMENTS: {
    title: 'Comentarios',
    name: 'document_comments',
    entityName: 'documentComment',
    relationship_id_name: 'comment_id',
    display: DisplayFunctions.getArrayLength, // TODO create new property for single item display function
    required: false
  },
  DOCUMENT_STATUS: {
    title: 'Status',
    name: 'document_status',
    relationship_id_name: 'document_status_id',
    display: DisplayFunctions.getNameFromObject,
    required: false,
    mauInputType: MauInputTypes.SELECTOR,
    defaultValue: MauInputDefaultValues.SELECTOR
  },
  PROPERTY: {
    title: 'Predio',
    name: 'property',
    display: DisplayFunctions.getValue,
    required: false,
    mauInputType: MauInputTypes.TEXT,
    defaultValue: MauInputDefaultValues.TEXT
  },
  DOCUMENT_PROPERTIES: {
    title: 'Propiedades',
    name: 'properties',
    display: DisplayFunctions.getArrayLength,
    required: false,
    entityName: 'documentProperty',
    mauInputType: MauInputTypes.MULTISELECTOR,
    defaultValue: MauInputDefaultValues.MULTISELECTOR
  },
  DATE: {
    title: 'Fecha',
    name: 'date',
    display: DisplayFunctions.getDate,
    required: true,
    mauInputType: MauInputTypes.DATE,
    defaultValue: MauInputDefaultValues.DATE
  }
}
