<template>
  <div class="container">
    <mau-crud-create
      :entityApiName="entityApiName"
      :callback="callback"
      :relationshipIdName="hostRelationshipIdName"
      :relatedEntitiesRoutes="relatedEntitiesRoutes"
    >
      <template slot-scope="params">
        <transaction-form
                :saveFunction="params.save"
                :expenseMode="true"
        >
        </transaction-form>
      </template>
    </mau-crud-create>
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
    name: 'CreateExpense',
    data () {
      return {
        hostRelationshipIdName: TransactionPropertiesReference.ID.relationship_id_name,
        entityApiName: EntityTypes.EXPENSE.apiName,
        relatedEntitiesRoutes: {}
      }
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
