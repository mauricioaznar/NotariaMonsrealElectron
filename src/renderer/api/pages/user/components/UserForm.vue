<template>
  <div>
    <div class="form-group form-row">
      <div class="col-sm-12 col-md-6 user_name">
        <label>{{PropertiesReference.NAME.title}}</label>
        <b-form-input v-model="user.name"
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
      <div class="col-sm-12 col-md-6 user_lastname">
        <label>{{PropertiesReference.LASTNAME.title}}</label>
        <b-form-input v-model="user.lastname"
                      type="text"
                      placeholder="Ejemplo: Ochoa Campos">
        </b-form-input>
      </div>
    </div>
    <div class="form-group form-row">
      <div class="col-md-6 col-sm-12 email">
        <label>{{PropertiesReference.EMAIL.title}}</label>
        <masked-input
                :name="PropertiesReference.EMAIL.name"
                v-model="user.email"
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
      <div class="col-md-6 col-sm-12 phone">
        <label>{{PropertiesReference.PHONE.title}}</label>
        <masked-input
                :name="PropertiesReference.PHONE.name"
                v-model="user.phone"
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
    <div class="form-group">
      <div class="role">
        <label>{{PropertiesReference.ROLE.title}}</label>
        <mau-form-input-select
                :initialObject="initialValues[PropertiesReference.ROLE.name]"
                :label="'name'"
                v-model="user.role"
                :url="rolesUrl"
                class="override-form-control form-control"
                :name="PropertiesReference.ROLE.name"
                v-validate="'required'"
                :data-vv-name="PropertiesReference.ROLE.name"
                :class="getBootstrapValidationClass(errors.has(PropertiesReference.ROLE.name))"
        >
        </mau-form-input-select>
        <div class="invalid-feedback">
              <span v-show="errors.has(PropertiesReference.ROLE.name)" class="help is-danger">
                {{ errors.first(PropertiesReference.ROLE.name) }}
              </span>
        </div>
      </div>
    </div>
    <div class="container mb-2 text-right">
      <b-button :disabled="buttonDisabled" @click="save" type="button" variant="primary">Guardar</b-button>
    </div>
  </div>
</template>

<script>
  import PropertiesReference from '../PropertiesReference'
  import globalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
  import ValidatorHelper from 'renderer/services/form/ValidatorHelper'
  import DefaultValuesHelper from 'renderer/services/form/DefaultValuesHelper'
  import FormSubmitEventBus from 'renderer/services/form/FormSubmitEventBus'
  import MauFormInputSelect from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelect.vue'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'UserForm',
    data () {
      return {
        PropertiesReference: PropertiesReference,
        mauTabsNames: [
          '1',
          '2'
        ],
        user: {
          name: '',
          lastname: '',
          email: '',
          phone: '',
          role: ''
        },
        rolesUrl: ApiUrls.createListUrl(EntityTypes.ROLE.apiName) + '?paginate=false',
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
        this.user.name = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.NAME.name)
        this.user.lastname = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.LASTNAME.name)
        this.user.phone = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.PHONE.name)
        this.user.email = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.EMAIL.name)
        this.initialValues[PropertiesReference.ROLE.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.ROLE.name)
      },
      save: function () {
        let directParams = {
          [PropertiesReference.NAME.name]: this.user.name,
          [PropertiesReference.LASTNAME.name]: this.user.lastname,
          [PropertiesReference.PHONE.name]: this.user.phone ? this.user.phone.replace(/\D+/g, '') : '',
          [PropertiesReference.EMAIL.name]: this.user.email,
          [PropertiesReference.ROLE.relationship_id_name]: this.user.role ? this.user.role[globalEntityIdentifier] : 'null'
        }
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.buttonDisabled = true
            this.saveFunction(directParams)
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
