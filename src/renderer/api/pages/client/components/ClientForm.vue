<template>
  <div>
    <div class="form-group form-row">
      <div class="col-sm-12 col-md-6 client_name">
        <label>{{PropertiesReference.NAME.title}}</label>
        <b-form-input v-model="client.name"
                      type="text"
                      class="form-control"
                      v-validate="'required'"
                      :class="getBootstrapValidationClass(errors.has(PropertiesReference.NAME.name))"
                      :data-vv-name="PropertiesReference.NAME.name"
                      placeholder="Ejemplo: Juan Rodrigo">
        </b-form-input>
        <div class="invalid-feedback">
            <span v-show="errors.has(PropertiesReference.NAME.name)" class="help is-danger">
              {{ errors.first(PropertiesReference.NAME.name) }}
            </span>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 client_lastname">
        <label>{{PropertiesReference.LASTNAME.title}}</label>
        <b-form-input v-model="client.lastname"
                      type="text"
                      placeholder="Ejemplo: Ochoa Campos"
                      class="form-control"
                      v-validate="'required'"
                      :class="getBootstrapValidationClass(errors.has(PropertiesReference.LASTNAME.name))"
                      :data-vv-name="PropertiesReference.LASTNAME.name"
        >
        </b-form-input>
        <div class="invalid-feedback">
            <span v-show="errors.has(PropertiesReference.LASTNAME.name)" class="help is-danger">
              {{ errors.first(PropertiesReference.LASTNAME.name) }}
            </span>
        </div>
      </div>
    </div>
    <div class="form-group form-row">
      <div class="col-md-6 col-sm-12 client_email">
        <label>{{PropertiesReference.EMAIL.title}}</label>
        <masked-input
                :name="PropertiesReference.EMAIL.name"
                v-model="client.email"
                :value="initialValues[PropertiesReference.EMAIL.name]"
                class="form-control"
                :guide="true"
                :mask="PropertiesReference.EMAIL.mask"
                :class="getBootstrapValidationClass(errors.has(PropertiesReference.EMAIL.name))"
                :data-vv-name="PropertiesReference.EMAIL.name"
                v-validate="'required'"
                :placeholder="'Ejemplo: juanochoa@gmail.com'"
        >
        </masked-input>
        <div class="invalid-feedback">
            <span v-show="errors.has(PropertiesReference.EMAIL.name)" class="help is-danger">
              {{ errors.first(PropertiesReference.EMAIL.name) }}
            </span>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 client_phone">
        <label>{{PropertiesReference.PHONE.title}}</label>
        <masked-input
                :name="PropertiesReference.PHONE.name"
                v-model="client.phone"
                :value="initialValues[PropertiesReference.PHONE.name]"
                class="form-control"
                :guide="true"
                :mask="PropertiesReference.PHONE.mask"
                :class="getBootstrapValidationClass(errors.has(PropertiesReference.PHONE.name))"
                :data-vv-name="PropertiesReference.PHONE.name"
                v-validate="'required'"
                :placeholder="'Ejemplo: (999) 6322 542'"
        >
        </masked-input>
        <div class="invalid-feedback">
            <span v-show="errors.has(PropertiesReference.PHONE.name)" class="help is-danger">
              {{ errors.first(PropertiesReference.PHONE.name) }}
            </span>
        </div>
      </div>
    </div>
    <div class="form-group form-row">
      <div class="col-sm-12 col-md-4 client_city">
        <label>{{PropertiesReference.CITY.title}}</label>
        <b-form-input v-model="client.city"
                      type="text"
                      placeholder="Ejemplo: Juan Rodrigo">
        </b-form-input>
      </div>
      <div class="col-sm-12 col-md-4 client_country">
        <label>{{PropertiesReference.COUNTRY.title}}</label>
        <b-form-input v-model="client.country"
                      type="text"
                      placeholder="Ejemplo: uan Rodrigo">
        </b-form-input>
        <div class="invalid-feedback">
            <span v-show="errors.has(PropertiesReference.COUNTRY.name)" class="help is-danger">
              {{ errors.first(PropertiesReference.COUNTRY.name) }}
            </span>
        </div>
      </div>
      <div class="col-sm-12 col-md-4 client_zipcode">
        <label>{{PropertiesReference.ZIPCODE.title}}</label>
        <masked-input
                :name="PropertiesReference.ZIPCODE.name"
                v-model="client.zipcode"
                :value="initialValues[PropertiesReference.ZIPCODE.name]"
                class="form-control"
                :guide="true"
                :mask="PropertiesReference.ZIPCODE.mask"
                :class="getBootstrapValidationClass(errors.has(PropertiesReference.ZIPCODE.name))"
                :data-vv-name="PropertiesReference.ZIPCODE.name"
                :placeholder="'Ejemplo: 99963'"
        >
        </masked-input>
        <div class="invalid-feedback">
        <span v-show="errors.has(PropertiesReference.ZIPCODE.name)" class="help is-danger">
          {{ errors.first(PropertiesReference.ZIPCODE.name) }}
        </span>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="client_address1">
        <label>{{PropertiesReference.ADDRESS1.title}}</label>
        <b-form-input v-model="client.address1"
                      type="text"
                      placeholder="Ejemplo: Calle 19 entre 22 y 22-c">
        </b-form-input>
      </div>
    </div>
    <div class="form-group">
      <div class="client_grantors">
        <label>{{PropertiesReference.GRANTORS.title}}</label>
        <mau-form-input-select
                v-model="client.grantors"
                :initialObjects="initialValues[PropertiesReference.GRANTORS.name]"
                :relatedRelationshipName="PropertiesReference.GRANTORS.relationship_id_name"
                :url="grantorsUrl"
                :multiselect="true"
                :label="'fullname'"
        >
        </mau-form-input-select>
      </div>
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
  import MauFormInputSelect from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelect'
  import ManyToManyHelper from 'renderer/services/api/ManyToManyHelper'
  import ApiUrls from 'renderer/services/api/ApiUrls'
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
        grantorsUrl: ApiUrls.createListUrl(EntityTypes.GRANTOR.apiName) + '?paginate=false',
        initialValues: {},
        buttonDisabled: false
      }
    },
    components: {
      MauFormInputSelect
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
        this.client.name = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.NAME.name)
        this.client.lastname = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.LASTNAME.name)
        this.client.address1 = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.ADDRESS1.name)
        this.client.email = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.EMAIL.name)
        this.client.city = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.CITY.name)
        this.client.country = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.COUNTRY.name)
        this.client.zipcode = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.ZIPCODE.name)
        this.client.phone = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.PHONE.name)
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
        let indirectParams = {
          [PropertiesReference.GRANTORS.entityName]: filteredM2MGrantors
        }
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
      }
    }
  }

</script>
