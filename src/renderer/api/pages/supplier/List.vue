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
  import PersonaDataTable from 'src/api/components/generic/persona/PersonaDataTable.vue'
  import GlobalEntityIdentifier from 'src/services/api/GlobalEntityIdentifier'
  export default {
    name: 'ListSupplier',
    data () {
      return {
        apiUrl: ApiRoutes.supplier.list
      }
    },
    components: {
      PersonaDataTable
    },
    methods: {
      viewFunction: function (supplier) {
        this.$router.push({
          name: 'ViewSupplier',
          params: { id: supplier[GlobalEntityIdentifier] }})
      },
      editFunction: function (supplier) {
        this.$router.push({
          name: 'EditSupplier',
          params: { id: supplier[GlobalEntityIdentifier] }})
      }
    }
  }
</script>
