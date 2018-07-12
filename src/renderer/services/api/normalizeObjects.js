import globalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
function normalizeObject (object, includedProperties) {
  let newObject = {}
  newObject[globalEntityIdentifier] = object[globalEntityIdentifier]
  let includedPropertiesLength = includedProperties.length
  for (let i = 0; i < includedPropertiesLength; i++) {
    let includedProperty = includedProperties[i]
    newObject[includedProperty] = object[includedProperty]
  }
  return newObject
}

function normalizeObjects (objects, includedProperties) {
  let newObjects = []
  let objectsLength = objects.length
  for (let i = 0; i < objectsLength; i++) {
    let object = objects[i]
    let newObject = normalizeObject(object, includedProperties)
    newObjects.push(newObject)
  }
  return newObjects
}


export default {normalizeObjects, normalizeObject}
