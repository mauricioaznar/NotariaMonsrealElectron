import GlobalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'



function createM2MStructuredObjects (objects, selectedEntityRelationshipName, newProperties = {}) {
  let m2mStructuredObjects = []
  let objectsLength = objects.length
  for (let i = 0; i < objectsLength; i++) {
    let object = objects[i]
    let relationshipObject = createSimpleM2MStructuredObject(object, selectedEntityRelationshipName, newProperties)
    m2mStructuredObjects.push(relationshipObject)
  }
  return m2mStructuredObjects
  function createSimpleM2MStructuredObject (object, selectedEntityRelationshipName, newProperties = {}) {
    let m2mStructuredObject = {}
    m2mStructuredObject[selectedEntityRelationshipName] = object[GlobalEntityIdentifier]
    for (let newPropertyKey in newProperties) {
      if (newProperties.hasOwnProperty(newPropertyKey)) {
        m2mStructuredObject[newPropertyKey] = newProperties[newPropertyKey]
      }
    }
    let pivotProperties = object.pivot
    if (pivotProperties) {
      for (let pivotPropertyKey in pivotProperties) {
        if (pivotProperties.hasOwnProperty(pivotPropertyKey)) {
          m2mStructuredObject[pivotPropertyKey] = pivotProperties[pivotPropertyKey]
        }
      }
    }
    return m2mStructuredObject
  }
}

function filterM2MStructuredObjectsByApiOperations (initialRelationshipObjects, newRelationshipObjects, selectedEntityRelationshipName) {
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
        let areEqual = areInitialAndSelectedPropertiesEqual(initialObj, foundObj)
        if (!areEqual) {
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

function createRelayObject (filteredM2MObjectsByApiOperations, entityType) {
  return {
    filteredM2MObjects: filteredM2MObjectsByApiOperations,
    entityType: entityType
  }
}

function getRelayObjectEntityType (M2MRelayObject) {
  return M2MRelayObject.entityType
}

function getRelayObjectFilteredM2MObjects (M2MRelayObject) {
  return M2MRelayObject.filteredM2MObjects
}

export default {
  createM2MStructuredObjects: createM2MStructuredObjects,
  filterM2MStructuredObjectsByApiOperations: filterM2MStructuredObjectsByApiOperations,
  createRelayObject: createRelayObject,
  getRelayObjectEntityType: getRelayObjectEntityType,
  getRelayObjectFilteredM2MObjects: getRelayObjectFilteredM2MObjects
}
