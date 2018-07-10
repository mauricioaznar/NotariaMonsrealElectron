<template>
  <div>
    <div class="form-group form-row">
      <div class="col-sm-12 col-md-6 grantor_name">
        <label>{{PropertiesReference.NAME.title}}</label>
        <b-form-input v-model="grantor.name"
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
      <div class="col-sm-12 col-md-6 grantor_lastname">
        <label>{{PropertiesReference.NICKNAME.title}}</label>
        <b-form-input v-model="grantor.lastname"
                      type="text"
                      placeholder="Ejemplo: Ochoa Campos">
        </b-form-input>
      </div>
    </div>
    <div class="form-group form-row">
      <div class="col-md-6 col-sm-12 grantor_email">
        <label>{{PropertiesReference.EMAIL.title}}</label>
        <masked-input
                :name="PropertiesReference.EMAIL.name"
                v-model="grantor.email"
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
      <div class="col-md-6 col-sm-12 grantor_phone">
        <label>{{PropertiesReference.PHONE.title}}</label>
        <masked-input
                :name="PropertiesReference.PHONE.name"
                v-model="grantor.phone"
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
      <div class="col-sm-12 col-md-4 grantor_city">
        <label>{{PropertiesReference.CITY.title}}</label>
        <b-form-input v-model="grantor.city"
                      type="text"
                      placeholder="Ejemplo: Juan Rodrigo">
        </b-form-input>
      </div>
      <div class="col-sm-12 col-md-4 grantor_country">
        <label>{{PropertiesReference.COUNTRY.title}}</label>
        <b-form-input v-model="grantor.country"
                      type="text"
                      placeholder="Ejemplo: Juan Rodrigo">
        </b-form-input>
        <div class="invalid-feedback">
            <span v-show="errors.has(PropertiesReference.COUNTRY.name)" class="help is-danger">
              {{ errors.first(PropertiesReference.COUNTRY.name) }}
            </span>
        </div>
      </div>
      <div class="col-sm-12 col-md-4 grantor_zipcode">
        <label>{{PropertiesReference.ZIPCODE.title}}</label>
        <masked-input
                :name="PropertiesReference.ZIPCODE.name"
                v-model="grantor.zipcode"
                :value="initialValues[PropertiesReference.ZIPCODE.name]"
                class="form-control"
                :guide="true"
                :mask="PropertiesReference.ZIPCODE.mask"
                :class="getBootstrapValidationClass(errors.has(PropertiesReference.ZIPCODE.name))"
                :data-vv-name="PropertiesReference.ZIPCODE.name"
                v-validate="'required'"
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
      <div class="grantor_address1">
        <label>{{PropertiesReference.ADDRESS1.title}}</label>
        <b-form-input v-model="grantor.address1"
                      type="text"
                      placeholder="Ejemplo: Calle 19 entre 22 y 22-c">
        </b-form-input>
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
      this.createDefaultInitialValues()
      if (this.initialObject) {
        this.setInitialValues(this.initialObject)
      }
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
        this.grantor.name = this.initialObject[PropertiesReference.NAME.name]
        this.grantor.lastname = this.initialObject[PropertiesReference.NICKNAME.name]
        this.grantor.phone = this.initialObject[PropertiesReference.PHONE.name]
        this.grantor.email = this.initialObject[PropertiesReference.EMAIL.name]
        this.grantor.address1 = this.initialObject[PropertiesReference.ADDRESS1.name]
        this.grantor.city = this.initialObject[PropertiesReference.CITY.name]
        this.grantor.country = this.initialObject[PropertiesReference.COUNTRY.name]
        this.grantor.zipcode = this.initialObject[PropertiesReference.ZIPCODE.name]
      },
      save: function () {
        let directParams = {
          [PropertiesReference.NAME.name]: this.grantor.name,
          [PropertiesReference.NICKNAME.name]: this.grantor.lastname,
          [PropertiesReference.PHONE.name]: this.grantor.phone ? this.grantor.phone.replace(/\D+/g, '') : '',
          [PropertiesReference.EMAIL.name]: this.grantor.email,
          [PropertiesReference.ADDRESS1.name]: this.grantor.address1,
          [PropertiesReference.CITY.name]: this.grantor.city,
          [PropertiesReference.COUNTRY.name]: this.grantor.country,
          [PropertiesReference.ZIPCODE.name]: this.grantor.zipcode
        }
        let indirectParams = {
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
