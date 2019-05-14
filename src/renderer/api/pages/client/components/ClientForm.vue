<template>
  <div>
    <div class="form-group form-row">
      <div class="col-sm-12 col-md-6">
        <mau-form-input-text
            :label="PropertiesReference.NAME.title"
            v-model="client.name"
            :initialValue="initialValues[PropertiesReference.NAME.name]"
            v-validate="'required'"
            :name="PropertiesReference.NAME.name"
            :error="errors.has(PropertiesReference.NAME.name) ? errors.first(PropertiesReference.NAME.name) : ''"
            :placeholder="'Ejemplo: Juan'"
        >
        </mau-form-input-text>
      </div>
      <div class="col-sm-12 col-md-6 client_lastname">
        <mau-form-input-text
            :label="PropertiesReference.LASTNAME.title"
            v-model="client.lastname"
            :initialValue="initialValues[PropertiesReference.LASTNAME.name]"
            v-validate="'required'"
            :name="PropertiesReference.LASTNAME.name"
            :error="errors.has(PropertiesReference.LASTNAME.name) ? errors.first(PropertiesReference.LASTNAME.name) : ''"
            :placeholder="'Ejemplo: Perez Dominguez'"
        >
        </mau-form-input-text>
      </div>
    </div>
    <div class="form-group form-row">
      <div class="col-md-6 col-sm-12">
        <mau-form-input-text
                :label="PropertiesReference.EMAIL.title"
                v-model="client.email"
                :initialValue="initialValues[PropertiesReference.EMAIL.name]"
                v-validate="'required'"
                :type="'email'"
                :name="PropertiesReference.EMAIL.name"
                :error="errors.has(PropertiesReference.EMAIL.name) ? errors.first(PropertiesReference.EMAIL.name) : ''"
        >
        </mau-form-input-text>
      </div>
      <div class="col-md-6 col-sm-12">
        <mau-form-input-text
                :label="PropertiesReference.PHONE.title"
                v-model="client.phone"
                :initialValue="initialValues[PropertiesReference.PHONE.name]"
                v-validate="'required'"
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
                v-model="client.city"
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
                v-model="client.country"
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
                v-model="client.zipcode"
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
              v-model="client.address1"
              :initialValue="initialValues[PropertiesReference.ADDRESS1.name]"
              :name="PropertiesReference.ADDRESS1.name"
              :error="''"
              :placeholder="'Ejemplo: Calle 19 entre 22 y 22-c colonia: Montes de ame #232'"
      >
      </mau-form-input-text>
    </div>
    <div class="form-group">
        <mau-form-input-select-dynamic
                :label="PropertiesReference.GRANTORS.title"
                v-model="client.grantors"
                :initialObjects="initialValues[PropertiesReference.GRANTORS.name]"
                :endpointName="grantorsEndpointName"
                :multiselect="true"
                :displayProperty="'fullname'"
                :error="''"
                :name="PropertiesReference.GRANTORS.name"
        >
        </mau-form-input-select-dynamic>
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
  import MauFormInputSelectDynamic from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelectDynamic'
  import ManyToManyHelper from 'renderer/services/api/ManyToManyHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'ClientForm',
    data () {
      return {
        PropertiesReference: PropertiesReference,
        client: {
          name: '',
          lastname: '',
          email: '',
          address1: '',
          city: '',
          country: '',
          zipcode: '',
          phone: '',
          grantors: []
        },
        initialValues: {},
        buttonDisabled: false,
        grantorsEndpointName: EntityTypes.GRANTOR.apiName
      }
    },
    components: {
      MauFormInputSelectDynamic
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
      this.setInitialValues()
    },
    computed: {
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
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
        this.initialValues[PropertiesReference.GRANTORS.name] = DefaultValuesHelper.arrayOfObjects(this.initialObject, PropertiesReference.GRANTORS.name)
      },
      save: function () {
        let directParams = {
          [PropertiesReference.NAME.name]: this.client.name,
          [PropertiesReference.LASTNAME.name]: this.client.lastname,
          [PropertiesReference.EMAIL.name]: this.client.email,
          [PropertiesReference.ADDRESS1.name]: this.client.address1,
          [PropertiesReference.CITY.name]: this.client.city,
          [PropertiesReference.COUNTRY.name]: this.client.country,
          [PropertiesReference.ZIPCODE.name]: this.client.zipcode,
          [PropertiesReference.PHONE.name]: this.client.phone ? this.client.phone.replace(/\D+/g, '') : ''
        }
        let m2MGrantors = ManyToManyHelper.createM2MStructuredObjects(this.client.grantors, PropertiesReference.GRANTORS.relationship_id_name)
        let initialM2MGrantors = ManyToManyHelper.createM2MStructuredObjects(this.initialValues[PropertiesReference.GRANTORS.name], PropertiesReference.GRANTORS.relationship_id_name)
        let filteredM2MGrantors = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(initialM2MGrantors, m2MGrantors, PropertiesReference.GRANTORS.relationship_id_name)
        let relayObjects = [
          ManyToManyHelper.createRelayObject(filteredM2MGrantors, EntityTypes.CLIENT_GRANTOR)
        ]
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
