<template>
    <div>
        <div>
            <div class="form-group">
                <mau-form-input-text
                    :initialValue="initialValues[PropertiesReference.NAME.name]"
                    v-model="appointment.name"
                    :name="PropertiesReference.NAME.name"
                    :label="PropertiesReference.NAME.title"
                    v-validate="'required'"
                    :error="errors.has(PropertiesReference.NAME.name) ? errors.first(PropertiesReference.NAME.name) : ''"
                    :placeholder="'Ejemplo: Firma del acta'"
                >
                </mau-form-input-text>
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
                <mau-form-input-date-time
                        :name="'startDate'"
                        :data-vv-name="'startDate'"
                        v-model="appointment.startDate"
                        :label="PropertiesReference.START_DATE.title"
                        :initialValue="initialValues['startDate']"
                        :error="errors.has('startDate') ? errors.first('startDate') : ''"
                        v-validate="'required'"
                >
                </mau-form-input-date-time>
            </div>
            <mau-form-group-time
                    :initialTime="initialValues['startTime']"
                    :name="'startTime'"
                    :hourOptions="hourOptions"
                    v-model="appointment.startTime"
                    :error="errors.has('startTime') ? errors.first('startTime') : ''"
                    :label="'inicio'"
                    v-validate="'required'"
            >
            </mau-form-group-time>
            <mau-form-group-time
                    :initialTime="initialValues['endTime']"
                    :name="'endTime'"
                    :hourOptions="hourOptions"
                    v-model="appointment.endTime"
                    :error="errors.has('endTime') ? errors.first('endTime') : ''"
                    :label="'fin'"
                    v-validate="'required|date_format:HH:mm:ss|after:' + appointment.startTime"
            >
            </mau-form-group-time>
            <div class="form-group">
                <mau-form-input-select-dynamic
                        :url="clientsUrl"
                        :initialObjects="initialValues[PropertiesReference.CLIENTS.name]"
                        :multiselect="true"
                        :label="PropertiesReference.CLIENTS.title"
                        v-model="appointment.clients"
                        :error="errors.has(PropertiesReference.CLIENTS.name) ? errors.first(PropertiesReference.CLIENTS.name) : ''"
                        :displayProperty="'fullname'"
                        :name="PropertiesReference.CLIENTS.name"
                        v-validate="'required'"
                >
                </mau-form-input-select-dynamic>
            </div>
            <div class="form-group">
                <mau-form-input-select-dynamic
                        :url="roomsUrl"
                        :initialObject="initialValues[PropertiesReference.ROOM.name]"
                        :label="PropertiesReference.ROOM.title"
                        v-model="appointment.room"
                        :name="PropertiesReference.ROOM.name"
                        :error="errors.has(PropertiesReference.ROOM.name) ? errors.first(PropertiesReference.ROOM.name) : ''"
                        :displayProperty="'name'"
                        v-validate="'required'"
                        :data-vv-name="PropertiesReference.ROOM.name"
                >
                </mau-form-input-select-dynamic>
            </div>
            <div class="form-group">
                <mau-form-input-select-dynamic
                        :url="usersUrl"
                        :initialObjects="initialValues[PropertiesReference.USERS.name]"
                        :multiselect="true"
                        :label="PropertiesReference.USERS.title"
                        :displayProperty="'fullname'"
                        v-model="appointment.users"
                        :name="PropertiesReference.USERS.name"
                        :error="''"
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
  import ValidatorHelper from 'renderer/services/form/ValidatorHelper'
  import PropertiesReference from '../PropertiesReference'
  import GlobalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
  import FormSubmitEventBus from 'renderer/services/form/FormSubmitEventBus'
  import ConvertDateTime from 'renderer/services/common/ConvertDateTime'
  import MauFormInputSelectDynamic from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelectDynamic.vue'
  import MauFormGroupTime from 'renderer/components/mau-components/mau-form-groups/MauFormGroupTime.vue'
  import MauFormInputText from 'renderer/components/mau-components/mau-form-inputs/MauFormInputText'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import ManyToManyHelper from 'renderer/services/api/ManyToManyHelper'
  import DefaultValuesHelper from 'renderer/services/form/DefaultValuesHelper'
  import { mapGetters } from 'vuex'
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
      MauFormGroupTime,
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
        this.initialValues[PropertiesReference.NAME.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.NAME.name)
        this.initialValues[PropertiesReference.DESCRIPTION.name] = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.DESCRIPTION.name)
        this.initialValues[PropertiesReference.ROOM.name] = DefaultValuesHelper.object(this.initialObject, PropertiesReference.ROOM.name)
        let startDateTime = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.START_DATE.name)
        this.initialValues['startDate'] = startDateTime ? ConvertDateTime.date(startDateTime) : startDateTime
        this.initialValues['startTime'] = startDateTime ? ConvertDateTime.time(startDateTime) : startDateTime
        let endDateTime = DefaultValuesHelper.simple(this.initialObject, PropertiesReference.END_DATE.name)
        this.initialValues['endTime'] = endDateTime ? ConvertDateTime.time(endDateTime) : endDateTime
        this.initialValues[PropertiesReference.CLIENTS.name] = DefaultValuesHelper.arrayOfObjects(this.initialObject, PropertiesReference.CLIENTS.name)
        this.initialValues[PropertiesReference.USERS.name] = DefaultValuesHelper.arrayOfObjects(this.initialObject, PropertiesReference.USERS.name)
      },
      save: function () {
        let directParams = {
          [PropertiesReference.NAME.name]: this.appointment.name,
          [PropertiesReference.DESCRIPTION.name]: this.appointment.description,
          [PropertiesReference.START_DATE.name]: this.appointment.startDate + ' ' + this.appointment.startTime,
          [PropertiesReference.END_DATE.name]: this.appointment.startDate + ' ' + this.appointment.endTime,
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
      }
    }
  }

</script>
