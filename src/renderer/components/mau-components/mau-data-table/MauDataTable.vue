<template>
  <div class="vue-data-table">
    <div v-if="hasSearchBar">
      <slot name="search" :onFilterSet="onFilterSet">
        <filter-bar
                :tableFields="tableFields"
                @filter="onFilterSet">
        </filter-bar>
      </slot>
    </div>
    <div v-if="hasPagination" v-show="!isTableLoading" :class="{'is-loaded': !isTableLoading}" class="d-flex mau-fade-component justify-content-end my-2">
      <vuetable-pagination-info
              ref="paginationInfo"
              :info-template="'{to} pagina(s), Total {total} resultados'"
              :no-data-template="'No hay resultados con los parametros dados'"
      >      // <----
        ></vuetable-pagination-info>
    </div>
    <mau-spinner
            v-show="isTableLoading"
            :medium="true"
    >
    </mau-spinner>
    <div v-show="!isTableLoading" :class="{'is-loaded': !isTableLoading}" class="vue-table mau-fade-component table-responsive">
      <vuetable ref="vuetable"
                :apiUrl="apiUrl"
                :apiMode="apiMode"
                :fields="tableFields"
                :no-data-template="''"
                :css="css.table"
                v-bind:paginationPath="paginationPath"
                :http-options="httpOptions"
                :appendParams="appendParams"
                :perPage="perPage"
                :row-class="newRowClassFunction"
                :query-params="{sort: 'sort', page: 'page', perPage: 'per_page'}"
                @vuetable:pagination-data="onPaginationData"
                @vuetable:loading="onLoading"
                @vuetable:load-success="onLoadSuccess"
      >
        <template slot="actions" slot-scope="props">
          <div class="custom-actions d-flex justify-content-around">
            <div v-if="viewFunction" class="icon-button view-button custom-action"
                    @click="viewFunction(props.rowData)">
              <span class="fa fa-fw fa-eye"></span>
            </div>
            <div v-if="editFunction" class="ml-2 icon-button edit-button custom-action"
                    @click="editFunction(props.rowData)">
              <span class="fa fa-fw fa-edit"></span>
            </div>
          </div>
        </template>
      </vuetable>
    </div>
    <div v-show="!isTableLoading" :class="{'is-loaded': !isTableLoading}" class="d-flex mau-fade-component justify-content-center mb-4">
      <vuetable-pagination ref="pagination"
                           v-if="hasPagination"
                           :css="css.pagination"
                           :onEachSide="onEachSide"
                           @vuetable-pagination:change-page="onChangePage"
      >

      </vuetable-pagination>
    </div>
  </div>
</template>

<script>
  import Vuetable from 'vuetable-2/src/components/Vuetable'
  import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
  import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
  import FilterBar from '../mau-filters/FilterBar.vue'
  import ItemsPerPage from './datatable-components/ItemsPerPage.vue'
  import ItemsPerPageDefinition from './data/items-per-page-definition'
  import Vue from 'vue'
  import DataTableStyles from './data/data-table-styles'
  import DisplayFunctions from 'renderer/services/api/DisplayFunctions'
  import isEntityEditable from 'renderer/services/api/isEntityEditable'

  export default {
    name: 'MauDataTable',
    components: {
      FilterBar,
      Vuetable,
      VuetablePagination,
      VuetablePaginationInfo,
      ItemsPerPage
    },
    data () {
      return {
        isTableLoading: true,
        perPage: 50,
        colorClasses: {},
        httpOptions: '',
        apiMode: true,
        appendParams: {},
        filterBarParams: {},
        paginationPath: 'links.pagination',
        itemsPerPage: ItemsPerPageDefinition,
        css: DataTableStyles
      }
    },
    created () {
      this.httpOptions = {headers: Vue.http.headers['common']}
      this.setAppendParams()
    },
    props: {
      apiUrl: {
        type: String
      },
      rowClassFunction: {
        type: Function,
        default: function (entityObj) {
          return ''
        }
      },
      tableFields: {
        type: Array,
        required: true
      },
      onEachSide: {
        type: Number,
        default () {
          return 2
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
      },
      editFunction: {
        type: Function
      },
      viewFunction: {
        type: Function
      },
      filterExact: {
        type: Object,
        validator: function (value) {
          let size = 0
          for (let key in value) {
            if (value.hasOwnProperty(key)) {
              size++
            }
          }
          if (size !== 1) console.error('Filter Exact lenght is bigger than 1')
          return (size === 1)
        }
      }
    },
    methods: {
      newRowClassFunction: function (entityObj) {
        let rowClass = this.rowClassFunction(entityObj)
        if (!isEntityEditable(entityObj)) {
          rowClass += ' edit-button-disabled'
        }
        return rowClass
      },
      onAction (action, data, index) {
        console.log('action: ' + action, data, index)
      },
      onFilterSet (filterBarParams) {
        this.filterBarParams = filterBarParams
        this.setAppendParams()
      },
      setAppendParams: function () {
        let appendParams = this.filterBarParams
        for (let filterExactKey in this.filterExact) {
          if (this.filterExact.hasOwnProperty(filterExactKey)) {
            appendParams['filter_exact_1'] = filterExactKey
            appendParams['filter_exact_value_1'] = this.filterExact[filterExactKey]
          }
        }
        this.appendParams = appendParams
        Vue.nextTick(() => this.$refs.vuetable.refresh())
      },
      onItemsPerPage (itemsPerPageValue) {
        this.perPage = itemsPerPageValue
        Vue.nextTick(() => this.$refs.vuetable.refresh())
      },
      onPaginationData (paginationData) {
        this.$refs.pagination.setPaginationData(paginationData)
        this.$refs.paginationInfo.setPaginationData(paginationData)
      },
      onLoadSuccess: function () {
        this.isTableLoading = false
      },
      onLoading: function () {
        this.isTableLoading = true
      },
      onChangePage (page) {
        this.$refs.vuetable.changePage(page)
      },
      getBooleanIcon: DisplayFunctions.getBooleanIcon,
      getNameFromObject: DisplayFunctions.getNameFromObject,
      getArrayLength: DisplayFunctions.getArrayLength,
      getValue: DisplayFunctions.getValue,
      getPersona: DisplayFunctions.getPersona,
      getTimeFromDateTime: DisplayFunctions.getTimeFromDateTime,
      getDateFromDateTime: DisplayFunctions.getDateFromDateTime,
      getDate: DisplayFunctions.getDate,
      getDateYear: DisplayFunctions.getDateYear,
      getNameArray: DisplayFunctions.getNameArray,
      getPersonaArray: DisplayFunctions.getPersonaArray
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/variables";

  @media (max-width: 1258px) {
    .pagination-link-btn:first-child, .pagination-link-btn:last-child {
      display: none;
    }

    .pagination-link-btn:nth-child(2) {
      border-top-left-radius: $btn-border-radius !important;
      border-bottom-left-radius: $btn-border-radius !important;
    }

    .pagination-link-btn:nth-last-child(2) {
      border-top-right-radius: $btn-border-radius !important;
      border-bottom-right-radius: $btn-border-radius !important;
    }
  }
  .custom-action {
    min-width: 40px;
  }
  @media (max-width: 576px) {
    .hide-not-focused-btn:not(.focus) {
      display: none;
    }
  }
</style>
