<template>
  <div>
    <mau-crud-list>
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :editFunction="canEdit ? editFunction : null"
                      :viewFunction="viewFunction"
      ></mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import {ApiRouteTypes, getApiRoute} from 'src/api/ApiRoutes'
  import EntityTypes from 'src/api/EntityTypes'
  import TableFields from 'src/api/components/generic/bagOrder/BagOrderTableFields'
  import PropertiesReference from 'src/api/propertiesReference/BagOrderPropertiesReference'
  export default {
    name: 'ListBagOrderProduction',
    data () {
      return {
        apiUrl: getApiRoute(EntityTypes.BAG_ORDER_PRODUCTION, ApiRouteTypes.LIST),
        canEdit: true,
        tableFields: TableFields
      }
    },
    components: {
    },
    methods: {
      viewFunction: function (expenseType) {
        this.$router.push({
          name: 'ViewBagOrderProduction',
          params: { id: expenseType[PropertiesReference.ID.name] }})
      },
      editFunction: function (expenseType) {
        this.$router.push(
          {name: 'EditBagOrderProduction',
            params: { id: expenseType[PropertiesReference.ID.name] }})
      }
    }
  }
</script>
