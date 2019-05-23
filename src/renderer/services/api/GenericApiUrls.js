import Vue from 'vue'

function createListUrl (entityEndpointName, options) {
  let paginateQuery = (options && options.paginate && options.paginate === true) ? 'paginate=true ' : 'paginate=false'
  let filterLikeQuery = (options && options.filterLikes) !== undefined ? getFilterLikesQuery(options.filterLikes) : ''
  let filterExactQuery = (options && options.filterExacts) !== undefined ? getFilterExactsQuery(options.filterExacts) : ''
  let filterEntityQuery = (options && options.filterEntities) !== undefined ? getFilterEntitiesQuery(options.filterEntities) : ''
  return Vue.http.options.root + '/' + entityEndpointName + '/list?' + paginateQuery + filterLikeQuery + filterExactQuery + filterEntityQuery
  function getFilterLikesQuery (filterLikes) {
    let filterLikeQuery = ''
    let i = 1
    for (let filterLikeObjectKey in filterLikes) {
      if (filterLikes.hasOwnProperty(filterLikeObjectKey)) {
        let filterLikeObjectValue = filterLikes[filterLikeObjectKey]
        if (i <= 5) {
          filterLikeQuery += '&filter_like_' + i + '=' + filterLikeObjectKey + '&filter_like_value_' + i + '=' + filterLikeObjectValue
        }
        i++
      }
    }
    return filterLikeQuery
  }
  function getFilterExactsQuery (filterExacts) {
    let filterExactQuery = ''
    let i = 1
    for (let filterExactObjectKey in filterExacts) {
      if (filterExacts.hasOwnProperty(filterExactObjectKey)) {
        let filterExactObjectValue = filterExacts[filterExactObjectKey]
        if (i <= 5) {
          filterExactQuery += '&filter_exact_' + i + '=' + filterExactObjectKey + '&filter_exact_value_' + i + '=' + filterExactObjectValue
        }
        i++
      }
    }
    return filterExactQuery
  }
  function getFilterEntitiesQuery (filterEntities) {
    let filterEntitiesQuery = ''
    let i = 1
    for (let entityName in filterEntities) {
      if (filterEntities.hasOwnProperty(entityName)) {
        let entityValues = filterEntities[entityName]
        for (let entityPropertyName in entityValues) {
          if (entityValues.hasOwnProperty(entityPropertyName)) {
            let entityValue = entityValues[entityPropertyName]
            if (i <= 5) {
              filterEntitiesQuery += '&filter_entity_' + i + '=' + entityName + '&filter_entity_property_' + i + '=' + entityPropertyName + '&filter_entity_value_' + i + '=' + entityValue
              i++
            }
          }
        }
      }
    }
    return filterEntitiesQuery
  }
}

function createEntityIdUrl (entityEndpointName, id) {
  return Vue.http.options.root + '/' + entityEndpointName + '/' + id
}

export default {
  createListUrl: createListUrl,
  createEntityIdUrl: createEntityIdUrl
}
