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
  import {ApiRouteTypes, getApiRoute} from 'renderer/api/ApiRoutes'
  import EntityTypes from 'renderer/api/EntityTypes'
  import TableFields from 'renderer/api/components/generic/bagOrder/BagOrderTableFields'
  import PropertiesReference from 'renderer/api/propertiesReference/BagOrderPropertiesReference'
  export default {
    name: 'ListBagOrderSale',
    data () {
      return {
        apiUrl: getApiRoute(EntityTypes.BAG_ORDER_SALE, ApiRouteTypes.LIST),
        canEdit: true,
        tableFields: TableFields
      }
    },
    components: {
    },
    methods: {
      viewFunction: function (expenseType) {
        this.$router.push({
          name: 'ViewBagOrderSale',
          params: { id: expenseType[PropertiesReference.ID.name] }})
      },
      editFunction: function (expenseType) {
        this.$router.push(
          {name: 'EditBagOrderSale',
            params: { id: expenseType[PropertiesReference.ID.name] }})
      }
    }
  }
</script>
