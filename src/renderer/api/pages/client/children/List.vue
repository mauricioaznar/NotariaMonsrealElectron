<template>
  <div>
    <mau-crud-list :entityName="'Client'">
      <client-list :apiUrl="apiUrl" :canEdit="canEdit"></client-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import ClientList from '../components/ClientList.vue'
  import {ApiRoutes} from 'renderer/api/ApiRoutes'
  export default {
    name: 'ListClient',
    data () {
      return {
        apiUrl: ApiRoutes.client.list,
        canEdit: true
      }
    },
    components: {
      ClientList
    }
  }
</script>
