<template>
  <div>
    <div>
      <div class="form-group">
        <div class="document_property">
          <label>{{PropertiesReference.COST.title}}</label>
          <b-form-input v-model="expense.cost"
                        type="text"
                        placeholder="Ejemplo: Cita con juan">
          </b-form-input>
        </div>
      </div>
      <div class="form-group">
        <div class="observation">
          <label>{{PropertiesReference.OBSERVATION.title}}</label>
          <mau-editor
                  v-model="expense.observation"
                  :id="'observation'"
                  :initialValue="initialValues[PropertiesReference.OBSERVATION.name]">
          </mau-editor>
        </div>
      </div>
      <div class="form-group">
        <div class="date">
          <mau-form-input-date-time
                  :name="PropertiesReference.DATE.name"
                  :label="PropertiesReference.DATE.title"
                  :error="errors.first(PropertiesReference.DATE.name)"
                  v-model="expense.date"
                  :initialValue="initialValues[PropertiesReference.DATE.name]"
                  v-validate="'required'"
          >
          </mau-form-input-date-time>
        </div>
      </div>
      <div class="form-group">
        <div class="supplier">
          <mau-form-input-select
                  :availableObjects="availableSuppliers"
                  :initialObject="initialValues[PropertiesReference.SUPPLIER.name]"
                  :label="PropertiesReference.SUPPLIER.title"
                  :error="errors.first(PropertiesReference.SUPPLIER.name)"
                  v-model="expense.supplier"
                  :name="PropertiesReference.SUPPLIER.name"
                  v-validate="'object_required'"
          >
          </mau-form-input-select>
        </div>
      </div>
      <div class="form-group" v-if="expenseMode">
        <div class="expenseType">
          <mau-form-input-select
                  :availableObjects="availableExpenseTypes"
                  :initialObject="initialValues[PropertiesReference.EXPENSE_TYPE.name]"
                  :label="PropertiesReference.EXPENSE_TYPE.title"
                  v-model="expense.expenseType"
                  :name="PropertiesReference.EXPENSE_TYPE.name"
                  :error="errors.first(PropertiesReference.EXPENSE_TYPE.name)"
                  v-validate="'object_required'"
          >
          </mau-form-input-select>
        </div>
      </div>
      <div class="container mb-2 text-right">
        <b-button :disabled="buttonDisabled" @click="save" type="button" variant="primary">Guardar</b-button>
      </div>
    </div>
  </div>
</template>

<script>
  import ValidatorHelper from 'src/services/form/ValidatorHelper'
  import {mapState} from 'vuex'
  import PropertiesReference from 'src/api/propertiesReference/TransactionPropertiesReference'
  import GlobalEntityIdentifier from 'src/services/api/GlobalEntityIdentifier'
  import FormSubmitEventBus from 'src/services/form/FormSubmitEventBus'
//  import cloneDeep from 'src/services/common/cloneDeep'
  import MauFormInputSelect from 'src/components/mau-components/mau-form-inputs/MauFormInputSelect.vue'
  import MauFormInputDateTime from 'src/components/mau-components/mau-form-inputs/MauFormInputDateTime.vue'
  export default {
    name: 'AppointmentForm',
    data () {
      return {
        expense: {
          cost: '',
          observation: '',
          expenseType: {},
          date: '',
          supplier: {}
        },
        // Utility variables
        initialValues: {},
        PropertiesReference: PropertiesReference,
        buttonDisabled: false
      }
    },
    components: {
      MauFormInputSelect,
      MauFormInputDateTime
    },
    props: {
      initialObject: {
        type: Object
      },
      saveFunction: {
        type: Function,
        required: true
      },
      expenseMode: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    mounted () {
      FormSubmitEventBus.onEvent(function (isSuccess) {
        if (isSuccess === false) {
          this.buttonDisabled = false
        }
      }.bind(this))
    },
    created () {
      this.createDefaultInitialValues()
      if (this.initialObject) {
        this.setInitialValues(this.initialObject)
      }
    },
    computed: {
      ...mapState({
        availableExpenseTypes: state => state.api.entity.expenseTypes,
        availableSuppliers: state => state.api.entity.suppliers
      })
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      createDefaultInitialValues: function () {
        for (let propertyReference in PropertiesReference) {
          if (PropertiesReference.hasOwnProperty(propertyReference)) {
            if (PropertiesReference[propertyReference].name === undefined) {
              console.log(PropertiesReference[propertyReference])
            }
            this.initialValues[PropertiesReference[propertyReference].name] = PropertiesReference[propertyReference].defaultValue
          }
        }
      },
      setInitialValues: function () {
        this.expense.cost = this.initialObject[PropertiesReference.COST.name]
        this.initialValues[PropertiesReference.OBSERVATION.name] = this.initialObject[PropertiesReference.OBSERVATION.name]
        this.initialValues[PropertiesReference.DATE.name] = this.initialObject[PropertiesReference.DATE.name]
        this.initialValues[PropertiesReference.SUPPLIER.name] = this.initialObject[PropertiesReference.SUPPLIER.name]
        if (this.expenseMode) {
          this.initialValues[PropertiesReference.EXPENSE_TYPE.name] = this.initialObject[PropertiesReference.EXPENSE_TYPE.name]
        }
      },
      save: function () {
        let directParams = {
          [PropertiesReference.COST.name]: this.expense.cost,
          [PropertiesReference.OBSERVATION.name]: this.expense.observation,
          [PropertiesReference.DATE.name]: this.expense.date,
          // todo CREAR UNA FUNCION PARA LA MANDAR NULL COMO STRING
          [PropertiesReference.SUPPLIER.relationship_id_name]: this.expense.supplier ? this.expense.supplier[GlobalEntityIdentifier] : 'null'
        }
        if (this.expenseMode) {
          directParams[PropertiesReference.EXPENSE_TYPE.relationship_id_name] = this.expense.expenseType ? this.expense.expenseType[GlobalEntityIdentifier] : 'null'
        }
        let indirectParams = {}
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.buttonDisabled = true
            this.saveFunction(directParams, indirectParams)
          }
        })
      }
    },
    watch: {
      initialObject: function (initialObject) {
        this.setInitialValues(initialObject)
      },
      expense: {
        handler (val) {
        },
        deep: true
      }
    }
  }

</script>
