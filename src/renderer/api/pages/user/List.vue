<template>
  <div>
    <mau-crud-list :entityName="'User'">
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :editFunction="canEdit ? editFunction : null"
                      :viewFunction="viewFunction"
      ></mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import {ApiRoutes} from 'src/api/ApiRoutes'
  import PropertiesReference from './PropertiesReference'
  import TableFields from './TableFields'
  export default {
    name: 'ListUser',
    data () {
      return {
        apiUrl: ApiRoutes.user.list,
        canEdit: true,
        tableFields: TableFields
      }
    },
    components: {
    },
    methods: {
      viewFunction: function (client) {
        this.$router.push({
          name: 'ViewUser',
          params: { id: client[PropertiesReference.ID.name] }})
      },
      editFunction: function (client) {
        this.$router.push(
          {name: 'EditUser',
            params: { id: client[PropertiesReference.ID.name] }})
      }
    }
  }
</script>
