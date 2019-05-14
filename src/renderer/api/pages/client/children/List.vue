<template>
  <div>
    <mau-crud-list :entityName="'Client'">
      <client-list :apiUrl="apiUrl" :canEdit="canEdit"></client-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import ClientList from '../components/ClientList.vue'
  import GenericApiUrls from 'renderer/services/api/GenericApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'ListClient',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.CLIENT.apiName, {paginate: true}),
        canEdit: true
      }
    },
    components: {
      ClientList
    }
  }
</script>
