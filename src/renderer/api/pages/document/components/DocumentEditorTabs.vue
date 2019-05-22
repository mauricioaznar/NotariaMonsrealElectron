<template>
  <div v-if="!loading">
      <div class="generales">
        <h3 class="mb-3">Generales</h3>
        <div class="form-group">
          <mau-form-input-number
                  :name="PropertiesReference.FILE_NUMBER.name"
                  :error="errors.has(PropertiesReference.FILE_NUMBER.name) ? errors.first(PropertiesReference.FILE_NUMBER.name) : ''"
                  :label="PropertiesReference.FILE_NUMBER.title"
                  :data-vv-as="PropertiesReference.FILE_NUMBER.title"
                  v-model="document.fileNumber"
                  :type="'regular'"
                  :initialValue="initialValues[PropertiesReference.FILE_NUMBER.name]"
                  v-validate="'required'"
                  :placeholder="'Ejemplo: 123'"
          >
          </mau-form-input-number>
        </div>
        <div class="form-group">
          <mau-form-input-date
                  :label="PropertiesReference.DATE.title"
                  :name="PropertiesReference.DATE.name"
                  :data-vv-as="PropertiesReference.DATE.title"
                  v-model="document.date"
                  :initialValue="initialValues[PropertiesReference.DATE.name]"
                  :error="errors.has(PropertiesReference.DATE.name) ? errors.first(PropertiesReference.DATE.name) : ''"
                  v-validate="{
                    required: true
                  }"
          >
          </mau-form-input-date>
        </div>
        <div class="form-group">
          <mau-form-input-text
                  :name="PropertiesReference.TOME.name"
                  :error="errors.has(PropertiesReference.TOME.name) ? errors.first(PropertiesReference.TOME.name) : ''"
                  :label="PropertiesReference.TOME.title"
                  v-model="document.tome"
                  :data-vv-as="PropertiesReference.TOME.title"
                  :initialValue="initialValues[PropertiesReference.TOME.name]"
                  :placeholder="'Ejemplo: XV-12'"
                  v-validate="'required|alpha_dash'"
          >
          </mau-form-input-text>
        </div>
        <div class="form-group">
          <mau-form-input-number
                  :name="PropertiesReference.FOLIO.name"
                  :error="errors.has(PropertiesReference.FOLIO.name) ? errors.first(PropertiesReference.FOLIO.name) : ''"
                  :label="PropertiesReference.FOLIO.title"
                  :data-vv-as="PropertiesReference.FOLIO.title"
                  v-model="document.folio"
                  :type="'regular'"
                  :initialValue="initialValues[PropertiesReference.FOLIO.name]"
                  :placeholder="'Ejemplo: 12345'"
                  v-validate="{
                    required: true,
                    numeric: true,
                    folio_year_unique: {
                      endpointName: documentsEndpointName,
                      document: document,
                      initialFolio: initialValues[PropertiesReference.FOLIO.name],
                      initialDate: initialValues[PropertiesReference.DATE.name]
                    }
                  }"
          >
          </mau-form-input-number>
        </div>
        <div class="form-group">
          <label>{{PropertiesReference.DOCUMENT_TYPE.title}}</label>
          <mau-form-group-radio
                  :id="PropertiesReference.DOCUMENT_TYPE.name"
                  v-model="document.documentType"
                  v-validate="'required'"
                  :name="PropertiesReference.DOCUMENT_TYPE.name"
                  :data-vv-name="PropertiesReference.DOCUMENT_TYPE.name"
                  :initialObject="initialValues[PropertiesReference.DOCUMENT_TYPE.name]"
                  :availableObjects="availableDocumentTypes"
                  :display="'name'"
                  :error="errors.has(PropertiesReference.DOCUMENT_TYPE.name) ? errors.first(PropertiesReference.DOCUMENT_TYPE.name) : ''"
          >
          </mau-form-group-radio>
        </div>
        <div class="form-group">
          <div v-show="document.documentType">
            <mau-form-input-select-dynamic
                    :key="document.documentType ? document.documentType['id'] : 0"
                    v-show="document.documentType"
                    :ref="PropertiesReference.OPERATIONS.name"
                    v-model="document.operations"
                    :label="PropertiesReference.OPERATIONS.title"
                    :name="PropertiesReference.OPERATIONS.name"
                    :apiOperationOptions="operationsApiOperationOptions"
                    :endpointName="operationsEndpointName"
                    :displayProperty="'name'"
                    :multiselect="true"
                    :initialObjects="initialValues[PropertiesReference.OPERATIONS.name]"
                    v-validate="'required'"
                    :error="errors.has(PropertiesReference.OPERATIONS.name) ? errors.first(PropertiesReference.OPERATIONS.name) : ''"
            >
            </mau-form-input-select-dynamic>
          </div>
          <div v-if="!document.documentType" class="mau-text-center">
            <p>Se necesita seleccionar un tipo de documento</p>
          </div>
        </div>
        <div class="form-group">
          <div class="document_type_other" v-if="isOtherOperationSelected">
            <label>Escriba el nombre del contrato</label>
            <b-form-input
                    v-model="document.documentTypeOther"
            >
            </b-form-input>
          </div>
        </div>
        <div class="form-group">
          <div class="document_status">
            <label>{{PropertiesReference.DOCUMENT_STATUS.title}}</label>
            <mau-form-group-radio
                    :id="PropertiesReference.DOCUMENT_STATUS.name"
                    v-model="document.documentStatus"
                    v-validate="'required'"
                    :name="PropertiesReference.DOCUMENT_STATUS.name"
                    :data-vv-name="PropertiesReference.DOCUMENT_STATUS.name"
                    :initialObject="initialValues[PropertiesReference.DOCUMENT_STATUS.name]"
                    :availableObjects="availableDocumentStatuses"
                    :display="'name'"
                    :error="errors.has(PropertiesReference.DOCUMENT_STATUS.name) ? errors.first(PropertiesReference.DOCUMENT_STATUS.name) : ''"
            >
            </mau-form-group-radio>
          </div>
        </div>
        <div class="form-group">
          <mau-form-input-triple-boolean
                  v-model="document.moneyLaundering"
                  :initialValue="initialValues[PropertiesReference.MONEY_LAUNDERING.name]"
                  :name="PropertiesReference.MONEY_LAUNDERING.name"
                  :label="PropertiesReference.MONEY_LAUNDERING.title"
                  :error="errors.has(PropertiesReference.MONEY_LAUNDERING.name) ? errors.first(PropertiesReference.MONEY_LAUNDERING.name) : ''"
                  v-validate="'required'"
          >
          </mau-form-input-triple-boolean>
        </div>
        <div class="form-group">
          <div class="money_laundering_expiration_date" v-show="moneyLaunderingApplies">
            <mau-form-input-date
                    :name="PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.name"
                    :initialValue="initialValues[PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.name]"
                    :label="PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.title"
                    v-model="document.moneyLaunderingExpirationDate"
                    v-validate="moneyLaunderingApplies ? 'required' : ''"
                    :error="errors.has(PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.name) ? errors.first(PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.name) : ''"
            >
            </mau-form-input-date>
          </div>
        </div>
        <div class="form-group">
          <label>{{PropertiesReference.DOCUMENT_PROPERTIES.title}}</label>
          <document-properties
                  :initialProperties="initialValues[PropertiesReference.DOCUMENT_PROPERTIES.name]"
                  v-model="document.documentProperties"
          >
          </document-properties>
        </div>
        <div class="form-group">
          <div>
            <mau-form-input-triple-boolean
                    v-model="document.marginalNotes"
                    :initialValue="initialValues[PropertiesReference.MARGINAL_NOTES.name]"
                    :error="errors.has(PropertiesReference.MARGINAL_NOTES.name) ? errors.first(PropertiesReference.MARGINAL_NOTES.name) : ''"
                    :label="PropertiesReference.MARGINAL_NOTES.title"
                    :name="PropertiesReference.MARGINAL_NOTES.name"
                    v-validate="'required'"
            >
            </mau-form-input-triple-boolean>
          </div>
        </div>
        <div class="form-group">
          <div class="d-flex justify-content-start">
            <label>{{PropertiesReference.CLIENT.title}}</label>
            <mau-modal
                    :ref="'createClientModal'"
                    :id="'createClientModal'"
                    title="Crear un cliente"
                    :buttonType="'icon'"
                    buttonClass="fa fa-plus ml-2 fa-lg"
            >
              <create-client :onTheFly="onTheFlyCreateClient" :key="clientsCreated">
              </create-client>
            </mau-modal>
          </div>
          <mau-form-input-select-dynamic
                  :endpointName="clientsEndpointName"
                  :initialObject="initialValues[PropertiesReference.CLIENT.name]"
                  :displayProperty="'fullname'"
                  v-model="document.client"
                  :key="clientsCreated"
                  :name="PropertiesReference.CLIENT.name"
                  :data-vv-as="PropertiesReference.CLIENT.title"
                  v-validate="'required'"
                  :error="errors.has(PropertiesReference.CLIENT.name) ? errors.first(PropertiesReference.CLIENT.name) : ''"
          >
          </mau-form-input-select-dynamic>
        </div>
        <div class="form-group">
          <div class="d-flex justify-content-start">
            <label>{{PropertiesReference.GRANTORS.title}}</label>
            <mau-modal
                    :ref="'createGrantorModal'"
                    :id="'createGrantorModal'"
                    title="Crear un otorgante"
                    :buttonType="'icon'"
                    buttonClass="fa fa-plus ml-2 fa-lg"
            >
              <create-grantor :onTheFly="onTheFlyCreateGrantor" :key="grantorsCreated">
              </create-grantor>
            </mau-modal>
          </div>
          <mau-form-input-select-dynamic
                  :endpointName="grantorsEndpointName"
                  :name="PropertiesReference.GRANTORS.name"
                  :displayProperty="'fullname'"
                  :key="grantorsCreated"
                  :initialObjects="initialValues[PropertiesReference.GRANTORS.name]"
                  v-model="document.grantors"
                  :multiselect="true"
                  :error="errors.has(PropertiesReference.GRANTORS.name) ? errors.first(PropertiesReference.GRANTORS.name) : ''"
          >
          </mau-form-input-select-dynamic>
        </div>
        <div class="form-group">
          <mau-form-input-select-dynamic
                  :endpointName="groupsEndpointName"
                  :initialObjects="initialValues[PropertiesReference.GROUPS.name]"
                  :name="PropertiesReference.GRANTORS.name"
                  :error="errors.has(PropertiesReference.GROUPS.name) ? errors.first(PropertiesReference.GROUPS.name) : ''"
                  :displayProperty="'name'"
                  :multiselect="true"
                  :label="PropertiesReference.GROUPS.title"
                  v-model="document.groups"
          >
          </mau-form-input-select-dynamic>
        </div>
      </div>
      <div class="Anexos">
        <h3 class="mb-3">Anexos</h3>
        <div class="form-group">
          <mau-form-input-triple-boolean
                  v-show="document.documentType"
                  v-model="document.identifications"
                  :error="errors.has(PropertiesReference.IDENTIFICATIONS.name) ? errors.first(PropertiesReference.IDENTIFICATIONS.name) : ''"
                  :label="PropertiesReference.IDENTIFICATIONS.title"
                  :name="PropertiesReference.IDENTIFICATIONS.name"
                  :initialValue="initialValues[PropertiesReference.IDENTIFICATIONS.name]"
          >

          </mau-form-input-triple-boolean>
          <div v-show="!document.documentType" class="mau-text-center">
            <p>Se necesita seleccionar un tipo de documento</p>
          </div>
        </div>
        <div class="form-group">
          <mau-form-input-triple-boolean
                  v-show="document.documentType"
                  v-model="document.personalities"
                  :error="errors.has(PropertiesReference.PERSONALITIES.name) ? errors.first(PropertiesReference.PERSONALITIES.name) : ''"
                  :name="PropertiesReference.PERSONALITIES.name"
                  :label="PropertiesReference.PERSONALITIES.title"
                  :initialValue="initialValues[PropertiesReference.PERSONALITIES.name]"
          >
          </mau-form-input-triple-boolean>
          <div v-show="!document.documentType" class="mau-text-center">
            <p>Se necesita seleccionar un tipo de documento</p>
          </div>
        </div>
        <div class="form-group">
            <mau-form-input-triple-boolean
                    v-show="document.documentType"
                    v-model="document.publicRegistryPatent"
                    :error="errors.has(PropertiesReference.PUBLIC_REGISTRY_PATENT.name) ? errors.first(PropertiesReference.PUBLIC_REGISTRY_PATENT.name) : ''"
                    :name="PropertiesReference.PUBLIC_REGISTRY_PATENT.name"
                    :label="PropertiesReference.PUBLIC_REGISTRY_PATENT.title"
                    :initialValue="initialValues[PropertiesReference.PUBLIC_REGISTRY_PATENT.name]"
            >
            </mau-form-input-triple-boolean>
            <div v-show="!document.documentType" class="mau-text-center">
              <p>Se necesita seleccionar un tipo de documento</p>
            </div>
        </div>
        <div class="form-group">
          <div v-show="document.documentType">
            <document-attachments
                    :key="document.documentType ? document.documentType['id'] : 0"
                    v-model="document.documentAttachments"
                    :name="PropertiesReference.DOCUMENT_ATTACHMENTS.name"
                    :label="PropertiesReference.DOCUMENT_ATTACHMENTS.title"
                    :initialAttachments="initialValues[PropertiesReference.DOCUMENT_ATTACHMENTS.name]"
                    :attachmentsEndpointName="attachmentsEndpointName"
                    :attachmentsApiOperationsOptions="attachmentsApiOperationsOptions"
            >
            </document-attachments>
          </div>
          <div v-show="!document.documentType" class="mau-text-center">
            <p>Se necesita seleccionar un tipo de documento</p>
          </div>
        </div>
      </div>
      <div class="Abogados">
        <h3 class="mb-3">Abogados</h3>
        <div class="form-group">
            <mau-form-input-select-dynamic
                    :endpointName="usersEndpointName"
                    :initialObjects="initialValues['entryUsers']"
                    :displayProperty="'fullname'"
                    v-model="document.entryUsers"
                    :error="errors.has('entryUsers') ? errors.first('entryUsers') : ''"
                    :label="'Abogado(s) responsable de acta'"
                    v-validate="'required'"
                    :multiselect="true"
                    :name="'entryUsers'"
            >
            </mau-form-input-select-dynamic>
        </div>
        <div class="form-group">
            <mau-form-input-select-dynamic
                    :endpointName="usersEndpointName"
                    :initialObjects="initialValues['exitUsers']"
                    :multiselect="true"
                    :displayProperty="'fullname'"
                    v-model="document.exitUsers"
                    :label="'Abogado(s) responsable de cierre'"
                    :name="'exitUsers'"
                    :error="''"
            >
            </mau-form-input-select-dynamic>
        </div>
      </div>
      <div class="Registro Publico">
        <h3 class="mb-3">Registro publico</h3>
        <div class="form-group">
          <mau-form-input-date
                  :label="PropertiesReference.PUBLIC_REGISTRY_ENTRY_DATE.title"
                  :name="PropertiesReference.PUBLIC_REGISTRY_ENTRY_DATE.name"
                  :data-vv-as="PropertiesReference.PUBLIC_REGISTRY_ENTRY_DATE.title"
                  v-model="document.publicRegistryEntryDate"
                  :initialValue="initialValues[PropertiesReference.PUBLIC_REGISTRY_ENTRY_DATE.name]"
                  :error="errors.first(PropertiesReference.PUBLIC_REGISTRY_ENTRY_DATE.name)"
                  v-validate="isPublicRegistrySelected ? 'required' : ''"
          >
          </mau-form-input-date>
        </div>
        <div class="form-group">
          <mau-form-input-date
                  :label="PropertiesReference.PUBLIC_REGISTRY_EXIT_DATE.title"
                  :name="PropertiesReference.PUBLIC_REGISTRY_EXIT_DATE.name"
                  :data-vv-as="PropertiesReference.PUBLIC_REGISTRY_EXIT_DATE.title"
                  v-model="document.publicRegistryExitDate"
                  :initialValue="initialValues[PropertiesReference.PUBLIC_REGISTRY_EXIT_DATE.name]"
                  :error="errors.first(PropertiesReference.PUBLIC_REGISTRY_EXIT_DATE.name)"
          >
          </mau-form-input-date>
        </div>
      </div>
      <div class="Comentarios">
          <h3 class="mb-3">Comentarios</h3>
          <comment-list :commentObjects="availableComments"></comment-list>
          <comment-input :id="'comment-editor'" :commentObjects="availableComments" v-model="document.comment"></comment-input>
        </div>
      <div class="mb-2 text-right">
        <b-button :disabled="buttonDisabled" @click="save" type="button" variant="primary">Guardar</b-button>
      </div>
  </div>
</template>

<script>
  import PropertiesReference from '../PropertiesReference'
  import globalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
  import FormSubmitEventBus from 'renderer/services/form/FormSubmitEventBus'
  import MauFormInputTripleBoolean from 'renderer/components/mau-components/mau-form-inputs/MauFormInputTripleBoolean'
  import DocumentDocumentAttachmentPropertiesReference from '../DocumentDocumentAttachmentPropertiesReference'
  import CommentList from '../components/CommentList.vue'
  import CommentInput from '../components/CommentInput.vue'
  import DocumentProperties from 'renderer/api/pages/document/components/DocumentProperty.vue'
  import DocumentAttachments from 'renderer/api/pages/document/components/DocumentAttachments'
  import MauFormInputSelectDynamic from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelectDynamic.vue'
  import MaskedInput from 'vue-text-mask'
  import DefaultValuesHelper from 'renderer/services/form/DefaultValuesHelper'
  import ValidatorHelper from '../../../../services/form/ValidatorHelper'
  import CreateClient from 'renderer/api/pages/client/children/Create.vue'
  import CreateGrantor from 'renderer/api/pages/grantor/children/Create.vue'
  import GenericApiOperations from 'renderer/services/api/GenericApiOperations'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ManyToManyHelper from 'renderer/services/api/ManyToManyHelper'
  import { mapGetters } from 'vuex'
  export default {
    name: 'DocumentEditorTabs',
    data () {
      return {
        document: {
          folio: '',
          date: '',
          tome: '',
          electronicFolio: '',
          documentType: '',
          publicRegistryEntryDate: '',
          publicRegistryExitDate: '',
          moneyLaunderingExpirationDate: '',
          client: '',
          moneyLaundering: '',
          documentStatus: '',
          documentAttachments: '',
          documentProperties: '',
          identifications: '',
          lawyers: '',
          property: '',
          fileNumber: '',
          operations: '',
          documentTypeOther: '',
          personalities: '',
          publicRegistryPatent: '',
          marginalNotes: '',
          groups: '',
          grantors: '',
          users: '',
          entryUsers: '',
          exitUsers: '',
          comment: ''
        },
        clientsCreated: 0,
        grantorsCreated: 0,
        currentUserGroups: [],
        buttonDisabled: false,
        initialValues: {},
        isMoneyLaunderingExpirationDateValid: false,
        PropertiesReference: PropertiesReference,
        filteredGrantors: [],
        availableComments: [],
        availableDocumentTypes: [],
        availableDocumentStatuses: [],
        availableOperations: [],
        availableAttachments: [],
        availableUsers: [],
        usersEndpointName: EntityTypes.USER.apiName,
        groupsEndpointName: EntityTypes.GROUP.apiName,
        clientsEndpointName: EntityTypes.CLIENT.apiName,
        grantorsEndpointName: EntityTypes.GRANTOR.apiName,
        attachmentsEndpointName: EntityTypes.ATTACHMENT.apiName,
        operationsEndpointName: EntityTypes.OPERATION.apiName,
        documentsEndpointName: EntityTypes.DOCUMENT.apiName,
        DocumentDocumentAttachmentPropertiesReference: DocumentDocumentAttachmentPropertiesReference,
        loading: true
      }
    },
    components: {
      CommentList,
      CommentInput,
      MauFormInputSelectDynamic,
      MauFormInputTripleBoolean,
      MaskedInput,
      CreateClient,
      CreateGrantor,
      DocumentProperties,
      DocumentAttachments
    },
    props: {
      initialObject: {
        type: Object
      },
      saveFunction: {
        type: Function,
        required: true
      }
    },
    mounted () {
      FormSubmitEventBus.onEvent(function (isSuccess) {
        if (isSuccess === false) {
          this.buttonDisabled = false
        }
      }.bind(this))
    },
    created () {
      Promise.all([
        GenericApiOperations.list(EntityTypes.DOCUMENT_TYPE.apiName, {paginate: false}),
        GenericApiOperations.list(EntityTypes.DOCUMENT_STATUS.apiName, {paginate: false}),
        GenericApiOperations.list(EntityTypes.DOCUMENT_OPERATION.apiName, {paginate: false}),
        GenericApiOperations.list(EntityTypes.DOCUMENT_ATTACHMENT.apiName, {paginate: false}),
        GenericApiOperations.list(EntityTypes.USER.apiName, {paginate: false}),
        GenericApiOperations.getById(EntityTypes.USER.apiName, this.user.id)
      ]).then(results => {
        this.availableDocumentTypes = results[0]
        this.availableDocumentStatuses = results[1]
        this.availableOperations = results[2]
        this.availableAttachments = results[3]
        this.availableUsers = results[4]
        this.currentUserGroups = results[5].group
      }).catch(e => {
        console.log(e)
      }).finally(() => {
        this.setInitialValues(this.initialObject)
        this.loading = false
      })
    },
    computed: {
      isPropertySelected: function () {
        return this.document.documentType && this.document.documentType['id'] === 1
      },
      moneyLaunderingApplies: function () {
        return this.document.moneyLaundering !== -1
      },
      isPublicRegistrySelected: function () {
        return this.document.documentStatus && this.document.documentStatus['id'] === 2
      },
      isOtherOperationSelected: function () {
        return this.document.documentType && this.document.documentType['id'] === 3
      },
      operationsApiOperationOptions: function () {
        let filterEntity = 'documentTypes'
        let filterLikes = {name: this.document.documentType ? this.document.documentType['name'] : ''}
        return {paginate: false, filterLikes: filterLikes, filterEntity: filterEntity}
      },
      attachmentsApiOperationsOptions: function () {
        let filterEntity = 'documentTypes'
        let filterLikes = {name: this.document.documentType ? this.document.documentType['name'] : ''}
        return {paginate: false, filterLikes: filterLikes, filterEntity: filterEntity}
      },
      ...mapGetters([
        'user'
      ])
    },
    methods: {
      onTheFlyCreateClient: function () {
        this.$refs.createClientModal.close()
        this.clientsCreated = this.clientsCreated + 1
      },
      onTheFlyCreateGrantor: function () {
        this.$refs.createGrantorModal.close()
        this.grantorsCreated = this.grantorsCreated + 1
      },
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      setInitialValues: function () {
        this.initialValues[PropertiesReference.FILE_NUMBER.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.FILE_NUMBER.name)
        this.initialValues[PropertiesReference.DATE.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.DATE.name)
        this.initialValues[PropertiesReference.TOME.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.TOME.name)
        this.initialValues[PropertiesReference.FOLIO.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.FOLIO.name)
        this.initialValues[PropertiesReference.DOCUMENT_TYPE.name] = DefaultValuesHelper.object(this.initialObject, PropertiesReference.DOCUMENT_TYPE.name)
        this.document.documentStatus = this.availableDocumentStatuses[0]
        this.initialValues[PropertiesReference.DOCUMENT_STATUS.name] = DefaultValuesHelper.object(this.initialObject, PropertiesReference.DOCUMENT_STATUS.name)
        this.initialValues[PropertiesReference.PUBLIC_REGISTRY_ENTRY_DATE.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.PUBLIC_REGISTRY_ENTRY_DATE.name)
        this.initialValues[PropertiesReference.PUBLIC_REGISTRY_EXIT_DATE.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.PUBLIC_REGISTRY_EXIT_DATE.name)
        this.initialValues[PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.name)
        this.initialValues[PropertiesReference.CLIENT.name] = DefaultValuesHelper.object(this.initialObject, PropertiesReference.CLIENT.name)
        this.initialValues[PropertiesReference.DOCUMENT_ATTACHMENTS.name] = DefaultValuesHelper.arrayOfObjects(this.initialObject, PropertiesReference.DOCUMENT_ATTACHMENTS.name)
        this.initialValues[PropertiesReference.IDENTIFICATIONS.name] = DefaultValuesHelper.tripleboolean(this.initialObject, PropertiesReference.IDENTIFICATIONS.name)
        this.initialValues[PropertiesReference.MONEY_LAUNDERING.name] = DefaultValuesHelper.tripleboolean(this.initialObject, PropertiesReference.MONEY_LAUNDERING.name)
        this.document.documentTypeOther = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.DOCUMENT_TYPE_OTHER.name)
        this.initialValues[PropertiesReference.PERSONALITIES.name] = DefaultValuesHelper.tripleboolean(this.initialObject, PropertiesReference.PERSONALITIES.name)
        this.initialValues[PropertiesReference.PUBLIC_REGISTRY_PATENT.name] = DefaultValuesHelper.tripleboolean(this.initialObject, PropertiesReference.PUBLIC_REGISTRY_PATENT.name)
        this.initialValues[PropertiesReference.MARGINAL_NOTES.name] = DefaultValuesHelper.tripleboolean(this.initialObject, PropertiesReference.MARGINAL_NOTES.name)
        this.initialValues[PropertiesReference.PROPERTY.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.PROPERTY.name)
        this.initialValues[PropertiesReference.OPERATIONS.name] = DefaultValuesHelper.arrayOfObjects(this.initialObject, PropertiesReference.OPERATIONS.name)
        this.initialValues[PropertiesReference.DOCUMENT_PROPERTIES.name] = DefaultValuesHelper.arrayOfObjects(this.initialObject, PropertiesReference.DOCUMENT_PROPERTIES.name)
        let initialGroups = DefaultValuesHelper.arrayOfObjects(this.initialObject, PropertiesReference.GROUPS.name)
        this.initialValues[PropertiesReference.GROUPS.name] = initialGroups.length > 0 ? this.initialObject[PropertiesReference.GROUPS.name] : this.currentUserGroups
        this.initialValues[PropertiesReference.GRANTORS.name] = DefaultValuesHelper.arrayOfObjects(this.initialObject, PropertiesReference.GRANTORS.name)
        let initialUsers = DefaultValuesHelper.arrayOfObjects(this.initialObject, PropertiesReference.USERS.name)
        this.initialValues['entryUsers'] = initialUsers ? initialUsers.filter(initialUserObj => { return initialUserObj.pivot['entry_lawyer'] }) : []
        this.initialValues['exitUsers'] = initialUsers ? initialUsers.filter(initialUserObj => { return initialUserObj.pivot['closure_lawyer'] }) : []
        this.availableComments = DefaultValuesHelper.arrayOfObjects(this.initialObject, PropertiesReference.COMMENTS.name)
      },
      save: function () {
        let directParams = {
          [PropertiesReference.FOLIO.name]: this.document.folio,
          [PropertiesReference.DATE.name]: this.document.date,
          [PropertiesReference.TOME.name]: this.document.tome,
          [PropertiesReference.FILE_NUMBER.name]: this.document.fileNumber,
          [PropertiesReference.PUBLIC_REGISTRY_ENTRY_DATE.name]: this.document.publicRegistryEntryDate,
          [PropertiesReference.PUBLIC_REGISTRY_EXIT_DATE.name]: this.document.publicRegistryExitDate,
          [PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.name]: this.document.moneyLaunderingExpirationDate ? this.document.moneyLaunderingExpirationDate : 'null',
          // todo CREAR UNA FUNCION PARA LA MANDAR NULL COMO STRING
          [PropertiesReference.MONEY_LAUNDERING.name]: this.document.moneyLaundering,
          [PropertiesReference.DOCUMENT_TYPE_OTHER.name]: this.document.documentTypeOther,
          [PropertiesReference.PERSONALITIES.name]: this.document.personalities,
          [PropertiesReference.IDENTIFICATIONS.name]: this.document.identifications,
          [PropertiesReference.PUBLIC_REGISTRY_PATENT.name]: this.document.publicRegistryPatent,
          [PropertiesReference.MARGINAL_NOTES.name]: this.document.marginalNotes.toString(),
          [PropertiesReference.PROPERTY.name]: this.document.property,
          // one to many
          [PropertiesReference.CLIENT.relationship_id_name]: this.document.client ? this.document.client[globalEntityIdentifier] : null,
          [PropertiesReference.DOCUMENT_TYPE.relationship_id_name]: this.document.documentType ? this.document.documentType[globalEntityIdentifier] : null,
          [PropertiesReference.DOCUMENT_STATUS.relationship_id_name]: this.document.documentStatus ? this.document.documentStatus[globalEntityIdentifier] : null
        }
        let initialM2mGroups = ManyToManyHelper.createM2MStructuredObjects(this.initialValues[PropertiesReference.GROUPS.name], PropertiesReference.GROUPS.relationship_id_name)
        let m2mGroups = ManyToManyHelper.createM2MStructuredObjects(this.document.groups, PropertiesReference.GROUPS.relationship_id_name)
        let filteredGroups = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(initialM2mGroups, m2mGroups, PropertiesReference.GROUPS.relationship_id_name)
        let initialM2mGrantors = ManyToManyHelper.createM2MStructuredObjects(this.initialValues[PropertiesReference.GRANTORS.name], PropertiesReference.GRANTORS.relationship_id_name)
        let m2mGrantors = ManyToManyHelper.createM2MStructuredObjects(this.document.grantors, PropertiesReference.GRANTORS.relationship_id_name)
        let filteredGrantors = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(initialM2mGrantors, m2mGrantors, PropertiesReference.GRANTORS.relationship_id_name)
        let initialM2mOperations = ManyToManyHelper.createM2MStructuredObjects(this.initialValues[PropertiesReference.OPERATIONS.name], PropertiesReference.OPERATIONS.relationship_id_name)
        let m2mOperations = ManyToManyHelper.createM2MStructuredObjects(this.document.operations, PropertiesReference.OPERATIONS.relationship_id_name)
        let filteredOperations = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(initialM2mOperations, m2mOperations, PropertiesReference.OPERATIONS.relationship_id_name)
        let entryUsersRelationshipName = PropertiesReference.USERS.relationship_id_name
        let entryUsersRelationshipObjects = ManyToManyHelper.createM2MStructuredObjects(this.document.entryUsers, entryUsersRelationshipName, {entry_lawyer: 1})
        let initialEntryUsersRelationshipObjects = ManyToManyHelper.createM2MStructuredObjects(this.initialValues['entryUsers'], entryUsersRelationshipName, {entry_lawyer: 1})
        let filteredEntryUsers = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(initialEntryUsersRelationshipObjects, entryUsersRelationshipObjects, entryUsersRelationshipName)
        let exitUsersRelationshipName = PropertiesReference.USERS.relationship_id_name
        let exitUsersRelationshipObjects = ManyToManyHelper.createM2MStructuredObjects(this.document.exitUsers, exitUsersRelationshipName, {closure_lawyer: 1})
        let initialExitUsersRelationshipObjects = ManyToManyHelper.createM2MStructuredObjects(this.initialValues['exitUsers'], exitUsersRelationshipName, {closure_lawyer: 1})
        let filteredExitUsers = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(initialExitUsersRelationshipObjects, exitUsersRelationshipObjects, exitUsersRelationshipName)
        let indirectParams = [
          ManyToManyHelper.createRelayObject(filteredOperations, EntityTypes.DOCUMENT_OPERATION),
          ManyToManyHelper.createRelayObject(this.document.documentAttachments, EntityTypes.DOCUMENT_ATTACHMENT),
          ManyToManyHelper.createRelayObject(filteredGroups, EntityTypes.DOCUMENT_GROUP),
          ManyToManyHelper.createRelayObject(filteredExitUsers, EntityTypes.DOCUMENT_USER),
          ManyToManyHelper.createRelayObject(filteredEntryUsers, EntityTypes.DOCUMENT_USER),
          ManyToManyHelper.createRelayObject(filteredGrantors, EntityTypes.DOCUMENT_GRANTOR),
          ManyToManyHelper.createRelayObject(this.document.documentProperties, EntityTypes.DOCUMENT_PROPERTY),
          ManyToManyHelper.createRelayObject(this.document.comment, EntityTypes.DOCUMENT_COMMENT)
        ]
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.buttonDisabled = true
            this.saveFunction(directParams, indirectParams)
          }
        })
      }
    },
    watch: {
      initialObject: function (initialObject) {
        this.setInitialValues(initialObject)
      },
      'document.moneyLaundering': function (moneyLaundering) {
        if (moneyLaundering === -1) {
          this.document.moneyLaunderingExpirationDate = ''
        }
      },
      'document.date': function () {
        if (this.document.folio !== '') {
          this.$validator.validate(PropertiesReference.FOLIO.name).then(result => {})
        }
      }
    }
  }

</script>

<style>

</style>
