<template>
  <div>
    <mau-crud-list :entityName="'Document'">
      <document-list :apiUrl="apiUrl"
                     :canEdit="canEdit"
                     :hasPagination="hasPagination"
                     :hasSearchBar="hasSearchBar"
      >
      </document-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import DocumentList from '../components/DocumentList.vue'
  import {getApiRoute, ApiRouteTypes} from 'renderer/api/ApiRoutes'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'HistoryDocument',
    data () {
      return {
        apiUrl: getApiRoute(EntityTypes.DOCUMENT, ApiRouteTypes.HISTORY),
        canEdit: true,
        hasPagination: false,
        hasSearchBar: false
      }
    },
    created () {
    },
    components: {
      DocumentList
    }
  }
</script>
