<template>
    <div>
        <mau-data-table :apiUrl="apiUrl"
                        :tableFields="tableFields"
                        :editFunction="editFunction ? editFunction : null"
                        :viewFunction="viewFunction ? viewFunction : null"
        >
        </mau-data-table>
    </div>
</template>

<script>
  import TableFields from './TableFields'
  export default {
    name: 'MauPersonaDataTable',
    data () {
      return {
        tableFields: TableFields
      }
    },
    components: {
    },
    props: {
      apiUrl: {
        type: String,
        required: true
      },
      viewFunction: {
        type: Function,
        default: function () {
          return null
        }
      },
      editFunction: {
        type: Function,
        default: function () {
          return null
        }
      }
    }
  }
</script>
