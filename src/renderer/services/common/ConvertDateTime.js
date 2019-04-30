import moment from 'moment'
function convertDateTimeToDate (dateTime) {
  return moment(dateTime).format('YYYY-MM-DD')
}

function convertDateTimeToTime (dateTime) {
  return moment(dateTime).format('HH:mm:ss')
}

function convertDateTimeToHour (dateTime) {
  return moment(dateTime).format('HH')
}

function convertDateTimeToMinute (dateTime) {
  return moment(dateTime).format('mm')
}
export default {
  date: convertDateTimeToDate,
  time: convertDateTimeToTime,
  hour: convertDateTimeToHour,
  minute: convertDateTimeToMinute
}
