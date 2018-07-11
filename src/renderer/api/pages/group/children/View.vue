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
  import PropertiesReference from '../PropertiesReference'
  export default {
    name: 'ViewGroup',
    data () {
      return {
        propertiesReference: [
          PropertiesReference.NAME,
          PropertiesReference.USER,
          PropertiesReference.USERS
        ]
      }
    },
    props: {
      id: null
    }
  }
</script>
