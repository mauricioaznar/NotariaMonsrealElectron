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
                <div class="col-md-3 d-flex justify-content-sm-between flex-sm-column flex-md-row align-items-stretch align-content-stretch">
                    <mau-modal class="mau-modal" buttonType="icon" buttonClass="mau-modal-button btn btn-submit fa fa-gear h-100 d-flex flex-column justify-content-center" id="advancedSearchModal" ref="advancedSearchModal" title="Busqueda Avanzada">
                        <!--<div class="form-group mb-3">-->
                            <!--<label>Operacion</label>-->
                            <!--<mau-form-input-select-static-->
                                    <!--v-model="operation"-->
                                    <!--:availableObjects="availableOperations"-->
                                    <!--:displayProperty="'name'"-->
                                    <!--:name="'operation_filter'"-->
                                    <!--:error="''"-->

                                    <!--:trackBy="'id'"-->
                            <!--&gt;</mau-form-input-select-static>-->
                        <!--</div>-->
                        <!--<div class="form-group mb-3">-->
                            <!--<label>Entidad</label>-->
                            <!--<mau-form-input-select-static-->
                                    <!--v-model="entitySelectedFilter"-->
                                    <!--:availableObjects="entityFilters"-->
                                    <!--:displayProperty="'text'"-->
                                    <!--:name="'entity_filter'"-->
                                    <!--:error="''"-->
                                    <!--:trackBy="'value'"-->
                            <!--&gt;-->
                            <!--</mau-form-input-select-static>-->
                        <!--</div>-->
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
                    </mau-modal>
                    <button class="btn-submit btn btn-primary w-100" @click="doFilter">Buscar</button>
                    <button class="btn-submit btn btn-excel w-100" :class="{disabled: !startDateExcel && !endDateExcel}" :href="excelRoute + 'start_date=' + startDateExcel + '&end_date=' + endDateExcel">
                        Excel
                    </button>
                </div>
            </div>
        </div>
</template>

<script>
  import VueSelect from 'vue-select'
  import moment from 'moment'
  import SpecificApiUrls from 'renderer/services/api/SpecificApiUrls'
  import isDefined from 'renderer/services/common/isDefined'
  import EntityTypes from 'renderer/api/EntityTypes'
  import GenericApiOperations from 'renderer/services/api/GenericApiOperations'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
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
        excelRoute: SpecificApiUrls.createExportExcelUrl(),
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
        GenericApiOperations.list(EntityTypes.DOCUMENT_STATUS.apiName, {paginate: false}),
        GenericApiOperations.list(EntityTypes.DOCUMENT_TYPE.apiName, {paginate: false}),
        GenericApiOperations.list(EntityTypes.OPERATION.apiName, {paginate: false})
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
      VueSelect
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
        this.$refs.advancedSearchModal.close()
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

<style lang="scss">
    .disabled {
        pointer-events: none;
        cursor: default;
        opacity: 0.6;
    }

    .mau-modal .mau-modal-button {
        background-color: #999999;
        color: #ffffff;
    }

    .mau-modal:hover .mau-modal-button{
        color: #333333;
    }
</style>
