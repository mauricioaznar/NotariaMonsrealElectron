<template>
  <div class="d-flex flex-column align-items-center">
    <mau-form-input-select-dynamic
            :key="initialAttachments.length"
            class="w-100"
            :url="attachmentsUrl"
            :initialObjects="initialAttachmentsCopy"
            :name="name"
            :label="label"
            v-model="selectedAttachments"
            :multiselect="true"
            :filterEntity="filterEntity"
            :filterLikes="filterLikes"
            :error="errors.has(name) ? errors.first(name) : ''"
            :displayProperty="'name'"
    >
    </mau-form-input-select-dynamic>
    <div class="w-100" v-if="selectedAttachmentsTransformed.length > 0">
      <table class="mau-check-table table table-striped">
        <thead>
        <tr>
          <th class="mau-text-center mau-max-width text-left"></th>
          <th class="mau-text-center text-left">Nombre del documento adjunto</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(selectedAttachment, index) in selectedAttachmentsTransformed">
          <td class="mau-max-width">
            <mau-form-input-check-box
                    :initialValue="selectedAttachment.pivot.attachment_status"
                    v-model="selectedAttachment.pivot.attachment_status"
                    @input=setInputValue
            >
            </mau-form-input-check-box>
          </td>
          <td class="text-left">{{selectedAttachment.name}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import MauFormInputSelectDynamic from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelectDynamic.vue'
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
        selectedAttachmentsTransformed: [],
        attachmentsUrl: ApiUrls.createListUrl(EntityTypes.ATTACHMENT.apiName) + '?paginate=false'
      }
    },
    computed: {
    },
    components: {
      MauFormInputSelectDynamic
    },
    props: {
      initialAttachments: {
        type: Array,
        required: true
      },
      filterExacts: {
        type: Object,
        default: function () {
          return {}
        }
      },
      filterLikes: {
        type: Object,
        default: function () {
          return {}
        }
      },
      filterEntity: {
        type: String,
        default: function () {
          return ''
        }
      },
      label: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    created () {
      this.initialAttachmentsCopy = cloneDeep(this.initialAttachments)
    },
    methods: {
      setInputValue: function () {
        let initialM2mAttachments = ManyToManyHelper.createM2MStructuredObjects(this.initialAttachments, DocumentPropertiesReference.DOCUMENT_ATTACHMENTS.relationship_id_name)
        let m2mAttachments = ManyToManyHelper.createM2MStructuredObjects(this.selectedAttachmentsTransformed, DocumentPropertiesReference.DOCUMENT_ATTACHMENTS.relationship_id_name)
        let filteredAttachments = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(initialM2mAttachments, m2mAttachments, DocumentPropertiesReference.DOCUMENT_ATTACHMENTS.relationship_id_name)
        this.$emit('input', filteredAttachments)
      }
    },
    watch: {
      selectedAttachments: {
        handler: function (selectedAttachments) {
          let selectedAttachmentsTransformed = []
          selectedAttachments.forEach(selectedAttachmentObj => {
            let foundSelectedAttachmentTransformed = this.selectedAttachmentsTransformed.find(selectedAttachmentTransformedObj => {
              return selectedAttachmentTransformedObj.id === selectedAttachmentObj.id
            })
            if (foundSelectedAttachmentTransformed) {
              selectedAttachmentsTransformed.push(foundSelectedAttachmentTransformed)
            } else {
              if (selectedAttachmentObj.pivot) {
                selectedAttachmentsTransformed.push(selectedAttachmentObj)
              } else {
                selectedAttachmentObj.pivot = {attachment_id: selectedAttachmentObj.id, attachment_status: 0}
                selectedAttachmentsTransformed.push(selectedAttachmentObj)
              }
            }
          })
          this.selectedAttachmentsTransformed = selectedAttachmentsTransformed
        },
        deep: true
      },
      selectedAttachmentsTransformed: {
        handler: function () {
          this.setInputValue()
        },
        deep: true
      },
      initialAttachments: function () {
        this.initialAttachmentsCopy = cloneDeep(this.initialAttachments)
      }
    }
  }

</script>

<style lang="scss" scoped>
  .mau-max-width {
    max-width: 30px;
    .custom-control-label::after {
      top: 0;
    }
  }
</style>


