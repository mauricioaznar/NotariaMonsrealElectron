<template>
  <div>
    <mau-data-table :apiUrl="apiUrl"
                    :tableFields="tableFields"
                    :editFunction="canEdit ? editFunction : null"
                    :viewFunction="viewFunction"
    ></mau-data-table>
  </div>
</template>

<script>
  // import {mapState} from 'vuex'
  import PropertiesReference from '../PropertiesReference'
  import DataTable from '../../../../components/mau-components/mau-data-table/MauDataTable'
  import TableFields from '../TableFields'

  export default {
    name: 'GroupList',
    data () {
      return {
        tableFields: TableFields
      }
    },
    computed: {

    },
    props: {
      apiUrl: {
        type: String,
        required: true
      },
      canEdit: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    components: {
      DataTable
    },
    created () {
    },
    methods: {
      viewFunction: function (expenseType) {
        this.$router.push({
          name: 'ViewGroup',
          params: { id: expenseType[PropertiesReference.ID.name] }})
      },
      editFunction: function (expenseType) {
        this.$router.push(
          {name: 'EditGroup',
            params: { id: expenseType[PropertiesReference.ID.name] }})
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
