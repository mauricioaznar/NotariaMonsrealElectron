import Vue from 'vue'

function createListUrl (entityEndpointName, options) {
  let paginateQuery = (options && options.paginate && options.paginate === true) ? 'paginate=true ' : 'paginate=false'
  let filterLikeQuery = (options && options.filterLikes) !== undefined ? getFilterLikeQuery(options.filterLikes) : ''
  let filterExactQuery = (options && options.filterExacts) !== undefined ? getFilterExactQuery(options.filterExacts) : ''
  let filterEntityQuery = (options && options.filterEntity) !== undefined ? getFilterEntityQuery(options.filterEntity) : ''
  return Vue.http.options.root + '/' + entityEndpointName + '/list?' + paginateQuery + filterLikeQuery + filterExactQuery + filterEntityQuery
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
        let filterExactObjectValue = filterExacts[filterExactObjectKey]
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

function createEntityIdUrl (entityEndpointName, id) {
  return Vue.http.options.root + '/' + entityEndpointName + '/' + id
}

export default {
  createListUrl: createListUrl,
  createEntityIdUrl: createEntityIdUrl
}
