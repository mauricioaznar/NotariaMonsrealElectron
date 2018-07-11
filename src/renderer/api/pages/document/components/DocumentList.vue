<template>
  <div>
    <mau-data-table :apiUrl="apiUrl"
                    :tableFields="tableFields"
                    :editFunction="canEdit ? editFunction : null"
                    :viewFunction="viewFunction"
                    :rowClassFunction="rowClassFunction"
                    :hasSearchBar="hasSearchBar"
                    :hasPagination="hasPagination"
    >
      <template slot="search" slot-scope="params">
        <div>
          <advanced-filter @filter="params.onFilterSet"></advanced-filter>
        </div>
      </template>
    </mau-data-table>
  </div>
</template>


<script>
  import PropertiesReference from '../PropertiesReference'
  import TableFields from '../TableFields'
  import AdvancedFilter from 'renderer/components/mau-components/mau-filters/AdvancedFilter.vue'
  export default {
    name: 'ProductAssemblyList',
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
      },
      hasPagination: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      hasSearchBar: {
        type: Boolean,
        default: function () {
          return true
        }
      }
    },
    components: {
      AdvancedFilter
    },
    created () {
    },
    methods: {
      search: function () {

      },
      viewFunction: function (entity) {
        this.$router.push({
          name: 'ViewDocument',
          params: { id: entity[PropertiesReference.ID.name] }})
      },
      editFunction: function (entity) {
        this.$router.push(
          {name: 'EditDocument',
            params: { id: entity[PropertiesReference.ID.name] }})
      },
      rowClassFunction: function (documentObj, index) {
        let rowClass = ''
        return rowClass
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
