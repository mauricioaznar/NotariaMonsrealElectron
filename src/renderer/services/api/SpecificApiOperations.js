import Vue from 'vue'
import GenericApiOperations from 'renderer/services/api/GenericApiOperations'

export function getNotifications () {
  return Vue.http.get('notifications').then(GenericApiOperations.getServerResponseData)
}

export function resetUserPassword (email) {
  return Vue.http.post('user/reset/password', {email: email}).then(GenericApiOperations.getServerResponseData)
}

export default {
  getNotifications: getNotifications,
  resetUserPassword: resetUserPassword
}
