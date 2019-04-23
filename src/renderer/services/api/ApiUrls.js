import ApiDomain from 'renderer/services/api/ApiDomain'

function createBaseUrl (suffix) {
  return ApiDomain + suffix
}

function createListUrl (entityTypeApiName) {
  return createBaseUrl(entityTypeApiName) + '/list'
}

export default {
  createBaseUrl: createBaseUrl,
  createListUrl: createListUrl
}
