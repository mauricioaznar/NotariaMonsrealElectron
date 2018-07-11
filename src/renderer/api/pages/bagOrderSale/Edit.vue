<template>
  <div class="container">
    <mau-crud-edit
      :id="id"
      :entityApiName="entityApiName"
      :relatedEntitiesRoutes="relatedEntitiesRoutes"
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback">
      <template slot-scope="params">
        <bag-order-form
          :initialObject="params.entity"
          :saveFunction="params.saveFunction"
          :salesMode="true"
        >
        </bag-order-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import PropertiesReference from 'renderer/api/propertiesReference/BagOrderPropertiesReference'
  import BagOrderForm from 'renderer/api/components/generic/bagOrder/BagOrderForm.vue'
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import {ApiRoutes} from 'renderer/api/ApiRoutes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'EditOrderSale',
    data () {
      return {
        relatedEntitiesRoutes: {
          [PropertiesReference.BAGS.entityName]: ApiRoutes[EntityTypes.BAG_ORDER_SALE_PRODUCT.apiName]
        },
        entityApiName: EntityTypes.BAG_ORDER_SALE.apiName,
        hostRelationshipIdName: 'bag_order_sale_id'
      }
    },
    props: {
      id: null
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
