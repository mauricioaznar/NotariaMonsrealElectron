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
  import PropertiesReference from './PropertiesReference'
  export default {
    name: 'ViewGrantor',
    data () {
      return {
        propertiesReference: [
          PropertiesReference.COST,
          PropertiesReference.NICKNAME,
          PropertiesReference.PHONE,
          PropertiesReference.EMAIL,
          PropertiesReference.ZIPCODE,
          PropertiesReference.ADDRESS1,
          PropertiesReference.CITY,
          PropertiesReference.COUNTRY,
          PropertiesReference.CLIENTS
        ]
      }
    },
    props: {
      id: null
    }
  }
</script>

<style lang="scss">

</style>
