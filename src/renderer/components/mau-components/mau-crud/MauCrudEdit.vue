<template>
  <div v-if="entity">
    <slot :entity="entity" :saveFunction="saveFunction"></slot>
  </div>
</template>

<script>
  import ApiFunctions from 'renderer/services/api/ApiOperations'
  import addHostId from 'renderer/services/api/addHostId'
  import {globalEntityIdentificator} from 'renderer/config'
  import Notifications from 'renderer/services/api/Notifications'
  import convertFirstCharacterTo from 'renderer/services/common/ConvertFirstCharacterTo'
  import {ApiRoutes} from 'renderer/api/ApiRoutes'
  import FormSubmitEventBus from 'renderer/services/form/FormSubmitEventBus'
  export default {
    name: 'MauCrudEdit',
    data () {
      return {
        entity: null,
        entityNameLC: convertFirstCharacterTo.lowercase(this.entityName),
        entityNameUC: convertFirstCharacterTo.uppercase(this.entityName)
      }
    },
    props: {
      id: {
        required: true
      },
      callback: {
        type: Function,
        required: true
      },
      entityName: {
        type: String,
        required: true
      },
      entityAction: {
        type: String
      },
      relationshipIdName: {
        type: String
      },
      relatedEntitiesRoutes: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    created () {
      if (this.entityAction) {
        this.$store.dispatch(this.entityAction)
      }
      this.entity = this.$store.getters.requestedEntity
    },
    components: {

    },
    methods: {
      saveFunction: function (entityObject, relationshipObject) {
        ApiFunctions.edit(ApiRoutes[this.entityNameLC].edit, this.id, entityObject)
          .then(
            result => {
              if (this.callback) {
                this.callback(entityObject)
              }
              if (this.entityAction) {
                this.$store.dispatch(this.entityAction)
              }
              if (this.relatedEntitiesRoutes) {
                for (let entityName in this.relatedEntitiesRoutes) {
                  if (this.relatedEntitiesRoutes.hasOwnProperty(entityName)) {
                    let relationshipRoute = this.relatedEntitiesRoutes[entityName]
                    let entityApiCallsContainer = relationshipObject[entityName]
                    if (entityApiCallsContainer.hasOwnProperty('create')) {
                      if (relationshipRoute.hasOwnProperty('create')) {
                        entityApiCallsContainer.create.forEach(structuredObject => {
                          let modifiedStructuredObject = addHostId(structuredObject, this.relationshipIdName, this.id)
                          ApiFunctions.create(relationshipRoute.create, modifiedStructuredObject)
                        })
                      }
                    }
                    if (entityApiCallsContainer.hasOwnProperty('del')) {
                      if (relationshipRoute.hasOwnProperty('del')) {
                        entityApiCallsContainer.del.forEach(structuredObject => {
                          let modifiedStructuredObject = addHostId(structuredObject, this.relationshipIdName, this.id)
                          ApiFunctions.del(relationshipRoute.del, modifiedStructuredObject[globalEntityIdentificator], modifiedStructuredObject)
                        })
                      }
                    }
                    if (entityApiCallsContainer.hasOwnProperty('edit')) {
                      if (relationshipRoute.hasOwnProperty('edit')) {
                        entityApiCallsContainer.edit.forEach(structuredObject => {
                          let modifiedStructuredObject = addHostId(structuredObject, this.relationshipIdName, this.id)
                          ApiFunctions.edit(relationshipRoute.edit, modifiedStructuredObject[globalEntityIdentificator], modifiedStructuredObject)
                        })
                      }
                    }
                  }
                }
              }
              Notifications.success(this)
              FormSubmitEventBus.emitEvent(true)
              this.callback()
            })
          .catch(
            error => {
              FormSubmitEventBus.emitEvent(false)
              Notifications.error(this, error)
            }
          )
      }
    }
  }
</script>
