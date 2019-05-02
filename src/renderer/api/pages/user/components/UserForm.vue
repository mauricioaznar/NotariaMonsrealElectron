<template>
  <div>
    <div class="form-group form-row">
      <div class="col-sm-12 col-md-6">
        <mau-form-input-text
            :label="PropertiesReference.NAME.title"
            v-model="user.name"
            v-validate="'required'"
            :name="PropertiesReference.NAME.name"
            :initialValue="initialValues[PropertiesReference.NAME.name]"
            :error="errors.has(PropertiesReference.NAME.name) ? errors.first(PropertiesReference.NAME.name) : ''"
            :placeholder="'Ejemplo: Juan'"
        >
        </mau-form-input-text>
      </div>
      <div class="col-sm-12 col-md-6">
        <mau-form-input-text
            :label="PropertiesReference.LASTNAME.title"
            v-model="user.lastname"
            v-validate="'required'"
            :name="PropertiesReference.LASTNAME.name"
            :initialValue="initialValues[PropertiesReference.LASTNAME.name]"
            :placeholder="'Ejemplo: Perez Dominguez'"
            :error="errors.has(PropertiesReference.LASTNAME.name) ? errors.first(PropertiesReference.LASTNAME.name) : ''"
        >
        </mau-form-input-text>
      </div>
    </div>
    <div class="form-group form-row">
      <div class="col-md-6 col-sm-12">
        <mau-form-input-text
            :label="PropertiesReference.EMAIL.title"
            v-model="user.email"
            v-validate="'required'"
            :type="'email'"
            :name="PropertiesReference.EMAIL.name"
            :initialValue="initialValues[PropertiesReference.EMAIL.name]"
            :error="errors.has(PropertiesReference.EMAIL.name) ? errors.first(PropertiesReference.EMAIL.name) : ''"
        >
        </mau-form-input-text>
      </div>
      <div class="col-md-6 col-sm-12 phone">
        <mau-form-input-text
            :label="PropertiesReference.PHONE.title"
            v-model="user.phone"
            v-validate="'required'"
            :type="'cellphone'"
            :name="PropertiesReference.PHONE.name"
            :initialValue="initialValues[PropertiesReference.PHONE.name]"
            :placeholder="'Ochoa'"
            :error="errors.has(PropertiesReference.PHONE.name) ? errors.first(PropertiesReference.PHONE.name) : ''"
        >
        </mau-form-input-text>
      </div>
    </div>
    <div class="form-group">
      <mau-form-input-select-dynamic
            :url="rolesUrl"
            :initialObject="initialValues[PropertiesReference.ROLE.name]"
            :label="PropertiesReference.ROLE.title"
            :displayProperty="'name'"
            v-model="user.role"
            :name="PropertiesReference.ROLE.name"
            v-validate="'required'"
            :error="errors.has(PropertiesReference.ROLE.name) ? errors.first(PropertiesReference.ROLE.name) : ''"
      >
      </mau-form-input-select-dynamic>
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
  import MauFormInputSelectDynamic from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelectDynamic.vue'
  import MauFormInputText from 'renderer/components/mau-components/mau-form-inputs/MauFormInputText'
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
      MauFormInputSelectDynamic,
      MauFormInputText
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
        this.initialValues[PropertiesReference.PHONE.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.PHONE.name)
        this.initialValues[PropertiesReference.EMAIL.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.EMAIL.name)
        this.initialValues[PropertiesReference.ROLE.name] = DefaultValuesHelper.object(this.initialObject, PropertiesReference.ROLE.name)
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
            this.saveFunction(directParams, [])
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
