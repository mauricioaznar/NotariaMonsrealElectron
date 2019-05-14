<template>
  <div>
    <slot :save="saveEntity"></slot>
  </div>
</template>

<script>
  import GenericApiOperations from 'renderer/services/api/GenericApiOperations'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
  import Notifications from 'renderer/services/api/Notifications'
  import FormSubmitEventBus from 'renderer/services/form/FormSubmitEventBus'
  import ManyToManyHelper from 'renderer/services/api/ManyToManyHelper'
  export default {
    name: 'MauCrudCreate',
    data () {
      return {
      }
    },
    props: {
      entityType: {
        type: Object,
        required: true
      },
      callback: {
        required: true,
        type: Function
      },
      relationshipIdName: {
        type: String
      }
    },
    methods: {
      saveEntity: function (entityObject, relayObjects) {
        GenericApiOperations.create(this.entityType.name, entityObject)
          .then(
            result => {
              let hostCreatedIdentifier = result[GlobalEntityIdentifier]
              Notifications.success(this)
              FormSubmitEventBus.emitEvent(true)
              for (let i = 0; i < relayObjects.length; i++) {
                let filteredM2MObjects = ManyToManyHelper.getRelayObjectFilteredM2MObjects(relayObjects[i])
                let entityType = ManyToManyHelper.getRelayObjectEntityType(relayObjects[i])
                for (let j = 0; j < filteredM2MObjects.create.length; j++) {
                  let createRelatedEntityObject = filteredM2MObjects.create[j]
                  createRelatedEntityObject[this.relationshipIdName] = hostCreatedIdentifier
                  GenericApiOperations.create(entityType.name, createRelatedEntityObject)
                }
              }
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
