<template>
    <div>
        <mau-form-input-multi-select
                :availableObjects="availableObjects"
                :initialObjects="initialObjects"
                :name="name"
                :label="label"
                v-validate="'array_required'"
                :error="errors.first(name)"
                v-model="selectedObjects"
        >
        </mau-form-input-multi-select>
        <div class="w-100">
            <slot :structuredObjects="structuredObjects" :onTableChange="onTableChange">

            </slot>
        </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import RelationshipObjectHelper from 'renderer/services/form/ManyToManyHelper'
//  import cloneDeep from 'renderer/services/common/cloneDeep'
  import MauFormInputSelect from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelect.vue'
  import MauFormInputMultiSelect from 'renderer/components/mau-components/mau-form-inputs/MauFormInputMultiSelect.vue'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
  export default {
    name: 'MauManyToManySelector',
    inject: ['$validator'],
    data () {
      return {
        selectedObjects: [],
        structuredObjects: [],
        initialStructuredObjects: []
      }
    },
    created () {
      this.initialStructuredObjects = RelationshipObjectHelper.createM2MStructuredObjects(this.initialObjects, this.selectedEntityIdentifierName)
    },
    computed: {
      hasDefaultScopedSlot () {
        return !!this.$scopedSlots.default
      },
      ...mapState({
      })
    },
    components: {
      MauFormInputSelect,
      MauFormInputMultiSelect
    },
    props: {
      label: {
        type: String
      },
      name: {
        type: String,
        required: true
      },
      initialObjects: {
        type: Array,
        default: function () {
          return []
        }
      },
      selectedEntityIdentifierName: {
        type: String,
        required: true
      },
      availableObjects: {
        type: Array,
        required: true
      }
    },
    watch: {
      selectedObjects: function () {
        this.setStructuredObjects()
        this.setApiOperations(this.structuredObjects)
      }
    },
    methods: {
      setApiOperations: function (structuredObjects) {
        let filteredStructuredObjectsByApiOperations = RelationshipObjectHelper.filterM2MStructuredObjectsByApiOperations(this.initialStructuredObjects, structuredObjects, this.selectedEntityIdentifierName)
        this.$emit('input', filteredStructuredObjectsByApiOperations)
      },
      setStructuredObjects: function () {
        let structuredObjects = []
        this.selectedObjects.forEach(selectedObj => {
          let foundInitialObj = this.initialStructuredObjects.find(initialStructuredObj => { return initialStructuredObj[this.selectedEntityIdentifierName] === selectedObj[GlobalEntityIdentifier] })
          if (foundInitialObj) {
            structuredObjects.push(foundInitialObj)
          } else {
            structuredObjects.push(RelationshipObjectHelper.createSimpleM2MStructuredObject(selectedObj, this.selectedEntityIdentifierName))
          }
        })
        this.structuredObjects = structuredObjects
      },
      onTableChange: function (modifiedStructuredObjects) {
        this.setApiOperations(modifiedStructuredObjects)
      }
    }
  }
</script>

<style>
</style>