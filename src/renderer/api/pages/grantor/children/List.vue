<template>
  <div>
    <mau-crud-list :entityName="'Grantor'">
      <grantor-list :apiUrl="apiUrl" :canEdit="canEdit"></grantor-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import GrantorList from '../components/GrantorList.vue'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'ListGrantor',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.GRANTOR.apiName),
        canEdit: true
      }
    },
    components: {
      GrantorList
    }
  }
</script>
