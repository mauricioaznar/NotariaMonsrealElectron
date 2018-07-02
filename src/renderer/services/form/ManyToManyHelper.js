import GlobalEntityIdentifier from 'src/services/api/GlobalEntityIdentifier'

function createSimpleM2MStructuredObject (object, selectedEntityRelationshipName) {
  return {[selectedEntityRelationshipName]: object[GlobalEntityIdentifier]}
}

function createM2MStructuredObjects (objects, selectedEntityRelationshipName) {
  let relationshipObjects = []
  let objectsLength = objects.length
  for (let i = 0; i < objectsLength; i++) {
    let object = objects[i]
    let relationshipObject = createSimpleM2MStructuredObject(object, selectedEntityRelationshipName)
    let pivotProperties = object.pivot
    if (pivotProperties) {
      for (let pivotPropertyKey in pivotProperties) {
        if (pivotProperties.hasOwnProperty(pivotPropertyKey)) {
          relationshipObject[pivotPropertyKey] = pivotProperties[pivotPropertyKey]
        }
      }
    }
    relationshipObjects.push(relationshipObject)
  }
  return relationshipObjects
}

function filterM2MStructuredObjectsByApiOperations (initialRelationshipObjects, newRelationshipObjects, selectedEntityRelationshipName, comparedPropertiesReference) {
  let selectedStructuredObjects = newRelationshipObjects
  let initialStructuredObjects = initialRelationshipObjects
  let updatedObjects = []
  let createdObjects = selectedStructuredObjects
  let deletedObjects = []
  if (initialStructuredObjects.length > 0) {
    deletedObjects = initialStructuredObjects
    initialStructuredObjects.forEach(initialObj => {
      let foundObj = selectedStructuredObjects.find(selectedObj => {
        return selectedObj[selectedEntityRelationshipName] === initialObj[selectedEntityRelationshipName]
      })
      if (foundObj) {
        if (!areInitialAndSelectedPropertiesEqual(initialObj, foundObj)) {
          updatedObjects.push(foundObj)
        }
        deletedObjects = deletedObjects.filter(deletedObj => {
          return deletedObj[selectedEntityRelationshipName] !== foundObj[selectedEntityRelationshipName]
        })
        createdObjects = createdObjects.filter(createdObj => {
          return createdObj[selectedEntityRelationshipName] !== foundObj[selectedEntityRelationshipName]
        })
      }
    })
  }
  return {
    create: createdObjects,
    del: deletedObjects,
    edit: updatedObjects
  }
  function areInitialAndSelectedPropertiesEqual (initialStructuredObj, selectedStructuredObj) {
    let areEqual = true
    for (let initialStructuredObjKey in initialStructuredObj) {
      if (initialStructuredObj.hasOwnProperty(initialStructuredObjKey)) {
        if (initialStructuredObj[initialStructuredObjKey] !== selectedStructuredObj[initialStructuredObjKey]) {
          areEqual = false
          break
        }
      }
    }
    return areEqual
  }
}


export default {
  createSimpleM2MStructuredObject: createSimpleM2MStructuredObject,
  createM2MStructuredObjects: createM2MStructuredObjects,
  filterM2MStructuredObjectsByApiOperations: filterM2MStructuredObjectsByApiOperations
}
