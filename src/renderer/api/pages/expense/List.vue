<template>
  <div>
    <mau-crud-list :entityName="'Expense'">
      <mau-data-table :apiUrl="apiUrl"
                      :tableFields="tableFields"
                      :editFunction="canEdit ? editFunction : null"
                      :viewFunction="viewFunction"
      >
      </mau-data-table>
    </mau-crud-list>
  </div>
</template>

<script>
  import {ApiRoutes} from 'src/api/ApiRoutes'
  import TransactionPropertiesReference from 'src/api/propertiesReference/TransactionPropertiesReference'
  import DisplayFunctions from 'src/services/api/DisplayFunctions'
  import GlobalEntityIdentifier from 'src/services/api/GlobalEntityIdentifier'
  export default {
    name: 'ListExpense',
    data () {
      return {
        apiUrl: ApiRoutes.expense.list,
        canEdit: true,
        tableFields: [
          {
            name: TransactionPropertiesReference.COST.name,
            title: TransactionPropertiesReference.COST.title,
            sortField: TransactionPropertiesReference.COST.name,
            filter: true
          },
          {
            name: TransactionPropertiesReference.DATE.name,
            title: TransactionPropertiesReference.DATE.title,
            sortField: TransactionPropertiesReference.DATE.name,
            callback: TransactionPropertiesReference.DATE.display,
            filter: true,
            default: true
          },
          {
            name: TransactionPropertiesReference.SUPPLIER.name,
            title: TransactionPropertiesReference.SUPPLIER.title,
            callback: DisplayFunctions.getNameFromObject
          },
          {
            name: TransactionPropertiesReference.EXPENSE_TYPE.name,
            title: TransactionPropertiesReference.EXPENSE_TYPE.title,
            callback: DisplayFunctions.getNameFromObject
          }
        ]
      }
    },
    components: {
    },
    methods: {
      viewFunction: function (entity) {
        this.$router.push({
          name: 'ViewExpense',
          params: { id: entity[GlobalEntityIdentifier] }})
      },
      editFunction: function (entity) {
        this.$router.push(
          {name: 'EditExpense',
            params: { id: entity[GlobalEntityIdentifier] }})
      }
    }
  }
</script>
