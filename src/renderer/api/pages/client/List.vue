<template>
  <div>
    <mau-crud-list>
      <persona-data-table :apiUrl="apiUrl"
                      :editFunction="editFunction"
                      :viewFunction="viewFunction"
      >
      </persona-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import {ApiRoutes} from 'src/api/ApiRoutes'
  import GlobalEntityIdentifier from 'src/services/api/GlobalEntityIdentifier'
  import PersonaDataTable from 'src/api/components/generic/persona/PersonaDataTable.vue'
  export default {
    name: 'ListClient',
    data () {
      return {
        apiUrl: ApiRoutes.client.list
      }
    },
    components: {
      PersonaDataTable
    },
    methods: {
      viewFunction: function (client) {
        this.$router.push({
          name: 'ViewClient',
          params: { id: client[GlobalEntityIdentifier] }})
      },
      editFunction: function (client) {
        this.$router.push({
          name: 'EditClient',
          params: { id: client[GlobalEntityIdentifier] }})
      }
    }
  }
</script>
