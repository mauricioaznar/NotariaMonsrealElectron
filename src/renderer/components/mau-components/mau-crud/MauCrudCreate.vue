<template>
  <div>
    <slot :save="saveEntity"></slot>
  </div>
</template>

<script>
  import ApiFunctions from 'src/services/api/ApiOperations'
  import GlobalEntityIdentifier from 'src/services/api/GlobalEntityIdentifier'
  import Notifications from 'src/services/api/Notifications'
  import addHostId from 'src/services/api/addHostId'
  import convertFirstCharacterTo from 'src/services/common/ConvertFirstCharacterTo'
  import {ApiRoutes} from 'src/api/ApiRoutes'
  import FormSubmitEventBus from 'src/services/form/FormSubmitEventBus'
  export default {
    name: 'MauCrudCreate',
    data () {
      return {
        entityApiNameLC: convertFirstCharacterTo.lowercase(this.entityApiName), // todo convert to mixin
        entityApiNameUC: convertFirstCharacterTo.uppercase(this.entityApiName)
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
      entityApiName: {
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
        ApiFunctions.create(ApiRoutes[this.entityApiNameLC].create, entityObject)
          .then(
            result => {
              let createdEntityId = result[GlobalEntityIdentifier]
              if (this.callback) {
                this.callback()
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
