import GenericApiOperations from 'renderer/services/api/GenericApiOperations'
import moment from 'moment'

let folioYearUnique = {
  getMessage: field => `The field ${field} has to be unique on that year`,
  validate: (value, params, data) => {
    let endpointName = params.endpointName
    let initialFolio = params.initialFolio ? Number(params.initialFolio) : ''
    let folio = params.document.folio ? Number(params.document.folio) : ''
    let initialDate = params.initialDate
    let date = params.document.date
    let initialDateYear = moment(initialDate, 'YYYY-MM-DD HH:mm:ss').isValid() ? moment(initialDate, 'YYYY-MM-DD HH:mm:ss').year() : ''
    let dateYear = moment(date, 'YYYY-MM-DD HH:mm:ss').isValid() ? moment(date, 'YYYY-MM-DD HH:mm:ss').year() : ''
    return new Promise(resolve => {
      if (folio !== '' && initialFolio !== '' && initialDateYear !== '' && dateYear !== '' && folio === initialFolio && initialDateYear === dateYear) {
        resolve({
          valid: true
        })
      } else {
        if (folio === '' || dateYear === '') {
          resolve({
            valid: false
          })
        } else {
          let filterExactObject = {'folio': folio}
          GenericApiOperations.list(endpointName, {filterExacts: filterExactObject}).then(result => {
            let documents = result
            let isValueUsed = false
            documents.forEach(documentObj => {
              let documentObjDateYear = moment(documentObj.date, 'YYYY-MM-DD HH:mm:ss') ? moment(documentObj.date, 'YYYY-MM-DD HH:mm:ss').year() : ''
              if (documentObjDateYear === dateYear) {
                isValueUsed = true
              }
            })
            resolve({
              valid: !isValueUsed,
              data: value !== 'trigger' ? undefined : { message: 'Not this value' }
            })
          })
        }
      }
    })
  }
}

let folioTomeUnique = {
  getMessage: field => `The field ${field} has to be unique on that tome`,
  validate: (value, params, data) => {
    let initialFolio = params.initialValues && params.initialValues.folio ? params.initialValues.folio : ''
    let folio = params.document.folio ? params.document.folio : ''
    let initialTome = params.initialValues && params.initialValues.tome ? params.initialValues.tome : ''
    let tome = params.document.tome ? params.document.tome : ''
    // let id = params.initialValues && params.initialValues.id ? params.initialValues.id : null
    let date = params.document.date ? moment(params.document.date, 'YYYY-MM-DD') : ''
    let initialDate = params.initialValues && params.initialValues.date ? moment(params.initialValues.date, 'YYYY-MM-DD') : ''
    let endpointName = params.endpointName
    return new Promise(resolve => {
      let isFolioSame = folio !== '' && initialFolio !== '' && folio === initialFolio
      let isTomeSame = tome !== '' && initialTome !== '' && tome === initialTome
      let isDateValid = date.isValid()
      let isInitialDateValid = initialDate.isValid()
      let isDateSame = isDateValid && isInitialDateValid && date.isSame(initialDate, 'year')
      if (isFolioSame && isTomeSame && isDateSame) {
        resolve({
          valid: true
        })
      } else {
        if (folio === '' || tome === '' || !date.isValid()) {
          resolve({
            valid: false
          })
        }
        let filterExactObject = {'tome': tome, 'folio': folio}
        GenericApiOperations.list(endpointName, {filterExacts: filterExactObject}).then(result => {
          let filteredDocuments = result.filter(documentObj => {
            let documentDate = moment(documentObj.date, 'YYYY-MM-DD')
            return documentDate.isSame(date, 'year')
          })
          let isValueUsed = filteredDocuments.length > 0
          resolve({
            valid: !isValueUsed,
            data: value !== 'trigger' ? undefined : { message: 'Not this value' }
          })
        })
      }
    })
  }
}

export default {
  folioYearUnique: folioYearUnique,
  folioTomeUnique: folioTomeUnique
}
