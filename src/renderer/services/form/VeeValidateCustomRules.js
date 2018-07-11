let objectRequired = {
  getMessage: field => `The field ${field} is required`,
  validate: value => {
    return !(Object.keys(value).length === 0 && value.constructor === Object)
  }
}

let arrayRequired = {
  getMessage: field => `The field ${field} is required`,
  validate: value => {
    return !(value.length === 0)
  }
}

export default {
  objectRequired: objectRequired,
  arrayRequired: arrayRequired
}
