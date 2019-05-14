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
export default {
  folioYearUnique: folioYearUnique
}
