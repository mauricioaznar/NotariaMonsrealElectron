<template>
  <div>
    <div class="form-group form-row">
      <div class="col-sm-12 col-md-6">
        <mau-form-input-text
                :label="PropertiesReference.NAME.title"
                v-model="grantor.name"
                :initialValue="initialValues[PropertiesReference.NAME.name]"
                v-validate="'required'"
                :name="PropertiesReference.NAME.name"
                :error="errors.has(PropertiesReference.NAME.name) ? errors.first(PropertiesReference.NAME.name) : ''"
                :placeholder="'Ejemplo: Juan'"
        >
        </mau-form-input-text>
      </div>
      <div class="col-sm-12 col-md-6">
        <mau-form-input-text
                :label="PropertiesReference.LASTNAME.title"
                v-model="grantor.lastname"
                :initialValue="initialValues[PropertiesReference.LASTNAME.name]"
                v-validate="'required'"
                :name="PropertiesReference.LASTNAME.name"
                :error="errors.has(PropertiesReference.LASTNAME.name) ? errors.first(PropertiesReference.LASTNAME.name) : ''"
                :placeholder="'Perez Dominguez'"
        >
        </mau-form-input-text>
      </div>
    </div>
    <div class="form-group form-row">
      <div class="col-md-6 col-sm-12">
        <mau-form-input-text
                :label="PropertiesReference.EMAIL.title"
                v-model="grantor.email"
                :initialValue="initialValues[PropertiesReference.EMAIL.name]"
                :type="'email'"
                :name="PropertiesReference.EMAIL.name"
                :error="errors.has(PropertiesReference.EMAIL.name) ? errors.first(PropertiesReference.EMAIL.name) : ''"
        >
        </mau-form-input-text>
      </div>
      <div class="col-md-6 col-sm-12">
        <mau-form-input-text
                :label="PropertiesReference.PHONE.title"
                v-model="grantor.phone"
                :initialValue="initialValues[PropertiesReference.PHONE.name]"
                :type="'cellphone'"
                :name="PropertiesReference.PHONE.name"
                :error="errors.has(PropertiesReference.PHONE.name) ? errors.first(PropertiesReference.PHONE.name) : ''"
        >
        </mau-form-input-text>
      </div>
    </div>
    <div class="form-group form-row">
      <div class="col-sm-12 col-md-4">
        <mau-form-input-text
                :label="PropertiesReference.CITY.title"
                v-model="grantor.city"
                :initialValue="initialValues[PropertiesReference.CITY.name]"
                :name="PropertiesReference.CITY.name"
                :error="''"
                :placeholder="'Ejemplo: Mérida'"
        >
        </mau-form-input-text>
      </div>
      <div class="col-sm-12 col-md-4">
        <mau-form-input-text
                :label="PropertiesReference.COUNTRY.title"
                v-model="grantor.country"
                :initialValue="initialValues[PropertiesReference.COUNTRY.name]"
                :name="PropertiesReference.COUNTRY.name"
                :error="''"
                :placeholder="'Ejemplo: México'"
        >
        </mau-form-input-text>
      </div>
      <div class="col-sm-12 col-md-4">
        <mau-form-input-text
                :label="PropertiesReference.ZIPCODE.title"
                v-model="grantor.zipcode"
                :initialValue="initialValues[PropertiesReference.ZIPCODE.name]"
                :name="PropertiesReference.ZIPCODE.name"
                :error="errors.has(PropertiesReference.ZIPCODE.name) ? errors.first(PropertiesReference.ZIPCODE.name) : ''"
                v-validate="'numeric'"
                :placeholder="'Ejemplo: 97130'"
        >
        </mau-form-input-text>
      </div>
    </div>
    <div class="form-group">
      <mau-form-input-text
              :label="PropertiesReference.ADDRESS1.title"
              v-model="grantor.address1"
              :initialValue="initialValues[PropertiesReference.ADDRESS1.name]"
              :name="PropertiesReference.ADDRESS1.name"
              :error="''"
              :placeholder="'Ejemplo: Calle 19 entre 22 y 22-c colonia: Montes de ame #232'"
      >
      </mau-form-input-text>
    </div>
    <div class="container mb-2 text-right">
      <b-button :disabled="buttonDisabled" @click="save" type="button" variant="primary">Guardar</b-button>
    </div>
  </div>
</template>

<script>
  import ValidatorHelper from 'renderer/services/form/ValidatorHelper'
  import PropertiesReference from '../PropertiesReference'
  import FormSubmitEventBus from 'renderer/services/form/FormSubmitEventBus'
  import DefaultValuesHelper from 'renderer/services/form/DefaultValuesHelper'
  export default {
    name: 'ClientForm',
    data () {
      return {
        PropertiesReference: PropertiesReference,
        grantor: {
          name: '',
          lastname: '',
          email: '',
          address1: '',
          city: '',
          country: '',
          zipcode: '',
          phone: ''
        },
        initialValues: {},
        buttonDisabled: false
      }
    },
    components: {
    },
    props: {
      initialObject: {
        type: Object
      },
      saveFunction: {
        type: Function,
        required: true
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
      this.setInitialValues(this.initialObject)
    },
    computed: {
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      createDefaultInitialValues: function () {
        for (let propertyReference in PropertiesReference) {
          if (PropertiesReference.hasOwnProperty(propertyReference)) {
            this.initialValues[PropertiesReference[propertyReference].name] = PropertiesReference[propertyReference].defaultValue
          }
        }
      },
      setInitialValues: function () {
        this.initialValues[PropertiesReference.NAME.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.NAME.name)
        this.initialValues[PropertiesReference.LASTNAME.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.LASTNAME.name)
        this.initialValues[PropertiesReference.ADDRESS1.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.ADDRESS1.name)
        this.initialValues[PropertiesReference.EMAIL.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.EMAIL.name)
        this.initialValues[PropertiesReference.CITY.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.CITY.name)
        this.initialValues[PropertiesReference.COUNTRY.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.COUNTRY.name)
        let zipCode = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.ZIPCODE.name)
        this.initialValues[PropertiesReference.ZIPCODE.name] = String(zipCode)
        this.initialValues[PropertiesReference.PHONE.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.PHONE.name)
      },
      save: function () {
        let directParams = {
          [PropertiesReference.NAME.name]: this.grantor.name,
          [PropertiesReference.LASTNAME.name]: this.grantor.lastname,
          [PropertiesReference.PHONE.name]: this.grantor.phone ? this.grantor.phone.replace(/\D+/g, '') : '',
          [PropertiesReference.EMAIL.name]: this.grantor.email,
          [PropertiesReference.ADDRESS1.name]: this.grantor.address1,
          [PropertiesReference.CITY.name]: this.grantor.city,
          [PropertiesReference.COUNTRY.name]: this.grantor.country,
          [PropertiesReference.ZIPCODE.name]: this.grantor.zipcode
        }
        let relayObjects = []
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.buttonDisabled = true
            this.saveFunction(directParams, relayObjects)
          }
        })
      }
    },
    watch: {
      initialObject: function (initialObject) {
        this.setInitialValues(initialObject)
      }
    }
  }

</script>
