<template>
  <div>
    <mau-crud-list :entityName="'Client'">
      <client-list :apiUrl="apiUrl" :canEdit="canEdit"></client-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import ClientList from '../components/ClientList.vue'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'ListClient',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.CLIENT.apiName),
        canEdit: true
      }
    },
    components: {
      ClientList
    }
  }
</script>
