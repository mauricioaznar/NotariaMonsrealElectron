import {globalEntityIdentificator} from 'renderer/config'

function createRelationshipObject (object, relationshipName, newProperties = {}) {
  let relationshipObject = {}
  relationshipObject[relationshipName] = object[globalEntityIdentificator]
  let pivotProperties = object.pivot
  if (pivotProperties) {
    relationshipObject[globalEntityIdentificator] = pivotProperties[globalEntityIdentificator]
  }
  for (let newPropertyKey in newProperties) {
    if (newProperties.hasOwnProperty(newPropertyKey)) {
      relationshipObject[newPropertyKey] = newProperties[newPropertyKey]
    }
  }
  return relationshipObject
}
function createRelationshipObjects (objects, relationshipName, newProperties = {}) {
  let relationshipObjects = []
  let objectsLength = objects.length
  for (let i = 0; i < objectsLength; i++) {
    let object = objects[i]
    let relationshipObject = createRelationshipObject(object, relationshipName, newProperties)
    relationshipObjects.push(relationshipObject)
  }
  return relationshipObjects
}
function filterEntitiesByRelationshipObjectProperty (entities, property) {
  return entities.filter(entityObj => {
    return entityObj.pivot[property]
  })
}
function filterRelationshipObjects (initialRelationshipObjects, newRelationshipObjects, relationshipName) {
  let selectedStructuredObjects = newRelationshipObjects
  let initialStructuredObjects = initialRelationshipObjects
  let updatedObjects = []
  let createdObjects = selectedStructuredObjects
  let deletedObjects = []
  if (initialStructuredObjects.length > 0) {
    deletedObjects = initialStructuredObjects
    initialStructuredObjects.forEach(initialObj => {
      let foundObj = selectedStructuredObjects.find(selectedObj => { // TODO change to initialObject so we can get the id of the relation
        return selectedObj[relationshipName] === initialObj[relationshipName]
      })
      if (foundObj) {
        // if (!areInitialAndSelectedPropertiesEqual(initialObj, foundObj)) {
        //   for (let prop in this.relationshipPropertiesReference) {
        //     if (this.relationshipPropertiesReference.hasOwnProperty(prop)) {
        //       let propertyName = this.relationshipPropertiesReference[prop].name
        //       initialObj[propertyName] = foundObj[propertyName]
        //     }
        //   }
        //   updatedObjects.push(initialObj)
        // }
        deletedObjects = deletedObjects.filter(deletedObj => {
          return deletedObj[relationshipName] !== foundObj[relationshipName]
        })
        createdObjects = createdObjects.filter(createdObj => {
          return createdObj[relationshipName] !== foundObj[relationshipName]
        })
      }
    })
  }
  return {
    create: createdObjects,
    del: deletedObjects,
    edit: updatedObjects
  }
  // function areInitialAndSelectedPropertiesEqual (initialStructuredObj, selectedStructuredObj) {
  //   let areEqual = true
  //   for (let prop in this.relationshipPropertiesReference) {
  //     if (this.relationshipPropertiesReference.hasOwnProperty(prop)) {
  //       let propertyName = this.relationshipPropertiesReference[prop].name
  //       if (initialStructuredObj[propertyName] !== selectedStructuredObj[propertyName]) {
  //         areEqual = false
  //         break
  //       }
  //     }
  //   }
  //   return areEqual
  // }
}
function compareAndFilterEntityObjects (initialEntityObjects, finalEntityObjects, relationshipName) {
  let finalEntityRelationshipObjects = createRelationshipObjects(finalEntityObjects, relationshipName)
  let initialEntityRelationshipObjects = createRelationshipObjects(initialEntityObjects, relationshipName)
  return filterRelationshipObjects(initialEntityRelationshipObjects, finalEntityRelationshipObjects, relationshipName)
}
function combineRelationshipObjects (object1, object2) {
  let newObject = {}
  for (let object1Key in object1) {
    if (object1.hasOwnProperty(object1Key)) {
      let object1PropertyArray = object1[object1Key]
      if (object2.hasOwnProperty(object1Key)) {
        let object2PropertyArray = object2[object1Key]
        newObject[object1Key] = object1PropertyArray.concat(object2PropertyArray)
      }
    }
  }
  return newObject
}


export default {
  createRelationshipObjects,
  filterRelationshipObjects,
  compareAndFilterEntityObjects,
  filterEntitiesByRelationshipObjectProperty,
  combineRelationshipObjects}
