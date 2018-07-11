import ConvertDateTimeTo from 'renderer/services/common/ConvertDateTimeTo'
import moment from 'moment'
moment.locale('es')

export default {
  getBooleanIcon: function (booleanValue) {
    if (booleanValue === 1) {
      return '<span class="ld-yes"></span>'
    } else if (booleanValue === 0) {
      return '<span class="ld-no"></span>'
    } else {
      return '<span class="ld-na"></span>'
    }
  },
  getNameFromObject: function (object) {
    return object ? object.name : ''
  },
  getArrayLength: function (array) {
    return array ? array.length : ''
  },
  getValue: function (value) {
    return value
  },
  getPersona: function (value) {
    let temp = value ? value.fullname : ''
    return temp
  },
  getPersonaArray: function (array) {
    let personaArrayHtmlString = '<ul>'
    for (let i = 0; i < array.length; i++) {
      personaArrayHtmlString += '<li>' + array[i].name + ' ' + (array[i].lastname || '') + '</li>'
    }
    return personaArrayHtmlString + '</ul>'
  },
  getNameArray: function (array) {
    let personaArrayHtmlString = '<ul>'
    for (let i = 0; i < array.length; i++) {
      personaArrayHtmlString += '<li>' + array[i].name + '</li>'
    }
    return personaArrayHtmlString + '</ul>'
  },
  getDate: function (date) {
    let momentDate = moment(date)
    return momentDate.isValid() ? moment(date).format('dddd DD [de] MMMM [del] YYYY') : '-'
  },
  getTimeFromDateTime: function (date) {
    return ConvertDateTimeTo.time(date)
  },
  getDateFromDateTime: function (date) {
    return ConvertDateTimeTo.date(date)
  },
  getDateYear: function (date) {
    return moment(date).format('Y')
  },
  calculateAttachmentCompletion: function (attachmentArray) {

  },
  getProductWithQuantity: function (array) {
    let personaArrayHtmlString = '<ul>'
    for (let i = 0; i < array.length; i++) {
      personaArrayHtmlString += '<li class="mau-text-left">' + array[i].name + ' - ' + array[i].pivot.quantity + '</li>'
    }
    return personaArrayHtmlString + '</ul>'
  }
}
