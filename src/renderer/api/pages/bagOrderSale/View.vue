<template>
  <div class="container">
    <mau-crud-view>
      <template slot-scope="params">
        <mau-entity-view :entity="params.entity" :propertiesReference="propertiesReference"></mau-entity-view>
      </template>
    </mau-crud-view>
  </div>
</template>

<script>
  import PropertiesReference from 'renderer/api/propertiesReference/BagOrderPropertiesReference'
  import OrderSalePropertiesReference from 'renderer/api/propertiesReference/BagOrderSalePropertiesReference'
  export default {
    name: 'ViewBagOrderSale',
    data () {
      return {
        propertiesReference: [
          PropertiesReference.NAME,
          PropertiesReference.BAGS,
          OrderSalePropertiesReference.CLIENT
        ]
      }
    },
    props: {
      id: null
    }
  }
</script>
