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
  import BagOrderAdjustmentTableFields from 'src/api/pages/bagOrderAdjustment/BagOrderAdjustmentTableFields'
  import GlobalEntityIdentifier from 'src/services/api/GlobalEntityIdentifier'
  export default {
    name: 'ListBagOrderAdjustment',
    created () {
    },
    data () {
      return {
        apiUrl: getApiRoute(EntityTypes.BAG_ORDER_ADJUSTMENT, ApiRouteTypes.LIST),
        canEdit: true,
        tableFields: BagOrderAdjustmentTableFields
      }
    },
    components: {
    },
    methods: {
      viewFunction: function (expenseType) {
        this.$router.push({
          name: 'ViewBagOrderAdjustment',
          params: { id: expenseType[GlobalEntityIdentifier] }})
      },
      editFunction: function (expenseType) {
        this.$router.push(
          {name: 'EditBagOrderAdjustment',
            params: { id: expenseType[GlobalEntityIdentifier] }})
      }
    }
  }
</script>
