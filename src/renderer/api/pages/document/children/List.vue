<template>
  <div>
    <mau-crud-list :entityName="'Document'">
      <document-list :apiUrl="apiUrl" :canEdit="canEdit"></document-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import DocumentList from '../components/DocumentList.vue'
  import SpecificApiUrls from 'renderer/services/api/SpecificApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'ListDocument',
    data () {
      return {
        apiUrl: SpecificApiUrls.createSearchUrl(EntityTypes.DOCUMENT.apiName),
        canEdit: true
      }
    },
    components: {
      DocumentList
    }
  }
</script>
