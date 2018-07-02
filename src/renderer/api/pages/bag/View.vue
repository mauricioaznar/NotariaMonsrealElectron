<template>
  <div class="container">
    <mau-crud-view>
      <template slot-scope="params">
        <mau-entity-view :entity="params.entity"
                         :propertiesReference="propertiesReference">
        </mau-entity-view>
      </template>
    </mau-crud-view>
  </div>
</template>

<script>
  import PropertiesReference from 'src/api/propertiesReference/BagPropertiesReference'
  export default {
    name: 'ViewBag',
    data () {
      return {
        propertiesReference: [
          PropertiesReference.NAME,
          PropertiesReference.DESCRIPTION,
          PropertiesReference.CURRENT_UNIT_PRICE,
          PropertiesReference.CURRENT_GROUP_WEIGHT,
          PropertiesReference.WIDTH,
          PropertiesReference.LENGTH,
          PropertiesReference.BAG_TYPE,
          PropertiesReference.BAG_PACKING
        ]
      }
    },
    components: {
    },
    props: {
      id: null
    }
  }
</script>

<style lang="scss">

</style>
