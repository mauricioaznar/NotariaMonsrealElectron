export default {
  en: {
    messages: {
      object_required: field => `this ${field} is mandatory`,
      array_required: field => `this ${field} is mandatory`,
      folio_year_unique: field => `Folio is not unique for the selected date`
    }
  },
  es: {
    messages: {
      object_required: field => `El campo ${field} es obligatorio`,
      array_required: field => `El campo ${field} es obligatorio`,
      folio_year_unique: field => `El folio no es unico para la fecha seleccionada`
    }
  }
}
