<template>
    <div v-if="!loading">
            <div class="form-group form-row">
                <mau-form-input-text
                        v-model="filteredText"
                        type="text"
                        @keyup.enter.native="doFilter"
                        placeholder="Buscar documentos..."
                        class="col-sm-12 col-md-6"
                        :name="'inputText'"
                        :error="''"
                        :initialValue="''"
                                >
                </mau-form-input-text>
                <mau-form-input-date
                        :inputType="'range'"
                        v-model="rangeDate"
                        class="col-sm-12 col-md-3"
                        :initialValue="rangeDate"
                        :error="''"
                        :name="'inputDate'"
                >
                </mau-form-input-date>
                <button class="btn btn-submit btn-options col-sm-12 col-md-1"
                       aria-controls="collapse4"
                       v-b-modal.advancedSearchModal
                >
                    <span class="fa fa-gear"></span>
                </button>
                <button class="btn-submit btn btn-primary col-md-1 col-sm-12" @click="doFilter">Buscar</button>
                <button class="btn-submit btn btn-excel col-md-1 col-sm-12" :class="{disabled: !startDateExcel && !endDateExcel}" :href="excelRoute + 'start_date=' + startDateExcel + '&end_date=' + endDateExcel">
                    Excel
                </button>
            </div>
            <b-modal class="mau-custom-modal" id="advancedSearchModal" ref="advancedSearchModal" title="Busqueda Avanzada">
                <div class="form-group mb-3">
                    <label>Operacion</label>
                    <mau-form-input-select-object-static
                            v-model="operation"
                            :availableObjects="availableOperations"
                            :displayProperty="'name'"
                            :name="'operation_filter'"
                            :error="''"
                            :trackBy="'id'"
                    ></mau-form-input-select-object-static>
                </div>
                <div class="form-group mb-3">
                    <label>Entidad</label>
                    <mau-form-input-select-object-static
                            v-model="entitySelectedFilter"
                            :availableObjects="entityFilters"
                            :displayProperty="'text'"
                            :name="'entity_filter'"
                            :error="''"
                            :trackBy="'value'"
                    >
                    </mau-form-input-select-object-static>
                </div>
                <div class="mb-3">
                    <label>Filtros de documento</label>
                    <mau-form-group-check-boxes
                            v-model="documentSelectedFilter"
                            :availableObjects="documentFilters"
                            :initialObjects="documentFilters"
                            :display="'text'"
                    >
                    </mau-form-group-check-boxes>
                </div>
                <div class="mb-3">
                    <label>Tipo</label>
                    <mau-form-group-radio
                            v-model="documentTypeSelectedFilter"
                            :availableObjects="availableDocumentTypes"
                            :initialObject="{}"
                            :name="'DocumentTypes'"
                            :display="'name'"
                            :error="''"
                    >
                    </mau-form-group-radio>
                </div>
                <div class="mb-3">
                    <label>Status</label>
                    <mau-form-group-radio
                            v-model="documentStatusSelectedFilter"
                            :availableObjects="availableDocumentStatuses"
                            :initialObject="{}"
                            :name="'DocumentStatuses'"
                            :display="'name'"
                            :error="''"
                    >
                    </mau-form-group-radio>
                </div>
                <div class="mb-3">
                    <label>Filtros de contacto</label>
                    <mau-form-group-check-boxes
                            v-model="contactSelectedFilter"
                            :availableObjects="contactFilters"
                            :initialObjects="contactFilters"
                            :display="'text'"
                    >
                    </mau-form-group-check-boxes>
                </div>
                <button class="btn-submit btn btn-primary col-sm-12" @click="doFilter">Buscar</button>
                <div slot="modal-footer" class="no-padding">
                </div>
            </b-modal>
        </div>
</template>

<script>
  import VueSelect from 'vue-select'
  import moment from 'moment'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import isDefined from 'renderer/services/common/isDefined'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ApiOperations from 'renderer/services/api/ApiOperations'
  import MauFormGroupCheckBoxes from 'renderer/components/mau-components/mau-form-groups/MauFormGroupCheckBoxes'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
  import MauFormGroupRadio from 'renderer/components/mau-components/mau-form-groups/MauFormGroupRadio.vue'
  export default {
    name: 'AdvancedFilter',
    data () {
      return {
        filteredText: '',
        rangeDate: moment().startOf('year').format('L') + ' al ' + moment().startOf('year').add(1, 'years').format('L'),
        clients: '',
        documentStatus: '',
        documentType: '',
        operation: {},
        attachments: '',
        documentStatusSelectedFilter: '',
        documentTypeSelectedFilter: '',
        documentSelectedFilter: ['folio', 'file_number', 'tome', 'electronic_folio', 'property'],
        entitySelectedFilter: {},
        contactSelectedFilter: ['phone', 'email', 'fullname'],
        excelRoute: ApiUrls.createBaseUrl('export/excel?'),
        groups: '',
        endDateExcel: moment().startOf('year').add(1, 'years').format('L'),
        startDateExcel: moment().startOf('year').format('L'),
        grantors: '',
        users: '',
        documentFilters: [
          {text: 'Folio', value: 'folio'},
          {text: 'Numero de acta', value: 'file_number'},
          {text: 'Tomo/Libro', value: 'tome'},
          {text: 'Folio electronico', value: 'electronic_folio'},
          {text: 'Predio', value: 'property'}
        ],
        entityFilters: [
          {text: 'Cliente', value: 'client'},
          {text: 'Abogado', value: 'lawyer'},
          {text: 'Otorgante', value: 'grantor'}
        ],
        contactFilters: [
          {text: 'Nombre', value: 'fullname'},
          {text: 'Telefono', value: 'phone'},
          {text: 'Email', value: 'email'}
        ],
        availableDocumentStatuses: [],
        availableDocumentTypes: [],
        availableOperations: [],
        showCollapse: false,
        loading: true
      }
    },
    created () {
      Promise.all([
        ApiOperations.get(ApiUrls.createListUrl(EntityTypes.DOCUMENT_STATUS.apiName) + '?paginate=false'),
        ApiOperations.get(ApiUrls.createListUrl(EntityTypes.DOCUMENT_TYPE.apiName) + '?paginate=false'),
        ApiOperations.get(ApiUrls.createListUrl(EntityTypes.OPERATION.apiName) + '?paginate=false')
      ]).then(result => {
        this.availableDocumentStatuses = result[0]
        this.availableDocumentTypes = result[1]
        this.availableOperations = result[2]
      }).finally(() => {
        this.loading = false
      })
    },
    computed: {
    },
    components: {
      VueSelect,
      MauFormGroupCheckBoxes,
      MauFormGroupRadio
    },
    methods: {
      getRangeDate: function () {
        let startDate
        let endDate
        let includesSeparator = this.rangeDate.includes(' al ')
        if (includesSeparator) {
          let rangeDate = this.rangeDate.split(' al ')
          startDate = rangeDate[0]
          endDate = rangeDate[1]
        }
        return {endDate, startDate}
      },
      getSearchQuery: function () {
        let {endDate, startDate} = this.getRangeDate()
        const searchQuery =
          {
            q: this.filteredText,
            start_date: startDate,
            end_date: endDate
          }
        // Number
        let documentTypeValue = this.documentTypeSelectedFilter ? this.documentTypeSelectedFilter[GlobalEntityIdentifier] : ''
        if (documentTypeValue !== '') {
          searchQuery.document_type_id = documentTypeValue
        }
        let documentValue = this.documentSelectedFilter
        if (isDefined(documentValue) && documentValue.length > 0) {
          searchQuery.document_filters = documentValue.map(documentFilterObj => { return documentFilterObj['value'] }).join('|')
        }
        let contactValue = this.contactSelectedFilter
        if (isDefined(contactValue) && documentValue.length > 0) {
          searchQuery.contact_filters = contactValue.map(documentFilterObj => { return documentFilterObj['value'] }).join('|')
        }
        // String
        let entityValue = this.entitySelectedFilter ? this.entitySelectedFilter['value'] : ''
        if (entityValue !== '') {
          searchQuery.entity_filters = entityValue
        }
        let operationValue = this.operation ? this.operation[GlobalEntityIdentifier] : ''
        if (operationValue !== '') {
          searchQuery.operation_id = operationValue
        }
        let statusValue = this.documentStatusSelectedFilter ? this.documentStatusSelectedFilter[GlobalEntityIdentifier] : ''
        if (statusValue !== '') {
          searchQuery.document_status_id = statusValue
        }
        return searchQuery
      },
      doFilter () {
        let searchQuery = this.getSearchQuery()
        console.log(searchQuery)
        this.$refs.advancedSearchModal.hide()
        this.$emit('filter', searchQuery)
      }
    },
    mounted () {
    },
    watch: {
      rangeDate: function () {
        let {startDate, endDate} = this.getRangeDate()
        this.startDateExcel = startDate
        this.endDateExcel = endDate
      }
    }
  }
</script>

<style lang="scss" scoped>
    .disabled {
        pointer-events: none;
        cursor: default;
        opacity: 0.6;
    }

    input {
        border-width: 0px !important;
    }
</style>
