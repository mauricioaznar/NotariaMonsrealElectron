<template>
    <div>
        <label v-if="label">
            {{label}}
        </label>
        <b-form-input
                v-if="type === textInputTypes.TEXT"
                v-model="stringValue"
                :name="name"
                type="text"
                class="form-control"
                :placeholder="placeholder"
                :class="getBootstrapValidationClass(error)"
                @input="updateValue"
        >
        </b-form-input>
        <masked-input
                v-else
                :name="name"
                v-model="stringValue"
                class="form-control"
                :guide="true"
                :mask="mask"
                :class="getBootstrapValidationClass(error)"
                :placeholder="placeholder"
                @input="updateValue"
        >
        </masked-input>
        <div class="invalid-feedback">
            <span v-show="error" class="help is-danger">
              {{ error }}
            </span>
        </div>
    </div>
</template>

<script>
    import ValidatorHelper from 'renderer/services/form/ValidatorHelper'
    import Masks from 'renderer/services/form/Masks'
    let textInputTypes = {
      EMAIL: 'email',
      TEXT: 'text',
      HOUSEPHONE: 'housephone',
      CELLPHONE: 'cellphone'
    }
    export default {
      data () {
        return {
          stringValue: '',
          mask: '',
          textInputTypes: textInputTypes
        }
      },
      $_veeValidate: {
        name () {
          return this.name
        },
        value () {
          return this.value
        }
      },
      created () {
        if (this.type === textInputTypes.EMAIL) {
          this.mask = Masks.email
        }
        if (this.type === textInputTypes.HOUSEPHONE) {
          this.mask = Masks.housephone
        }
        if (this.type === textInputTypes.CELLPHONE) {
          this.mask = Masks.cellphone
        }
        if (this.initialValue !== '') {
          this.stringValue = this.initialValue
          this.updateValue(this.initialValue)
        }
      },
      props: {
        value: {
          type: String
        },
        name: {
          type: String,
          required: true
        },
        label: {
          type: String
        },
        error: {
          type: String,
          required: false
        },
        initialValue: {
          type: String,
          default: function () {
            return ''
          }
        },
        type: {
          type: String,
          default: function () {
            return textInputTypes.TEXT
          },
          validator: function (value) {
            return [textInputTypes.TEXT, textInputTypes.EMAIL, textInputTypes.HOUSEPHONE, textInputTypes.CELLPHONE].indexOf(value) !== -1
          }
        },
        placeholder: {
          type: String,
          default: function () {
            return ''
          }
        }
      },
      methods: {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        updateValue: function (newValue) {
          this.$emit('input', newValue)
        }
      }
    }
</script>

<style lang="scss">

</style>