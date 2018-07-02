<template>
  <div class="container">
    <mau-crud-create
      :entityApiName="entityApiName"
      :relatedEntitiesRoutes="relatedEntitiesRoutes"
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback"
    >
      <template slot-scope="params">
        <bag-order-form
          :saveFunction="params.save"
          :salesMode="true"
        ></bag-order-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import PropertiesReference from 'src/api/propertiesReference/BagOrderPropertiesReference'
  import {ApiRoutes} from 'src/api/ApiRoutes'
  import RouteObjectHelper from 'src/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'src/api/EntityTypes'
  import ChildTypes from 'src/api/ChildTypes'
  import BagOrderForm from 'src/api/components/generic/bagOrder/BagOrderForm.vue'
  export default {
    name: 'CreateBagOrderSale',
    data () {
      return {
        relatedEntitiesRoutes: {
          [PropertiesReference.BAGS.entityName]: ApiRoutes[EntityTypes.BAG_ORDER_SALE_PRODUCT.apiName]
        },
        entityApiName: EntityTypes.BAG_ORDER_SALE.apiName,
        hostRelationshipIdName: 'bag_order_sale_id'
      }
    },
    components: {
      BagOrderForm
    },
    methods: {
      callback: function () {
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.BAG_ORDER_SALE, ChildTypes.LIST)})
      }
    }
  }
</script>
