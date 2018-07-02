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
  import TransactionPropertiesReference from 'src/api/propertiesReference/TransactionPropertiesReference'
  export default {
    name: 'ViewExpense',
    data () {
      return {
        propertiesReference: [
          TransactionPropertiesReference.COST,
          TransactionPropertiesReference.OBSERVATION,
          TransactionPropertiesReference.EXPENSE_TYPE,
          TransactionPropertiesReference.DATE,
          TransactionPropertiesReference.SUPPLIER
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
