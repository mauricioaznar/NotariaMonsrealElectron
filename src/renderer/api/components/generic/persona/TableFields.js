import PersonaPropertiesReference from 'src/api/propertiesReference/PersonaPropertiesReference'
// import DisplayFunctions from 'src/services/functions/displayFunctions'
export default [
  {
    name: PersonaPropertiesReference.NAME.name,
    title: PersonaPropertiesReference.NAME.title,
    sortField: PersonaPropertiesReference.NAME.name,
    filter: true
  },
  {
    name: PersonaPropertiesReference.EMAIL.name,
    title: PersonaPropertiesReference.EMAIL.title,
    sortField: PersonaPropertiesReference.EMAIL.name,
    filter: true
  },
  {
    name: PersonaPropertiesReference.PHONE.name,
    title: PersonaPropertiesReference.PHONE.title,
    sortField: PersonaPropertiesReference.PHONE.name,
    filter: true
  }
]

