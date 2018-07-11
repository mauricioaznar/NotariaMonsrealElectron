<template>
  <div>
    <mau-crud-list :entityName="'Document'">
      <document-list :apiUrl="apiUrl" :canEdit="canEdit"></document-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import DocumentList from '../components/DocumentList.vue'
  import {ApiRoutes} from 'renderer/api/ApiRoutes'
  export default {
    name: 'ListDocument',
    data () {
      return {
        apiUrl: ApiRoutes.document.search,
        canEdit: true
      }
    },
    components: {
      DocumentList
    }
  }
</script>
