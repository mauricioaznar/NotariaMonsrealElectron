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
              <div class="users">
                  <label>{{PropertiesReference.USERS.title}}</label>
                  <mau-form-input-select
                          :availableObjects="availableUsers"
                          :initialObjects="initialValues[PropertiesReference.USERS.name]"
                          :multiselect="true"
                          :label="'fullname'"
                          :display="PropertiesReference.USERS.display"
                          v-model="group.users"
                          class="override-form-control form-control"
                          :name="PropertiesReference.USERS.name"
                  >
                  </mau-form-input-select>
              </div>
          </div>
          <div class="form-group">
              <div class="user">
                  <label>{{PropertiesReference.USER.title}}</label>
                  <mau-form-input-select
                          :availableObjects="availableUsers"
                          :initialObject="initialValues[PropertiesReference.USER.name]"
                          :display="PropertiesReference.USER.display"
                          :label="'name'"
                          v-model="group.user"
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
  import RelationshipObjectsHelper from 'renderer/services/form/RelationshipObjectHelper'
  import {mapState} from 'vuex'
  import globalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
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
      ...mapState({
        availableUsers: state => state.api.entity.users
      })
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
        this.group.name = this.initialObject[PropertiesReference.NAME.name]
        this.initialValues[PropertiesReference.USERS.name] = this.initialObject[PropertiesReference.USERS.name]
        this.initialValues[PropertiesReference.USER.name] = this.initialObject[PropertiesReference.USER.name]
      },
      save: function () {
        let directParams = {
          [PropertiesReference.NAME.name]: this.group.name,
          [PropertiesReference.USER.relationship_id_name]: this.group.user ? this.group.user[globalEntityIdentifier] : 'null'
        }
        let filteredUsers = RelationshipObjectsHelper.compareAndFilterEntityObjects(
          this.initialValues[PropertiesReference.USERS.name],
          this.group.users,
          PropertiesReference.USERS.relationship_id_name)
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
