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
                  :id="'startDate'"
                  :name="'startDate'"
                  :data-vv-name="'startDate'"
                  v-model="appointment.startDate"
                  :initialValue="initialValues['startDate']"
                  :class="getBootstrapValidationClass(errors.has('startDate'))"
                  class="form-control override-form-control"
                  v-validate="'required'"
          >
          </mau-form-input-date-time>
          <div class="invalid-feedback">
                        <span v-show="errors.has('startDate')" class="help is-danger">
                          {{ errors.first('startDate') }}
                        </span>
          </div>
        </div>
      </div>
      <div class="form-group form-row">
        <div class="col-md-6 col-sm-12 start_time">
          <label>Hora de inicio</label>
          <mau-form-input-select-static
                  :id="'startHour'"
                  :name="'startHour'"
                  :data-vv-name="'startHour'"
                  v-model="appointment.startHour"
                  :availableObjects="hourOptions"
                  :initialObject="initialValues['startHour']"
                  :displayProperty="'value'"
                  :class="getBootstrapValidationClass(errors.has('startHour'))"
                  class="form-control p-0"
                  v-validate="'required'"
          >
          </mau-form-input-select-static>
          <div class="invalid-feedback">
                <span v-show="errors.has('startHour')" class="help is-danger">
                  {{ errors.first('startHour') }}
                </span>
          </div>
        </div>
        <div class="col-md-6 col-sm-12 end_time">
          <label>Minuto de inicio</label>
          <mau-form-input-select-static
                  :id="'startMinute'"
                  :name="'startMinute'"
                  :data-vv-name="'startMinute'"
                  v-model="appointment.startMinute"
                  :availableObjects="minuteOptions"
                  :displayProperty="'value'"
                  :initialObject="initialValues['startMinute']"
                  :class="getBootstrapValidationClass(errors.has('startMinute'))"
                  class="form-control override-form-control"
                  v-validate="'required'"
          >
          </mau-form-input-select-static>
          <div class="invalid-feedback">
                <span v-show="errors.has('startMinute')" class="help is-danger">
                  {{ errors.first('startMinute') }}
                </span>
          </div>
        </div>
      </div>
      <div class="form-group form-row">
        <div class="col-md-6 col-sm-12 start_time">
          <label>Hora de fin</label>
          <mau-form-input-select-static
                  :id="'endHour'"
                  :name="'endHour'"
                  :data-vv-name="'endHour'"
                  v-model="appointment.endHour"
                  :availableObjects="hourOptions"
                  :initialObject="initialValues['endHour']"
                  :displayProperty="'value'"
                  :class="getBootstrapValidationClass(errors.has('endHour'))"
                  class="form-control p-0"
                  v-validate="'required'"
          >
          </mau-form-input-select-static>
          <div class="invalid-feedback">
                <span v-show="errors.has('endHour')" class="help is-danger">
                  {{ errors.first('endHour') }}
                </span>
          </div>
        </div>
        <div class="col-md-6 col-sm-12 end_time">
          <label>Minuto de fin</label>
          <mau-form-input-select-static
                  :id="'endMinute'"
                  :name="'endMinute'"
                  :data-vv-name="'endMinute'"
                  v-model="appointment.endMinute"
                  :availableObjects="minuteOptions"
                  :displayProperty="'value'"
                  :initialObject="initialValues['endMinute']"
                  :class="getBootstrapValidationClass(errors.has('endMinute'))"
                  class="form-control override-form-control"
                  v-validate="'required'"
          >
          </mau-form-input-select-static>
          <div class="invalid-feedback">
                <span v-show="errors.has('endMinute')" class="help is-danger">
                  {{ errors.first('endMinute') }}
                </span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="clients">
          <label>{{PropertiesReference.CLIENTS.title}}</label>
          <mau-form-input-select-dynamic
                  :url="clientsUrl"
                  :initialObjects="initialValues[PropertiesReference.CLIENTS.name]"
                  :multiselect="true"
                  :label="'fullname'"
                  v-model="appointment.clients"
                  class="override-form-control form-control"
                  :class="getBootstrapValidationClass(errors.has(PropertiesReference.CLIENTS.name))"
                  :name="PropertiesReference.CLIENTS.name"
                  v-validate="'required'"
          >
          </mau-form-input-select-dynamic>
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
          <mau-form-input-select-dynamic
                  :url="roomsUrl"
                  :initialObject="initialValues[PropertiesReference.ROOM.name]"
                  :label="'name'"
                  v-model="appointment.room"
                  class="override-form-control form-control"
                  :name="PropertiesReference.ROOM.name"
                  :class="getBootstrapValidationClass(errors.has(PropertiesReference.ROOM.name))"
                  v-validate="'required'"
                  :data-vv-name="PropertiesReference.ROOM.name"
          >
          </mau-form-input-select-dynamic>
          <div class="invalid-feedback">
                      <span v-show="errors.has(PropertiesReference.ROOM.name)" class="help is-danger">
                        {{ errors.first(PropertiesReference.ROOM.name) }}
                      </span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="appointment_users">
          <label>Abogado(s)</label>
          <mau-form-input-select-dynamic
                  :url="usersUrl"
                  :initialObjects="initialValues[PropertiesReference.USERS.name]"
                  :multiselect="true"
                  :label="'fullname'"
                  v-model="appointment.users"
                  class="override-form-control form-control"
                  :name="PropertiesReference.USERS.name"
          >
          </mau-form-input-select-dynamic>
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
  import PropertiesReference from '../PropertiesReference'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
  import FormSubmitEventBus from 'renderer/services/form/FormSubmitEventBus'
  import ConvertDateTime from 'renderer/services/common/ConvertDateTime'
  import MauFormInputSelectDynamic from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelectDynamic.vue'
  import MauFormInputSelectStatic from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelectStatic'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import ManyToManyHelper from 'renderer/services/api/ManyToManyHelper'
  import DefaultValuesHelper from 'renderer/services/form/DefaultValuesHelper'
  import {mapGetters} from 'vuex'
  export default {
    name: 'AppointmentForm',
    data () {
      return {
        appointment: {
          name: '',
          description: '',
          room: '',
          startDate: '',
          startHour: '',
          startMinute: '',
          endTime: '',
          endHour: '',
          endMinute: '',
          clients: '',
          users: ''
        },
        hourOptions: [
          {value: '07'},
          {value: '08'},
          {value: '09'},
          {value: '10'},
          {value: '11'},
          {value: '12'},
          {value: '13'},
          {value: '14'},
          {value: '15'},
          {value: '16'},
          {value: '17'},
          {value: '18'},
          {value: '19'}
        ],
        minuteOptions: [
          {value: '00'},
          {value: '05'},
          {value: '10'},
          {value: '15'},
          {value: '20'},
          {value: '25'},
          {value: '30'},
          {value: '35'},
          {value: '40'},
          {value: '45'},
          {value: '50'},
          {value: '55'}
        ],
        // Utility variables
        clientsUrl: ApiUrls.createListUrl(EntityTypes.CLIENT.apiName) + '?paginate=false',
        roomsUrl: ApiUrls.createListUrl(EntityTypes.ROOM.apiName) + '?paginate=false',
        usersUrl: ApiUrls.createListUrl(EntityTypes.USER.apiName) + '?paginate=false',
        initialValues: {},
        PropertiesReference: PropertiesReference,
        buttonDisabled: false
      }
    },
    components: {
      MauFormInputSelectDynamic,
      MauFormInputSelectStatic
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
      ...mapGetters([
        'user'
      ])
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      setInitialValues: function () {
        this.appointment.name = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.NAME.name)
        this.initialValues[PropertiesReference.DESCRIPTION.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.DESCRIPTION.name)
        this.initialValues[PropertiesReference.ROOM.name] = DefaultValuesHelper.object(this.initialObject, PropertiesReference.ROOM.name)
        let startDateTime = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.START_DATE.name)
        this.initialValues['startDate'] = startDateTime ? ConvertDateTime.date(startDateTime) : startDateTime
        this.initialValues['startHour'] = startDateTime ? {value: ConvertDateTime.hour(startDateTime)} : {}
        this.initialValues['startMinute'] = startDateTime ? {value: ConvertDateTime.minute(startDateTime)} : {}
        let endDateTime = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.END_DATE.name)
        this.initialValues['endHour'] = startDateTime ? {value: ConvertDateTime.hour(endDateTime)} : {}
        this.initialValues['endMinute'] = startDateTime ? {value: ConvertDateTime.minute(endDateTime)} : {}
        this.initialValues[PropertiesReference.CLIENTS.name] = DefaultValuesHelper.arrayOfObjects(this.initialObject, PropertiesReference.CLIENTS.name)
        this.initialValues[PropertiesReference.USERS.name] = DefaultValuesHelper.arrayOfObjects(this.initialObject, PropertiesReference.USERS.name)
      },
      save: function () {
        let directParams = {
          [PropertiesReference.NAME.name]: this.appointment.name,
          [PropertiesReference.DESCRIPTION.name]: this.appointment.description,
          [PropertiesReference.START_DATE.name]: this.appointment.startDate + ' ' + this.appointment.startHour.value + ':' + this.appointment.startMinute.value + ':00',
          [PropertiesReference.END_DATE.name]: this.appointment.startDate + ' ' + this.appointment.endHour.value + ':' + this.appointment.endMinute.value + ':00',
          [PropertiesReference.CLIENTS.relationship_id_name]: this.appointment.clients ? this.appointment.clients[GlobalEntityIdentifier] : null,
          [PropertiesReference.ROOM.relationship_id_name]: this.appointment.room ? this.appointment.room[GlobalEntityIdentifier] : null
        }
        if (!this.initialObject || !this.initialObject[PropertiesReference.CREATED_BY.relationship_id_name]) {
          directParams[PropertiesReference.CREATED_BY.relationship_id_name] = this.user[GlobalEntityIdentifier]
        }
        let initialM2mUsers = ManyToManyHelper.createM2MStructuredObjects(this.initialValues[PropertiesReference.USERS.name], PropertiesReference.USERS.relationship_id_name)
        let m2mUsers = ManyToManyHelper.createM2MStructuredObjects(this.appointment.users, PropertiesReference.USERS.relationship_id_name)
        let filteredUsers = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(initialM2mUsers, m2mUsers, PropertiesReference.USERS.relationship_id_name)
        let initialM2mClients = ManyToManyHelper.createM2MStructuredObjects(this.initialValues[PropertiesReference.CLIENTS.name], PropertiesReference.CLIENTS.relationship_id_name)
        let m2mClients = ManyToManyHelper.createM2MStructuredObjects(this.appointment.clients, PropertiesReference.CLIENTS.relationship_id_name)
        let filteredClients = ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(initialM2mClients, m2mClients, PropertiesReference.CLIENTS.relationship_id_name)
        let indirectParams = [
          ManyToManyHelper.createRelayObject(filteredUsers, EntityTypes.APPOINTMENT_USER),
          ManyToManyHelper.createRelayObject(filteredClients, EntityTypes.APPOINTMENT_CLIENT)
        ]
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
