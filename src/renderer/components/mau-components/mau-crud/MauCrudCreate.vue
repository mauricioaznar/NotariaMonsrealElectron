<template>
  <div>
    <slot :save="saveEntity"></slot>
  </div>
</template>

<script>
  import ApiFunctions from 'renderer/services/api/ApiOperations'
  import {globalEntityIdentificator} from 'renderer/config'
  import Notifications from 'renderer/services/api/Notifications'
  import addHostId from 'renderer/services/api/addHostId'
  import convertFirstCharacterTo from 'renderer/services/common/ConvertFirstCharacterTo'
  import {ApiRoutes} from 'renderer/api/ApiRoutes'
  import FormSubmitEventBus from 'renderer/services/form/FormSubmitEventBus'
  export default {
    name: 'MauCrudCreate',
    data () {
      return {
        entityNameLC: convertFirstCharacterTo.lowercase(this.entityName), // todo convert to mixin
        entityNameUC: convertFirstCharacterTo.uppercase(this.entityName)
      }
    },
    created () {
      if (this.entityAction) {
        this.$store.dispatch(this.entityAction)
      }
    },
    props: {
      entityAction: {
        type: String
      },
      callback: {
        required: true,
        type: Function
      },
      entityName: {
        type: String,
        required: true
      },
      relatedEntitiesRoutes: {
        type: Object,
        default: function () {
          return {}
        }
      },
      relationshipIdName: {
        type: String
      }
    },
    methods: {
      saveEntity: function (entityObject, relationshipObject) {
        ApiFunctions.create(ApiRoutes[this.entityNameLC].create, entityObject)
          .then(
            result => {
              let createdEntityId = result[globalEntityIdentificator]
              if (this.callback) {
                this.callback()
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
                          let modifiedStructuredObject = addHostId(structuredObject, this.relationshipIdName, createdEntityId)
                          ApiFunctions.create(relationshipRoute.create, modifiedStructuredObject)
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

<style lang="scss">

</style>
