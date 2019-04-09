<template>
  <div v-if="!loading">
      <div class="generales">
        <h3 class="mb-3">Generales</h3>
        <div class="form-group">
          <mau-form-input-number
                  :name="PropertiesReference.FILE_NUMBER.name"
                  :error="errors.first(PropertiesReference.FILE_NUMBER.name)"
                  :label="PropertiesReference.FILE_NUMBER.title"
                  :data-vv-as="PropertiesReference.FILE_NUMBER.title"
                  v-model="document.fileNumber"
                  :initialValue="initialValues[PropertiesReference.FILE_NUMBER.name]"
                  v-validate="'required|numeric'"
          >
          </mau-form-input-number>
        </div>
        <div class="form-group">
          <mau-form-input-date-time
                  :label="PropertiesReference.DATE.title"
                  :name="PropertiesReference.DATE.name"
                  :data-vv-as="PropertiesReference.DATE.title"
                  v-model="document.date"
                  :initialValue="initialValues[PropertiesReference.DATE.name]"
                  :error="errors.first(PropertiesReference.DATE.name)"
                  v-validate="'required'"
          >
          </mau-form-input-date-time>
        </div>
        <div class="form-group">
          <mau-form-input-text
                  :name="PropertiesReference.TOME.name"
                  :error="errors.first(PropertiesReference.TOME.name)"
                  :label="PropertiesReference.TOME.title"
                  v-model="document.tome"
                  :data-vv-as="PropertiesReference.TOME.title"
                  :initialValue="initialValues[PropertiesReference.TOME.name]"
                  v-validate="'required|alpha_dash'"
          >
          </mau-form-input-text>
        </div>
        <div class="form-group">
          <mau-form-input-number
                  :name="PropertiesReference.FOLIO.name"
                  :error="errors.first(PropertiesReference.FOLIO.name)"
                  :label="PropertiesReference.FOLIO.title"
                  :data-vv-as="PropertiesReference.FOLIO.title"
                  v-model="document.folio"
                  :initialValue="initialValues[PropertiesReference.FOLIO.name]"
                  v-validate="'required|numeric'"
          >
          </mau-form-input-number>
        </div>
        <div class="form-group">
          <label>{{PropertiesReference.DOCUMENT_TYPE.title}}</label>
          <b-form-radio-group
                  :id="PropertiesReference.DOCUMENT_TYPE.name"
                  v-model="document.documentType"
                  v-validate="'required'"
                  class="form-control override-outline"
                  :name="PropertiesReference.DOCUMENT_TYPE.name"
                  :data-vv-name="PropertiesReference.DOCUMENT_TYPE.name"
                  :class="getBootstrapValidationClass(errors.has(PropertiesReference.DOCUMENT_TYPE.name))"
          >
            <b-form-radio
                    v-for="documentType in availableDocumentTypes"
                    :value="documentType"
                    :key="documentType.id"
            >
              {{documentType.name}}
            </b-form-radio>
          </b-form-radio-group>
          <div class="invalid-feedback">
                <span v-show="errors.has(PropertiesReference.DOCUMENT_TYPE.name)" class="help is-danger">
                  {{ errors.first(PropertiesReference.DOCUMENT_TYPE.name) }}
                </span>
          </div>
        </div>
        <div class="form-group">
          <label>{{PropertiesReference.OPERATIONS.title}}</label>
          <div v-show="document.documentType">
            <mau-form-input-select
                    :key="document.documentType ? document.documentType['id'] : 0"
                    v-show="document.documentType"
                    :ref="PropertiesReference.OPERATIONS.name"
                    v-model="document.operations"
                    :label="'name'"
                    :required="PropertiesReference.OPERATIONS.required"
                    :initialObjects="initialValues[PropertiesReference.OPERATIONS.name]"
                    :filterEntity="'documentTypes'"
                    :filterLikes="{name: document.documentType ? document.documentType['name'] : ''}"
                    :multiselect="true"
                    :url="operationsUrl"
            >
            </mau-form-input-select>
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
            <b-form-radio-group
                    :id="PropertiesReference.DOCUMENT_STATUS.name"
                    v-model="document.documentStatus"
                    v-validate="'required'"
                    class="form-control override-outline"
                    :name="PropertiesReference.DOCUMENT_STATUS.name"
                    :data-vv-name="PropertiesReference.DOCUMENT_STATUS.name"
                    :class="getBootstrapValidationClass(errors.has(PropertiesReference.DOCUMENT_STATUS.name))"
            >
              <b-form-radio
                      v-for="documentStatus in availableDocumentStatuses"
                      :value="documentStatus"
                      :key="documentStatus.id"
              >
                {{documentStatus.name}}
              </b-form-radio>
            </b-form-radio-group>
            <div class="invalid-feedback">
                <span v-show="errors.has(PropertiesReference.DOCUMENT_STATUS.name)" class="help is-danger">
                  {{ errors.first(PropertiesReference.DOCUMENT_STATUS.name) }}
                </span>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="document_money_laundering">
            <label>{{PropertiesReference.MONEY_LAUNDERING.title}}</label>
            <mau-form-input-boolean
                    :tripleboolean="true"
                    v-model="document.moneyLaundering"
                    :initialValue="initialValues[PropertiesReference.MONEY_LAUNDERING.name]"
                    class="form-control override-form-control"
            >
            </mau-form-input-boolean>
            <div class="invalid-feedback">
                  <span v-show="errors.has(PropertiesReference.MONEY_LAUNDERING.name)" class="help is-danger">
                    {{ errors.first(PropertiesReference.MONEY_LAUNDERING.name) }}
                  </span>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="money_laundering_expiration_date" v-show="moneyLaunderingApplies">
            <label>{{PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.title}}</label>
            <mau-form-input-date-time
                    :name="PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.name"
                    :data-vv-name="PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.name"
                    v-model="document.moneyLaunderingExpirationDate"
                    :initialValue="initialValues[PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.name]"
                    :class="getBootstrapValidationClass(errors.has(PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.name))"
                    class="form-control override-form-control"
                    v-validate="moneyLaunderingApplies ? 'required' : ''"
            >
            </mau-form-input-date-time>
            <div class="invalid-feedback">
                <span v-show="errors.has(PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.name)" class="help is-danger">
                  {{ errors.first(PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.name) }}
                </span>
            </div>
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
            <label>{{PropertiesReference.MARGINAL_NOTES.title}}</label>
            <mau-form-input-boolean
                    v-model="document.marginalNotes"
                    :tripleboolean="true"
                    :initialValue="initialValues[PropertiesReference.MARGINAL_NOTES.name]"
                    class="form-control override-form-control"
            >
            </mau-form-input-boolean>
            <div class="invalid-feedback">
                  <span v-show="errors.has(PropertiesReference.MARGINAL_NOTES.name)" class="help is-danger">
                    {{ errors.first(PropertiesReference.MARGINAL_NOTES.name) }}
                  </span>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="client">
            <div class="d-flex justify-content-start">
              <label>{{PropertiesReference.CLIENT.title}}</label>
              <div class="ml-2 icon-button no-padding" v-b-modal.createClientModal>
                  <span class="fa fa-plus">
                  </span>
              </div>
              <b-modal class="mau-custom-modal" id="createClientModal" ref="createClientModal" title="Crear un cliente">
                <create-client :onTheFly="onTheFlyCreateClient" :key="clientsCreated"></create-client>
                <div slot="modal-footer">
                </div>
              </b-modal>
            </div>
            <mau-form-input-select
                    :url="clientsUrl"
                    :initialObject="initialValues[PropertiesReference.CLIENT.name]"
                    :label="'name'"
                    v-model="document.client"
                    class="override-form-control form-control"
                    :name="PropertiesReference.CLIENT.name"
                    v-validate="'required'"
                    :data-vv-name="PropertiesReference.CLIENT.name"
                    :class="getBootstrapValidationClass(errors.has(PropertiesReference.CLIENT.name))"
            >
            </mau-form-input-select>
            <div class="invalid-feedback">
                  <span v-show="errors.has(PropertiesReference.CLIENT.name)" class="help is-danger">
                    {{ errors.first(PropertiesReference.CLIENT.name) }}
                  </span>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="grantors">
            <div class="d-flex justify-content-start">
              <label>{{PropertiesReference.GRANTORS.title}}</label>
              <div class="ml-2 icon-button no-padding" v-b-modal.createGrantorModal>
                  <span class="fa fa-plus">
                  </span>
              </div>
              <b-modal class="mau-custom-modal" id="createGrantorModal" ref="createGrantorModal" title="Crear un otorgante">
                <create-grantor :onTheFly="onTheFlyCreateGrantor" :key="grantorsCreated">
                </create-grantor>
                <div slot="modal-footer" class="no-padding">
                </div>
              </b-modal>
            </div>
            <mau-form-input-select
                    :url="grantorsUrl"
                    :initialObjects="initialValues[PropertiesReference.GRANTORS.name]"
                    :label="'fullname'"
                    v-model="document.grantors"
                    :multiselect="true"
            >
            </mau-form-input-select>
          </div>
        </div>
        <div class="form-group">
          <div class="groups">
            <label>Grupos</label>
            <mau-form-input-select
                    :url="groupsUrl"
                    :initialObjects="initialValues[PropertiesReference.GROUPS.name]"
                    :multiselect="true"
                    :display="PropertiesReference.GROUPS.display"
                    v-model="document.groups"
                    class=" form-control override-form-control"
            >
            </mau-form-input-select>
          </div>
        </div>
      </div>
      <div class="Anexos">
        <h3 class="mb-3">Anexos</h3>
        <div class="form-group">
          <div class="document_identifications">
            <label>{{PropertiesReference.IDENTIFICATIONS.title}}</label>
            <mau-form-input-boolean
                    v-show="document.documentType"
                    v-model="document.identifications"
                    :tripleboolean="true"
                    :initialValue="initialValues[PropertiesReference.IDENTIFICATIONS.name]"
                    class="form-control override-form-control"
            >

            </mau-form-input-boolean>
            <div class="invalid-feedback">
                <span v-show="errors.has(PropertiesReference.IDENTIFICATIONS.name)" class="help is-danger">
                  {{ errors.first(PropertiesReference.IDENTIFICATIONS.name) }}
                </span>
            </div>
            <div v-show="!document.documentType" class="mau-text-center">
              <p>Se necesita seleccionar un tipo de documento</p>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="document_personalities">
            <label>{{PropertiesReference.PERSONALITIES.title}}</label>
            <mau-form-input-boolean
                    :tripleboolean="true"
                    v-show="document.documentType"
                    v-model="document.personalities"
                    :initialValue="initialValues[PropertiesReference.PERSONALITIES.name]"
                    class="form-control override-form-control"
            >
            </mau-form-input-boolean>
            <div class="invalid-feedback">
                  <span v-show="errors.has(PropertiesReference.PERSONALITIES.name)" class="help is-danger">
                    {{ errors.first(PropertiesReference.PERSONALITIES.name) }}
                  </span>
            </div>
            <div v-show="!document.documentType" class="mau-text-center">
              <p>Se necesita seleccionar un tipo de documento</p>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="document_type_other">
            <label>{{PropertiesReference.PUBLIC_REGISTRY_PATENT.title}}</label>
            <mau-form-input-boolean
                    v-show="document.documentType"
                    :tripleboolean="true"
                    v-model="document.publicRegistryPatent"
                    :initialValue="initialValues[PropertiesReference.PUBLIC_REGISTRY_PATENT.name]"
                    class="form-control override-form-control"
            >
            </mau-form-input-boolean>
            <div v-show="!document.documentType" class="mau-text-center">
              <p>Se necesita seleccionar un tipo de documento</p>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="grantors">
            <label>{{PropertiesReference.DOCUMENT_ATTACHMENTS.title}}</label>
            <div v-show="document.documentType">
              <document-attachments
                      :key="document.documentType ? document.documentType['id'] : 0"
                      v-model="document.documentAttachments"
                      :initialAttachments="initialValues[PropertiesReference.DOCUMENT_ATTACHMENTS.name]"
                      :filterEntity="'documentTypes'"
                      :filterLikes="{name: document.documentType ? document.documentType['name'] : ''}"
              >
              </document-attachments>
            </div>
            <div v-show="!document.documentType" class="mau-text-center">
              <p>Se necesita seleccionar un tipo de documento</p>
            </div>
          </div>
        </div>
      </div>
      <div class="Abogados">
        <h3 class="mb-3">Abogados</h3>
        <div class="form-group">
          <div class="document_entry_users">
            <label>Abogado(s) responsable de acta</label>
            <mau-form-input-select
                    :url="usersUrl"
                    :initialObjects="initialValues['entryUsers']"
                    :multiselect="true"
                    :label="'fullname'"
                    :display="PropertiesReference.USERS.display"
                    v-model="document.entryUsers"
                    class="override-form-control form-control"
                    :name="PropertiesReference.USERS.name"
            >
            </mau-form-input-select>
          </div>
        </div>
        <div class="form-group">
          <div class="document_exit_users">
            <label>Abogado(s) responsable de cierre</label>
            <mau-form-input-select
                    :url="usersUrl"
                    :initialObjects="initialValues['exitUsers']"
                    :multiselect="true"
                    :label="'fullname'"
                    v-model="document.exitUsers"
                    class="override-form-control form-control"
                    :name="PropertiesReference.USERS.name"
            >
            </mau-form-input-select>
          </div>
        </div>
      </div>
      <div class="Registro Publico">
        <h3 class="mb-3">Registro publico</h3>
        <div class="form-group">
          <mau-form-input-date-time
                  :label="PropertiesReference.PUBLIC_REGISTRY_ENTRY_DATE.title"
                  :name="PropertiesReference.PUBLIC_REGISTRY_ENTRY_DATE.name"
                  :data-vv-as="PropertiesReference.PUBLIC_REGISTRY_ENTRY_DATE.title"
                  v-model="document.publicRegistryEntryDate"
                  :initialValue="initialValues[PropertiesReference.PUBLIC_REGISTRY_ENTRY_DATE.name]"
                  :error="errors.first(PropertiesReference.PUBLIC_REGISTRY_ENTRY_DATE.name)"
                  v-validate="isPublicRegistrySelected ? 'required' : ''"
          >
          </mau-form-input-date-time>
        </div>
        <div class="form-group">
          <mau-form-input-date-time
                  :label="PropertiesReference.PUBLIC_REGISTRY_EXIT_DATE.title"
                  :name="PropertiesReference.PUBLIC_REGISTRY_EXIT_DATE.name"
                  :data-vv-as="PropertiesReference.PUBLIC_REGISTRY_EXIT_DATE.title"
                  v-model="document.publicRegistryExitDate"
                  :initialValue="initialValues[PropertiesReference.PUBLIC_REGISTRY_EXIT_DATE.name]"
                  :error="errors.first(PropertiesReference.PUBLIC_REGISTRY_EXIT_DATE.name)"
          >
          </mau-form-input-date-time>
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
  import NormalizeObjects from 'renderer/services/api/normalizeObjects'
  import FormSubmitEventBus from 'renderer/services/form/FormSubmitEventBus'
  import isDefined from 'renderer/services/common/isDefined'
  import MauFormInputText from 'renderer/components/mau-components/mau-form-inputs/MauFormInputText.vue'
  import MauFormInputNumber from 'renderer/components/mau-components/mau-form-inputs/MauFormInputNumber.vue'
  import EntityActions from 'renderer/api/store/entityActions'
  import DocumentDocumentAttachmentPropertiesReference from '../DocumentDocumentAttachmentPropertiesReference'
  import CommentList from '../components/CommentList.vue'
  import CommentInput from '../components/CommentInput.vue'
  import DocumentProperties from 'renderer/api/pages/document/components/DocumentProperty.vue'
  import DocumentAttachments from 'renderer/api/pages/document/components/DocumentAttachments'
  import MauFormInputSelect from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelect.vue'
  import MaskedInput from 'vue-text-mask'
  import RelationshipObjectsHelper from 'renderer/services/form/RelationshipObjectHelper'
  import DefaultValuesHelper from 'renderer/services/form/DefaultValuesHelper'
  import ValidatorHelper from '../../../../services/form/ValidatorHelper'
  import CreateClient from 'renderer/api/pages/client/children/Create.vue'
  import CreateGrantor from 'renderer/api/pages/grantor/children/Create.vue'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import ApiOperations from 'renderer/services/api/ApiOperations'
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
        groupsUrl: ApiUrls.createListUrl(EntityTypes.GROUP.apiName) + '?paginate=false',
        clientsUrl: ApiUrls.createListUrl(EntityTypes.CLIENT.apiName) + '?paginate=false',
        grantorsUrl: ApiUrls.createListUrl(EntityTypes.GRANTOR.apiName) + '?paginate=false',
        documentTypesUrl: ApiUrls.createListUrl(EntityTypes.DOCUMENT_TYPE.apiName) + '?paginate=false',
        operationsUrl: ApiUrls.createListUrl(EntityTypes.OPERATION.apiName) + '?paginate=false',
        attachmentsUrl: ApiUrls.createListUrl(EntityTypes.ATTACHMENT.apiName) + '?paginate=false',
        usersUrl: ApiUrls.createListUrl(EntityTypes.USER.apiName) + '?paginate=false',
        clientsCreated: 0,
        grantorsCreated: 0,
        currentUserGroups: [],
        buttonDisabled: false,
        initialValues: {},
        isOtherOperationSelected: false,
        isMoneyLaunderingExpirationDateValid: false,
        PropertiesReference: PropertiesReference,
        filteredGrantors: [],
        availableComments: [],
        availableDocumentTypes: [],
        availableDocumentStatuses: [],
        availableOperations: [],
        availableAttachments: [],
        availableUsers: [],
        DocumentDocumentAttachmentPropertiesReference: DocumentDocumentAttachmentPropertiesReference,
        loading: true
      }
    },
    components: {
      CommentList,
      CommentInput,
      MauFormInputSelect,
      MauFormInputNumber,
      MauFormInputText,
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
      this.createDefaultInitialValues()
      Promise.all([
        ApiOperations.get(ApiUrls.createListUrl(EntityTypes.DOCUMENT_TYPE.apiName) + '?paginate=false'),
        ApiOperations.get(ApiUrls.createListUrl(EntityTypes.DOCUMENT_STATUS.apiName) + '?paginate=false'),
        ApiOperations.get(ApiUrls.createListUrl(EntityTypes.DOCUMENT_OPERATION.apiName) + '?paginate=false'),
        ApiOperations.get(ApiUrls.createListUrl(EntityTypes.DOCUMENT_ATTACHMENT.apiName) + '?paginate=false'),
        ApiOperations.get(ApiUrls.createListUrl(EntityTypes.USER.apiName) + '?paginate=false'),
        ApiOperations.getById(ApiUrls.createBaseUrl(EntityTypes.USER.apiName) + '/', this.user.id)
      ]).then(results => {
        this.availableDocumentTypes = NormalizeObjects.normalizeObjects(results[0], ['name'])
        this.availableDocumentStatuses = NormalizeObjects.normalizeObjects(results[1], ['name'])
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
      ...mapGetters([
        'user'
      ])
    },
    methods: {
      onTheFlyCreateClient: function () {
        this.$refs.createClientModal.hide()
        this.clientsCreated = this.clientsCreated + 1
      },
      onTheFlyCreateGrantor: function () {
        this.$refs.createGrantorModal.hide()
        this.grantorsCreated = this.grantorsCreated + 1
      },
      operationsChange: function (newOperations) {
        this.isOtherOperationSelected = newOperations.find(operation => {
          return operation.id === 29
        })
      },
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      createDefaultInitialValues: function () {
        for (let propertyReference in PropertiesReference) {
          if (PropertiesReference.hasOwnProperty(propertyReference)) {
            if (PropertiesReference[propertyReference].name === undefined) {
              console.log(PropertiesReference[propertyReference])
            }
            this.initialValues[PropertiesReference[propertyReference].name] = PropertiesReference[propertyReference].defaultValue
          }
        }
        this.document.documentStatus = this.availableDocumentStatuses[0]
        this.initialValues['entryUsers'] = []
        this.initialValues['exitUsers'] = []
      },
      setInitialValues: function () {
        this.initialValues[PropertiesReference.FILE_NUMBER.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.FILE_NUMBER.name)
        this.initialValues[PropertiesReference.DATE.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.DATE.name)
        this.initialValues[PropertiesReference.TOME.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.TOME.name)
        this.initialValues[PropertiesReference.FOLIO.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.FOLIO.name)
        this.document.electronicFolio = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.ELECTRONIC_FOLIO.name)
        this.document.fileNumber = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.FILE_NUMBER.name)
        this.document.documentType = NormalizeObjects.normalizeObject(DefaultValuesHelper.object(this.initialObject, PropertiesReference.DOCUMENT_TYPE.name), ['name'])
        this.document.documentStatus = NormalizeObjects.normalizeObject(DefaultValuesHelper.object(this.initialObject, PropertiesReference.DOCUMENT_STATUS.name), ['name'])
        this.initialValues[PropertiesReference.PUBLIC_REGISTRY_ENTRY_DATE.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.PUBLIC_REGISTRY_ENTRY_DATE.name)
        this.initialValues[PropertiesReference.PUBLIC_REGISTRY_EXIT_DATE.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.PUBLIC_REGISTRY_EXIT_DATE.name)
        this.initialValues[PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.MONEY_LAUNDERING_EXPIRATION_DATE.name)
        this.initialValues[PropertiesReference.CLIENT.name] = DefaultValuesHelper.object(this.initialObject, PropertiesReference.CLIENT.name)
        this.initialValues[PropertiesReference.DOCUMENT_ATTACHMENTS.name] = DefaultValuesHelper.arrayOfObjects(this.initialObject, PropertiesReference.DOCUMENT_ATTACHMENTS.name)
        this.initialValues[PropertiesReference.IDENTIFICATIONS.name] = DefaultValuesHelper.tripleboolean(this.initialObject, PropertiesReference.IDENTIFICATIONS.name)
        this.initialValues[PropertiesReference.MONEY_LAUNDERING.name] = DefaultValuesHelper.tripleboolean(this.initialObject, PropertiesReference.MONEY_LAUNDERING.name)
        this.document.documentTypeOther = DefaultValuesHelper.object(this.initialObject, PropertiesReference.DOCUMENT_TYPE_OTHER.name)
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
        this.initialValues['entryUsers'] = initialUsers ? RelationshipObjectsHelper.filterEntitiesByRelationshipObjectProperty(initialUsers, 'entry_lawyer') : []
        this.initialValues['exitUsers'] = initialUsers ? RelationshipObjectsHelper.filterEntitiesByRelationshipObjectProperty(initialUsers, 'closure_lawyer') : []
        this.availableComments = DefaultValuesHelper.arrayOfObjects(this.initialObject, PropertiesReference.COMMENTS.name)
      },
      save: function () {
        let directParams = {
          [PropertiesReference.FOLIO.name]: this.document.folio,
          [PropertiesReference.DATE.name]: this.document.date,
          [PropertiesReference.TOME.name]: this.document.tome,
          [PropertiesReference.FILE_NUMBER.name]: this.document.fileNumber,
          [PropertiesReference.ELECTRONIC_FOLIO.name]: this.document.electronicFolio,
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
        let entryUsersRelationshipObjects = RelationshipObjectsHelper.createRelationshipObjects(this.document.entryUsers, entryUsersRelationshipName, {entry_lawyer: 1})
        let initialEntryUsersRelationshipObjects = RelationshipObjectsHelper.createRelationshipObjects(this.initialValues['entryUsers'], entryUsersRelationshipName, {entry_lawyer: 1})
        let filteredEntryUsers = RelationshipObjectsHelper.filterRelationshipObjects(initialEntryUsersRelationshipObjects, entryUsersRelationshipObjects, entryUsersRelationshipName)
        let exitUsersRelationshipName = PropertiesReference.USERS.relationship_id_name
        let exitUsersRelationshipObjects = RelationshipObjectsHelper.createRelationshipObjects(this.document.exitUsers, exitUsersRelationshipName, {closure_lawyer: 1})
        let initialExitUsersRelationshipObjects = RelationshipObjectsHelper.createRelationshipObjects(this.initialValues['exitUsers'], exitUsersRelationshipName, {closure_lawyer: 1})
        let filteredExitUsers = RelationshipObjectsHelper.filterRelationshipObjects(initialExitUsersRelationshipObjects, exitUsersRelationshipObjects, exitUsersRelationshipName)
        let filteredUsers = RelationshipObjectsHelper.combineRelationshipObjects(filteredEntryUsers, filteredExitUsers)
        let indirectParams = {
          [PropertiesReference.OPERATIONS.entityName]: filteredOperations,
          [PropertiesReference.DOCUMENT_ATTACHMENTS.entityName]: this.document.documentAttachments,
          [PropertiesReference.GROUPS.entityName]: filteredGroups,
          [PropertiesReference.USERS.entityName]: filteredUsers,
          [PropertiesReference.GRANTORS.entityName]: filteredGrantors,
          [PropertiesReference.COMMENTS.entityName]: this.document.comment,
          [PropertiesReference.DOCUMENT_PROPERTIES.entityName]: this.document.documentProperties
        }
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
      'document.documentType': function (documentType) {
        if (documentType !== null && documentType !== undefined && documentType !== '') {
          this.$store.dispatch(EntityActions.GET_OPERATIONS, documentType.name)
          this.$store.dispatch(EntityActions.GET_ATTACHMENTS, documentType.name)
        }
      },
      'document.client': function (client) {
        if (isDefined(client) && client !== '') {
          this.$store.dispatch(EntityActions.GET_GRANTORS, client.id)
        }
      },
      'document.moneyLaundering': function (moneyLaundering) {
        if (moneyLaundering === -1) {
          this.document.moneyLaunderingExpirationDate = ''
        }
      }
    }
  }

</script>

<style>

</style>
