<template>
  <div>
    <mau-crud-list :entityName="'Appointment'">
      <appointment-list :apiUrl="apiUrl" :canEdit="canEdit"></appointment-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import AppointmentList from '../components/AppointmentList.vue'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'ListAppointment',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.APPOINTMENT.apiName),
        canEdit: true
      }
    },
    components: {
      AppointmentList
    }
  }
</script>
