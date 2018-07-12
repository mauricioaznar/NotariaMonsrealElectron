<template>
    <div>
        <label v-if="label">
            {{label}}
        </label>
        <vue-select
                v-model="selected"
                :label="displayProperty"
                :track-by="'id'"
                class="form-control override-form-control"
                :onSearch="onSearch"
                :clearSearchOnSelect="hasClear"
                :options="availableObjects"
                :class="getBootstrapValidationClass(error)"
        >
            <template slot="option" slot-scope="option">
                {{option[displayProperty]}}
            </template>
            <span slot="no-options">No se encontraron resultados.</span>
        </vue-select>
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
    import ApiOperations from 'renderer/services/api/ApiOperations'
    import _ from 'lodash'
    export default {
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
        value: {
          type: [Object]
        },
        name: {
          type: String
        },
        error: {
          type: String,
          required: false
        },
        availableObjects: {
          type: Array
        },
        displayProperty: {
          type: String,
          default: 'name'
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
        },
        entityApiName: {
          type: String,
          default: function () {
            return ''
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
          if (this.url !== '') {
            _.debounce(ApiOperations.get().then(data => {
              this.options = data
            }).catch(e => {
              console.log(e)
            }), 500)
          }
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
