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
                :adjustmentMode="true"
        >
        </bag-order-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import PropertiesReference from 'renderer/api/propertiesReference/BagOrderPropertiesReference'
  import BagOrderForm from 'renderer/api/components/generic/bagOrder/BagOrderForm.vue'
  import {ApiRoutes} from 'renderer/api/ApiRoutes'
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'CreateBagOrderAdjustment',
    data () {
      return {
        relatedEntitiesRoutes: {
          [PropertiesReference.BAGS.entityName]: ApiRoutes[EntityTypes.BAG_ORDER_ADJUSTMENT_PRODUCT.apiName]
        },
        entityApiName: EntityTypes.BAG_ORDER_ADJUSTMENT.apiName,
        hostRelationshipIdName: 'bag_order_adjustment_id'
      }
    },
    components: {
      BagOrderForm
    },
    methods: {
      callback: function () {
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.BAG_ORDER_ADJUSTMENT, ChildTypes.LIST)})
      }
    }
  }
</script>
