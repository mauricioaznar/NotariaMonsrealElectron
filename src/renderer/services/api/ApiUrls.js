import ApiDomain from 'renderer/services/api/ApiDomain'

function createBaseUrl (path) {
  return ApiDomain + path
}

function createListUrl (entityTypeApiName) {
  return createBaseUrl(entityTypeApiName) + '/list'
}

function createSearchUrl (entityApiName, isHistoryMode = false) {
  let url = createBaseUrl(entityApiName) + '/search'
  if (isHistoryMode) {
    url = url + '?recent=me'
  }
  return url
}

export default {
  createBaseUrl: createBaseUrl,
  createListUrl: createListUrl,
  createSearchUrl: createSearchUrl
}
