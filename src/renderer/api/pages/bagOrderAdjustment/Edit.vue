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
          :adjustmentMode="true"
          :initialObject="params.entity"
          :saveFunction="params.saveFunction">
        </bag-order-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import PropertiesReference from 'src/api/propertiesReference/BagOrderPropertiesReference'
  import BagOrderForm from 'src/api/components/generic/bagOrder/BagOrderForm.vue'
  import RouteObjectHelper from 'src/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'src/api/EntityTypes'
  import {ApiRoutes} from 'src/api/ApiRoutes'
  import ChildTypes from 'src/api/ChildTypes'
  export default {
    name: 'EditBagOrderAdjustment',
    data () {
      return {
        relatedEntitiesRoutes: {
          [PropertiesReference.BAGS.entityName]: ApiRoutes[EntityTypes.BAG_ORDER_ADJUSTMENT_PRODUCT.apiName]
        },
        entityApiName: EntityTypes.BAG_ORDER_ADJUSTMENT.apiName,
        hostRelationshipIdName: 'bag_order_adjustment_id'
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
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.BAG_ORDER_ADJUSTMENT, ChildTypes.LIST)})
      }
    }
  }
</script>
