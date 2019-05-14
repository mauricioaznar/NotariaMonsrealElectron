1<template>
  <div>
      <div>
          <div class="form-group">
              <mau-form-input-text
                  v-model="group.name"
                  v-validate="'required'"
                  :label="PropertiesReference.NAME.title"
                  :name="PropertiesReference.NAME.name"
                  :initialValue="initialValues[PropertiesReference.NAME.name]"
                  :error="errors.has(PropertiesReference.NAME.name) ? errors.first(PropertiesReference.NAME.name) : ''"
                  :placeholder="'Ejemplo: Grupo 1'"
              >
              </mau-form-input-text>
          </div>
          <div class="form-group">
              <mau-form-input-select-dynamic
                  :initialObject="initialValues[PropertiesReference.USER.name]"
                  :label="PropertiesReference.USER.title"
                  v-model="group.user"
                  :endpointName="usersEndpointName"
                  :name="PropertiesReference.USER.name"
                  :displayProperty="'fullname'"
                  :error="errors.has(PropertiesReference.USER.name) ? errors.first(PropertiesReference.USER.name) : ''"
                  v-validate="'required'"
              >
              </mau-form-input-select-dynamic>
          </div>
          <div class="form-group">
              <mau-form-input-select-dynamic
                  :initialObjects="initialValues[PropertiesReference.USERS.name]"
                  :label="PropertiesReference.USERS.title"
                  v-model="group.users"
                  :endpointName="usersEndpointName"
                  :name="PropertiesReference.USERS.name"
                  :displayProperty="'fullname'"
                  :error="errors.has(PropertiesReference.USERS.name) ? errors.first(PropertiesReference.USERS.name) : ''"
                  :multiselect="true"
                  v-validate="'required'"
              >
              </mau-form-input-select-dynamic>
          </div>
          <div class="container mb-2 text-right">
              <b-button :disabled="buttonDisabled" @click="save" type="button" variant="primary">Guardar</b-button>
          </div>
      </div>
  </div>
</template>

<script>
  import PropertiesReference from '../PropertiesReference'
  import ValidatorHelper from 'renderer/services/form/ValidatorHelper'
  import FormSubmitEventBus from 'renderer/services/form/FormSubmitEventBus'
  import MauFormInputSelectDynamic from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelectDynamic.vue'
  import ManyToManyHelper from 'renderer/services/api/ManyToManyHelper'
  import globalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
  import DefaultValuesHelper from 'renderer/services/form/DefaultValuesHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'GroupForm',
    data () {
      return {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        PropertiesReference: PropertiesReference,
        group: {
          name: '',
          users: [],
          user: ''
        },
        initialValues: {},
        buttonDisabled: false,
        usersEndpointName: EntityTypes.USER.apiName
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
      this.setInitialValues(this.initialObject)
    },
    computed: {
    },
    methods: {
      setInitialValues: function () {
        this.initialValues[PropertiesReference.NAME.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.NAME.name)
        this.initialValues[PropertiesReference.USERS.name] = DefaultValuesHelper.arrayOfObjects(this.initialObject, PropertiesReference.USERS.name)
        this.initialValues[PropertiesReference.USER.name] = DefaultValuesHelper.object(this.initialObject, PropertiesReference.USER.name)
      },
      save: function () {
        let directParams = {
          [PropertiesReference.NAME.name]: this.group.name,
          [PropertiesReference.USER.relationship_id_name]: this.group.user ? this.group.user[globalEntityIdentifier] : 'null'
        }
        let initialM2mUsers = ManyToManyHelper.createM2MStructuredObjects(this.initialValues[PropertiesReference.USERS.name], PropertiesReference.USERS.relationship_id_name)
        let m2mUsers = ManyToManyHelper.createM2MStructuredObjects(this.group.users, PropertiesReference.USERS.relationship_id_name)
        let filteredUsers = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(initialM2mUsers, m2mUsers, PropertiesReference.USERS.relationship_id_name)
        let relayObjects = [
          ManyToManyHelper.createRelayObject(filteredUsers, EntityTypes.USER_GROUP)
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
