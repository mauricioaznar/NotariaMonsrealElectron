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
    name: 'ViewAppointment',
    data () {
      return {
        propertiesReference: [
          PropertiesReference.NAME,
          PropertiesReference.DESCRIPTION,
          PropertiesReference.CLIENTS,
          PropertiesReference.USERS,
          PropertiesReference.START_DATE,
          PropertiesReference.END_DATE,
          PropertiesReference.ROOM
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
