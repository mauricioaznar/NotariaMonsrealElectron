<template>
  <div class="d-flex flex-column align-items-center">
    <mau-form-input-select
            :key="initialAttachments.length"
            class="w-100"
            :url="attachmentsUrl"
            :initialObjects="initialAttachmentsCopy"
            :multiselect="true"
            v-model="selectedAttachments"
    >
    </mau-form-input-select>
    <div class="w-100" v-if="selectedAttachments.length > 0">
      <table class="mau-check-table table table-striped">
        <thead>
        <tr>
          <th class="mau-text-center mau-max-width text-left"></th>
          <th class="mau-text-center text-left">Nombre del documento adjunto</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(selectedAttachment, index) in selectedAttachments">
          <td class="text-left mau-max-width">
            <mau-form-input-boolean
                    :initial-value="getAttachmentInitialValue(selectedAttachment)"
                    v-model="selectedAttachment['pivot']['attachment_status']"
            >
            </mau-form-input-boolean>
          </td>
          <td class="text-left">{{selectedAttachment.name}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import MauFormInputSelect from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelect.vue'
  import globalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ManyToManyHelper from 'renderer/services/api/ManyToManyHelper'
  import cloneDeep from 'renderer/services/common/cloneDeep'
  import DocumentPropertiesReference from 'renderer/api/pages/document/PropertiesReference'
  export default {
    name: 'DocumentAttachment',
    inject: {
      $validator: '$validator'
    },
    data () {
      return {
        identificationName: globalEntityIdentifier,
        selectedAttachments: [],
        initialAttachmentsCopy: [],
        attachmentsUrl: ApiUrls.createListUrl(EntityTypes.ATTACHMENT.apiName) + '?paginate=false'
      }
    },
    computed: {
    },
    components: {
      MauFormInputSelect
    },
    props: {
      initialAttachments: {
        type: Array,
        required: true
      }
    },
    created () {
      this.initialAttachmentsCopy = cloneDeep(this.initialAttachments)
    },
    methods: {
      getAttachmentInitialValue: function (searchedAttachment) {
        if (!searchedAttachment.hasOwnProperty('pivot')) {
          return 0
        }
        let foundAttachment = this.initialAttachments.find(initialAttachmentObj => {
          return initialAttachmentObj.pivot.id === searchedAttachment.pivot.id
        })
        return foundAttachment.pivot.attachment_status
      }
    },
    watch: {
      selectedAttachments: function () {
        let initialM2mAttachments = ManyToManyHelper.createM2MStructuredObjects(this.initialAttachments, DocumentPropertiesReference.DOCUMENT_ATTACHMENTS.relationship_id_name)
        let m2mAttachments = ManyToManyHelper.createM2MStructuredObjects(this.selectedAttachments, DocumentPropertiesReference.DOCUMENT_ATTACHMENTS.relationship_id_name)
        let filteredAttachments = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(initialM2mAttachments, m2mAttachments, DocumentPropertiesReference.DOCUMENT_ATTACHMENTS.relationship_id_name)
        this.$emit('input', filteredAttachments)
      },
      initialAttachments: function () {
        this.initialAttachmentsCopy = cloneDeep(this.initialAttachments)
      }
    }
  }

</script>

<style lang="scss" scoped>
  .mau-max-width {
    max-width: 20px;
  }
</style>


