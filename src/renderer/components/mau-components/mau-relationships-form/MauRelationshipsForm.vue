<template>
  <div class="d-flex flex-column align-items-center">
    <mau-form-input-select
            class="w-100"
            :availableObjects="selectableObjects"
            :initialObjects="initialObjects"
            :multiselect="true"
            v-model="selectedObjects"
            :label="label"
    >
    </mau-form-input-select>
    <div class="w-100" v-if="isPropertiesReferenceDefined && selectedObjects.length > 0">
      <table class="mau-check-table table table-striped">
        <thead>
        <tr>
          <th class="mau-text-center mau-max-width text-left" v-for="propertyReference in relationshipPropertiesReference">{{propertyReference.title}}</th>
          <th class="mau-text-center text-left">Documentos Adjuntos</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(selectableObject, index) in selectableObjects" v-if="isValueInSelectedObjects(selectableObject)">
          <td class="text-left mau-max-width">
            <mau-form-input-boolean
                    v-model="structuredObjects[index]['attachment_status']"
                    :initialValue="getNumberValue(structuredObjects[index]['attachment_status'])"
            >
            </mau-form-input-boolean>
          </td>
          <td class="text-left">{{displayFunction(selectableObject)}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import isObjectEmpty from 'renderer/services/common/isObjectEmpty'
  import isDefined from 'renderer/services/common/isDefined'
  import cloneDeep from 'renderer/services/common/cloneDeep'
  import defaultRelationshipStructure from 'renderer/services/api/defaultRelationshipStructure'
  import getRelationData from 'renderer/services/api/getRelationData'
  import MauFormInputSelect from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelect.vue'
  import Vue from 'vue'
  import {globalEntityIdentificator} from 'renderer/config'
  export default {
    name: 'MauRelationshipsForm', // TODO realtionshipForm doesnt have validate function
    inject: {
      $validator: '$validator'
    },
    data () {
      return {
        identificationName: globalEntityIdentificator, // TODO move to computed values
        selectedObjects: [],
        initialObjects: [],
        structuredObjects: [],
        initialStructuredObjects: [],
        selectableObjects: [],
        val: '',
        inputErrors: {}
      }
    },
    computed: {
      hasSelectedObjectsObjects: function () {
        return this.selectedObjects && this.selectedObjects.length !== 0
      },
      isPropertiesReferenceDefined: function () {
        return !isObjectEmpty(this.relationshipPropertiesReference)
      }
    },
    components: {
      MauFormInputSelect
    },
    props: {
      label: {
        type: String,
        default: function () {
          return 'name'
        }
      },
      required: {
        type: Boolean
      },
      name: {
        type: String,
        default: function () {
          return 'name'
        }
      },
      initialObjectsProp: {
        type: Array
      },
      availableObjects: {
        type: Array,
        required: true
      },
      // function to display object in html
      displayFunction: {
        type: Function,
        default: function (val) {
          return val.name
        }
      },
      relationshipPropertiesReference: {
        type: Object,
        default: function () {
          return {}
        }
      },
      relatedRelationshipName: {
        type: String,
        required: true
      }
    },
    created () {
      if (this.initialObjectsProp !== null && this.initialObjects !== undefined) {
        this.initialObjects = cloneDeep(this.initialObjectsProp)
        this.selectedObjects = cloneDeep(this.initialObjectsProp)
      }
      this.selectableObjects = this.availableObjects
      this.getStructuredData()
    },
    methods: {
      getNumberValue: function (string) {
        if (string === '1' || string === 1) {
          return 1
        } else {
          return 0
        }
      },
      getStructuredData: function () {
        let formattedObjects = []
        let initialFormattedObjects = []
        if (this.initialObjects.length > 0) {
          this.initialObjects.forEach(initialObj => {
            initialFormattedObjects.push(getRelationData(initialObj))
          })
          this.initialStructuredObjects = initialFormattedObjects
        }
        for (let i = 0; i < this.selectableObjects.length; i++) {
          let selectableObj = this.selectableObjects[i]
          let relationshipStructure = defaultRelationshipStructure(this.relatedRelationshipName, selectableObj[globalEntityIdentificator])
          let initialFormattedObj = initialFormattedObjects.find(initialFormattedObj => {
            let found = initialFormattedObj[this.relatedRelationshipName] === selectableObj[globalEntityIdentificator]
            return found
          })
          if (initialFormattedObj) {
            for (let key in this.relationshipPropertiesReference) {
              if (this.relationshipPropertiesReference.hasOwnProperty(key)) {
                let propertyName = this.relationshipPropertiesReference[key].name
                relationshipStructure[propertyName] = initialFormattedObj[propertyName]
              }
            }
          }
          formattedObjects.push(relationshipStructure)
        }
        this.structuredObjects = formattedObjects
      },
      setInitialValue: function () {
        if (this.initialValue.length !== 0) {
          this.selectedObjects = this.initialValue
        }
      },
      validate: function () {
      },
      hasError: function () {
        return !isObjectEmpty(this.inputErrors)
      },
      isValid: function () {
        return isObjectEmpty(this.inputErrors)
      },
      selectedObjectsValidation: selectedObjectsValidation,
      isValueInSelectedObjects: function (value) {
        let selectedObjectsIndex = this.selectedObjects.findIndex(object => {
          return object[globalEntityIdentificator] === value[globalEntityIdentificator]
        })
        return selectedObjectsIndex !== -1
      },
      isRequired: function () {
        return (isDefined(this.required) && this.required === true)
      },
      removeNonSelectedStructuredObjects: function () {
        let self = this
        let selectedObjects = self.structuredObjects.filter(structuredObj => {
          let structuredObjId = structuredObj[self.relatedRelationshipName]
          let selectedObjectsIndex = self.selectedObjects.findIndex(selectedObjectsObj => {
            let selectedObjectsObjId = selectedObjectsObj[globalEntityIdentificator]
            return structuredObjId === selectedObjectsObjId
          })
          return selectedObjectsIndex !== -1
        })
        return selectedObjects
      },
      organizeStructuredObjects: function () {
        let selectedStructuredObjects = this.removeNonSelectedStructuredObjects()
        let initialStructuredObjects = cloneDeep(this.initialStructuredObjects)
        let updatedObjects = []
        let createdObjects = selectedStructuredObjects
        let deletedObjects = []
        if (initialStructuredObjects.length > 0) {
          let self = this
          deletedObjects = initialStructuredObjects
          initialStructuredObjects.forEach(initialObj => {
            let foundObj = selectedStructuredObjects.find(selectedObj => { // TODO change to initialObject so we can get the id of the relation
              return selectedObj[self.relatedRelationshipName] === initialObj[self.relatedRelationshipName]
            })
            if (foundObj) {
              if (!this.areInitialAndSelectedPropertiesEqual(initialObj, foundObj)) {
                for (let prop in this.relationshipPropertiesReference) {
                  if (this.relationshipPropertiesReference.hasOwnProperty(prop)) {
                    let propertyName = this.relationshipPropertiesReference[prop].name
                    initialObj[propertyName] = foundObj[propertyName]
                  }
                }
                updatedObjects.push(initialObj)
              }
              deletedObjects = deletedObjects.filter(deletedObj => {
                return deletedObj[self.relatedRelationshipName] !== foundObj[self.relatedRelationshipName]
              })
              createdObjects = createdObjects.filter(createdObj => {
                return createdObj[self.relatedRelationshipName] !== foundObj[self.relatedRelationshipName]
              })
            }
          })
        }
        return {
          create: createdObjects,
          del: deletedObjects,
          edit: updatedObjects
        }
      },
      areInitialAndSelectedPropertiesEqual: function (initialStructuredObj, selectedStructuredObj) {
        let areEqual = true
        for (let prop in this.relationshipPropertiesReference) {
          if (this.relationshipPropertiesReference.hasOwnProperty(prop)) {
            let propertyName = this.relationshipPropertiesReference[prop].name
            if (initialStructuredObj[propertyName] !== selectedStructuredObj[propertyName]) {
              areEqual = false
              break
            }
          }
        }
        return areEqual
      }
    },
    watch: {
      availableObjects: function (availableObjs) {
        if (availableObjs.length > 0) {
          this.selectableObjects = availableObjs
          this.selectedObjects = this.initialObjects.filter(initialObj => {
            let selectableObj = this.selectableObjects.find(selectableObj => {
              return selectableObj[globalEntityIdentificator] === initialObj[globalEntityIdentificator]
            })
            return selectableObj !== undefined && selectableObj !== null
          })
          this.getStructuredData()
        } else {
          this.selectedObjects = []
          this.selectableObjects = []
        }
      },
      selectedObjects: function (newSelectedObjects) {
        this.selectedObjectsValidation(newSelectedObjects)
        let organizedStructuredObjects = this.organizeStructuredObjects()
        this.$emit('input', organizedStructuredObjects)
        this.$emit('selection-changed', newSelectedObjects)
      },
      structuredObjects: {
        handler: function (after, before) {
          let organizedStructuredObjs = this.organizeStructuredObjects()
          this.$emit('input', organizedStructuredObjs)
        },
        deep: true
      }
    }
  }
  function selectedObjectsValidation (val) {
    if (this.isRequired()) {
      if (this.selectedObjects.length === 0) {
        Vue.set(this.inputErrors, 'required', 'Se necesita seleccionar un valor')
      } else {
        Vue.delete(this.inputErrors, 'required')
      }
    }
    this.$emit('input', val)
  }


</script>

<style lang="scss" scoped>
  .mau-max-width {
    max-width: 20px;
  }
</style>


