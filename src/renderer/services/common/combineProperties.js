export default function (objectArray) {
  let newObject = {}
  let objectArrayLength = objectArray.length
  for (let i = 0; i < objectArrayLength; i++) {
    let currentObject = objectArray[i]
    for (let currentObjectPropertyKey in currentObject) {
      if (currentObject.hasOwnProperty(currentObjectPropertyKey)) {
        newObject[currentObjectPropertyKey] = currentObject[currentObjectPropertyKey]
      }
    }
  }
  return newObject
}
