<template>
    <div class="mau-form-input-select-static">
        <select class="w-100 h-100" :name="name" v-model="selected">
            <option v-for="availableObject in availableObjects" :value="availableObject">{{availableObject[displayProperty]}}</option>
        </select>
        <div class="invalid-feedback">
          <span v-show="error" class="help is-danger">
            {{error}}
          </span>
        </div>
    </div>
</template>

<script>
    import VueSelect from 'vue-select'
    import ValidatorHelper from 'renderer/services/form/ValidatorHelper'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    export default {
      name: 'MauFormInputSelectStatic',
      data () {
        return {
          selected: null
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
      props: {
        name: {
          type: String,
          required: true
        },
        error: {
          type: String,
          required: false
        },
        availableObjects: {
          type: Array,
          required: true
        },
        displayProperty: {
          type: String,
          required: true
        },
        label: {
          type: String
        },
        initialObject: {
          type: Object,
          default: function () {
            return {}
          }
        },
        hasClear: {
          type: Boolean,
          default: function () {
            return false
          }
        }
      },
      created () {
        if (typeof this.initialObject === 'object' && Object.keys(this.initialObject).length !== 0) {
          this.selected = cloneDeep(this.initialObject)
        }
      },
      components: {
        VueSelect
      },
      methods: {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        updateValue: function (newValue) {
          if (newValue === null) {
            newValue = {}
          }
          this.$emit('input', newValue)
        },
        onSearch: function (string) {
        }
      },
      watch: {
        selected: function (newValue) {
          this.updateValue(newValue)
        },
        initialObject: function (newInitialObject) {
          this.selected = newInitialObject
        }
      }
    }
</script>

<style lang="scss">
    .mau-form-input-select-static {
        select {
            border: 0px solid transparent;
        }
    }
</style>
