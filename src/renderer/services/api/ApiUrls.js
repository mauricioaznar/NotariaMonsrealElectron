import ApiDomain from 'renderer/services/api/ApiDomain'

function createBaseUrl (suffix) {
  return ApiDomain + suffix
}

function createListUrl (entityTypeApiName) {
  return createBaseUrl(entityTypeApiName) + '/list'
}

function createCurrentUserUrl () {
  return createBaseUrl('auth/user')
}

function createCurrentUserResetPasswordUrl () {
  return createBaseUrl('user/reset/password')
}

function createNotificationsUrl () {
  return createBaseUrl('notifications')
}

export default {
  createBaseUrl: createBaseUrl,
  createListUrl: createListUrl,
  createCurrentUserUrl: createCurrentUserUrl,
  createCurrentUserResetPasswordUrl: createCurrentUserResetPasswordUrl,
  createNotificationsUrl: createNotificationsUrl
}
