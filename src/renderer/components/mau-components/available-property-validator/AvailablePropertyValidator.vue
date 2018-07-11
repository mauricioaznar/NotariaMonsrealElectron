<template>
  <div class="available-property-validator">
    <div class="form-group with-icon-right d-flex justify-content-center"
         :class="{'has-error': hasError(), 'valid': (isValid() && isValidated())}"
    >
      <div class="input-group">
        <input :type="type"
               name="page-valid"
               v-model="value"
               v-on:keydown="unvalidate"
               :disabled="isSubmiting()"

        />
        <i class="fa fa-exclamation-triangle error-icon icon-right input-icon"></i>
        <i class="fa fa-check valid-icon icon-right input-icon"></i>
        <label class="control-label">{{isSubmiting() ? 'Espere mientras se valida' : label}}</label><i class="bar"></i>
        <small v-show="hasError()" class="help text-danger">{{error}}</small>
      </div>
      <button class="btn btn-primary btn-micro" v-on:click="validate">
        Validar
      </button>
    </div>
  </div>
</template>

<script>
  import {getHeaders} from 'renderer/config'
  export default {
    data () {
      return {
        validated: false,
        valid: false,
        submiting: false,
        value: this.initialValue,
        error: ''
      }
    },
    name: 'AvailablePropertyValidator',
    props: {
      initialValue: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'text'
      },
      required: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      isValid () {
        return this.valid
      },
      isValidated () {
        return this.validated
      },
      hasError () {
        return !this.isValid() && this.isValidated()
      },
      validate () {
        let that = this
        if (!this.isSubmiting()) {
          this.submiting = true
          this.validated = false
          if (this.value === '') {
            that.changeToIncorrectValidation()
            this.error = 'El campo ' + this.label + ' esta vacio'
            return
          }
          if (this.value === this.initialValue) {
            that.changeToCorrectValidation()
            this.error = ''
            return
          }
          this.$http.get(this.url + this.value, {headers: getHeaders()})
            .then((response) => {
              if (response.status === 200) {
                that.changeToIncorrectValidation()
                that.error = 'El valor ' + that.value + ' ya esta utilizado'
              }
            })
            .catch(e => {
              that.changeToCorrectValidation()
              that.error = ''
            })
        }
      },
      changeToIncorrectValidation () {
        this.valid = false
        this.validated = true
        this.submiting = false
      },
      changeToCorrectValidation () {
        this.valid = true
        this.validated = true
        this.submiting = false
      },
      unvalidate () {
        this.validated = false
        this.valid = false
      },
      isSubmiting () {
        return this.submiting
      }
    },
    created () {
      this.value = this.initialValue
    },
    watch: {
      value: function (val) {
        this.$emit('input', val)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/variables";
  .available-property-validator {
    .form-group {
      margin-bottom: $date-picker-margin-bottom;
    }
    .btn {
      margin-left: 1rem;
    }
    input {
      min-width: 100px;
    }
  }
</style>
