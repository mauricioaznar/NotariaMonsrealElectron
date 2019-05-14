import Vue from 'vue'
function createSearchUrl (entityApiName, isHistoryMode = false) {
  let url = Vue.http.options.root + '/' + entityApiName + '/search'
  if (isHistoryMode) {
    url = url + '?recent=me'
  }
  return url
}

function createMyDataUrl () {
  return Vue.http.options.root + '/data/me'
}

function createExportExcelUrl () {
  return Vue.http.options.root + 'export/excel?'
}

export default {
  createSearchUrl: createSearchUrl,
  createMyDataUrl: createMyDataUrl,
  createExportExcelUrl: createExportExcelUrl
}
