function tripleboolean (initialObject, propertyName) {
  if (initialObject === undefined) {
    return -1
  }
  let propertyValue = initialObject[propertyName]
  if (propertyValue === 0 || propertyValue === '0') {
    return 0
  } else if (propertyValue === 1 || propertyValue === '1') {
    return 1
  } else {
    return -1
  }
}

function simple (initialObject, propertyName) {
  if (initialObject === undefined) {
    return ''
  }
  return initialObject[propertyName]
}

function object (initialObject, propertyName) {
  if (initialObject === undefined) {
    return {}
  }
  return initialObject[propertyName]
}

function arrayOfObjects (initialObject, propertyName) {
  if (initialObject === undefined) {
    return []
  }
  return initialObject[propertyName]
}
export default {tripleboolean, simple, arrayOfObjects, object}

