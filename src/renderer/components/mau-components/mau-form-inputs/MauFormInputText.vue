<template>
    <div>
        <label v-if="label" :for="name">
            {{label}}
        </label>
        <input
                v-if="type === textInputTypes.TEXT"
                v-model="stringValue"
                :name="name"
                type="text"
                :disabled="disabled"
                class="form-control"
                :placeholder="'Nombre'"
                :class="getBootstrapValidationClass(error)"
                @input="updateValue"
        />
        <masked-input
                v-if="type === textInputTypes.EMAIL"
                :name="name"
                v-model="stringValue"
                class="form-control"
                :disabled="disabled"
                :guide="true"
                :mask="mask"
                :class="getBootstrapValidationClass(error)"
                :placeholder="'Ejemplo: juanochoa@gmail.com'"
                @input="updateValue"
        >
        </masked-input>
        <masked-input
                v-if="type === textInputTypes.HOUSE_PHONE"
                :name="name"
                v-model="stringValue"
                class="form-control"
                :guide="true"
                :disabled="disabled"
                :mask="mask"
                :class="getBootstrapValidationClass(error)"
                :placeholder="'Ejemplo: 6322 542'"
                @input="updateValue"
        >
        </masked-input>
        <masked-input
                v-if="type === textInputTypes.CELLPHONE"
                :name="name"
                v-model="stringValue"
                class="form-control"
                :guide="true"
                :mask="mask"
                :disabled="disabled"
                :class="getBootstrapValidationClass(error)"
                :placeholder="'Ejemplo: (999) 6322 542'"
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
      HOUSE_PHONE: 'house_phone',
      CELLPHONE: 'cellphone'
    }
    export default {
      name: 'MauFormInputText',
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
        if (this.type === textInputTypes.HOUSE_PHONE) {
          this.mask = Masks.house_phone
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
          required: true
        },
        initialValue: {
          type: String,
          default: function () {
            return ''
          },
          required: true
        },
        type: {
          type: String,
          default: function () {
            return textInputTypes.TEXT
          },
          validator: function (value) {
            return [textInputTypes.TEXT, textInputTypes.EMAIL, textInputTypes.HOUSE_PHONE, textInputTypes.CELLPHONE].indexOf(value) !== -1
          }
        },
        disabled: {
          type: Boolean,
          default: function () {
            return false
          }
        }
      },
      methods: {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        updateValue: function () {
          this.$emit('input', this.stringValue)
        }
      },
      watch: {
        initialValue: function (initialVal) {
          this.stringValue = initialVal
        }
      }
    }
</script>

<style lang="scss">

</style>
