import Vue from 'vue'
import {getHeaders} from 'renderer/config'
import ApiDomain from 'renderer/services/api/ApiDomain'

export function get (url, filterLikes, filterExacts, filterEntity) {
  let filterLikeQuery = filterLikes !== undefined ? getFilterLikeQuery(filterLikes) : ''
  let filterExactQuery = filterExacts !== undefined ? getFilterExactQuery(filterExacts) : ''
  let filterEntityQuery = filterEntity !== undefined ? getFilterEntityQuery(filterEntity) : ''
  return Vue.http.get(url + filterLikeQuery + filterExactQuery + filterEntityQuery, {headers: getHeaders()}).then(getServerResponseData)
  function getFilterLikeQuery (filterLikes) {
    let filterLikeQuery = ''
    let i = 0
    for (let filterLikeObjectKey in filterLikes) {
      if (filterLikes.hasOwnProperty(filterLikeObjectKey)) {
        let filterLikeObjectValue = filterLikes[filterLikeObjectKey]
        if (i === 0) {
          filterLikeQuery += '&filter=' + filterLikeObjectKey + '&filter_value=' + filterLikeObjectValue
        } else if (i === 1) {
          filterLikeQuery += '&filter_2=' + filterLikeObjectKey + '&value_2=' + filterLikeObjectValue
        } else if (i === 2) {
          filterLikeQuery += '&filter_3=' + filterLikeObjectKey + '&value_3=' + filterLikeObjectValue
        }
        i++
      }
    }
    return filterLikeQuery
  }
  function getFilterExactQuery (filterExacts) {
    let filterExactQuery = ''
    let i = 0
    for (let filterExactObjectKey in filterExacts) {
      if (filterExacts.hasOwnProperty(filterExactObjectKey)) {
        let filterExactObjectValue = filterLikes[filterExactObjectKey]
        if (i === 0) {
          filterExactQuery += '&filter_exact=' + filterExactObjectKey + '&filter_exact_value=' + filterExactObjectValue
        } else if (i === 1) {
          filterExactQuery += '&filter_exact_2=' + filterExactObjectKey + '&filter_exact_value_2=' + filterExactObjectValue
        } else if (i === 2) {
          filterExactQuery += '&filter_exact_3=' + filterExactObjectKey + '&filter_exact_value_3=' + filterExactObjectValue
        }
        i++
      }
    }
    return filterExactQuery
  }
  function getFilterEntityQuery (filterEntity) {
    return filterEntity !== '' ? '&filter_entity=' + filterEntity : ''
  }
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
