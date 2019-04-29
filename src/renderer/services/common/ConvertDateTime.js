import moment from 'moment'
function convertDateTimeToDate (date) {
  return moment(date).format('YYYY-MM-DD')
}

function convertDateTimeToTime (date) {
  return moment(date).format('HH:mm')
}

function convertDateTimeToHour (date) {
  return moment(date).format('HH')
}

function convertDateTimeToMinute (date) {
  return moment(date).format('mm')
}
export default {
  date: convertDateTimeToDate,
  time: convertDateTimeToTime,
  hour: convertDateTimeToHour,
  minute: convertDateTimeToMinute
}
