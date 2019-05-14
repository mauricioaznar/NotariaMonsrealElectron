<template>
  <div>
    <slot :saveFunction="saveFunction"></slot>
  </div>
</template>

<script>
  import GenericApiOperations from 'renderer/services/api/GenericApiOperations'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
  import Notifications from 'renderer/services/api/Notifications'
  import FormSubmitEventBus from 'renderer/services/form/FormSubmitEventBus'
  import ManyToManyHelper from 'renderer/services/api/ManyToManyHelper'
  export default {
    name: 'MauCrudEdit',
    data () {
      return {
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
      entityType: {
        type: Object,
        required: true
      },
      relationshipIdName: {
        type: String
      }
    },
    methods: {
      saveFunction: function (entityObject, relayObjects) {
        GenericApiOperations.edit(this.entityType.name, this.id, entityObject)
          .then(
            result => {
              console.log(relayObjects)
              for (let relayObjectIndex = 0; relayObjectIndex < relayObjects.length; relayObjectIndex++) {
                let filteredM2MObjects = ManyToManyHelper.getRelayObjectFilteredM2MObjects(relayObjects[relayObjectIndex])
                let entityType = ManyToManyHelper.getRelayObjectEntityType(relayObjects[relayObjectIndex])
                for (let createFilteredObjectsIndex = 0; createFilteredObjectsIndex < filteredM2MObjects.create.length; createFilteredObjectsIndex++) {
                  let createRelatedEntityObject = filteredM2MObjects.create[createFilteredObjectsIndex]
                  createRelatedEntityObject[this.relationshipIdName] = this.id
                  GenericApiOperations.create(entityType.name, createRelatedEntityObject)
                }
                for (let editFilteredObjectsIndex = 0; editFilteredObjectsIndex < filteredM2MObjects.edit.length; editFilteredObjectsIndex++) {
                  let editRelatedEntityObject = filteredM2MObjects.edit[editFilteredObjectsIndex]
                  editRelatedEntityObject[this.relationshipIdName] = this.id
                  GenericApiOperations.edit(entityType.name, editRelatedEntityObject[GlobalEntityIdentifier], editRelatedEntityObject)
                }
                for (let delFilteredObjectsIndex = 0; delFilteredObjectsIndex < filteredM2MObjects.del.length; delFilteredObjectsIndex++) {
                  let delRelatedEntityObject = filteredM2MObjects.del[delFilteredObjectsIndex]
                  delRelatedEntityObject[this.relationshipIdName] = this.id
                  GenericApiOperations.del(entityType.name, delRelatedEntityObject[GlobalEntityIdentifier], delRelatedEntityObject)
                }
              }
              Notifications.success(this)
              FormSubmitEventBus.emitEvent(true)
              this.callback()
            })
          .catch(
            error => {
              console.log(error)
              FormSubmitEventBus.emitEvent(false)
              Notifications.error(this, error)
            }
          )
      }
    }
  }
</script>
