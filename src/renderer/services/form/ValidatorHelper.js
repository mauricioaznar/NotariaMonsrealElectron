function getBootstrapValidationClass (error) {
  return error !== '' && error !== undefined ? 'is-invalid' : ''
}
export default {getBootstrapValidationClass}
