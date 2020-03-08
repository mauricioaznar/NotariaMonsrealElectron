export default {
  en: {
    messages: {
      folio_year_unique: field => `Folio is not unique for the selected date`,
      folio_tome_unique: field => `Folio is not unique for the selected tome`,
      numeric: field => `Folio must consist only of numbers`

    }
  },
  es: {
    messages: {
      folio_year_unique: field => `El folio no es unico para la fecha seleccionada`,
      folio_tome_unique: field => `El folio no es unico para la el tomo seleccionado`,
      numeric: field => `El valor del campo ${field} solo acepta numeros`
    }
  }
}
