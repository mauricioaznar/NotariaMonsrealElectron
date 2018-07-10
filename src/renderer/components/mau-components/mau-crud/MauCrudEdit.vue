<template>
  <div v-if="entity">
    <slot :entity="entity" :saveFunction="saveFunction"></slot>
  </div>
</template>

<script>
  import ApiFunctions from 'renderer/services/api/ApiOperations'
  import addHostId from 'renderer/services/api/addHostId'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalEntityIdentifier'
  import Notifications from 'renderer/services/api/Notifications'
  import convertFirstCharacterTo from 'renderer/services/common/ConvertFirstCharacterTo'
  import {ApiRoutes} from 'renderer/api/ApiRoutes'
  import FormSubmitEventBus from 'renderer/services/form/FormSubmitEventBus'
  export default {
    name: 'MauCrudEdit',
    data () {
      return {
        entity: null,
        entityApiNameLC: convertFirstCharacterTo.lowercase(this.entityApiName),
        entityApiNameUC: convertFirstCharacterTo.uppercase(this.entityApiName)
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
      entityApiName: {
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
        ApiFunctions.edit(ApiRoutes[this.entityApiNameLC].edit, this.id, entityObject)
          .then(
            result => {
              if (this.callback) {
                this.callback(entityObject)
              }
              if (this.entityAction) {
                this.$store.dispatch(this.entityAction)
              }
              if (this.relatedEntitiesRoutes) {
                for (let entityApiName in this.relatedEntitiesRoutes) {
                  if (this.relatedEntitiesRoutes.hasOwnProperty(entityApiName)) {
                    let relationshipRoute = this.relatedEntitiesRoutes[entityApiName]
                    let entityApiCallsContainer = relationshipObject[entityApiName]
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
                          ApiFunctions.del(relationshipRoute.del, modifiedStructuredObject[GlobalEntityIdentifier], modifiedStructuredObject)
                        })
                      }
                    }
                    if (entityApiCallsContainer.hasOwnProperty('edit')) {
                      if (relationshipRoute.hasOwnProperty('edit')) {
                        entityApiCallsContainer.edit.forEach(structuredObject => {
                          let modifiedStructuredObject = addHostId(structuredObject, this.relationshipIdName, this.id)
                          ApiFunctions.edit(relationshipRoute.edit, modifiedStructuredObject[GlobalEntityIdentifier], modifiedStructuredObject)
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
