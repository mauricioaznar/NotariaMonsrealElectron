<template>
  <div>
    <mau-crud-list :entityName="'Document'">
      <document-list :apiUrl="apiUrl" :canEdit="canEdit"></document-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import DocumentList from '../components/DocumentList.vue'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'ListDocument',
    data () {
      return {
        apiUrl: ApiUrls.createBaseUrl(EntityTypes.DOCUMENT.apiName) + '/search',
        canEdit: true
      }
    },
    components: {
      DocumentList
    }
  }
</script>
