1<template>
  <div>
      <div>
          <div class="form-group">
              <div class="name">
                  <label>{{PropertiesReference.NAME.title}}</label>
                  <b-form-input v-model="group.name"
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
          </div>
          <div class="form-group">
              <div class="user">
                  <label>{{PropertiesReference.USER.title}}</label>
                  <mau-form-input-select
                          :initialObject="initialValues[PropertiesReference.USER.name]"
                          :label="'name'"
                          v-model="group.user"
                          :url="usersUrl"
                          class="override-form-control form-control"
                          :name="PropertiesReference.USER.name"
                          v-validate="'required'"
                          :data-vv-name="PropertiesReference.USER.name"
                          :class="getBootstrapValidationClass(errors.has(PropertiesReference.USER.name))"
                  >
                  </mau-form-input-select>
                  <div class="invalid-feedback">
                      <span v-show="errors.has(PropertiesReference.USER.name)" class="help is-danger">
                        {{ errors.first(PropertiesReference.USER.name) }}
                      </span>
                  </div>
              </div>
          </div>
          <div class="form-group">
              <div class="users">
                  <label>{{PropertiesReference.USERS.title}}</label>
                  <mau-form-input-select
                          v-model="group.users"
                          :initialObjects="initialValues[PropertiesReference.USERS.name]"
                          :relatedRelationshipName="PropertiesReference.USERS.relationship_id_name"
                          :url="usersUrl"
                          :multiselect="true"
                          :label="'name'"
                          class="override-form-control form-control"
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
  import PropertiesReference from '../PropertiesReference'
  import ValidatorHelper from 'renderer/services/form/ValidatorHelper'
  import FormSubmitEventBus from 'renderer/services/form/FormSubmitEventBus'
  import MauFormInputSelect from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelect.vue'
  import ManyToManyHelper from 'renderer/services/api/ManyToManyHelper'
  import globalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
  import DefaultValuesHelper from 'renderer/services/form/DefaultValuesHelper'
  import ApiUrls from 'renderer/services/api/ApiUrls'
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
        usersUrl: ApiUrls.createListUrl(EntityTypes.USER.apiName) + '?paginate=false',
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
      this.createDefaultInitialValues()
      if (this.initialObject) {
        this.setInitialValues(this.initialObject)
      }
    },
    computed: {
    },
    methods: {
      createDefaultInitialValues: function () {
        for (let propertyReference in PropertiesReference) {
          if (PropertiesReference.hasOwnProperty(propertyReference)) {
            this.initialValues[PropertiesReference[propertyReference].name] = PropertiesReference[propertyReference].defaultValue
          }
        }
      },
      setInitialValues: function () {
        this.group.name = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.NAME.name)
        this.initialValues[PropertiesReference.USERS.name] = DefaultValuesHelper.arrayOfObjects(this.initialObject, PropertiesReference.USERS.name)
        this.initialValues[PropertiesReference.USER.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.USER.name)
      },
      save: function () {
        let directParams = {
          [PropertiesReference.NAME.name]: this.group.name,
          [PropertiesReference.USER.relationship_id_name]: this.group.user ? this.group.user[globalEntityIdentifier] : 'null'
        }
        let initialM2mUsers = ManyToManyHelper.createM2MStructuredObjects(this.initialValues[PropertiesReference.USERS.name], PropertiesReference.USERS.relationship_id_name)
        let m2mUsers = ManyToManyHelper.createM2MStructuredObjects(this.group.users, PropertiesReference.USERS.relationship_id_name)
        let filteredUsers = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(initialM2mUsers, m2mUsers, PropertiesReference.USERS.relationship_id_name)
        let indirectParams = {
          [PropertiesReference.USERS.entityName]: filteredUsers
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
