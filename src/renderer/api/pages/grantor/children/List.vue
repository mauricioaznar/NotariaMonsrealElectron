<template>
  <div>
    <mau-crud-list :entityName="'Grantor'">
      <grantor-list :apiUrl="apiUrl" :canEdit="canEdit"></grantor-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import GrantorList from '../components/GrantorList.vue'
  import GenericApiUrls from 'renderer/services/api/GenericApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'ListGrantor',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.GRANTOR.apiName, {paginate: true}),
        canEdit: true
      }
    },
    components: {
      GrantorList
    }
  }
</script>
