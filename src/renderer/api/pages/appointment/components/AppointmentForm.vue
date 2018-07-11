<template>
  <div>
    <div>
      <div class="form-group">
        <div class="document_property">
          <label>{{PropertiesReference.NAME.title}}</label>
          <b-form-input v-model="appointment.name"
                        type="text"
                        placeholder="Ejemplo: Cita con juan">
          </b-form-input>
        </div>
      </div>
      <div class="form-group">
        <div class="description">
          <label>{{PropertiesReference.DESCRIPTION.title}}</label>
          <mau-editor
                  v-model="appointment.description"
                  :id="'description'"
                  :initialValue="initialValues[PropertiesReference.DESCRIPTION.name]">
          </mau-editor>
        </div>
      </div>
      <div class="form-group">
        <div class="start_date">
          <label>{{PropertiesReference.START_DATE.title}}</label>
          <mau-form-input-date-time
                  :id="PropertiesReference.START_DATE.name"
                  :name="PropertiesReference.START_DATE.name"
                  :data-vv-name="PropertiesReference.START_DATE.name"
                  v-model="appointment.startDate"
                  :initialValue="initialValues[PropertiesReference.START_DATE.name]"
                  :class="getBootstrapValidationClass(errors.has(PropertiesReference.START_DATE.name))"
                  class="form-control override-form-control"
                  v-validate="'required'"
          >
          </mau-form-input-date-time>
          <div class="invalid-feedback">
                        <span v-show="errors.has(PropertiesReference.START_DATE.name)" class="help is-danger">
                          {{ errors.first(PropertiesReference.START_DATE.name) }}
                        </span>
          </div>
        </div>
      </div>
      <div class="form-group form-row">
        <div class="col-md-6 col-sm-12 start_time">
          <label>Hora de inicio</label>
          <mau-form-input-date-time
                  :id="'startTime'"
                  :name="'startTime'"
                  :inputType="'time'"
                  :data-vv-name="'startTime'"
                  v-model="appointment.startTime"
                  :initialValue="initialValues['startTime']"
                  :class="getBootstrapValidationClass(errors.has('startTime'))"
                  class="form-control override-form-control"
                  v-validate="'required'"
          >
          </mau-form-input-date-time>
          <div class="invalid-feedback">
                        <span v-show="errors.has('startTime')" class="help is-danger">
                          {{ errors.first('startTime') }}
                        </span>
          </div>
        </div>
        <div class="col-md-6 col-sm-12 end_time">
          <label>Hora de Fin</label>
          <mau-form-input-date-time
                  :id="'endTime'"
                  :name="'endTime'"
                  :inputType="'time'"
                  :data-vv-name="'endTime'"
                  v-model="appointment.endTime"
                  :initialValue="initialValues['endTime']"
                  :class="getBootstrapValidationClass(errors.has('endTime'))"
                  class="form-control override-form-control"
                  v-validate="'required'"
          >
          </mau-form-input-date-time>
          <div class="invalid-feedback">
                        <span v-show="errors.has('endTime')" class="help is-danger">
                          {{ errors.first('endTime') }}
                        </span>
          </div>
        </div>
      </div>
      <div class="form-group">

      </div>
      <div class="form-group">

      </div>
      <div class="form-group">
        <div class="clients">
          <label>{{PropertiesReference.CLIENTS.title}}</label>
          <mau-form-input-select
                  :availableObjects="availableClients"
                  :initialObjects="initialValues[PropertiesReference.CLIENTS.name]"
                  :multiselect="true"
                  :label="'fullname'"
                  v-model="appointment.clients"
                  class="override-form-control form-control"
                  :name="PropertiesReference.CLIENTS.name"
          >
          </mau-form-input-select>
          <div class="invalid-feedback">
                      <span v-show="errors.has(PropertiesReference.CLIENTS.name)" class="help is-danger">
                        {{ errors.first(PropertiesReference.CLIENTS.name) }}
                      </span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="room">
          <label>{{PropertiesReference.ROOM.title}}</label>
          <mau-form-input-select
                  :availableObjects="availableRooms"
                  :initialObject="initialValues[PropertiesReference.ROOM.name]"
                  :display="PropertiesReference.ROOM.display"
                  :label="'name'"
                  v-model="appointment.room"
                  class="override-form-control form-control"
                  :name="PropertiesReference.ROOM.name"
                  v-validate="'required'"
                  :data-vv-name="PropertiesReference.ROOM.name"
                  :class="getBootstrapValidationClass(errors.has(PropertiesReference.ROOM.name))"
          >
          </mau-form-input-select>
          <div class="invalid-feedback">
                      <span v-show="errors.has(PropertiesReference.ROOM.name)" class="help is-danger">
                        {{ errors.first(PropertiesReference.ROOM.name) }}
                      </span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="appointment_entry_users">
          <label>Abogado(s)</label>
          <mau-form-input-select
                  :availableObjects="availableUsers"
                  :initialObjects="initialValues[PropertiesReference.USERS.name]"
                  :multiselect="true"
                  :label="'fullname'"
                  :display="PropertiesReference.USERS.display"
                  v-model="appointment.users"
                  class="override-form-control form-control"
                  :name="PropertiesReference.USERS.name"
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
  import ValidatorHelper from 'renderer/services/form/ValidatorHelper'
  import {mapState} from 'vuex'
  import PropertiesReference from '../PropertiesReference'
  import {globalEntityIdentificator} from 'renderer/config'
  import FormSubmitEventBus from 'renderer/services/form/FormSubmitEventBus'
  import ConvertDateTime from 'renderer/services/common/ConvertDateTime'
  import cloneDeep from 'renderer/services/common/cloneDeep'
  import MauFormInputSelect from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelect.vue'
  import RelationshipObjectsHelper from 'renderer/services/form/RelationshipObjectHelper'
  export default {
    name: 'AppointmentForm',
    data () {
      return {
        appointment: {
          name: '',
          description: '',
          room: '',
          startDate: '',
          startTime: '',
          endTime: '',
          clients: '',
          users: ''
        },
        // Utility variables
        initialValues: {},
        PropertiesReference: PropertiesReference,
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
        availableClients: state => state.api.entity.clients,
        availableRooms: state => state.api.entity.rooms,
        availableUsers: state => cloneDeep(state.api.entity.users)
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
        this.initialValues['startTime'] = ''
        this.initialValues['endTime'] = ''
      },
      setInitialValues: function () {
        this.appointment.name = this.initialObject[PropertiesReference.NAME.name]
        this.initialValues[PropertiesReference.DESCRIPTION.name] = this.initialObject[PropertiesReference.DESCRIPTION.name]
        this.initialValues[PropertiesReference.ROOM.name] = this.initialObject[PropertiesReference.ROOM.name]
        this.initialValues[PropertiesReference.START_DATE.name] = ConvertDateTime.date(this.initialObject[PropertiesReference.START_DATE.name])
        this.initialValues['startTime'] = ConvertDateTime.time(this.initialObject[PropertiesReference.START_DATE.name])
        this.initialValues['endTime'] = ConvertDateTime.time(this.initialObject[PropertiesReference.END_DATE.name])
        this.initialValues[PropertiesReference.CLIENTS.name] = this.initialObject[PropertiesReference.CLIENTS.name]
        this.initialValues[PropertiesReference.USERS.name] = this.initialObject[PropertiesReference.USERS.name]
      },
      save: function () {
        let directParams = {
          [PropertiesReference.NAME.name]: this.appointment.name,
          [PropertiesReference.DESCRIPTION.name]: this.appointment.description,
          [PropertiesReference.START_DATE.name]: this.appointment.startDate + ' ' + this.appointment.startTime + ':00',
          [PropertiesReference.END_DATE.name]: this.appointment.startDate + ' ' + this.appointment.endTime + ':00',
          // todo CREAR UNA FUNCION PARA LA MANDAR NULL COMO STRING
          [PropertiesReference.CLIENTS.relationship_id_name]: this.appointment.clients ? this.appointment.clients[globalEntityIdentificator] : null,
          [PropertiesReference.ROOM.relationship_id_name]: this.appointment.room ? this.appointment.room[globalEntityIdentificator] : null
        }
        let filteredUsers = RelationshipObjectsHelper.compareAndFilterEntityObjects(
          this.initialValues[PropertiesReference.USERS.name],
          this.appointment.users,
          PropertiesReference.USERS.relationship_id_name)
        let filteredClients = RelationshipObjectsHelper.compareAndFilterEntityObjects(
          this.initialValues[PropertiesReference.CLIENTS.name],
          this.appointment.clients,
          PropertiesReference.CLIENTS.relationship_id_name)
        let indirectParams = {
          [PropertiesReference.USERS.entityName]: filteredUsers,
          [PropertiesReference.CLIENTS.entityName]: filteredClients
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
      },
      appointment: {
        handler (val) {
        },
        deep: true
      }
    }
  }

</script>
