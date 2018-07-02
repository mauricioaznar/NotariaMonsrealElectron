<template>
  <div class="container">
    <mau-crud-edit
      :id="id"
      :entityApiName="entityApiName"
      :callback="callback"
      :relatedEntitiesRoutes="relatedEntitiesRoutes"
      :relationshipIdName="hostRelationshipIdName"
    >
      <template slot-scope="params">
        <transaction-form
          :initialObject="params.entity"
          :saveFunction="params.saveFunction"
          :expenseMode="true"
        >
        </transaction-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import TransactionForm from '../../components/generic/transaction/TransactionForm.vue'
  import TransactionPropertiesReference from 'src/api/propertiesReference/TransactionPropertiesReference'
//  import {ApiRoutes} from 'src/api/ApiRoutes'
  import RouteObjectHelper from 'src/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'src/api/EntityTypes'
  import ChildTypes from 'src/api/ChildTypes'
  export default {
    name: 'EditExpense',
    data () {
      return {
        relatedEntitiesRoutes: {},
        entityApiName: EntityTypes.EXPENSE.apiName,
        hostRelationshipIdName: TransactionPropertiesReference.ID.relationship_id_name
      }
    },
    props: {
      id: null
    },
    components: {
      TransactionForm
    },
    methods: {
      callback: function () {
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.EXPENSE, ChildTypes.LIST)})
      }
    }
  }
</script>
