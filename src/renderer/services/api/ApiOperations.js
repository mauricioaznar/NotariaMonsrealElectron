import Vue from 'vue'
import {getHeaders} from 'renderer/config'
import ApiDomain from 'renderer/services/api/ApiDomain'

export function get (url) {
  return Vue.http.get(url, {headers: getHeaders()}).then(getServerResponseData)
}

export function getById (url, id) {
  return Vue.http.get(url + id, {headers: getHeaders()}).then(getServerResponseData)
}

export function edit (url, id, object) {
  return Vue.http.put(url + id, object, {headers: getHeaders()}).then(getServerResponseData)
}

export function create (url, object) {
  return Vue.http.post(url, object, {headers: getHeaders()}).then(getServerResponseData)
}

export function del (url, id, object) {
  object.active = -1
  return Vue.http.put(url + id, object, {headers: getHeaders()}).then(getServerResponseData)
}

export function generateToken (credentials) {
  return Vue.http.post(ApiDomain + 'auth/login', credentials, {headers: getHeaders()}).then(getServerResponseData)
}

function getServerResponseData (response) {
  let responseDataData = (((response) && response.data) && response.data.data)
  if (!responseDataData) {
    return null
  }
  return responseDataData
}

export function catchError (e) {
  console.log('error')
  return e
}
export default {
  getById: getById,
  get: get,
  edit: edit,
  create: create,
  del: del,
  generateToken: generateToken
}
